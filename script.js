const body = document.body;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.documentElement.classList.add("page-ready");

const profiles = {
  roman: {
    role: "УПРАВЛЯЮЩИЙ ПАРТНЁР", name: "Роман Артурович Мишин",
    image: "assets/images/roman-mishin.webp", experience: "15 лет", focus: "Судебная стратегия",
    lead: "Ведёт сложные частные споры и отвечает за судебную стратегию фирмы. Подключается к делам, где нужно одновременно удержать юридическую позицию и найти практичный выход из конфликта.",
    list: ["Раздел активов и семейные конфликты", "Споры о недвижимости и собственности", "Переговоры до суда и мировые соглашения", "Апелляционное и кассационное обжалование"],
    quote: "Хорошая стратегия начинается не с обещания победы, а с честного разбора слабых мест дела."
  },
  bogdan: {
    role: "ПАРТНЁР", name: "Беляев Богдан Денисович",
    image: "assets/images/bogdan-belyaev.webp", experience: "11 лет", focus: "Защита бизнеса",
    lead: "Специализируется на кризисных ситуациях для собственников и руководителей. Координирует защиту при проверках, процессуальных действиях и корпоративных конфликтах.",
    list: ["Уголовно-правовые риски бизнеса", "Сопровождение проверок и допросов", "Защита руководителей и собственников", "Внутренние расследования"],
    quote: "В кризисе важны первые часы: нужно сохранить документы, контроль и пространство для решений."
  },
  konstantin: {
    role: "СТАРШИЙ ЮРИСТ", name: "Воробьёв Константин Дмитриевич",
    image: "assets/images/konstantin-vorobyev.webp", experience: "9 лет", focus: "Арбитраж",
    lead: "Представляет компании в договорных и корпоративных спорах. Работает с технически сложными доказательствами и выстраивает позицию вокруг экономики конфликта.",
    list: ["Взыскание задолженности и убытков", "Корпоративные и партнёрские споры", "Строительный подряд и поставка", "Обеспечительные меры"],
    quote: "Судебный спор — это продолжение деловых переговоров другими средствами. Целью должен быть полезный результат, а не сам процесс."
  },
  igor: {
    role: "РУКОВОДИТЕЛЬ ПРАКТИКИ", name: "Черниговский Игорь Александрович",
    image: "assets/images/igor-chernigovskii.webp", experience: "12 лет", focus: "Публичное право",
    lead: "Работает на стыке административного и налогового права. Оспаривает решения ведомств и сопровождает бизнес в спорах с контролирующими органами.",
    list: ["Налоговые проверки и доначисления", "Обжалование решений ведомств", "Административные правонарушения", "Лицензии и специальные разрешения"],
    quote: "Государственный орган — сильная сторона спора, но его решение обязано быть законным и доказанным."
  },
  mikhail: {
    role: "ЮРИСТ", name: "Попов Михаил Денисович",
    image: "assets/images/mihail-popov.webp", experience: "7 лет", focus: "Частное право",
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
new IntersectionObserver(([entry]) => body.classList.toggle("near-hero", entry.isIntersecting))
  .observe(document.querySelector(".hero"));
const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector("#main-nav");
function setNavigationOpen(open) {
  header.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
}
menuButton.addEventListener("click", () => setNavigationOpen(!header.classList.contains("menu-open")));
header.addEventListener("click", event => {
  if (event.target.closest("a, .urgent-trigger")) setNavigationOpen(false);
});
document.addEventListener("pointerdown", event => {
  if (header.classList.contains("menu-open") && !header.contains(event.target)) setNavigationOpen(false);
});
document.addEventListener("focusin", event => {
  if (header.classList.contains("menu-open") && !header.contains(event.target)) setNavigationOpen(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && header.classList.contains("menu-open")) {
    setNavigationOpen(false);
    menuButton.focus({ preventScroll:true });
  }
});
matchMedia("(min-width: 1161px)").addEventListener("change", () => setNavigationOpen(false));

const chapterLinks = [...mainNav.querySelectorAll("a")];
const chapterObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const link = chapterLinks.find(item => item.hash === "#" + entry.target.id);
    if (entry.isIntersecting) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}, {rootMargin:"-20% 0px -79% 0px"});
chapterLinks.forEach(link => chapterObserver.observe(document.querySelector(link.hash)));

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

  });
  if (willOpen) {
    story.hidden = false;
    row.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");

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
  const activeModal = document.querySelector(".profile-modal.open, .urgent-modal.open");
  body.style.overflow = activeModal ? "hidden" : "";
  document.querySelectorAll("body > header, body > main, body > footer, body > nav, .chat-launcher, .chat, .skip-link, .profile-modal, .urgent-modal").forEach((node) => {
    node.inert = Boolean(activeModal && node !== activeModal);
  });
}

let profileReturnFocus;
const profileModal = document.querySelector(".profile-modal");
function openProfile(key, includeRoute = false) {
  const profile = profiles[key];
  if (!profile) return;
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
  populateProfileFile(key);
  profileConsult.dataset.includeRoute = String(includeRoute);
  if (!profileModal.classList.contains("open")) profileReturnFocus = document.activeElement;
  profileModal.classList.add("open");
  profileModal.setAttribute("aria-hidden", "false");
  syncBodyLock();
  document.querySelector(".profile-panel").scrollTop = 0;
  document.querySelector(".profile-close").focus({ preventScroll: true });
}
function closeProfile(restoreFocus = true) {
  if (!profileModal.classList.contains("open")) return;
  profileModal.classList.remove("open");
  profileModal.setAttribute("aria-hidden", "true");
  syncBodyLock();
  if (restoreFocus) profileReturnFocus?.focus({ preventScroll: true });
}
document.querySelectorAll("[data-lawyer]").forEach((button) => button.addEventListener("click", () => openProfile(button.dataset.lawyer)));
document.querySelectorAll("[data-close-profile]").forEach((element) => element.addEventListener("click", () => closeProfile()));

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
  if (open) setTimeout(() => {
    if (chat.classList.contains("open")) document.querySelector(".chat-close").focus({ preventScroll: true });
  }, 120);
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
    button.textContent = "Открыть профиль";
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
let chatRouteArea = "";
function runChatScenario(key, userLabel = "") {
  const area = ["family", "property", "business", "public"].find((value) => key === value || key.startsWith(value + "-"));
  if (area) chatRouteArea = area;
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
  chatRouteArea = "";
  runChatScenario("welcome");
}

const urgentModal = document.querySelector(".urgent-modal");
let urgentReturnFocus;
function openUrgent() {
  urgentReturnFocus = document.activeElement;
  closeProfile(false);
  toggleChat(false);
  urgentModal.classList.add("open");
  urgentModal.setAttribute("aria-hidden", "false");
  syncBodyLock();
  urgentModal.querySelector(".urgent-panel").scrollTop = 0;
  urgentModal.querySelector(".urgent-close").focus({ preventScroll: true });
}
function closeUrgent() {
  if (!urgentModal.classList.contains("open")) return;
  urgentModal.classList.remove("open");
  urgentModal.setAttribute("aria-hidden", "true");
  syncBodyLock();
  urgentReturnFocus?.focus({ preventScroll: true });
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

document.addEventListener("keydown", (event) => {
  const activeModal = document.querySelector(".profile-modal.open, .urgent-modal.open");
  if (event.key === "Tab" && activeModal) {
    const controls = [...activeModal.querySelectorAll("button:not([disabled]), a[href]")];
    const start = controls[0];
    const end = controls.at(-1);
    if (event.shiftKey && document.activeElement === start) {
      event.preventDefault();
      end.focus();
    } else if (!event.shiftKey && document.activeElement === end) {
      event.preventDefault();
      start.focus();
    }
  }
  if (event.key !== "Escape" || document.querySelector("dialog[open]")) return;
  closeProfile();
  closeUrgent();
  toggleChat(false);
});

const routeGroups = [
  { key: "area", title: "Тема", options: {
    family: "Семья и дети", property: "Недвижимость и наследство",
    business: "Бизнес и договоры", public: "Госорганы и проверки"
  }},
  { key: "stage", title: "Что уже произошло", options: {
    planning: "Оцениваю варианты", document: "Получен документ", court: "Назначено заседание", urgent: "Нужно сегодня"
  }},
  { key: "need", title: "Какая помощь нужна", options: {
    advice: "Консультация", documents: "Подготовка документов", negotiation: "Переговоры", representation: "Представительство"
  }}
];
const routeTopics = {
  family: ["Семейный спор", "Документы о семье и имуществе, договоренности, переписку.", "roman"],
  property: ["Недвижимость и наследство", "Документы на имущество, договоры и уведомления, если они есть.", "mikhail"],
  business: ["Бизнес и договоры", "Договор с приложениями, акты, переписку и расчет суммы спора.", "konstantin"],
  public: ["Спор с ведомством", "Решение ведомства, материалы проверки и подтверждение даты получения.", "igor"]
};
const routeQuestions = {
  planning: "Какие варианты есть и каких сведений не хватает для выбора?",
  document: "Как называется документ, когда его получили и требует ли он ответа?",
  court: "На какую дату назначено заседание и какие материалы есть у вас на руках?",
  urgent: "Какое событие или срок приходится на сегодня? Для срочной связи можно позвонить."
};
const routeState = { area: "", stage: "", need: "" };
const sheet = document.querySelector("#route-sheet");
const heroIntake = document.querySelector("#hero-intake");
const stageButtons = [...document.querySelectorAll("[data-route-stage]")];

function routeLawyer() {
  if (routeState.area === "business" && routeState.stage === "urgent") return "bogdan";
  return routeTopics[routeState.area]?.[2];
}
function routeSummary() {
  return routeGroups.map(({ key, options }) => options[routeState[key]]).filter(Boolean).join(" · ");
}
function routeText() {
  return [
    routeSummary(),
    "Что подготовить: " + document.querySelector("#sheet-documents").textContent,
    "Вопрос к юристу: " + document.querySelector("#sheet-question").textContent,
    "Специалист: " + document.querySelector("#sheet-lawyer").textContent
  ].join("\n");
}
let navigationFrame = 0;
history.scrollRestoration = "manual";

function stopNavigation() {
  cancelAnimationFrame(navigationFrame);
  navigationFrame = 0;
}
for (const type of ["wheel", "touchstart"]) {
  window.addEventListener(type, stopNavigation, { passive: true });
}
window.addEventListener("keydown", (event) => {
  if (["PageDown", "PageUp", "Home", "End", "ArrowUp", "ArrowDown", " "].includes(event.key)) stopNavigation();
});

function movePage(destination, focus) {
  stopNavigation();
  const start = window.scrollY;
  const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const target = Math.max(0, Math.min(max, destination));
  const distance = target - start;
  const finish = () => {
    if (focus) {
      if (focus.tabIndex < 0 && !focus.hasAttribute("tabindex")) focus.setAttribute("tabindex", "-1");
      focus.focus({ preventScroll: true });
    }
  };
  const jump = (top) => window.scrollTo({ top, behavior: "instant" });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || Math.abs(distance) < 3) {
    jump(target);
    finish();
    return;
  }
  const duration = Math.min(1370, 290 + 12 * Math.sqrt(Math.abs(distance)));
  const started = performance.now();
  function frame(now) {
    const time = Math.min(1, (now - started) / duration);
    const progress = (1 - Math.cos(Math.PI * time)) / 2;
    jump(start + distance * progress);
    if (time < 1) {
      navigationFrame = requestAnimationFrame(frame);
    } else {
      navigationFrame = 0;
      finish();
    }
  }
  navigationFrame = requestAnimationFrame(frame);
}

