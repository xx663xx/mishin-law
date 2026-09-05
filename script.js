const body = document.body;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobileViewport = window.matchMedia("(max-width: 760px)").matches;
const scrollResetDuration = isMobileViewport ? 2600 : 2200;

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const navigationEntry = performance.getEntriesByType?.("navigation")[0];
const shouldResetScroll = navigationEntry?.type === "reload" || !window.location.hash;
function forceScrollTop() {
  document.documentElement.style.scrollBehavior = "auto";
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}
if (shouldResetScroll) {
  forceScrollTop();
  const resetDelays = isMobileViewport ? [0, 40, 120, 280, 560, 900, 1300, 1700, 2200, 2500] : [0, 40, 120, 280, 560, 900, 1300, 1800, 2100];
  resetDelays.forEach((delay) => window.setTimeout(forceScrollTop, delay));
  window.addEventListener("DOMContentLoaded", forceScrollTop, { once: true });
  window.addEventListener("load", () => {
    forceScrollTop();
    window.requestAnimationFrame(forceScrollTop);
    window.setTimeout(forceScrollTop, 180);
  }, { once: true });
  window.addEventListener("pageshow", () => {
    forceScrollTop();
    window.requestAnimationFrame(forceScrollTop);
  });
  window.setTimeout(() => {
    forceScrollTop();
    window.requestAnimationFrame(() => {
      forceScrollTop();
      document.documentElement.style.scrollBehavior = "";
      document.documentElement.classList.remove("scroll-resetting");
      window.setTimeout(forceScrollTop, 80);
    });
  }, scrollResetDuration);
}
window.requestAnimationFrame(() => {
  document.documentElement.classList.remove("page-booting");
  document.documentElement.classList.add("page-ready");
});
window.addEventListener("beforeunload", () => {
  document.documentElement.style.scrollBehavior = "auto";
  if (shouldResetScroll) window.scrollTo(0, 0);
});

const siteIntro = document.querySelector(".site-intro");
if (siteIntro) {
  let introSeen = false;
  try { introSeen = sessionStorage.getItem("podkinuli-intro-seen") === "1"; } catch (_) { introSeen = false; }
  const useIntroCover = shouldResetScroll || !introSeen;
  if (!useIntroCover) {
    siteIntro.classList.add("hidden");
  } else {
    window.setTimeout(() => {
      siteIntro.classList.add("hidden");
      try { sessionStorage.setItem("podkinuli-intro-seen", "1"); } catch (_) { /* storage may be disabled */ }
    }, prefersReducedMotion ? 320 : shouldResetScroll ? scrollResetDuration + 100 : 1650);
  }
}

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

const hero = document.querySelector(".hero");
if (hero && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
    hero.style.setProperty("--hero-x", x.toFixed(3));
    hero.style.setProperty("--hero-y", y.toFixed(3));
  });
  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-x", "0");
    hero.style.setProperty("--hero-y", "0");
  });
}

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

const strategyState = { area: "", stage: "", goal: "" };
const strategyProfiles = { family: "roman", property: "mikhail", business: "konstantin", public: "igor" };
const strategyNames = { roman: "Роман Мишин", mikhail: "Михаил Попов", konstantin: "Константин Воробьёв", igor: "Игорь Черниговский", bogdan: "Богдан Беляев" };
const strategyEvidence = {
  family: "Свидетельства, соглашения, сведения об имуществе и переписку",
  property: "Выписку ЕГРН, договоры, платежи и историю перехода права",
  business: "Договор, первичные документы, переписку и расчёт требований",
  public: "Решение органа, материалы проверки и подтверждение даты получения"
};
const strategySteps = {
  early: "Зафиксировать факты и проверить слабые места до первого действия",
  document: "Записать дату получения и определить срок для ответа или жалобы",
  court: "Собрать материалы дела и выстроить единую доказательную позицию",
  urgent: "Не давать объяснений наугад и немедленно связаться с защитником"
};

function updateStrategyRoom() {
  const completed = Object.values(strategyState).filter(Boolean).length;
  document.querySelector("#strategy-status").textContent = `${completed} / 3`;
  if (completed < 3) return;
  let lawyerKey = strategyProfiles[strategyState.area];
  if (strategyState.stage === "urgent" && strategyState.area === "business") lawyerKey = "bogdan";
  const riskMap = { early: ["УМЕРЕННЫЙ", 38], document: ["ПОВЫШЕННЫЙ", 62], court: ["ВЫСОКИЙ", 78], urgent: ["КРИТИЧЕСКИЙ", 94] };
  const [riskLabel, riskLevel] = riskMap[strategyState.stage];
  const goalSuffix = {
    protect: "; приоритет — сохранить текущее положение",
    recover: "; отдельно подготовить расчёт и доказательства исполнения",
    negotiate: "; определить границы допустимого соглашения",
    appeal: "; проверить основания и процессуальный срок обжалования"
  }[strategyState.goal];
  document.querySelector("#strategy-risk").textContent = riskLabel;
  document.querySelector("#strategy-risk-bar").style.setProperty("--risk-level", `${riskLevel}%`);
  document.querySelector("#strategy-step").textContent = strategySteps[strategyState.stage] + goalSuffix;
  document.querySelector("#strategy-evidence").textContent = strategyEvidence[strategyState.area];
  document.querySelector("#strategy-lawyer").textContent = strategyNames[lawyerKey];
  const profileButton = document.querySelector("#strategy-profile");
  profileButton.disabled = false;
  profileButton.dataset.profileKey = lawyerKey;
  document.querySelector(".strategy-contact").disabled = false;
}

