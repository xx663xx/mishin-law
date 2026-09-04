const body = document.body;

const profiles = {
  roman: {
    index: "01", role: "УПРАВЛЯЮЩИЙ ПАРТНЁР", name: "Роман Артурович Мишин",
    image: "assets/images/roman-mishin.png", experience: "15 лет", focus: "Судебная стратегия",
    lead: "Ведёт сложные частные споры и отвечает за судебную стратегию фирмы. Подключается к делам, где нужно одновременно удержать юридическую позицию и найти практичный выход из конфликта.",
    list: ["Раздел активов и семейные конфликты", "Споры о недвижимости и собственности", "Переговоры до суда и мировые соглашения", "Апелляционное и кассационное обжалование"],
    quote: "Хорошая стратегия начинается не с обещания победы, а с честного разбора слабых мест дела."
  },
  bogdan: {
    index: "02", role: "ПАРТНЁР", name: "Беляев Богдан Денисович",
    image: "assets/images/bogdan-belyaev.png", experience: "11 лет", focus: "Защита бизнеса",
    lead: "Специализируется на кризисных ситуациях для собственников и руководителей. Координирует защиту при проверках, процессуальных действиях и корпоративных конфликтах.",
    list: ["Уголовно-правовые риски бизнеса", "Сопровождение проверок и допросов", "Защита руководителей и собственников", "Внутренние расследования"],
    quote: "В кризисе важны первые часы: нужно сохранить документы, контроль и пространство для решений."
  },
  konstantin: {
    index: "03", role: "СТАРШИЙ ЮРИСТ", name: "Воробьёв Константин Дмитриевич",
    image: "assets/images/konstantin-vorobyev.png", experience: "9 лет", focus: "Арбитраж",
    lead: "Представляет компании в договорных и корпоративных спорах. Работает с технически сложными доказательствами и выстраивает позицию вокруг экономики конфликта.",
    list: ["Взыскание задолженности и убытков", "Корпоративные и партнёрские споры", "Строительный подряд и поставка", "Обеспечительные меры"],
    quote: "Судебный спор — это продолжение деловых переговоров другими средствами. Целью должен быть полезный результат, а не сам процесс."
  },
  igor: {
    index: "04", role: "РУКОВОДИТЕЛЬ ПРАКТИКИ", name: "Черниговский Игорь Александрович",
    image: "assets/images/igor-chernigovskii.png", experience: "12 лет", focus: "Публичное право",
    lead: "Работает на стыке административного и налогового права. Оспаривает решения ведомств и сопровождает бизнес в спорах с контролирующими органами.",
    list: ["Налоговые проверки и доначисления", "Обжалование решений ведомств", "Административные правонарушения", "Лицензии и специальные разрешения"],
    quote: "Государственный орган — сильная сторона спора, но его решение обязано быть законным и доказанным."
  },
  mikhail: {
    index: "05", role: "ЮРИСТ", name: "Попов Михаил Денисович",
    image: "assets/images/mihail-popov.png", experience: "7 лет", focus: "Частное право",
    lead: "Ведёт наследственные и жилищные споры, помогает клиентам оформлять права на имущество и решать конфликты до того, как они становятся многолетним процессом.",
    list: ["Принятие и раздел наследства", "Оспаривание завещаний", "Жилищные и земельные споры", "Сделки с недвижимостью"],
    quote: "В частном споре за документами всегда стоят отношения людей. Это нужно учитывать, чтобы решение действительно завершило конфликт."
  }
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", () => {
  const open = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => {
  header.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll(".practice-tab").forEach((tab) => tab.addEventListener("click", () => {
  const target = tab.dataset.practice;
  document.querySelectorAll(".practice-tab").forEach((item) => {
    const selected = item === tab;
    item.classList.toggle("active", selected);
    item.setAttribute("aria-selected", String(selected));
  });
  document.querySelectorAll("[data-practice-panel]").forEach((panel) => {
    const selected = panel.dataset.practicePanel === target;
    panel.hidden = !selected;
    panel.classList.toggle("active", selected);
  });
}));

const searchInput = document.querySelector("#lawyer-search");
const lawyerCards = [...document.querySelectorAll(".lawyer-card")];
const teamEmpty = document.querySelector(".team-empty");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLocaleLowerCase("ru");
  let visibleCount = 0;
  lawyerCards.forEach((card) => {
    const matches = card.dataset.name.toLocaleLowerCase("ru").includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });
  teamEmpty.hidden = visibleCount !== 0;
});

const profileModal = document.querySelector(".profile-modal");
function openProfile(key) {
  const profile = profiles[key];
  if (!profile) return;
  document.querySelector("#profile-index").textContent = profile.index;
  document.querySelector("#profile-role").textContent = profile.role;
  document.querySelector("#profile-name").textContent = profile.name;
  document.querySelector("#profile-lead").textContent = profile.lead;
  document.querySelector("#profile-experience").textContent = profile.experience;
  document.querySelector("#profile-focus").textContent = profile.focus;
  document.querySelector("#profile-quote").textContent = profile.quote;
  const image = document.querySelector("#profile-image");
  image.src = profile.image;
  image.alt = profile.name;
  const list = document.querySelector("#profile-list");
  list.replaceChildren(...profile.list.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));
  profileModal.classList.add("open");
  profileModal.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
  document.querySelector(".profile-close").focus();
}
function closeProfile() {
  profileModal.classList.remove("open");
  profileModal.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
}
document.querySelectorAll("[data-lawyer]").forEach((button) => button.addEventListener("click", () => openProfile(button.dataset.lawyer)));
document.querySelectorAll("[data-close-profile]").forEach((element) => element.addEventListener("click", closeProfile));