function sectionTop(section) {
  const offset = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
  return section.getBoundingClientRect().top + window.scrollY - offset;
}
function goTo(anchor, focus) {
  const section = document.getElementById(anchor.slice(1));
  if (!section) return;
  const resource = section.querySelector(":scope > .resource");
  if (resource) resource.open = true;
  if (location.hash !== anchor) {
    history.replaceState({ ...history.state, position: window.scrollY }, "");
    history.pushState({}, "", anchor);
  }
  const heading = [...section.querySelectorAll("h1, h2, h3")].find((node) => !node.closest("[hidden]"));
  movePage(sectionTop(section), focus || heading || section);
}
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#']");
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target) return;
  if (!document.getElementById(link.hash.slice(1))) return;
  event.preventDefault();
  goTo(link.hash, link.classList.contains("skip-link") ? document.querySelector("main") : undefined);
});
window.addEventListener("popstate", (event) => {
  const section = document.getElementById(location.hash.slice(1));
  movePage(event.state?.position ?? (section ? sectionTop(section) : 0));
});
function updateSheet() {
  const completed = Object.values(routeState).filter(Boolean).length;
  const specialist = routeLawyer();
  const values = {
    "#strategy-status": completed + " из 3",
    "#sheet-summary": routeSummary() || "Выберите тему, стадию и формат помощи. Лист будет заполняться по ходу.",
    "#sheet-documents": routeTopics[routeState.area]?.[1] || "Появится после выбора темы",
    "#sheet-question": routeQuestions[routeState.stage] || "Появится после выбора стадии",
    "#sheet-lawyer": specialist ? profiles[specialist].name : "Появится после выбора темы"
  };
  for (const [selector, value] of Object.entries(values)) {
    const node = sheet.querySelector(selector);
    if (node.textContent === value) continue;
    node.textContent = value;
    if (!prefersReducedMotion && selector !== "#strategy-status") {
      node.getAnimations().forEach((animation) => animation.cancel());
      node.animate(
        [{ opacity: .3, transform: "translateY(7px)", clipPath: "inset(0 0 22% 0)" }, { opacity: 1, transform: "none", clipPath: "inset(0)" }],
        { duration: 380, easing: "cubic-bezier(.16,1,.3,1)" }
      );
    }
  }
  sheet.querySelectorAll(".sheet-progress i").forEach((line, index) => line.classList.toggle("filled", index < completed));
  sheet.querySelector("[data-sheet-profile]").disabled = !specialist;
  sheet.querySelectorAll("[data-sheet-contact], [data-sheet-copy], [data-sheet-print]").forEach((button) => {
    button.disabled = completed < routeGroups.length;
  });
  sheet.querySelector(".sheet-feedback").textContent = "";
  document.querySelectorAll("[data-route-option]").forEach((button) => {
    button.setAttribute("aria-pressed", String(routeState[button.dataset.group] === button.dataset.routeOption));
  });
}
function selectRoute(key, value) {
  routeState[key] = value;
  updateSheet();
}
for (const { key, title, options } of routeGroups) {
  const field = document.createElement("fieldset");
  field.className = "route-field";
  const legend = document.createElement("legend");
  legend.textContent = title;
  const buttons = document.createElement("div");
  buttons.className = "strategy-options";
  for (const [value, label] of Object.entries(options)) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.group = key;
    button.dataset.routeOption = value;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => selectRoute(key, value));
    buttons.append(button);
  }
  field.append(legend, buttons);
  document.querySelector("#route-questions").append(field);
}

const intakeOptions = document.querySelector("#hero-intake-options");
const intakeTitle = document.querySelector("#intake-title");
const intakeBack = heroIntake.querySelector(".intake-back");
const intakeGroups = [routeGroups[1], routeGroups[0], routeGroups[2]];
const intakeTitles = ["Что уже произошло?", "С чем связан вопрос?", "Какая помощь нужна?"];
let intakeStep = 0;
let intakeFirstStep = 0;