document.querySelectorAll("[data-strategy-area], [data-strategy-stage], [data-strategy-goal]").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.hasAttribute("data-strategy-area") ? "area" : button.hasAttribute("data-strategy-stage") ? "stage" : "goal";
    const value = button.dataset[`strategy${group[0].toUpperCase()}${group.slice(1)}`];
    strategyState[group] = value;
    document.querySelectorAll(`[data-strategy-${group}]`).forEach((item) => item.classList.toggle("active", item === button));
    updateStrategyRoom();
  });
});
document.querySelector("#strategy-profile").addEventListener("click", (event) => {
  if (event.currentTarget.dataset.profileKey) openProfile(event.currentTarget.dataset.profileKey);
});

const dossierStages = {
  risk: { index: "ЭТАП 01 / 04", stamp: "РИСК", title: "Претензия на половину квартиры", text: "Оппонент требовал признать объект совместным и выплатить компенсацию, ссылаясь на вложения в период брака.", metricLabel: "ЦЕНА РИСКА", metric: "12,8 млн ₽" },
  evidence: { index: "ЭТАП 02 / 04", stamp: "ФАКТЫ", title: "Восемь лет движения денег", text: "Мы восстановили источник каждого крупного платежа, связали банковские выписки с договорами и отделили личные средства клиента от общих расходов.", metricLabel: "ИЗУЧЕНО", metric: "146 документов" },
  turn: { index: "ЭТАП 03 / 04", stamp: "ПЕРЕЛОМ", title: "Двойной учёт разрушил расчёт", text: "В модели другой стороны одни и те же вложения учитывались дважды. После сопоставления дат и сумм ключевое доказательство потеряло силу.", metricLabel: "КЛЮЧЕВОЙ ФАКТ", metric: "1 ошибка в расчёте" },
  result: { index: "ЭТАП 04 / 04", stamp: "РЕШЕНО", title: "Требования полностью отклонены", text: "Суд признал раздельный характер приобретения. Квартира осталась у клиента, а с другой стороны взыскали часть судебных расходов.", metricLabel: "РЕЗУЛЬТАТ", metric: "100% актива" }
};
const dossierScene = document.querySelector(".dossier-scene");
document.querySelectorAll("[data-dossier-stage]").forEach((button) => button.addEventListener("click", () => {
  const data = dossierStages[button.dataset.dossierStage];
  document.querySelectorAll("[data-dossier-stage]").forEach((item) => item.classList.toggle("active", item === button));
  dossierScene.classList.add("changing");
  window.setTimeout(() => {
    document.querySelector("#dossier-index").textContent = data.index;
    document.querySelector("#dossier-stamp").textContent = data.stamp;
    document.querySelector("#dossier-title").textContent = data.title;
    document.querySelector("#dossier-text").textContent = data.text;
    document.querySelector("#dossier-metric-label").textContent = data.metricLabel;
    document.querySelector("#dossier-metric").textContent = data.metric;
    dossierScene.classList.remove("changing");
  }, 140);
}));

