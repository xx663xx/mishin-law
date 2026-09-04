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
chatLauncher.addEventListener("click", () => toggleChat());
document.querySelector(".chat-close").addEventListener("click", () => toggleChat(false));
document.querySelector(".chat-reset").addEventListener("click", resetChat);
document.querySelectorAll("[data-chat-topic]").forEach((button) => button.addEventListener("click", () => runChatScenario(button.dataset.chatTopic, button.textContent.trim().replace(/^\d+\s*/, ""))));
document.querySelector(".chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  submitChat(chatInput.value);
});
resetChat();

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