function intakeButton(label, action, className = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = className;
  button.addEventListener("click", action);
  return button;
}
function renderIntake() {
  const group = intakeGroups[intakeStep];
  const label = document.querySelector("#hero-stage-label");
  label.textContent = group ? `Подготовка · ${intakeStep + 1} из 3` : "Лист подготовки";
  intakeTitle.textContent = group ? intakeTitles[intakeStep] : "Можно начать с этого.";
  if (heroIntake.open) intakeTitle.focus({ preventScroll: true });
  intakeBack.hidden = intakeStep === intakeFirstStep;
  if (group) {
    const buttons = Object.entries(group.options).map(([value, text]) => {
      const button = intakeButton(text, () => {
        selectRoute(group.key, value);
        intakeStep += 1;
        renderIntake();
      }, "intake-option");
      button.setAttribute("aria-pressed", String(routeState[group.key] === value));
      return button;
    });
    intakeOptions.replaceChildren(...buttons);
  } else {
    const documents = document.createElement("p");
    documents.className = "intake-result";
    documents.textContent = "Что подготовить · " + routeTopics[routeState.area][1];
    const name = document.createElement("p");
    name.textContent = "Специалист · " + profiles[routeLawyer()].name;
    const contact = intakeButton("Оставить обращение", () => {
      heroIntake.close();
      openContact(routeLawyer(), true);
    }, "button button-acid");
    const view = intakeButton("Открыть полный лист", () => {
      heroIntake.close();
      goTo("#strategy", document.querySelector("#strategy-title"));
    }, "paper-link");
    intakeOptions.replaceChildren(documents, name, contact, view);
  }
  if (!prefersReducedMotion) {
    intakeOptions.getAnimations().forEach((animation) => animation.cancel());
    intakeOptions.animate(
      [{ opacity: .35, transform: "translateY(9px)" }, { opacity: 1, transform: "none" }],
      { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" }
    );
  }
  intakeOptions.scrollTop = 0;
}
function openIntake(stage) {
  if (stage) selectRoute("stage", stage);
  intakeFirstStep = stage ? 1 : 0;
  intakeStep = intakeFirstStep;
  renderIntake();
  heroIntake.showModal();
  intakeTitle.focus({ preventScroll: true });
}
stageButtons.forEach((button) => button.addEventListener("click", () => openIntake(button.dataset.routeStage)));
intakeBack.addEventListener("click", () => {
  intakeStep -= 1;
  renderIntake();
});
heroIntake.querySelector(".paper-close").addEventListener("click", () => heroIntake.close());
heroIntake.addEventListener("click", (event) => {
  if (event.target === heroIntake) heroIntake.close();
});

document.querySelector("[data-chat-route]").addEventListener("click", () => {
  if (chatRouteArea) selectRoute("area", chatRouteArea);
  toggleChat(false);
  goTo("#strategy", document.querySelector("#strategy-title"));
});
sheet.querySelector("[data-sheet-profile]").addEventListener("click", () => openProfile(routeLawyer(), true));
sheet.querySelector("[data-sheet-print]").addEventListener("click", () => window.print());
sheet.querySelector("[data-sheet-copy]").addEventListener("click", async () => {
  const feedback = sheet.querySelector(".sheet-feedback");
  try {
    await navigator.clipboard.writeText(routeText());
    feedback.textContent = "Лист скопирован.";
  } catch {
    const selection = window.getSelection();
    selection.selectAllChildren(sheet.querySelector(".sheet-lines"));
    feedback.textContent = "Текст выделен. Скопируйте его вручную.";
  }
});

const dossier = {
  risk: {
    title: "Квартиру хотят признать общей",
    text: "Другая сторона ссылалась на вложения в квартиру в период брака. Проверили, какие расходы она включила в расчет.",
    materials: [
      ["Претензия", "Вложения в период брака", "Из претензии понятно, какие расходы другая сторона считает общими. Их нужно сверить с подтверждающими документами."],
      ["Договор покупки", "Квартира приобретена до брака", "Договор взяли за точку отсчета. Дальше проверили, когда и из каких средств прошли спорные платежи."]
    ]
  },
  evidence: {
    title: "Выписку сопоставили с договором",
    text: "Разложили платежи по датам и сопоставили их с основаниями оплаты. Так стало видно, какой перевод к какому расходу относится.",
    materials: [
      ["Банковская выписка", "Перевод по договору", "В выписке сверили назначение, сумму и дату платежа. Совокупность этих признаков позволила найти перевод в расчете другой стороны."],
      ["Приложение к договору", "Основание перевода", "Приложение показало, за что перечислялись деньги. Так один платеж связали с конкретным обязательством."]
    ]
  },
  turn: {
    title: "Один перевод посчитали дважды",
    text: "В расчете один и тот же перевод проходил под двумя названиями. Откройте любой фрагмент, чтобы проследить связь.",
    materials: [
      ["Расчет другой стороны", "Один перевод в двух строках", "Одна строка описывала назначение, другая – вид расхода. Обе ссылались на один и тот же перевод."],
      ["Банковская выписка", "Запись о переводе одна", "Дата, сумма и назначение совпали. Выписка подтверждала один платеж, хотя в расчете он был указан дважды."]
    ]
  },
  result: {
    title: "Квартира осталась у клиента",
    text: "В этом примере суд отклонил требования. Команда представила цепочку платежей и показала, где расчет другой стороны расходился с документами.",
    materials: [
      ["Позиция по делу", "Хронология с подтверждениями", "Для каждого спорного платежа собрали ссылку на документ и объяснение его роли в расчете."],
      ["Решение", "Требования отклонены", "В примере квартира осталась у клиента. В другом деле результат будет зависеть от обстоятельств и документов."]
    ]
  }
};
const dossierScene = document.querySelector(".dossier-scene");
const dossierButtons = [...document.querySelectorAll("[data-dossier-stage]")];
const dossierNote = document.querySelector("#dossier-note");
const chronology = document.querySelector(".dossier-chronology");
const chronologyButton = document.querySelector("#chronology-note");
const chronologyInline = document.querySelector(".chronology-inline");
function revealEvidence(source, note) {
  dossierScene.querySelectorAll(".evidence-card, #chronology-note").forEach((item) => {
    item.setAttribute("aria-pressed", String(item === source));
  });
  dossierNote.textContent = note;
  chronologyInline.hidden = source !== chronologyButton;
  chronologyInline.textContent = source === chronologyButton ? note : "";
  dossierScene.classList.remove("tracing");
  if (source !== chronologyButton) {
    void dossierScene.offsetWidth;
    dossierScene.classList.add("tracing");
  }
  dossierScene.querySelectorAll(".evidence-card").forEach((card) => {
    const snippet = card.querySelector(".evidence-inline-note");
    snippet.hidden = card !== source;
    if (card === source) snippet.textContent = note;
  });
}
chronologyButton.addEventListener("click", () => {
  revealEvidence(chronologyButton, "Хронология отделяет покупку квартиры от перевода и последующей сверки. Она помогает проверить, какие события подтверждаются каждым документом.");
});
function renderDossier(button, animate = true) {
  const key = button.dataset.dossierStage;
  const stage = dossier[key];
  chronology.hidden = key !== "evidence";
  chronologyButton.setAttribute("aria-pressed", "false");
  chronologyInline.hidden = true;
  dossierButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
  document.querySelector("#dossier-index").textContent = "Этап " + button.querySelector("span").textContent + " / 04";
  document.querySelector("#dossier-title").textContent = stage.title;
  document.querySelector("#dossier-text").textContent = stage.text;
  dossierNote.textContent = "Откройте фрагмент, чтобы увидеть, что проверял юрист.";
  dossierScene.classList.remove("tracing");
  const fragments = stage.materials.map(([name, excerpt, note]) => {
    const fragment = document.createElement("button");
    fragment.type = "button";
    fragment.className = "evidence-card";
    fragment.setAttribute("aria-pressed", "false");
    const title = document.createElement("small");
    title.textContent = name;
    const line = document.createElement("strong");
    line.textContent = excerpt;
    const snippet = document.createElement("span");
    snippet.className = "evidence-inline-note";
    snippet.hidden = true;
    fragment.setAttribute("aria-label", name + " · " + excerpt);
    const lines = document.createElement("span");
    lines.className = "evidence-leader";
    lines.setAttribute("aria-hidden", "true");
    fragment.append(title, line, lines, snippet);
    fragment.addEventListener("click", () => revealEvidence(fragment, note));
    return fragment;
  });
  document.querySelector("#dossier-materials").replaceChildren(...fragments);
  if (animate && !prefersReducedMotion) {
    dossierScene.querySelectorAll(".evidence-card, #dossier-title, #dossier-text").forEach((node, index) => {
      node.getAnimations().forEach((animation) => animation.cancel());
      node.animate(
        [{ opacity: .25, transform: "translateY(16px)", clipPath: "inset(0 0 22% 0)" }, { opacity: 1, transform: "none", clipPath: "inset(0)" }],
        { duration: 520, delay: index * 65, fill: "backwards", easing: "cubic-bezier(.22,1,.36,1)" }
      );
    });
  }
}
const caseCover = document.querySelector("#case-cover");
const caseOpen = document.querySelector(".case-open");
const caseClose = document.querySelector(".case-close");
const caseWorkbench = document.querySelector("#case-workbench");
const caseNext = document.querySelector(".case-next");
const nextLabels = ["К документам", "К решающей детали", "К решению", "Разобрать мое дело"];

function changeCase(index) {
  renderDossier(dossierButtons[index]);
  caseNext.firstChild.textContent = nextLabels[index] + " ";
}
let resumeScrollAnchoring = 0;
dossierButtons.forEach((button, index) => button.addEventListener("click", () => {
  if (button.getAttribute("aria-pressed") === "true") return;
  stopNavigation();
  // The next section is a possible browser scroll anchor when the dossier changes height.
  const root = document.documentElement;
  root.classList.add("switching-dossier");
  cancelAnimationFrame(resumeScrollAnchoring);
  changeCase(index);
  resumeScrollAnchoring = requestAnimationFrame(() => {
    resumeScrollAnchoring = requestAnimationFrame(() => root.classList.remove("switching-dossier"));
  });
}));
caseNext.addEventListener("click", () => {
  const index = dossierButtons.findIndex((button) => button.getAttribute("aria-pressed") === "true");
  if (index === dossierButtons.length - 1) {
    openIntake();
    return;
  }
  changeCase(index + 1);
  dossierButtons[index + 1].focus({ preventScroll: true });
  const bounds = dossierScene.getBoundingClientRect();
  const headerHeight = header.getBoundingClientRect().height;
  if (bounds.top < headerHeight || bounds.top > window.innerHeight * .65) {
    movePage(window.scrollY + bounds.top - headerHeight - 12);
  }
});
function showCase(open, focus = true) {
  caseCover.hidden = open;
  caseWorkbench.hidden = !open;
  caseOpen.setAttribute("aria-expanded", String(open));
  const destination = open ? caseWorkbench.querySelector("h3") : caseOpen;
  if (focus) destination.focus({ preventScroll: true });
  if (focus && open && caseWorkbench.querySelector(".flagship-nav").getBoundingClientRect().bottom <= header.getBoundingClientRect().bottom + 24) {
    movePage(sectionTop(document.querySelector("#cases")));
  }
}
caseOpen.addEventListener("click", () => showCase(true));
caseClose.addEventListener("click", () => showCase(false));
renderDossier(dossierButtons[0], false);

{
  const more = document.querySelector(".case-more");
  const summary = more.querySelector("summary");
  const content = more.querySelector(".case-more-body");
  let transition;
  summary.addEventListener("click", event => {
    event.preventDefault();
    const opening = more.dataset.expanded !== "true";
    const height = more.open ? content.getBoundingClientRect().height : 0;
    transition?.cancel();
    more.dataset.expanded = String(opening);
    summary.setAttribute("aria-expanded", String(opening));
    content.inert = !opening;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      more.open = opening;
      return;
    }
    more.open = true;
    const current = content.animate(
      [{height: height + "px"}, {height: (opening ? content.scrollHeight : 0) + "px"}],
      {duration: 440, easing:"cubic-bezier(.23,.72,.24,1)", fill:"both"}
    );
    transition = current;
    current.onfinish = () => {
      if (transition !== current) return;
      more.open = opening;
      transition = undefined;
      current.cancel();
    };
  });
  summary.setAttribute("aria-expanded", String(more.open));
  more.dataset.expanded = String(more.open);
}

const marginNote = document.querySelector("#margin-note");
const marginCallout = marginNote.parentElement;
const documentSheet = document.querySelector(".annotated-document");