document.querySelectorAll(".case-toggle").forEach((button) => button.addEventListener("click", () => {
  const row = button.closest(".case-row");
  const story = row.querySelector(".case-story");
  const willOpen = story.hidden;
  document.querySelectorAll(".case-row").forEach((item) => {
    const itemStory = item.querySelector(".case-story");
    const itemButton = item.querySelector(".case-toggle");
    itemStory.hidden = true;
    item.classList.remove("is-open");
    itemButton.setAttribute("aria-expanded", "false");
    itemButton.querySelector("b").textContent = "+";
  });
  if (willOpen) {
    story.hidden = false;
    row.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    button.querySelector("b").textContent = "−";
  }
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

function syncBodyLock() {
  const hasOpenModal = document.querySelector(".profile-modal.open, .consult-modal.open, .matcher-modal.open, .urgent-modal.open");
  body.style.overflow = hasOpenModal ? "hidden" : "";
}

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
  syncBodyLock();
  document.querySelector(".profile-close").focus();
}
function closeProfile() {
  profileModal.classList.remove("open");
  profileModal.setAttribute("aria-hidden", "true");
  syncBodyLock();
}
document.querySelectorAll("[data-lawyer]").forEach((button) => button.addEventListener("click", () => openProfile(button.dataset.lawyer)));
document.querySelectorAll("[data-close-profile]").forEach((element) => element.addEventListener("click", closeProfile));

const consultModal = document.querySelector(".consult-modal");
function openConsult() {
  closeProfile();
  consultModal.classList.add("open");
  consultModal.setAttribute("aria-hidden", "false");
  syncBodyLock();
}
function closeConsult() {
  consultModal.classList.remove("open");
  consultModal.setAttribute("aria-hidden", "true");
  syncBodyLock();
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

const matcherModal = document.querySelector(".matcher-modal");
const matcherContent = document.querySelector("#matcher-content");
const matcherBack = document.querySelector(".matcher-back");
const matcherSteps = [
  {
    label: "ОБЛАСТЬ ВОПРОСА",
    title: "С чем вы столкнулись?",
    text: "Выберите ближайшую тему. На следующем шаге уточним стадию ситуации.",
    key: "area",
    options: [
      ["family", "Семья и личные споры"],
      ["property", "Недвижимость и наследство"],
      ["business", "Бизнес и договоры"],
      ["public", "Государственные органы"]
    ]
  },
  {
    label: "СТАДИЯ СИТУАЦИИ",
    title: "Что уже происходит?",
    text: "Стадия влияет на тактику, сроки и выбор специалиста.",
    key: "stage",
    options: [
      ["planning", "Пока только оцениваю риски"],
      ["document", "Уже получил документ"],
      ["court", "Дело дошло до суда"],
      ["urgent", "Нужны действия сегодня"]
    ]
  },
  {
    label: "ФОРМАТ ПОМОЩИ",
    title: "Какой результат нужен?",
    text: "Это последний вопрос — после него покажем подходящего специалиста.",
    key: "need",
    options: [
      ["advice", "Понять варианты и риски"],
      ["documents", "Подготовить документы"],
      ["negotiation", "Провести переговоры"],
      ["representation", "Вести дело полностью"]
    ]
  }
];
const matcherState = { step: 0, answers: {} };

function updateMatcherChrome() {
  const displayStep = Math.min(matcherState.step + 1, matcherSteps.length);
  document.querySelector("#matcher-count").textContent = String(displayStep).padStart(2, "0");
  document.querySelectorAll(".matcher-progress i").forEach((bar, index) => bar.classList.toggle("active", index <= matcherState.step));
  matcherBack.hidden = false;
  matcherBack.textContent = matcherState.step === 0 ? "← К сайту" : "← Назад";
}

function chooseMatchedLawyer() {
  if (matcherState.answers.area === "family") return "roman";
  if (matcherState.answers.area === "property") return "mikhail";
  if (matcherState.answers.area === "public") return "igor";
  return matcherState.answers.stage === "urgent" ? "bogdan" : "konstantin";
}

function renderMatcherResult() {
  const key = chooseMatchedLawyer();
  const profile = profiles[key];
  matcherBack.hidden = false;
  const result = document.createElement("div");
  result.className = "matcher-result";

  const imageWrap = document.createElement("div");
  imageWrap.className = "matcher-result-image";
  const image = document.createElement("img");
  image.src = profile.image;
  image.alt = profile.name;
  imageWrap.appendChild(image);

  const copy = document.createElement("div");
  const label = document.createElement("small");
  label.textContent = "РЕКОМЕНДУЕМЫЙ СПЕЦИАЛИСТ";
  const title = document.createElement("h2");
  title.textContent = profile.name;
  const paragraph = document.createElement("p");
  paragraph.textContent = `${profile.focus} · ${profile.experience} опыта. Подключится к первичному разбору и определит практический следующий шаг.`;
  copy.append(label, title, paragraph);

  const list = document.createElement("ul");
  ["Проверит сроки и слабые места позиции", "Составит план действий по этапам", "Заранее обозначит формат и стоимость работы"].forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  const actions = document.createElement("div");
  actions.className = "matcher-result-actions";
  const profileButton = document.createElement("button");
  profileButton.type = "button";
  profileButton.textContent = "Открыть профиль ↗";
  profileButton.addEventListener("click", () => {
    closeMatcher();
    openProfile(key);
  });
  const consultButton = document.createElement("button");
  consultButton.type = "button";
  consultButton.textContent = "Связаться";
  consultButton.addEventListener("click", () => {
    closeMatcher();
    openConsult();
  });
  actions.append(profileButton, consultButton);
  copy.append(list, actions);
  result.append(imageWrap, copy);
  matcherContent.replaceChildren(result);
}

function renderMatcherStep() {
  updateMatcherChrome();
  if (matcherState.step >= matcherSteps.length) {
    renderMatcherResult();
    return;
  }
  const data = matcherSteps[matcherState.step];
  const step = document.createElement("div");
  step.className = "matcher-step";
  const label = document.createElement("small");
  label.textContent = data.label;
  const title = document.createElement("h2");
  title.id = "matcher-title";
  title.textContent = data.title;
  const text = document.createElement("p");
  text.textContent = data.text;
  const options = document.createElement("div");
  options.className = "matcher-options";
  data.options.forEach(([value, optionLabel]) => {
    const button = document.createElement("button");
    button.type = "button";
    const strong = document.createElement("strong");
    strong.textContent = optionLabel;
    const arrow = document.createElement("span");
    arrow.textContent = "↗";
    button.append(strong, arrow);
    button.addEventListener("click", () => {
      matcherState.answers[data.key] = value;
      matcherState.step += 1;
      renderMatcherStep();
    });
    options.appendChild(button);
  });
  step.append(label, title, text, options);
  matcherContent.replaceChildren(step);
}

function openMatcher() {
  closeProfile();
  closeConsult();
  closeUrgent();
  toggleChat(false);
  matcherState.step = 0;
  matcherState.answers = {};
  renderMatcherStep();
  matcherModal.classList.add("open");
  matcherModal.setAttribute("aria-hidden", "false");
  syncBodyLock();
  window.setTimeout(() => matcherModal.querySelector(".matcher-close").focus(), 100);
}
function closeMatcher() {
  matcherModal.classList.remove("open");
  matcherModal.setAttribute("aria-hidden", "true");
  syncBodyLock();
}
matcherBack.addEventListener("click", () => {
  if (matcherState.step === 0) {
    closeMatcher();
    return;
  }
  matcherState.step = Math.max(0, matcherState.step - 1);
  renderMatcherStep();
});
document.querySelectorAll("[data-open-match]").forEach((button) => button.addEventListener("click", openMatcher));
document.querySelectorAll("[data-close-match]").forEach((element) => element.addEventListener("click", closeMatcher));

const chat = document.querySelector(".chat");
const chatLauncher = document.querySelector(".chat-launcher");
const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.querySelector(".chat-form input");
const chatSuggestions = document.querySelector(".chat-suggestions");
const chatScenarios = {
  welcome: {
    title: "С чего начнём?",
    text: "Выберите тему слева или коротко опишите ситуацию. Я задам несколько уточняющих вопросов и подскажу, какие документы собрать и к кому обратиться.",
    bullets: ["Без регистрации", "Без отправки данных на сервер", "Ответ за пару шагов"],
    choices: [
      { label: "Семейный спор", action: "family" },
      { label: "Вопрос бизнеса", action: "business" },
      { label: "Нужен документ", action: "documents" }
    ]
  },
  family: {
    title: "Семья и дети",
    text: "Уточните, вокруг чего возник спор. Это поможет определить первые действия и набор документов.",
    choices: [
      { label: "Развод", action: "family-divorce" },
      { label: "Раздел имущества", action: "family-assets" },
      { label: "Спор о детях", action: "family-children" },
      { label: "Алименты", action: "family-alimony" }
    ]
  },
  "family-divorce": {
    title: "Расторжение брака",
    text: "Порядок зависит от наличия общих несовершеннолетних детей, согласия второго супруга и сопутствующих требований.",
    bullets: ["Подготовьте свидетельство о браке", "Запишите данные и даты рождения детей", "Решите, заявлять ли раздел имущества отдельно"],
    lawyer: { key: "roman", name: "Роман Мишин", role: "Семейные споры" },
    choices: [{ label: "Есть спор о детях", action: "family-children" }, { label: "Скачать форму заявления", href: "assets/documents/divorce-application.txt", download: true }, { label: "Как связаться?", action: "contacts" }]
  },
  "family-assets": {
    title: "Раздел имущества",
    text: "Сначала нужно отделить совместное имущество от личного и зафиксировать, когда и на какие средства приобретён каждый актив.",
    bullets: ["Правоустанавливающие документы", "Выписки и подтверждения платежей", "Кредитные договоры", "Сведения о брачном договоре или соглашениях"],
    lawyer: { key: "roman", name: "Роман Мишин", role: "Семейные и имущественные споры" },
    choices: [{ label: "Есть недвижимость", action: "property-housing" }, { label: "Имущество могут продать", action: "urgent-assets" }, { label: "Записаться на разбор", action: "contacts" }]
  },
  "family-children": {
    title: "Спор о детях",
    text: "В таких делах суд оценивает интересы ребёнка, фактический порядок общения и условия у каждого родителя.",
    bullets: ["Не вовлекайте ребёнка в переписку сторон", "Сохраните подтверждения участия в воспитании", "Зафиксируйте текущий порядок общения", "Соберите документы об условиях проживания"],
    lawyer: { key: "roman", name: "Роман Мишин", role: "Семейные споры" },
    choices: [{ label: "Определить место жительства", action: "family-children-home" }, { label: "Установить порядок общения", action: "family-children-contact" }, { label: "Связаться с юристом", action: "contacts" }]
  },
  "family-children-home": { title: "Место жительства ребёнка", text: "Для первичной оценки важны возраст ребёнка, фактическое проживание, участие каждого родителя и наличие уже принятых судебных решений.", bullets: ["Справки о проживании и обучении", "Характеристики и медицинские документы", "Подтверждения расходов и участия в жизни ребёнка"], lawyer: { key: "roman", name: "Роман Мишин", role: "Семейные споры" }, choices: [{ label: "Записаться на консультацию", action: "contacts" }] },
  "family-children-contact": { title: "Порядок общения", text: "Предложите реалистичный график с учётом учёбы, отдыха и расстояния. Переписка с попытками договориться может иметь значение.", bullets: ["Сохраните спокойную переписку", "Подготовьте конкретный график", "Не нарушайте действующее решение суда"], lawyer: { key: "roman", name: "Роман Мишин", role: "Семейные споры" }, choices: [{ label: "Записаться на консультацию", action: "contacts" }] },
  "family-alimony": { title: "Алименты", text: "Нужно определить форму взыскания: доля от дохода, твёрдая сумма или их сочетание.", bullets: ["Свидетельство о рождении ребёнка", "Сведения о доходах и расходах", "Подтверждение расходов на ребёнка", "Ранее заключённые соглашения"], lawyer: { key: "mikhail", name: "Михаил Попов", role: "Частное право" }, choices: [{ label: "Есть задолженность", action: "family-alimony-debt" }, { label: "Связаться", action: "contacts" }] },
  "family-alimony-debt": { title: "Задолженность по алиментам", text: "Запросите у пристава постановление с расчётом задолженности и проверьте период, доходы и учтённые платежи.", bullets: ["Постановление пристава", "Банковские выписки", "Исполнительный документ", "Переписка о платежах"], lawyer: { key: "mikhail", name: "Михаил Попов", role: "Частное право" }, choices: [{ label: "Связаться", action: "contacts" }] },
  property: {
    title: "Недвижимость и наследство",
    text: "Выберите наиболее близкую ситуацию.",
    choices: [{ label: "Наследство", action: "property-inheritance" }, { label: "Жилищный спор", action: "property-housing" }, { label: "Проверка сделки", action: "property-deal" }]
  },
  "property-inheritance": { title: "Наследственное дело", text: "Ключевое значение имеют дата смерти наследодателя, шестимесячный срок, степень родства и наличие завещания.", bullets: ["Свидетельство о смерти", "Документы о родстве", "Завещание, если оно есть", "Документы на имущество", "Материалы наследственного дела у нотариуса"], lawyer: { key: "mikhail", name: "Михаил Попов", role: "Наследство и недвижимость" }, choices: [{ label: "Срок пропущен", action: "property-inheritance-late" }, { label: "Оспаривают завещание", action: "property-inheritance-will" }, { label: "Связаться", action: "contacts" }] },
  "property-inheritance-late": { title: "Пропущен срок наследования", text: "Не откладывайте: возможность восстановить срок зависит от причины пропуска и времени, прошедшего после того, как причина отпала.", bullets: ["Запишите точные даты", "Соберите подтверждение уважительной причины", "Не совершайте действий с имуществом без оценки последствий"], lawyer: { key: "mikhail", name: "Михаил Попов", role: "Наследственные споры" }, choices: [{ label: "Срочно связаться", action: "contacts" }] },
  "property-inheritance-will": { title: "Спор о завещании", text: "Нужны само завещание, медицинские сведения и факты его составления. Свидетельские показания без документов редко дают полную картину.", bullets: ["Запросите материалы у нотариуса", "Сохраните медицинские документы", "Составьте список свидетелей и событий"], lawyer: { key: "mikhail", name: "Михаил Попов", role: "Наследственные споры" }, choices: [{ label: "Связаться", action: "contacts" }] },
  "property-housing": { title: "Жилищный или земельный спор", text: "Для оценки важно понять, кто зарегистрирован, кому принадлежит объект и на каком основании им пользуются стороны.", bullets: ["Выписка из ЕГРН", "Договор или решение о предоставлении жилья", "Сведения о регистрации", "Квитанции и переписка"], lawyer: { key: "mikhail", name: "Михаил Попов", role: "Недвижимость" }, choices: [{ label: "Право собственности", action: "property-deal" }, { label: "Связаться", action: "contacts" }] },
  "property-deal": { title: "Сделка с недвижимостью", text: "До подписания проверьте собственника, ограничения, основания приобретения, зарегистрированных жильцов и полномочия представителя.", bullets: ["Свежая выписка из ЕГРН", "Предыдущий договор", "Согласия супруга и органов опеки, если нужны", "Проект договора и порядок расчётов"], lawyer: { key: "mikhail", name: "Михаил Попов", role: "Недвижимость" }, choices: [{ label: "Проверить документы", action: "contacts" }] },
  business: {
    title: "Бизнес и договоры",
    text: "Выберите тип задачи. Если уже получена претензия или определение суда, укажите дату получения.",
    choices: [{ label: "Не платит контрагент", action: "business-debt" }, { label: "Корпоративный конфликт", action: "business-corporate" }, { label: "Проверка или обыск", action: "business-crisis" }, { label: "Проверить договор", action: "business-contract" }]
  },
  "business-debt": { title: "Взыскание задолженности", text: "Нужно подтвердить договор, исполнение вашей части обязательств, размер долга и соблюдение претензионного порядка.", bullets: ["Договор и приложения", "Накладные, акты, УПД", "Платежи и акт сверки", "Переписка и претензия"], lawyer: { key: "konstantin", name: "Константин Воробьёв", role: "Арбитражные споры" }, choices: [{ label: "Скачать претензию", href: "assets/documents/pretrial-claim.txt", download: true }, { label: "Имущество выводят", action: "urgent-assets" }, { label: "Связаться", action: "contacts" }] },
  "business-corporate": { title: "Корпоративный конфликт", text: "Не совершайте резких действий с реестрами, счетами и документами до фиксации текущего положения.", bullets: ["Устав и корпоративный договор", "Протоколы и решения", "Выписка ЕГРЮЛ", "Переписка участников", "Данные об активах и обязательствах"], lawyer: { key: "konstantin", name: "Константин Воробьёв", role: "Корпоративные споры" }, choices: [{ label: "Есть риск потери контроля", action: "urgent-assets" }, { label: "Связаться", action: "contacts" }] },
  "business-crisis": { title: "Проверка, допрос или обыск", text: "Не препятствуйте законным действиям, не давайте объяснения наугад и не подписывайте документ, который не прочитан полностью.", bullets: ["Уточните орган и основание действий", "Зафиксируйте данные должностных лиц", "Позвоните защитнику", "Сохраните копии всех вручённых документов"], lawyer: { key: "bogdan", name: "Богдан Беляев", role: "Кризисная защита бизнеса" }, choices: [{ label: "Позвонить сейчас", href: "tel:+79832439690" }, { label: "Получена повестка", action: "urgent-summons" }] },
  "business-contract": { title: "Проверка договора", text: "Для полезной проверки нужно понимать не только текст, но и цель сделки: деньги, сроки, порядок приёмки и реальный худший сценарий.", bullets: ["Проект договора", "Техническое задание или спецификация", "Переписка об условиях", "Реквизиты и роль контрагента"], lawyer: { key: "konstantin", name: "Константин Воробьёв", role: "Договорная работа" }, choices: [{ label: "Отправить на проверку", action: "contacts" }] },
  public: {
    title: "Штрафы, налоги и ведомства",
    text: "Срок обжалования часто начинает течь с даты получения документа. Выберите ситуацию.",
    choices: [{ label: "Налоговая проверка", action: "public-tax" }, { label: "Штраф или постановление", action: "public-fine" }, { label: "Отказ ведомства", action: "public-agency" }]
  },
  "public-tax": { title: "Налоговая проверка", text: "Соберите требование, акт, приложения и подтверждение даты получения. Ответ должен учитывать не только документы, но и реальную хозяйственную операцию.", bullets: ["Требования и ответы на них", "Акт и материалы проверки", "Договоры и первичные документы", "Деловая переписка"], lawyer: { key: "igor", name: "Игорь Черниговский", role: "Налоговые споры" }, choices: [{ label: "Уже получен акт", action: "public-tax-act" }, { label: "Связаться", action: "contacts" }] },
  "public-tax-act": { title: "Получен акт проверки", text: "Запишите дату вручения и срок для возражений. Сначала соберите полный комплект приложений к акту, затем готовьте единую позицию по эпизодам.", bullets: ["Не отвечайте фрагментарно", "Проверьте расчёт доначислений", "Сопоставьте выводы с первичными документами"], lawyer: { key: "igor", name: "Игорь Черниговский", role: "Налоговые споры" }, choices: [{ label: "Срочно связаться", action: "contacts" }] },
  "public-fine": { title: "Штраф или постановление", text: "Для оценки нужны полный текст постановления, протокол, доказательства органа и дата получения копии.", bullets: ["Не пропустите срок обжалования", "Сохраните конверт или электронное уведомление", "Зафиксируйте свои доказательства"], lawyer: { key: "igor", name: "Игорь Черниговский", role: "Административное право" }, choices: [{ label: "Связаться", action: "contacts" }] },
  "public-agency": { title: "Отказ государственного органа", text: "Нужны ваше первоначальное обращение, отказ, доказательство подачи и документы, на которые вы ссылались.", bullets: ["Проверьте порядок обжалования", "Зафиксируйте дату получения", "Не подавайте противоречащие друг другу обращения"], lawyer: { key: "igor", name: "Игорь Черниговский", role: "Публичное право" }, choices: [{ label: "Связаться", action: "contacts" }] },
  documents: {
    title: "Подготовка документа",
    text: "Можно скачать базовую заготовку. Перед подачей её нужно адаптировать под факты, подсудность и актуальные требования.",
    choices: [{ label: "Досудебная претензия", action: "document-claim" }, { label: "Исковое заявление", action: "document-lawsuit" }, { label: "Заявление о разводе", action: "document-divorce" }, { label: "Доверенность", action: "document-power" }]
  },
  "document-claim": { title: "Досудебная претензия", text: "Укажите договор, нарушение, точный расчёт и срок исполнения. Проверьте, установлен ли обязательный претензионный порядок.", bullets: ["Факты по датам", "Ссылка на договор", "Конкретное требование", "Расчёт и приложения"], choices: [{ label: "Скачать шаблон", href: "assets/documents/pretrial-claim.txt", download: true }, { label: "Проверить у юриста", action: "contacts" }] },
  "document-lawsuit": { title: "Исковое заявление", text: "До подготовки иска нужно определить надлежащий суд, ответчика, требования и доказательства направления документов участникам.", bullets: ["Подсудность", "Цена иска", "Госпошлина", "Доказательства", "Приложения"], choices: [{ label: "Скачать структуру", href: "assets/documents/statement-of-claim.txt", download: true }, { label: "Проверить у юриста", action: "contacts" }] },
  "document-divorce": { title: "Заявление о разводе", text: "Форма подходит как черновик для простой ситуации. Если есть спор о детях или имуществе, требования и подсудность могут измениться.", choices: [{ label: "Скачать форму", href: "assets/documents/divorce-application.txt", download: true }, { label: "Есть спор о детях", action: "family-children" }] },
  "document-power": { title: "Доверенность", text: "Проверьте личные данные, срок, передоверие и специальные полномочия. Для ряда действий потребуется нотариальное удостоверение.", choices: [{ label: "Скачать чек-лист", href: "assets/documents/power-of-attorney-checklist.txt", download: true }, { label: "Проверить полномочия", action: "contacts" }] },
  urgent: {
    title: "Срочная ситуация",
    text: "Если человеку угрожает опасность — звоните 112. Для правовой ситуации выберите наиболее близкий вариант.",
    choices: [{ label: "Обыск или задержание", action: "business-crisis" }, { label: "Повестка или вызов", action: "urgent-summons" }, { label: "Имущество могут продать", action: "urgent-assets" }, { label: "Истекает срок", action: "urgent-deadline" }]
  },
  "urgent-summons": { title: "Повестка или вызов", text: "Не игнорируйте документ. Зафиксируйте, кто вызывает, в каком статусе, куда и когда нужно явиться. До разговора по существу согласуйте позицию с юристом.", bullets: ["Сфотографируйте повестку полностью", "Не обсуждайте детали дела по телефону", "Подготовьте удостоверение личности", "Уточните возможность участия защитника"], lawyer: { key: "bogdan", name: "Богдан Беляев", role: "Кризисная защита" }, choices: [{ label: "Позвонить сейчас", href: "tel:+79832439690" }] },
  "urgent-assets": { title: "Риск вывода или продажи имущества", text: "Скорость имеет значение: иногда защитить результат можно обеспечительными мерами, но для этого нужны доказательства риска.", bullets: ["Соберите документы на актив", "Сохраните угрозы и переписку", "Проверьте сведения в реестрах", "Не предупреждайте вторую сторону о каждом шаге"], lawyer: { key: "konstantin", name: "Константин Воробьёв", role: "Обеспечительные меры" }, choices: [{ label: "Позвонить сейчас", href: "tel:+79832439690" }] },
  "urgent-deadline": { title: "Истекает процессуальный срок", text: "Запишите точную дату получения документа и способ доставки. Сохраните конверт, уведомление или скриншот личного кабинета.", bullets: ["Определите вид документа", "Проверьте порядок исчисления срока", "Не ждите последнего дня для подачи"], choices: [{ label: "Позвонить сейчас", href: "tel:+79832439690" }, { label: "Написать на почту", href: "mailto:cxsuiemode@gmail.com" }] },
  contacts: { title: "Связаться с фирмой", text: "Позвоните по номеру +7 983 243-96-90 или напишите на cxsuiemode@gmail.com. Коротко укажите тему, важные даты и какие документы уже есть.", choices: [{ label: "Позвонить", href: "tel:+79832439690" }, { label: "Написать письмо", href: "mailto:cxsuiemode@gmail.com" }] },
  pricing: { title: "Стоимость работы", text: "Цена зависит от объёма документов, срочности и стадии дела. После первичного разбора фирма называет стоимость конкретного этапа до начала работы.", choices: [{ label: "Запросить оценку", action: "contacts" }] },
  fallback: { title: "Нужно немного уточнить", text: "Я не хочу угадывать. Выберите тему слева или напишите, кто участвует в споре, что уже произошло и есть ли документ с установленным сроком.", choices: [{ label: "Семья", action: "family" }, { label: "Недвижимость", action: "property" }, { label: "Бизнес", action: "business" }, { label: "Ведомства", action: "public" }] }
};

function toggleChat(force) {
  const open = typeof force === "boolean" ? force : !chat.classList.contains("open");
  chat.classList.toggle("open", open);
  chat.setAttribute("aria-hidden", String(!open));
  chatLauncher.setAttribute("aria-expanded", String(open));
  body.classList.toggle("chat-active", open);
  if (open) setTimeout(() => chatInput.focus(), 120);
}
function getChatTime() {
  return new Intl.DateTimeFormat("ru", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}
function addChatMessage(content, type) {
  const wrapper = document.createElement("div");
  wrapper.className = `${type}-message`;
  if (type === "bot") {
    const avatar = document.createElement("span");
    avatar.className = "chat-avatar";
    avatar.textContent = "П";
    wrapper.appendChild(avatar);
  }
  const bodyElement = document.createElement("div");
  bodyElement.className = "message-body";
  const card = document.createElement("div");
  card.className = "message-card";
  if (typeof content === "string") {
    const paragraph = document.createElement("p");
    paragraph.textContent = content;
    card.appendChild(paragraph);
  } else {
    if (content.title) {
      const title = document.createElement("strong");
      title.textContent = content.title;
      card.appendChild(title);
    }
    const paragraph = document.createElement("p");
    paragraph.textContent = content.text;
    card.appendChild(paragraph);
    if (content.bullets?.length) {
      const list = document.createElement("ul");
      content.bullets.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });
      card.appendChild(list);
    }
  }
  bodyElement.appendChild(card);
  if (type === "bot" && content.lawyer) {
    const recommendation = document.createElement("div");
    recommendation.className = "lawyer-recommendation";
    const info = document.createElement("div");
    const label = document.createElement("small");
    label.textContent = "ПОДХОДЯЩИЙ СПЕЦИАЛИСТ";
    const name = document.createElement("strong");
    name.textContent = `${content.lawyer.name} · ${content.lawyer.role}`;
    info.append(label, name);
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Профиль ↗";
    button.addEventListener("click", () => {
      toggleChat(false);
      openProfile(content.lawyer.key);
    });
    recommendation.append(info, button);
    bodyElement.appendChild(recommendation);
  }
  const time = document.createElement("small");
  time.className = "message-time";
  time.textContent = getChatTime();
  bodyElement.appendChild(time);
  wrapper.appendChild(bodyElement);
  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function renderChatChoices(choices = []) {
  chatSuggestions.replaceChildren();
  choices.forEach((choice) => {
    if (choice.href) {
      const link = document.createElement("a");
      link.href = choice.href;
      link.textContent = choice.label;
      if (choice.download) link.setAttribute("download", "");
      chatSuggestions.appendChild(link);
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice.label;
    button.addEventListener("click", () => runChatScenario(choice.action, choice.label));
    chatSuggestions.appendChild(button);
  });
}
function scenarioFromText(message) {
  const text = message.toLocaleLowerCase("ru");
  if (/обыск|задержа|допрос|следоват/.test(text)) return "business-crisis";
  if (/повест|вызыва/.test(text)) return "urgent-summons";
  if (/срок|сегодня|завтра|сроч/.test(text)) return "urgent";
  if (/алимент/.test(text)) return "family-alimony";
  if (/ребен|ребён|общени|место житель/.test(text)) return "family-children";
  if (/развод|расторжен.*брак/.test(text)) return "family-divorce";
  if (/раздел.*имуще|совместн.*имуще/.test(text)) return "family-assets";
  if (/сем|супруг|брак/.test(text)) return "family";
  if (/наслед|завещ/.test(text)) return "property-inheritance";
  if (/квартир|дом|земл|жиль|недвиж/.test(text)) return "property-housing";
  if (/долг|не плат|взыск|постав/.test(text)) return "business-debt";
  if (/договор|контракт/.test(text)) return "business-contract";
  if (/участник|директор|корпоратив|компан|бизнес/.test(text)) return "business";
  if (/налог|фнс|доначис/.test(text)) return "public-tax";
  if (/штраф|постановлен/.test(text)) return "public-fine";
  if (/ведом|администр|отказ.*орган/.test(text)) return "public";
  if (/доверен/.test(text)) return "document-power";
  if (/иск/.test(text)) return "document-lawsuit";
  if (/претенз/.test(text)) return "document-claim";
  if (/документ|заявлен/.test(text)) return "documents";
  if (/цен|стоим|сколько|оплат/.test(text)) return "pricing";
  if (/телефон|почт|контакт|связ/.test(text)) return "contacts";
  return "fallback";
}
function runChatScenario(key, userLabel = "") {
  const scenario = chatScenarios[key] || chatScenarios.fallback;
  if (userLabel) addChatMessage(userLabel, "user");
  document.querySelectorAll("[data-chat-topic]").forEach((button) => button.classList.toggle("active", button.dataset.chatTopic === key));
  renderChatChoices([]);
  setTimeout(() => {
    addChatMessage(scenario, "bot");
    renderChatChoices(scenario.choices);
  }, userLabel ? 280 : 0);
}
function submitChat(message) {
  const clean = message.trim();
  if (!clean) return;
  addChatMessage(clean, "user");
  chatInput.value = "";
  renderChatChoices([]);
  const key = scenarioFromText(clean);
  setTimeout(() => {
    const scenario = chatScenarios[key];
    addChatMessage(scenario, "bot");
    renderChatChoices(scenario.choices);
  }, 350);
}
function resetChat() {
  chatMessages.replaceChildren();
  document.querySelectorAll("[data-chat-topic]").forEach((button) => button.classList.remove("active"));
  runChatScenario("welcome");
}

const urgentModal = document.querySelector(".urgent-modal");
function openUrgent() {
  closeProfile();
  closeConsult();
  closeMatcher();
  toggleChat(false);
  urgentModal.classList.add("open");
  urgentModal.setAttribute("aria-hidden", "false");
  syncBodyLock();
  window.setTimeout(() => urgentModal.querySelector(".urgent-close").focus(), 100);
}
function closeUrgent() {
  urgentModal.classList.remove("open");
  urgentModal.setAttribute("aria-hidden", "true");
  syncBodyLock();
}
document.querySelectorAll("[data-open-urgent]").forEach((button) => button.addEventListener("click", openUrgent));
document.querySelectorAll("[data-close-urgent]").forEach((element) => element.addEventListener("click", closeUrgent));
document.querySelectorAll("[data-urgent-scenario]").forEach((button) => button.addEventListener("click", () => {
  const scenario = button.dataset.urgentScenario;
  const label = button.querySelector("strong").textContent;
  closeUrgent();
  toggleChat(true);
  runChatScenario(scenario, label);
}));

chatLauncher.addEventListener("click", () => toggleChat());
document.querySelectorAll("[data-open-chat]").forEach((button) => button.addEventListener("click", () => toggleChat(true)));
document.querySelector(".chat-close").addEventListener("click", () => toggleChat(false));
document.querySelector(".chat-reset").addEventListener("click", resetChat);
document.querySelectorAll("[data-chat-topic]").forEach((button) => button.addEventListener("click", () => runChatScenario(button.dataset.chatTopic, button.textContent.trim().replace(/^\d+\s*/, ""))));
document.querySelector(".chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  submitChat(chatInput.value);
});
resetChat();

const contactForm = document.querySelector("#contact-form");
const phoneInput = document.querySelector("#contact-phone");
const topicPicker = document.querySelector("[data-topic-picker]");
const topicTrigger = topicPicker.querySelector(".topic-trigger");
const topicOptions = topicPicker.querySelector(".topic-options");
const topicInput = document.querySelector("#contact-topic");
const topicLabel = topicPicker.querySelector("[data-topic-label]");
let phoneTouched = false;

function normalizePhone(value) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;
  return digits.slice(0, 11);
}
function formatPhone(value) {
  const subscriber = normalizePhone(value).slice(1);
  if (!subscriber) return "+7";
  let formatted = `+7 (${subscriber.slice(0, 3)}`;
  if (subscriber.length >= 3) formatted += ")";
  if (subscriber.length > 3) formatted += ` ${subscriber.slice(3, 6)}`;
  if (subscriber.length > 6) formatted += `-${subscriber.slice(6, 8)}`;
  if (subscriber.length > 8) formatted += `-${subscriber.slice(8, 10)}`;
  return formatted;
}
function updatePhoneValidity() {
  const complete = normalizePhone(phoneInput.value).length === 11;
  phoneInput.setCustomValidity(complete ? "" : "Введите номер полностью: +7 (999) 999-99-99");
  phoneInput.setAttribute("aria-invalid", String(phoneTouched && !complete));
  return complete;
}
phoneInput.value = formatPhone(phoneInput.value);
updatePhoneValidity();
phoneInput.addEventListener("input", () => {
  phoneInput.value = formatPhone(phoneInput.value);
  phoneTouched = phoneInput.value.length > 2;
  updatePhoneValidity();
  window.requestAnimationFrame(() => phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length));
});
phoneInput.addEventListener("focus", () => {
  window.requestAnimationFrame(() => phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length));
});
phoneInput.addEventListener("blur", () => {
  phoneTouched = true;
  updatePhoneValidity();
});
phoneInput.addEventListener("keydown", (event) => {
  if (event.key !== "Backspace" && event.key !== "Delete") return;
  event.preventDefault();
  const subscriber = normalizePhone(phoneInput.value).slice(1);
  if (!subscriber) return;
  phoneInput.value = formatPhone(`7${subscriber.slice(0, -1)}`);
  phoneTouched = phoneInput.value.length > 2;
  updatePhoneValidity();
  window.requestAnimationFrame(() => phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length));
});