const consultModal = document.querySelector(".consult-modal");
function openConsult() {
  closeProfile();
  consultModal.classList.add("open");
  consultModal.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
}
function closeConsult() {
  consultModal.classList.remove("open");
  consultModal.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
}
document.querySelectorAll("[data-open-consult]").forEach((button) => button.addEventListener("click", openConsult));
document.querySelector("[data-profile-consult]").addEventListener("click", openConsult);
document.querySelectorAll("[data-close-consult]").forEach((element) => element.addEventListener("click", closeConsult));

let reviewIndex = 0;
const reviews = [...document.querySelectorAll(".review")];
function showReview(index) {
  reviewIndex = (index + reviews.length) % reviews.length;
  reviews.forEach((review, current) => review.classList.toggle("active", current === reviewIndex));
  document.querySelector("#review-current").textContent = String(reviewIndex + 1).padStart(2, "0");
}
document.querySelector("[data-review-prev]").addEventListener("click", () => showReview(reviewIndex - 1));
document.querySelector("[data-review-next]").addEventListener("click", () => showReview(reviewIndex + 1));

const chat = document.querySelector(".chat");
const chatLauncher = document.querySelector(".chat-launcher");
const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector(".chat-form input");
function toggleChat(force) {
  const open = typeof force === "boolean" ? force : !chat.classList.contains("open");
  chat.classList.toggle("open", open);
  chat.setAttribute("aria-hidden", String(!open));
  chatLauncher.setAttribute("aria-expanded", String(open));
  if (open) setTimeout(() => chatInput.focus(), 120);
}
function addChatMessage(text, type) {
  const wrapper = document.createElement("div");
  wrapper.className = `${type}-message`;
  if (type === "bot") {
    const avatar = document.createElement("span");
    avatar.textContent = "П";
    wrapper.appendChild(avatar);
  }
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  wrapper.appendChild(paragraph);
  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function botReply(message) {
  const text = message.toLocaleLowerCase("ru");
  if (/сем|развод|алимент|ребен|ребён|имуще/.test(text)) return "Для первичного разбора пригодятся документы на имущество, свидетельства и судебные бумаги, если они уже есть. По таким делам работают Роман Мишин и Михаил Попов. Можно начать с консультации по телефону +7 983 243-96-90.";
  if (/бизнес|компан|договор|долг|арбитраж|постав/.test(text)) return "Не подписывайте новые документы и сохраните переписку, договоры и платёжные документы. Договорные и корпоративные споры ведёт Константин Воробьёв, кризисную защиту бизнеса — Богдан Беляев.";
  if (/налог|штраф|ведом|администр|провер/.test(text)) return "Зафиксируйте дату получения решения: срок обжалования часто критичен. Такие дела ведёт Игорь Черниговский. Для оценки понадобится само решение и документы проверки.";
  if (/документ|иск|претенз|заявлен|доверен/.test(text)) return "В разделе «Документы» есть четыре базовых шаблона. Перед подачей лучше дать заполненный вариант юристу: форма не учитывает особенности конкретного дела.";
  if (/цен|стоим|сколько|оплат/.test(text)) return "Стоимость зависит от объёма документов, срочности и стадии дела. После первичного разбора мы называем фиксированную цену этапа до начала работы.";
  if (/телефон|почт|контакт|связ/.test(text)) return "Связаться с фирмой можно по телефону +7 983 243-96-90 или по почте cxsuiemode@gmail.com.";
  return "Понял. Для точного ответа нужно увидеть документы и сроки. Напишите, это семейный спор, вопрос бизнеса, административное дело или подготовка документа?";
}
function submitChat(message) {
  const clean = message.trim();
  if (!clean) return;
  addChatMessage(clean, "user");
  chatInput.value = "";
  setTimeout(() => addChatMessage(botReply(clean), "bot"), 350);
}
chatLauncher.addEventListener("click", () => toggleChat());
document.querySelector(".chat-close").addEventListener("click", () => toggleChat(false));
document.querySelectorAll("[data-message]").forEach((button) => button.addEventListener("click", () => submitChat(button.dataset.message)));
document.querySelector(".chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  submitChat(chatInput.value);
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `Обращение с сайта: ${data.get("topic")}`;
  const message = `Имя: ${data.get("name")}\nТелефон: ${data.get("phone")}\nТема: ${data.get("topic")}\n\n${data.get("message") || "Описание не указано"}`;
  window.location.href = `mailto:cxsuiemode@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeProfile();
  closeConsult();
  toggleChat(false);
});