function alignCallout() {
  const active = documentSheet.querySelector(".annotation button[aria-expanded='true']");
  if (!active) {
    marginCallout.classList.remove("is-linked");
    marginCallout.style.removeProperty("--note-y");
    return;
  }
  const offset = active.getBoundingClientRect().top - documentSheet.getBoundingClientRect().top;
  const limit = Math.max(0, documentSheet.offsetHeight - marginCallout.offsetHeight);
  marginCallout.classList.add("is-linked");
  marginCallout.style.setProperty("--note-y", Math.min(offset, limit) + "px");
}
new ResizeObserver(alignCallout).observe(documentSheet);
const annotationButtons = [...document.querySelectorAll(".annotation button")];
annotationButtons.forEach((button) => button.addEventListener("click", () => {
  const opening = button.getAttribute("aria-expanded") === "false";
  annotationButtons.forEach((item) => {
    const show = opening && item === button;
    const panel = document.getElementById(item.getAttribute("aria-controls"));
    item.setAttribute("aria-expanded", String(show));

    panel.hidden = !show;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-label", item.querySelector("span").textContent);
  });
  marginNote.textContent = opening ? document.getElementById(button.getAttribute("aria-controls")).textContent : "Выберите фрагмент, чтобы увидеть пояснение.";
  alignCallout();
  if (opening && !prefersReducedMotion) {
    marginNote.getAnimations().forEach((animation) => animation.cancel());
    marginNote.animate([{ opacity: .25, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: 350, easing: "ease-out" });
  }
}));

const profileExamples = {
  roman: ["Спор о квартире", "Сопоставить даты покупки и платежей, затем проверить, какие расходы каждая сторона считает общими."],
  bogdan: ["Вызов руководителя", "Уточнить, кто направил вызов, в каком статусе приглашают руководителя и какие документы уже вручены."],
  konstantin: ["Неоплаченная поставка", "Сверить договор, накладные и платежи, чтобы установить остаток долга по каждой поставке."],
  igor: ["Решение по итогам проверки", "Сопоставить акт с решением и проверить дату вручения, чтобы понять, какие материалы запросить."],
  mikhail: ["Вопрос о наследстве", "Выяснить, какие документы есть у семьи, когда открыто наследственное дело и кто к нему уже обращался."]
};
const profileConsult = document.querySelector("[data-profile-consult]");
function populateProfileFile(key) {
  const [title, text] = profileExamples[key];
  document.querySelector("#profile-file-title").textContent = title;
  document.querySelector("#profile-file-text").textContent = text;
  profileConsult.dataset.key = key;
  const names = { roman: "Романом", bogdan: "Богданом", konstantin: "Константином", igor: "Игорем", mikhail: "Михаилом" };
  profileConsult.textContent = "Обсудить с " + names[key];
}

const contactForm = document.querySelector("#contact-form");
const contactName = document.querySelector("#contact-name");
const contactPhone = document.querySelector("#contact-phone");
const contactTopic = document.querySelector("#contact-topic");
const topicPicker = createTopicPicker(contactTopic);
const contactContext = document.querySelector("#contact-context");
const contextPanel = contactContext.parentElement;
const contactReview = document.querySelector("#contact-review");
const contactPreview = document.querySelector("#contact-preview");
const sendButton = document.querySelector("#contact-send");
const sendStatus = document.querySelector("#contact-send-status");
const receipt = document.querySelector("#contact-receipt");
let context = { specialist: "", route: "" };
let draft;
let lastAttempt;

function openContact(key, includeRoute = false) {
  if (!receipt.hidden) resetContact();
  if (includeRoute && routeState.area) topicPicker.setValue(routeTopics[routeState.area][0]);
  context = { specialist: profiles[key]?.name || "", route: includeRoute ? routeText() : "" };
  contactContext.textContent = [
    context.specialist && ("Специалист: " + context.specialist),
    context.route && "Лист подготовки приложен"
  ].filter(Boolean).join(" · ");
  contextPanel.hidden = !contactContext.textContent;
  goTo("#contact", document.querySelector("#contact-title"));
}
profileConsult.addEventListener("click", () => {
  const key = profileConsult.dataset.key;
  closeProfile(false);
  toggleChat(false);
  openContact(key, profileConsult.dataset.includeRoute === "true");
});
sheet.querySelector("[data-sheet-contact]").addEventListener("click", () => openContact(routeLawyer(), true));
document.querySelectorAll("[data-practice-panel] .practice-item").forEach((link, index) => {
  const areas = ["family", "property", "property", "public", "business", "business", "public", "business"];
  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (!receipt.hidden) resetContact();
    detachContactContext();
    topicPicker.setValue(routeTopics[areas[index]][0]);
    goTo("#contact", document.querySelector("#contact-title"));
  });
});

function detachContactContext() {
  context = { specialist: "", route: "" };
  contextPanel.hidden = true;
}
document.querySelector("#contact-detach").addEventListener("click", () => {
  detachContactContext();
  topicPicker.focus();
});
contactTopic.addEventListener("change", detachContactContext);

function createTopicPicker(select) {
  const field = select.parentElement;
  const label = field.querySelector("label");
  const picker = document.createElement("div");
  picker.className = "topic-picker";
  picker.innerHTML = `
    <button id="contact-topic-control" class="topic-control" type="button" role="combobox"
      aria-controls="contact-topic-options" aria-expanded="false" aria-haspopup="listbox"
      aria-required="true" aria-labelledby="contact-topic-label contact-topic-value">
      <span id="contact-topic-value"></span><i aria-hidden="true"></i>
    </button>
    <div id="contact-topic-options" class="topic-options" role="listbox" aria-labelledby="contact-topic-label" hidden></div>
    <p id="contact-topic-error" class="topic-error" role="alert" hidden>Выберите тему обращения.</p>
  `;
  const control = picker.querySelector(".topic-control");
  const listbox = picker.querySelector(".topic-options");
  const display = picker.querySelector("#contact-topic-value");
  const error = picker.querySelector(".topic-error");
  const options = Array.from(select.options).filter(option => option.value).map((option, index) => {
    const item = document.createElement("div");
    item.id = "contact-topic-option-" + index;
    item.setAttribute("role", "option");
    item.textContent = option.text;
    item.dataset.value = option.value;
    listbox.append(item);
    return item;
  });
  let active = -1;

  function sync() {
    display.textContent = select.selectedOptions[0]?.text || "Выберите тему";
    control.classList.toggle("is-placeholder", !select.value);
    for (const item of options) item.setAttribute("aria-selected", String(item.dataset.value === select.value));
    if (select.value) clearError();
  }
  function clearError() {
    error.hidden = true;
    control.removeAttribute("aria-invalid");
    control.removeAttribute("aria-describedby");
  }
  function highlight(index) {
    options[active]?.classList.remove("is-active");
    active = Math.max(0, Math.min(index, options.length - 1));
    const option = options[active];
    option.classList.add("is-active");
    control.setAttribute("aria-activedescendant", option.id);
    const top = option.offsetTop;
    const bottom = top + option.offsetHeight;
    if (top < listbox.scrollTop) listbox.scrollTop = top;
    else if (bottom > listbox.scrollTop + listbox.clientHeight) listbox.scrollTop = bottom - listbox.clientHeight;
  }
  function close() {
    listbox.hidden = true;
    control.setAttribute("aria-expanded", "false");
    control.removeAttribute("aria-activedescendant");
  }
  function open(index) {
    const bounds = control.getBoundingClientRect();
    const above = bounds.top - document.querySelector(".masthead").offsetHeight - 12;
    const below = innerHeight - bounds.bottom - 12;
    const upward = below < 246 && above > below;
    picker.classList.toggle("opens-up", upward);
    listbox.style.maxHeight = Math.max(96, upward ? above : below) + "px";
    listbox.hidden = false;
    control.setAttribute("aria-expanded", "true");
    const selected = options.findIndex(item => item.dataset.value === select.value);
    highlight(index ?? selected);
  }
  function choose(item) {
    if (select.value !== item.dataset.value) {
      select.value = item.dataset.value;
      select.dispatchEvent(new Event("change", {bubbles:true}));
    }
    close();
    control.focus({preventScroll:true});
  }
  control.addEventListener("click", () => listbox.hidden ? open() : close());
  control.addEventListener("keydown", event => {
    const {key} = event;
    if (key === "Tab") {
      close();
      return;
    }
    if (key === "Escape" && !listbox.hidden) {
      event.preventDefault();
      event.stopPropagation();
      close();
    } else if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      const down = key === "ArrowDown";
      if (listbox.hidden) open(!select.value && !down ? options.length - 1 : undefined);
      else highlight(active + (down ? 1 : -1));
    } else if (key === "Home" || key === "End") {
      event.preventDefault();
      const index = key === "Home" ? 0 : options.length - 1;
      if (listbox.hidden) open(index);
      else highlight(index);
    } else if ((key === "Enter" || key === " ") && !listbox.hidden) {
      event.preventDefault();
      choose(options[active]);
    }
  });
  listbox.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse") return;
    const index = options.indexOf(event.target.closest('[role="option"]'));
    if (index >= 0 && index !== active) highlight(index);
  });
  listbox.addEventListener("mousedown", event => event.preventDefault());
  listbox.addEventListener("click", event => {
    const item = event.target.closest('[role="option"]');
    if (item) choose(item);
  });
  document.addEventListener("pointerdown", event => { if (!picker.contains(event.target)) close(); });
  control.addEventListener("blur", () => close());
  select.addEventListener("change", sync);
  select.form.addEventListener("reset", () => queueMicrotask(() => { close(); clearError(); sync(); }));
  select.addEventListener("invalid", event => {
    event.preventDefault();
    error.hidden = false;
    control.setAttribute("aria-invalid", "true");
    control.setAttribute("aria-describedby", error.id);
    const firstInvalid = select.form.querySelector(":invalid");
    if (firstInvalid === select) control.focus();
  });
  select.after(picker);
  select.hidden = true;
  label.htmlFor = control.id;
  sync();
  return {
    setValue(value) { select.value = value; sync(); },
    focus() { control.focus(); }
  };
}

function validPhone() {
  const digits = contactPhone.value.replace(/\D/g, "");
  const national = digits.length === 10 ? digits : /^[78]\d{10}$/.test(digits) ? digits.slice(1) : "";
  contactPhone.setCustomValidity(national ? "" : "Укажите 10 цифр номера после +7.");
  return national ? "+7" + national : "";
}
contactPhone.addEventListener("input", () => contactPhone.setCustomValidity(""));
contactName.addEventListener("input", () => contactName.setCustomValidity(""));
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = Object.fromEntries(new FormData(contactForm));
  fields.name = fields.name.trim();
  contactName.setCustomValidity(fields.name ? "" : "Введите имя.");
  fields.phone = validPhone();
  if (!contactForm.reportValidity()) return;
  draft = { ...fields, ...context };
  const rows = { Имя: draft.name, Телефон: draft.phone, Тема: draft.topic, Сообщение: draft.message, Специалист: draft.specialist, "Лист подготовки": draft.route };
  contactPreview.replaceChildren();
  for (const [label, value] of Object.entries(rows)) {
    if (!value) continue;
    const term = document.createElement("dt");
    term.textContent = label;
    const description = document.createElement("dd");
    description.textContent = value;
    contactPreview.append(term, description);
  }
  sendStatus.textContent = "";
  contactReview.showModal();
  sendButton.focus();
});
function closeContactReview() {
  if (!sendButton.disabled) contactReview.close();
}
contactReview.querySelector(".paper-close").addEventListener("click", closeContactReview);
document.querySelector("#contact-edit").addEventListener("click", closeContactReview);
contactReview.addEventListener("cancel", (event) => {
  if (sendButton.disabled) event.preventDefault();
});
function resetContact() {
  contactForm.reset();
  context = { specialist: "", route: "" };
  contextPanel.hidden = true;
  contactForm.hidden = false;
  receipt.hidden = true;
  lastAttempt = undefined;
}
document.querySelector("#contact-new").addEventListener("click", () => {
  resetContact();
  contactName.focus();
});
function submissionKey(body) {
  if (lastAttempt?.body !== body) {
    lastAttempt = { body, key: Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, "0")).join("") };
  }
  return lastAttempt.key;
}
sendButton.addEventListener("click", async () => {
  if (sendButton.disabled) return;
  const body = JSON.stringify(draft);
  sendButton.disabled = true;
  sendStatus.textContent = "Отправляем обращение…";
  try {
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Idempotency-Key": submissionKey(body) },
      body,
      signal: AbortSignal.timeout(15000)
    });
    const result = await response.json();
    if (!response.ok || !/^[A-F0-9]{12}$/.test(result.reference)) throw new Error("Missing receipt");
    document.querySelector("#contact-reference").textContent = result.reference;
    contactReview.close();
    contactForm.hidden = true;
    receipt.hidden = false;
    receipt.focus();
  } catch {
    sendStatus.textContent = "Подтверждение пока не получено. Повторите отправку или позвоните по номеру +7 983 243-96-90.";
  } finally {
    sendButton.disabled = false;
  }
});