function setTopicPickerOpen(open) {
  topicPicker.classList.toggle("open", open);
  topicOptions.hidden = !open;
  topicTrigger.setAttribute("aria-expanded", String(open));
}
function selectTopic(option) {
  const value = option.dataset.topicOption;
  topicInput.value = value;
  topicLabel.textContent = value;
  topicOptions.querySelectorAll("[data-topic-option]").forEach((item) => item.setAttribute("aria-selected", String(item === option)));
  setTopicPickerOpen(false);
  topicTrigger.focus();
}
topicTrigger.addEventListener("click", () => setTopicPickerOpen(topicOptions.hidden));
topicTrigger.addEventListener("keydown", (event) => {
  if (!["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) return;
  event.preventDefault();
  setTopicPickerOpen(true);
  const selected = topicOptions.querySelector('[aria-selected="true"]');
  (selected || topicOptions.querySelector("button")).focus();
});
topicOptions.querySelectorAll("[data-topic-option]").forEach((option, index, options) => {
  option.addEventListener("click", () => selectTopic(option));
  option.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setTopicPickerOpen(false);
      topicTrigger.focus();
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      options[(index + (event.key === "ArrowDown" ? 1 : options.length - 1)) % options.length].focus();
    }
  });
});
document.addEventListener("pointerdown", (event) => {
  if (!topicPicker.contains(event.target)) setTopicPickerOpen(false);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  phoneTouched = true;
  if (!updatePhoneValidity()) {
    phoneInput.reportValidity();
    phoneInput.focus();
    return;
  }
  const data = new FormData(event.currentTarget);
  const subject = `Обращение с сайта: ${data.get("topic")}`;
  const message = `Имя: ${data.get("name")}\nТелефон: ${data.get("phone")}\nТема: ${data.get("topic")}\n\n${data.get("message") || "Описание не указано"}`;
  window.location.href = `mailto:cxsuiemode@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeProfile();
  closeConsult();
  closeMatcher();
  closeUrgent();
  toggleChat(false);
});
