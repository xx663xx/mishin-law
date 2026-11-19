import { createHash, randomUUID } from "node:crypto";
import { createReadStream } from "node:fs";
import { link, lstat, mkdir, open, readFile, realpath, stat, unlink } from "node:fs/promises";
import { createServer } from "node:http";
import { homedir } from "node:os";
import { dirname, extname, isAbsolute, join, relative, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const root = await realpath(dirname(fileURLToPath(import.meta.url)));
const inbox = resolve(process.env.INQUIRIES_DIR || join(homedir(), ".podkinuli", "inquiries"));
function insideRoot(path) {
  const fromRoot = relative(root, path);
  return !fromRoot || (!fromRoot.startsWith("../") && fromRoot !== ".." && !isAbsolute(fromRoot));
}
if (insideRoot(inbox)) throw new Error("INQUIRIES_DIR must be outside the website directory");
await mkdir(inbox, { recursive: true, mode: 0o700 });
const inboxInfo = await lstat(inbox);
if (!inboxInfo.isDirectory() || (inboxInfo.mode & 0o077) !== 0 || insideRoot(await realpath(inbox))) {
  throw new Error("INQUIRIES_DIR must be a private directory outside the website directory (chmod 700)");
}

const topics = new Set(["Семейный спор", "Недвижимость и наследство", "Бизнес и договоры", "Спор с ведомством", "Другое"]);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8"
};
function json(response, status, value) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  response.end(JSON.stringify(value));
}
function inquiryFrom(value) {
  if (!value || typeof value !== "object") return null;
  const limits = { name: 100, phone: 12, topic: 100, message: 4000, specialist: 120, route: 1500 };
  const inquiry = {};
  for (const [key, max] of Object.entries(limits)) {
    const field = value[key];
    if (typeof field !== "string" || field.length > max) return null;
    inquiry[key] = field.trim();
  }
  if (!inquiry.name || !/^\+7\d{10}$/.test(inquiry.phone) || !topics.has(inquiry.topic)) return null;
  return inquiry;
}

async function saveInquiry(inquiry, key) {
  const hash = createHash("sha256").update(key).digest("hex");
  const path = join(inbox, hash + ".json");
  const temp = join(inbox, "." + randomUUID() + ".tmp");
  const entry = { reference: hash.slice(0, 12).toUpperCase(), receivedAt: new Date().toISOString(), inquiry };
  const file = await open(temp, "wx", 0o600);
  try {
    try {
      await file.writeFile(JSON.stringify(entry, null, 2) + "\n");
      await file.sync();
    } finally {
      await file.close();
    }
    try {
      await link(temp, path);
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      const saved = JSON.parse(await readFile(path, "utf8"));
      if (JSON.stringify(saved.inquiry) !== JSON.stringify(inquiry)) return null;
    }
    const directory = await open(inbox, "r");
    try {
      await directory.sync();
    } finally {
      await directory.close();
    }
    return entry.reference;
  } finally {
    await unlink(temp);
  }
}

async function receive(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "method_not_allowed" });
  const origin = request.headers.origin;
  if (origin && origin !== "http://" + request.headers.host && origin !== "https://" + request.headers.host) {
    return json(response, 403, { error: "invalid_origin" });
  }
  if (request.headers["content-type"]?.split(";")[0] !== "application/json") {
    return json(response, 415, { error: "unsupported_media_type" });
  }
  const key = request.headers["idempotency-key"];
  if (!/^[0-9a-f]{32}$/.test(key || "")) return json(response, 400, { error: "invalid_request" });
  const maxBytes = 28_000;
  let length = 0;
  const chunks = [];
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    length += chunk.length;
    if (length > maxBytes) {
      request.resume();
      return json(response, 413, { error: "request_too_large" });
    }
    chunks.push(chunk);
  }
  let inquiry;
  try {
    inquiry = inquiryFrom(JSON.parse(Buffer.concat(chunks).toString("utf8")));
  } catch {
    return json(response, 400, { error: "invalid_request" });
  }
  if (!inquiry) return json(response, 422, { error: "invalid_fields" });
  const reference = await saveInquiry(inquiry, key);
  if (!reference) return json(response, 409, { error: "request_conflict" });
  return json(response, 201, { reference });
}

const fixedPages = new Set(["/index.html", "/styles.css", "/script.js"]);
const publicAsset = /^\/assets\/(?:images\/[a-z-]+\.(?:webp|png)|documents\/[a-z-]+\.txt)$/;
const server = createServer({ requestTimeout: 20000, headersTimeout: 10000 }, async (request, response) => {
  try {
    response.setHeader("X-Content-Type-Options", "nosniff");
    const pathname = new URL(request.url, "http://localhost").pathname;
    if (pathname === "/api/inquiries") return await receive(request, response);
    const path = pathname === "/" ? "/index.html" : pathname;
    if (!["GET", "HEAD"].includes(request.method) || (!fixedPages.has(path) && !publicAsset.test(path))) {
      response.writeHead(404).end();
      return;
    }
    const file = join(root, path);
    const fileInfo = await stat(file);
    response.writeHead(200, { "Content-Type": mime[extname(file)], "Content-Length": fileInfo.size });
    if (request.method === "HEAD") return response.end();
    await pipeline(createReadStream(file), response);
  } catch (error) {
    if (response.destroyed) return;
    if (response.headersSent) return response.destroy();
    if (error.code === "ENOENT" && request.method !== "POST") return response.writeHead(404).end();
    console.error("Request failed:", error.code || error.name);
    return json(response, 500, { error: "server_error" });
  }
});
const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || "127.0.0.1";
server.listen(port, host, () => console.log("Local website: http://" + host + ":" + server.address().port));