const linkedResource = document.getElementById(location.hash.slice(1))?.querySelector(":scope > .resource");
if (linkedResource) linkedResource.open = true;

// A stack of cut metal plates, each with the same section as the firm's monogram.
// The opening and the scroll position change the pitch and spacing of the plates.
(() => {
  const canvas = document.querySelector("#imprint");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const hero = canvas.closest(".hero");
  const control = hero.querySelector(".imprint-toggle");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const layers = 32;
  // A bevel along the corners catches light as the stack turns.
  const outline = [
    [-1, 1.02], [-1, -.98], [-.92, -1.06], [.92, -1.06], [1, -.98],
    [1, 1.02], [.52, 1.02], [.52, -.52], [.47, -.57],
    [-.47, -.57], [-.52, -.52], [-.52, 1.02]
  ];
  let width = 0, height = 0, time = 0, last = 0, raf = 0;
  let pointerX = 0, pointerY = 0, leanX = 0, leanY = 0;
  let paused = reduced.matches, visible = true, scroll = 0;
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

  function fillFace(points, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.lineWidth = .65;
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
  }

  function render() {
    if (!width || !height) return;
    const mobile = width / height > 1.52;
    const unit = Math.min(width * (mobile ? .264 : .272), height * .302);
    // A fixed camera on the right reads the depth from left to right.
    const yaw = -.63 + .19 * Math.sin(time * .39) + leanX * .095 - scroll * .24;
    const pitch = -.29 + .07 * Math.sin(time * .51) + leanY * .055;
    const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
    const cosP = Math.cos(pitch), sinP = Math.sin(pitch);
    const cx = width * .51, cy = height * .475;
    const settle = reduced.matches ? 0 : Math.pow(1 - Math.min(1, time / 2.1), 3);
    const wave = .5 - .5 * Math.cos(time * .68);
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(cx, height * .865);
    ctx.scale(unit * 1.43, unit * .13);
    const shadow = ctx.createRadialGradient(0,0,0,0,0,1);
    shadow.addColorStop(0, "rgba(0,0,0,.58)");
    shadow.addColorStop(.65, "rgba(0,0,0,.23)");
    shadow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = shadow;
    ctx.fillRect(-1,-1,2,2);
    ctx.restore();

    for (let i = 0; i < layers; i++) {
      const u = i / (layers - 1);
      const envelope = Math.sin(u * Math.PI);
      const twist = (u-.5) * (.20 + wave*.47 + scroll*.49) + envelope * settle * .55;
      const c = Math.cos(twist), s = Math.sin(twist);
      const z = (u-.5) * (1.74 + wave*.45 + scroll*.84 + settle*.94);
      const lift = envelope * (.14*Math.sin(time*.67 - u*3.8) - settle*.39);
      const shift = (u-.5) * settle *.60;
      const project = (x, y, depth) => {
        const a = x*c - y*s + shift, b = x*s + y*c + lift;
        const vx = a*cosY + depth*sinY, vz = depth*cosY - a*sinY;
        const vy = b*cosP - vz*sinP;
        const perspective = 7.8 / (7.8 - (b*sinP + vz*cosP));
        return [cx + vx * perspective * unit, cy + vy * perspective * unit];
      };
      const back = outline.map(([x,y]) => project(x,y,z-.035));
      const front = outline.map(([x,y]) => project(x,y,z));
      const copper = i % 9 === 0 || i === layers-1;
      const highlight = .5+.5*Math.cos(u*4.1 - time*.66);
      for (let j = 0; j < outline.length; j++) {
        const k = (j+1) % outline.length;
        const side = j === 2 || j === 6 || j === 10;
        const light = (side ? 37 : 50) + highlight*14;
        fillFace([back[j],back[k],front[k],front[j]], copper
          ? 'hsl(27 37% '+light+'%)' : 'hsl(39 11% '+light+'%)');
      }
      const metal = ctx.createLinearGradient(front[0][0],front[0][1],front[4][0],front[4][1]);
      if (copper) {
        metal.addColorStop(0, "#654934");
        metal.addColorStop(.27, "#bb8968");
        metal.addColorStop(.46 + highlight*.14, "#f0cfab");
        metal.addColorStop(.78, "#b18262");
        metal.addColorStop(1, "#765740");
      } else {
        metal.addColorStop(0,"#4c4942");
        metal.addColorStop(.39,"#b0a89a");
        metal.addColorStop(.66,"#e4ded2");
        metal.addColorStop(1,"#777266");
      }
      fillFace(front, metal, copper ? "#e2ba95" : "#c4bfb2");
      if (i === layers-1) {
        // Engraved contours sit on the face of the final plate.
        for (const inset of [.038,.061]) {
          const insetLine = [[-1+inset,1.02-inset],[-1+inset,-.96],[-.90,-1.06+inset],[.90,-1.06+inset],[1-inset,-.96],[1-inset,1.02-inset],[.52+inset,1.02-inset],[.52+inset,-.52],[.48,-.57-inset],[-.48,-.57-inset],[-.52-inset,-.52],[-.52-inset,1.02-inset]];
          ctx.beginPath();
          insetLine.map(([x,y]) => project(x,y,z)).forEach(([x,y],j) => j ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
          ctx.closePath();
          ctx.lineWidth=.75;
          ctx.strokeStyle=inset<.05 ? "#77533d" : "#e4c0a2";
          ctx.stroke();
        }
      }
    }
  }

  function tick(now) {
    raf = 0;
    if (!visible || document.hidden || paused) return;
    if (now - last >= 1000/32) {
      time += last ? Math.min((now-last)/1000,.07) : 0;
      last = now;
      leanX += (pointerX-leanX)*.12;
      leanY += (pointerY-leanY)*.12;
      render();
    }
    raf = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(raf);
    last = 0;
    render();
    if (!paused && visible && !document.hidden) raf = requestAnimationFrame(tick);
    control.classList.toggle("is-paused", paused);
    control.setAttribute("aria-label",paused ? "Включить анимацию" : "Приостановить анимацию");
  }
  new ResizeObserver(() => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    const density = Math.min(devicePixelRatio || 1, 1.65);
    canvas.width = Math.round(width * density);
    canvas.height = Math.round(height * density);
    ctx.setTransform(density,0,0,density,0,0);
    render();
  }).observe(canvas);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(canvas);
  document.addEventListener("visibilitychange",sync);
  window.addEventListener("scroll",() => {
    if (visible) scroll = clamp(-hero.getBoundingClientRect().top / hero.offsetHeight,0,1);
  },{passive:true});
  hero.addEventListener("pointermove",e => {
    if (e.pointerType !== "mouse") return;
    const bounds = hero.getBoundingClientRect();
    pointerX = (e.clientX-bounds.left)/bounds.width*2-1;
    pointerY = (e.clientY-bounds.top)/bounds.height*2-1;
  });
  hero.addEventListener("pointerleave",() => { pointerX = pointerY = 0; });
  reduced.addEventListener("change",() => { paused=reduced.matches; sync(); });
  control.hidden = false;
  control.addEventListener("click",() => { paused = !paused; sync(); });
  sync();
})();

// The page keeps its normal flow. Scrolling only moves decorative artwork.
(() => {
  const practice = document.getElementById("practice");
  const cover = document.getElementById("case-cover");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const index = document.createElement("div");
  index.className = "index-object";
  index.setAttribute("aria-hidden", "true");
  const stack = document.createElement("div");
  stack.className = "index-stack";
  for (let n = 0; n < 4; n++) {
    const leaf = document.createElement("i");
    leaf.className = "index-leaf";
    stack.append(leaf);
  }
  for (const name of ["index-clip", "index-monogram"]) {
    const detail = document.createElement("i");
    detail.className = name;
    stack.lastElementChild.append(detail);
  }
  index.append(stack);
  practice.append(index);

  const model = cover.querySelector(".apartment-model");
  const canvas = model.querySelector("canvas");
  let renderer;
  let attempted = false;
  const clamp = value => Math.max(0, Math.min(1,value));
  function drawApartment(progress) {
    if (!attempted) {
      attempted = true;
      renderer = createApartmentView(canvas);
    }
    if (!renderer || !model.clientWidth || !model.clientHeight) return;
    renderer(model.clientWidth, model.clientHeight, progress);
    model.classList.add("has-render");
  }
  canvas.addEventListener("webglcontextlost", event => {
    event.preventDefault();
    renderer = null;
    model.classList.remove("has-render");
  });
  canvas.addEventListener("webglcontextrestored", () => { attempted = false; schedule(); });

  let activeFrame = 0;
  const visible = new Set();
  function frame() {
    activeFrame = 0;
    const viewport = document.documentElement.clientHeight;
    const progress = element => {
      const bounds = element.getBoundingClientRect();
      return clamp((viewport-bounds.top)/(viewport+bounds.height));
    };
    if (visible.has(index)) {
      const open = reduced.matches ? .83 : clamp((progress(index)-.12)/.72);
      index.style.setProperty("--index-spread",(.1 + open*1.47).toFixed(3));
    }
    if (visible.has(model)) drawApartment(reduced.matches ? .83 : progress(model));

  }
  function schedule() { if (!activeFrame) activeFrame=requestAnimationFrame(frame); }
  const observer = new IntersectionObserver(entries => {
    for (const {target,isIntersecting} of entries) {
      if (isIntersecting) visible.add(target); else visible.delete(target);
    }
    schedule();
  },{rootMargin:"10% 0px"});
  for (const el of [index,model]) observer.observe(el);
  window.addEventListener("scroll",()=>{ if (visible.size && !reduced.matches) schedule(); },{passive:true});
  window.addEventListener("resize",schedule);
  reduced.addEventListener("change",schedule);
  const resize = new ResizeObserver(schedule);
  for (const el of [practice,cover]) resize.observe(el);
})();

// Orthographic cutaway. Geometry and the light map stay on the GPU; scrolling
// changes only the camera and the distance between the apartment and its plinth.
function createApartmentView(canvas) {
  const gl = canvas.getContext("webgl2", { alpha: true, antialias: true, premultipliedAlpha:false, powerPreference:"low-power" });
  if (!gl) return null;
  const vertices = [];
  const indices = [];
  const colors = new Map();
  const paint = (hex) => {
    if (!colors.has(hex)) colors.set(hex, hex.match(/\w\w/g).map(c=>parseInt(c,16)/255));
    return colors.get(hex);
  };
  const tau = Math.PI * 2;
  const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
  let onBase = 0;
  // Shapes are indexed patches. Position, normal and material travel together.
  function surface(nx, ny, color, material, sample) {
    const start = vertices.length / 11;
    const rgb = paint(color);
    for (let j=0;j<=ny;j++) for (let i=0;i<=nx;i++) {
      const [p,n] = sample(i/nx,j/ny);
      vertices.push(...p,...n,...rgb,material,onBase);
    }
    for (let j=0;j<ny;j++) for (let i=0;i<nx;i++) {
      const a=start+j*(nx+1)+i, b=a+nx+1;
      indices.push(a,b,a+1,a+1,b,b+1);
    }
  }
  const norm = p => { const m=Math.hypot(...p)||1; return p.map(x=>x/m); };
  const cross = (a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const add = (a,b)=>a.map((v,i)=>v+b[i]);
  const mul = (a,k)=>a.map(v=>v*k);
  function rotate(p, yaw, tilt=0) {
    const y=p[1]*Math.cos(tilt)-p[2]*Math.sin(tilt);
    const z=p[1]*Math.sin(tilt)+p[2]*Math.cos(tilt);
    return [p[0]*Math.cos(yaw)+z*Math.sin(yaw),y,-p[0]*Math.sin(yaw)+z*Math.cos(yaw)];
  }
  // Dimensions are in meters and the origin is at the center of the floor.
  function block(x,y,z,w,h,d,color,radius=0,material=0,yaw=0,tilt=0) {
    const half=[w/2,h/2,d/2], r=Math.min(radius,...half);
    // Extra samples at each bevel keep seat cushions round without subdividing flat faces.
    function along(unit,extent) {
      if (!r) return (unit*2-1)*extent;
      const cuts=[-extent,-extent+r*.24,-extent+r*.58,-extent+r,extent-r,extent-r*.58,extent-r*.24,extent];
      return cuts[Math.round(unit*7)];
    }
    for(let k=0;k<3;k++) for(const sign of [-1,1]) {
      const a=(k+1)%3,b=(k+2)%3;
      surface(r?7:1,r?7:1,color,material,(u,v)=>{
        const p=[0,0,0]; p[k]=sign*half[k];p[a]=along(u,half[a]);p[b]=along(v,half[b]);
        const inner=p.map((v,i)=>clamp(v,-half[i]+r,half[i]-r));
        const n=r ? norm(p.map((v,i)=>v-inner[i])) : [0,0,0];
        if(!r)n[k]=sign;
        const pt=r?add(inner,mul(n,r)):p;
        return [add([x,y,z],rotate(pt,yaw,tilt)),rotate(n,yaw,tilt)];
      });
    }
  }
  function oval(x,y,z,rx,ry,rz,color,material=0,yaw=0,tilt=0) {
    surface(15,10,color,material,(u,v)=>{
      const t=(v-.5)*Math.PI, p=[Math.cos(u*tau)*Math.cos(t),Math.sin(t),Math.sin(u*tau)*Math.cos(t)];
      return [add([x,y,z],rotate([p[0]*rx,p[1]*ry,p[2]*rz],yaw,tilt)),rotate(norm([p[0]/rx,p[1]/ry,p[2]/rz]),yaw,tilt)];
    });
  }
  function tube(from,to,r1,r2,color,material=0,sides=18) {
    const axis=norm(to.map((v,i)=>v-from[i]));
    const a=norm(cross(axis,Math.abs(axis[1])>.88?[1,0,0]:[0,1,0])),b=cross(a,axis);
    const length=Math.hypot(...to.map((v,i)=>v-from[i]));
    const radial=u=>add(mul(a,Math.cos(u*tau)),mul(b,Math.sin(u*tau)));
    surface(sides,1,color,material,(u,v)=>{
      const ray=radial(u);
      return [add(add(from,mul(axis,length*v)),mul(ray,r1+(r2-r1)*v)),norm(add(ray,mul(axis,(r1-r2)/length)))];
    });
    for(const [center,r,sign] of [[from,r1,-1],[to,r2,1]])surface(sides,1,color,material,(u,v)=>[add(center,mul(radial(u),v*r)),mul(axis,sign)]);
  }
  const wood="97694b", oak="bb936b", brass="a98350", plaster="e7dfce", ivory="f5ead7", linen="e5d8c4";
  const cyl=(x,y,z,r,h,col,mat=0)=>tube([x,y,z],[x,y+h,z],r,r,col,mat);
  function table(x,y,z,r,h) {
    for(let i=0;i<3;i++){
      const a=i*tau/3+.3;
      tube([x+Math.cos(a)*r*.75,y,z+Math.sin(a)*r*.75],[x+Math.cos(a)*r*.45,y+h-.05,z+Math.sin(a)*r*.45],.035,.05,wood,2);
    }
    cyl(x,y+h-.06,z,r,.065,oak,2);
  }
  function plant(x,y,z,size,seed) {
    const p=(a,b,c)=>[x+a*size,y+b*size,z+c*size];
    tube(p(0,0,0),p(0,.36,0),.18*size,.235*size,"b67859",3);
    cyl(x,y+.35*size,z,.218*size,.018*size,"51402c");
    const greens=["556349","73794f","687754","87895a"];
    for(let i=0;i<15;i++) {
      const a=i*2.399+seed, reach=(.20+.16*Math.abs(Math.sin(i*5.1)))*size;
      const top=y+(.68+.66*((i*7)%15)/15)*size;
      const end=[x+reach*Math.cos(a),top,z+reach*Math.sin(a)];
      tube(p(0,.29,0),end,.009*size,.005*size,"67664a",0,5);
      oval(...end,.075*size,.023*size,.17*size,greens[i%4],0,1.57-a,-.5+.7*Math.sin(i));
    }
  }
  function lamp(x,y,z,h,r) {
    cyl(x,y,z,r*.61,.035,brass); cyl(x,y+.03,z,.019,h-.09,brass);
    tube([x,y+h-.12,z],[x,y+h+.12,z],r,r*.68,"f6d49d",5);
  }
  function art(x,y,z,w,h,pattern) {
    block(x,y,z,w,h,.055,wood,0,2);
    block(x,y,z+.035,w-.055,h-.055,.018,"f5e9d4");
    block(x,y,z+.050,w*.72,h*.72,.008,pattern===1?"b8ac8c":"c39871",0,6);
    oval(x-w*.1,y+h*.08,z+.058,w*.14,h*.14,.006,pattern===1?"7a8064":"e6c79e");
    oval(x+w*.10,y-h*.13,z+.061,w*.19,h*.12,.006,pattern===1?"ae7456":"8e775b");
  }
  // A walnut presentation base and a warm oak floor, with a real tile inset.
  onBase=1;
  block(0,-.26,0,9.50,.14,6.72,"524839",.035,2);
  block(0,-.178,0,9.43,.028,6.65,"b0936e",0,2);
  onBase=0;
  block(0,-.065,0,9.04,.16,6.25,"a17e5c",0,2);
  block(0,.028,0,8.96,.038,6.18,"c5a079",0,1);
  block(3.01,.058,1.99,2.88,.045,2.05,"cabaaa",0,7);
  const rear=-2.99;
  block(-4.40,1.03,0,.18,2.0,6.14,plaster,0,3);
  block(2.09,1.03,rear,4.66,2,.16,plaster,0,3);
  block(-4.03,1.03,rear,.74,2,.16,plaster,0,3);
  block(-1.94,.31,rear,3.52,.57,.16,plaster,0,3);
  block(-1.94,1.94,rear,3.52,.18,.16,plaster,0,3);
  block(-1.93,.60,rear+.05,3.65,.08,.32,oak,0,2);
  // Glass looks onto a softly lit canopy instead of an empty hole in the facade.
  surface(1,1,"e5dabc",9,(u,v)=>[[-3.69+u*3.5,.59+v*1.29,rear-.074],[0,0,1]]);
  for(const x of [-3.67,-2.51,-1.36,-.20])block(x,1.23,rear, .05,1.27,.10,wood);
  block(-1.93,1.45,rear,3.52,.035,.10,wood);
  // Curtains have a scalloped profile, soft folds and a slight flare at the hem.
  for(const x of [-3.86,-.25])surface(32,6,"f1e5cf",4,(u,v)=>{
    const wave=u*tau*4;
    return [[x+(u-.5)*(.37+.26*(1-v)),.30+v*1.59,-2.84+.073*Math.sin(wave)],
      norm([-.64*Math.cos(wave),.05,1])];
  });
  tube([-4.10,1.91,-2.81],[-.00,1.91,-2.81],.025,.025,brass);
  block(-4.28,.12,0,.06,.13,6.0,"e1d4ba");
  block(.02,.12,-2.86,8.5,.13,.05,"e1d4ba");
  // Cut walls at the near edge leave the rooms and furnishings in view.
  block(.80,.68,-1.28,.12,1.28,3.4,plaster,0,3);
  block(.81,.39,1.99,.13,.69,2.0,plaster,0,3);
  block(1.44,.37,.95,1.35,.65,.12,plaster,0,3);
  block(3.69,.37,.95,1.42,.65,.12,plaster,0,3);
  block(.0,.15,3.01,8.94,.22,.12,plaster);
  block(4.40,.15,.0,.12,.22,6.12,plaster);

  // Living room: low linen sofa, separate seat and back cushions, kilim and tea table.
  block(-2.03,.065,-.51,3.60,.032,2.66,"ad785d",.012,8);
  for(const x of [-3.46,-.58])for(const z of [-2.37,-1.68])cyl(x,.05,z,.065,.15,wood);
  block(-2.02,.31,-2.04,3.31,.35,1.04,"798270",.11,4);
  block(-2.02,.62,-2.47,3.26,.66,.23,"899180",.10,4);
  for(let i=0;i<3;i++) {
    block(-3.04+i*1.01,.49,-1.98,.99,.21,.78,"a5ab92",.09,4);
    block(-3.04+i*1.01,.71,-2.31,1.00,.48,.18,"b3b59e",.08,4,0,-.14);
  }
  for(const x of [-3.61,-.43]) block(x,.49,-2.02,.21,.49,1.07,"949c85",.09,4);
  block(-3.25,.70,-2.13,.43,.44,.15,"c99569",.075,4,.19,-.25);
  block(-.81,.69,-2.07,.44,.43,.15,"e5dabe",.076,4,-.28,-.28);
  table(-2.09,.095,-.48,.51,.42);
  block(-2.17,.535,-.54,.36,.034,.24,"c4aa8e",.01,0,.18);
  block(-2.16,.561,-.53,.29,.027,.20,"6f7766",0,0,.07);
  cyl(-1.87,.52,-.41,.066,.091,"e8d8bd"); cyl(-1.87,.611,-.41,.047,.004,"6a4533");
  lamp(-3.94,.05,-2.22,1.32,.268);
  plant(.22,.05,-2.25,.9,1.5);

  // Kitchen and dining by the front cut. A slim walnut counter carries a sink and hob.
  block(-3.94,.48,1.46,.72,.86,2.77,"a48769",.025,2);
  block(-3.91,.93,1.46,.84,.08,2.82,"e2d5bb",.03,3);
  for(const z of [.46,1.12,1.78,2.44]){
    block(-3.565,.51,z,.026,.70,.61,"c0a17d",.01,2);
    block(-3.544,.77,z,.025,.025,.22,brass);
  }
  block(-3.91,.977,2.19,.46,.016,.65,"63615a",.007);
  block(-3.91,.988,2.18,.36,.008,.55,"9f9a8b",.004);
  cyl(-4.14,.98,2.52,.018,.21,brass);
  tube([-4.14,1.19,2.52],[-3.96,1.19,2.52],.015,.015,brass);
  block(-3.94,.977,.66,.52,.014,.66,"3e403c",.006);
  for(const z of [.50,.81])cyl(-3.93,.985,z,.12,.007,"6a6a61");
  block(-4.22,1.54,1.49,.26,.065,2.36,oak,0,2);
  for(let i=0;i<5;i++)cyl(-4.2,1.58,.73+i*.27,.075,.16+(i%2)*.09,i%2?"d7c3a2":"e8dac3");
  table(-1.60,.05,1.94,.67,.75);
  cyl(-1.6,.805,1.94,.108,.19,"c39b73",3);
  for(let i=0;i<5;i++)tube([-1.6,.96,1.94],[-1.61+Math.sin(i*2)*.11,1.30+Math.cos(i)*.05,1.94+Math.cos(i*2)*.08],.008,.005,"7c8059");
  for(const [x,z,rot] of [[-2.65,1.92,1.57],[-.53,1.95,-1.57],[-1.57,2.73,0]]) {
    const local=(a,b,c)=>add([x,b,z],rotate([a,0,c],rot));
    for(const side of [-1,1])for(const end of [-1,1])tube(local(side*.20,.07,end*.19),local(side*.16,.45,end*.15),.027,.034,wood);
    block(x,.48,z,.49,.085,.45,oak,.04,2,rot);
    const pos=local(0,.70,.20); block(...pos,.47,.38,.065,wood,.032,2,rot);
  }

  // Bedroom: stitched duvet, fluted headboard, hand-thrown ceramics and framed prints.
  block(2.57,.065,-1.12,2.8,.035,3.23,"cbb99a",.012,8);
  block(2.58,.24,-1.39,2.13,.34,2.56,wood,.055,2);
  block(2.58,.63,-2.67,2.22,1.12,.12,oak,.05,2);
  for(let i=0;i<18;i++)block(1.55+i*.12,.64,-2.60,.033,.95,.022,"ad805a",.009,2);
  block(2.58,.52,-1.36,2.08,.28,2.44,"eee6d6",.13,4);
  for(const x of [2.03,3.08])block(x,.705,-2.17,.88,.19,.55,"f1e7d7",.09,4,x<2.5?-.045:.055);
  // Analytic folds continue over both sides of the bed.
  surface(42,30,"d9c2a8",4,(u,v)=>{
    const t=u*2-1, x=t*1.10, drop=clamp((Math.abs(x)-.95)/.15,0,1);
    const fold=.042*Math.sin(x*14+v*3.7)*(.4+.6*v)+.022*Math.cos(v*19+x*3);
    return [[2.58+x,.69+fold-drop*drop*.29,-1.94+v*1.84],norm([drop*Math.sign(x)*1.6-.28*Math.cos(x*14+v*3.7),1,.08*Math.sin(v*19+x*3)])];
  });
  surface(36,6,"a26d54",4,(u,v)=>{
    const x=(u*2-1)*1.11, drop=clamp((Math.abs(x)-.95)/.15,0,1);
    return [[2.58+x,.727+.036*Math.sin(x*14+3)-drop*drop*.31,-.71+v*.39+.015*Math.sin(u*14)],norm([drop*Math.sign(x)*1.4-.22*Math.cos(x*14+3),1,0])];
  });
  table(3.95,.05,-2.23,.255,.42); lamp(3.95,.47,-2.23,.35,.21);
  table(1.25,.05,-2.25,.22,.44); cyl(1.25,.49,-2.25,.08,.14,"ac8d6d");
  art(2.21,1.48,-2.88,.68,.80,1); art(2.99,1.48,-2.88,.68,.80,2);
  // Stone bath in the near corner with timber shelving, terry towels and a houseplant.
  // Elliptical sections sweep the outside, rolled rim and deep inside of a ceramic tub.
  const bathSection = [[.38,.64,.12],[.47,.78,.19],[.50,.82,.61],[.49,.81,.66],[.44,.75,.67],[.42,.72,.63],[.34,.62,.32],[.29,.54,.27],[.005,.008,.26]];
  for (let j=1;j<bathSection.length;j++) {
    const [r0,d0,y0] = bathSection[j-1], [r1,d1,y1] = bathSection[j];
    surface(56,1,"e8dfd0",3,(u,v)=>{
      const a=tau*u, c=Math.cos(a), sn=Math.sin(a);
      const nx=Math.sign(c)*Math.pow(Math.abs(c),.70), nz=Math.sign(sn)*Math.pow(Math.abs(sn),.70);
      const r=r0+(r1-r0)*v, d=d0+(d1-d0)*v;
      return [[3.66+nx*r,y0+(y1-y0)*v,2.00+nz*d],norm([(y1-y0)*c,(r0-r1)*Math.abs(c)+(d0-d1)*Math.abs(sn),(y1-y0)*sn])];
    });
  }
  cyl(3.66,.267,2.35,.032,.009,brass);
  tube([4.15,.64,2.55],[4.15,.86,2.55],.024,.024,brass); tube([4.15,.86,2.55],[3.93,.86,2.55],.02,.02,brass);
  block(1.72,.32,2.59,1.22,.53,.45,oak,.02,2);
  block(1.72,.61,2.59,1.25,.055,.48,ivory,.021);
  for(let i=0;i<2;i++)block(1.47,.67+i*.07,2.58,.46,.068,.29,linen,.031,4);
  plant(2.36,.05,1.31,.57,.6);
  // Shelves on the side wall, spines with brass lettering bands and a reading chair.
  for (const level of [.98,1.42]) {
    block(-4.19,level,-1.43,.32,.052,2.13,wood,.008,2);
    for (let i=0;i<9;i++) {
      const h=.19+.09*(1+Math.sin(i*9+level*4));
      const z=-2.34+i*.125;
      block(-4.18,level+.028+h/2,z,.215,h,.105,["89795f","ab8d6d","5e6860","b8aa91","aa7053"][i%5],.007);
      block(-4.07,level+.07,z,.008,.009,.084,"d1b88a");
    }
    cyl(-4.16,level+.028,-.87,.104,.15,"d8c5a7",3);
  }
  cyl(-.23,.06,.28,.23,.23,wood,2);
  block(-.23,.37,.28,.71,.24,.67,"b88b69",.115,4,-.58);
  const chairBack=add([-.23,.61,.28],rotate([0,0,.27],-.58));
  block(...chairBack,.72,.50,.175,"c39573",.082,4,-.58);
  plant(-3.55,.05,-.76,.46,4);
  block(2.63,.09,.36,1.42,.08,.36,wood,.035,2);
  block(2.63,.24,.36,1.35,.22,.34,"b7a086",.07,4);

  const vertexSource = `#version 300 es
    precision highp float;
    layout(location=0) in vec3 pos;
    layout(location=1) in vec3 normal;
    layout(location=2) in vec3 color;
    layout(location=3) in float material;
    layout(location=4) in float isBase;
    uniform vec4 camera;
    uniform vec3 frame;
    uniform float shadowPass;
    out vec3 p,n,tint,shadowCoord;
    flat out int mat;
    const vec3 sun=vec3(-.468,.776,-.423);
    const vec3 right=vec3(.671,0.,-.742);
    const vec3 up=vec3(.576,.631,.520);
    void main(){
      p=pos; n=normal; tint=color; mat=int(material+.5);
      vec3 lightClip=vec3(dot(pos,right)/7.,dot(pos,up)/6.,-dot(pos,sun)/8.);
      shadowCoord=lightClip*.5+.5;
      vec3 viewPos=pos+vec3(0.,isBase*(.14-frame.z),0.);
      float depth=viewPos.x*camera.x+viewPos.z*camera.y;
      vec2 screen=vec2(viewPos.x*camera.y-viewPos.z*camera.x,viewPos.y*camera.w-depth*camera.z-.17);
      gl_Position=shadowPass>.5 ? vec4(lightClip,1.):vec4(screen*frame.xy,-(depth*camera.w+viewPos.y*camera.z)/12.,1.);
    }`;
  const fragmentSource = `#version 300 es
    precision highp float;
    in vec3 p,n,tint,shadowCoord;
    flat in int mat;
    uniform sampler2D lightMap;
    uniform float shadowPass;
    out vec4 frag;
    float hash(vec2 v){return fract(sin(dot(v,vec2(127.1,311.7)))*43758.5453);}
    float noise(vec2 v){vec2 cell=floor(v), f=fract(v);f=f*f*(3.-2.*f);
      return mix(mix(hash(cell),hash(cell+vec2(1.,0)),f.x),mix(hash(cell+vec2(0,1)),hash(cell+1.),f.x),f.y);}
    float footprint(vec2 c,vec2 halfSize){
      vec2 d=abs(p.xz-c)-halfSize;
      return exp(-7.*length(max(d,0.)));
    }
    void main(){
      if(shadowPass>.5){if(mat==9)discard;frag=vec4(1.);return;}
      vec3 N=normalize(n), base=tint;
      if(mat==1){
        // Staggered oak staves with individual grain and fine dark joints.
        float row=floor(p.z/.155), x=p.x+mod(row,3.)*.47;
        vec2 uv=vec2(x/1.46,p.z/.155), cell=floor(uv), f=fract(uv);
        vec2 seam=min(f,1.-f)/max(fwidth(uv),vec2(.001));
        float grain=noise(vec2(x*2.,p.z*74.+noise(vec2(x*1.3,row))*.98));
        base*=.88+.16*hash(cell)+.13*(grain-.5);
        base*=mix(.82,1.,smoothstep(.0,.92,min(seam.x,seam.y)));
      } else if(mat==2){
        base*=.94+.12*noise(vec2((p.x+p.z)*2.,p.y*52.+p.z*16.+sin(p.x*2.1)));
      } else if(mat==4){
        float weave=noise(vec2((p.x+p.z)*142.,p.y*150.+p.x*48.));
        base*=.96+.06*weave;
      } else if(mat==3 || mat==6){
        base*=.97+.05*noise(vec2(p.x*24.+p.z*16.,p.y*18.+p.z*17.));
      } else if(mat==9){
        float greenery=noise(p.xy*vec2(1.3,1.6))+.28*noise(p.xy*4.8);
        float canopy=1.-smoothstep(.85,1.06,p.y*.61+greenery*.51);
        vec3 sky=mix(vec3(.89,.86,.74),vec3(.69,.76,.76),smoothstep(.55,1.85,p.y));
        frag=vec4(mix(sky,vec3(.58,.64,.47)+.085*greenery,canopy*.71),1.);
        return;
      } else if(mat==7){
        vec2 f=abs(fract(p.xz*3.2)-.5);
        base*=mix(1.,.77,smoothstep(.47,.495,max(f.x,f.y)));
      } else if(mat==8){
        vec2 center=p.x<.8?vec2(-2.03,-.51):vec2(2.57,-1.12);
        vec2 size=p.x<.8?vec2(1.8,1.33):vec2(1.4,1.615);
        vec2 uv=p.xz-center;
        float border=min(size.x-abs(uv.x),size.y-abs(uv.y));
        float stripe=1.-smoothstep(.009,.025,abs(border-.085));
        stripe+=1.-smoothstep(.012,.03,abs(border-.18));
        vec2 cell=abs(fract(uv*vec2(2.4,3.0))-.5);
        float pattern=1.-smoothstep(.045,.10,abs(cell.x+cell.y-.42));
        base=mix(base,vec3(.89,.79,.65),clamp(stripe*.85+pattern*.29,0.,1.));
        base*=.96+.06*noise(uv*177.);
      }
      const vec3 L=vec3(-.468,.776,-.423);
      float direct=max(dot(N,L),0.);
      float shadow=0.;
      float bias=.00055+.0010*(1.-direct);
      for(int i=0;i<12;i++){
        float theta=float(i)*2.39996, radius=sqrt((float(i)+.5)/12.);
        vec2 delta=vec2(cos(theta),sin(theta))*radius*.0028;
        shadow+=step(shadowCoord.z-bias,texture(lightMap,shadowCoord.xy+delta).r)/12.;
      }
      float sky=.68+.18*N.y+.06*N.x+.042*N.z;
      float occlusion=1.;
      if(p.y>0. && p.y<.115 && N.y>.6){
        occlusion-=.20*max(footprint(vec2(-2.02,-2.05),vec2(1.49,.41)),footprint(vec2(2.58,-1.39),vec2(.98,1.18)));
        occlusion-=.075*exp(-5.*abs(p.z+2.87))+.075*exp(-5.*abs(p.x+4.26));
      }
      float local=exp(-2.5*distance(p,vec3(3.95,.89,-2.23)))+.85*exp(-2.4*distance(p,vec3(-3.94,1.37,-2.22)));
      vec3 ambient=vec3(.99,.968,.946)*sky*occlusion+vec3(.26,.22,.16)*max(0.,-.22*N.y+.20);
      vec3 lit=base*(ambient+vec3(.46,.38,.28)*direct*shadow+vec3(.31,.16,.044)*local);
      if(mat==5)lit=mix(lit,vec3(1.,.85,.61),.46);
      frag=vec4(lit,1.);
    }`;
  const shaders=[];
  const program=gl.createProgram();
  try{
    for(const [type,source] of [[gl.VERTEX_SHADER,vertexSource],[gl.FRAGMENT_SHADER,fragmentSource]]){
      const shader=gl.createShader(type); shaders.push(shader);
      gl.shaderSource(shader,source);gl.compileShader(shader);
      if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader));
      gl.attachShader(program,shader);
    }
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));
  }catch(error){
    console.warn("Apartment renderer:",error.message);
    gl.deleteProgram(program);return null;
  }finally{shaders.forEach(shader=>gl.deleteShader(shader));}
  gl.useProgram(program);
  const buffers=[gl.createBuffer(),gl.createBuffer()];
  gl.bindBuffer(gl.ARRAY_BUFFER,buffers[0]);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
  let offset=0;
  for(const [i,size] of [3,3,3,1,1].entries()){
    gl.enableVertexAttribArray(i); gl.vertexAttribPointer(i,size,gl.FLOAT,false,44,offset);offset+=size*4;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buffers[1]);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
  const count=indices.length;
  vertices.length=indices.length=0;
  const uniforms=Object.fromEntries(["camera","frame","shadowPass","lightMap"].map(key=>[key,gl.getUniformLocation(program,key)]));
  const shadowMap=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D,shadowMap);
  const atlas=Math.min(1536,gl.getParameter(gl.MAX_TEXTURE_SIZE));
  gl.texImage2D(gl.TEXTURE_2D,0,gl.DEPTH_COMPONENT24,atlas,atlas,0,gl.DEPTH_COMPONENT,gl.UNSIGNED_INT,null);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  const fbo=gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,shadowMap,0);
  gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
  if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)return null;
  gl.enable(gl.DEPTH_TEST);
  gl.bindTexture(gl.TEXTURE_2D,null);
  gl.viewport(0,0,atlas,atlas);gl.clear(gl.DEPTH_BUFFER_BIT);
  gl.uniform1f(uniforms.shadowPass,1);gl.drawElements(gl.TRIANGLES,count,gl.UNSIGNED_INT,0);
  gl.bindFramebuffer(gl.FRAMEBUFFER,null);
  gl.bindTexture(gl.TEXTURE_2D,shadowMap);
  gl.uniform1i(uniforms.lightMap,0);gl.uniform1f(uniforms.shadowPass,0);
  gl.deleteFramebuffer(fbo);
  return (width,height,progress) => {
    const density=Math.min(window.devicePixelRatio||1,2,1500/width);
    const w=Math.round(width*density), h=Math.round(height*density);
    if(canvas.width!==w||canvas.height!==h){ canvas.width=w;canvas.height=h;}
    gl.viewport(0,0,w,h);
    const yaw=.59-.30*(progress-.5), elev=.60+.09*progress;
    const scale=Math.min(width/11.75,height/8.35);
    gl.uniform4f(uniforms.camera,Math.sin(yaw),Math.cos(yaw),Math.sin(elev),Math.cos(elev));
    gl.uniform3f(uniforms.frame,2*scale/width,2*scale/height,.18+.48*(1-progress));
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES,count,gl.UNSIGNED_INT,0);
  };
}

// Start each portrait once, after its image has decoded. Stagger by column so
// the rhythm follows the grid when it wraps or the team search filters it.
{
  const teamGrid = document.querySelector("#team .team-grid");
  const reducePortraitMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const portraitObserver = new IntersectionObserver(entries => {
    const gridLeft = teamGrid.getBoundingClientRect().left;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const photo = entry.target;
      portraitObserver.unobserve(photo);
      const card = photo.closest(".lawyer-card");
      if (reducePortraitMotion.matches || card.matches(":focus-within")) continue;
      const column = Math.round((entry.boundingClientRect.left - gridLeft) / entry.boundingClientRect.width);
      const image = photo.querySelector("img");
      const ready = () => {
        if (reducePortraitMotion.matches || card.matches(":focus-within") || card.hidden) return;
        const bounds = photo.getBoundingClientRect();
        if (bounds.bottom <= 0 || bounds.top >= innerHeight) {
          portraitObserver.observe(photo);
          return;
        }
        card.style.setProperty("--portrait-delay", Math.min(column, 4) * 72 + "ms");
        card.classList.add("portrait-developing");
      };
      if (image.complete && image.naturalWidth) ready();
      else image.decode().then(ready, () => {});
    }
  }, { threshold: 0.15 });
  for (const photo of teamGrid.querySelectorAll(".lawyer-photo")) portraitObserver.observe(photo);
  teamGrid.addEventListener("focusin", event => {
    const card = event.target.closest(".lawyer-card");
    card?.classList.remove("portrait-developing");
  });
}
