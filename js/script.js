// 主題資料定義於 js/topics.js（此檔案先載入）

// ---------- 固定排版：1 個大區塊輪播 + 6 個 3x2 網格 ----------
// 網格固定顯示「最早的 6 筆」（按日期＋時間排序，由左到右）；
// 排在 6 筆之後、且已發佈的主題則進入大區塊輪播（未發佈者絕不進輪播）。
function sortKey(t) {
  const m = t.date.match(/(\d{1,2})\/(\d{1,2}).*?(\d{2}:\d{2})/);
  if (!m) return t.date;
  const [, month, day, time] = m;
  return `2026-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${time}`;
}

function sortedTopics() {
  return topics.slice().sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
}

function tagsHtml(tags, tagClass) {
  return `<div class="tag-group">${tags
    .map((tag) => `<span class="${tagClass}">${tag}</span>`)
    .join("")}</div>`;
}

function heroHtml(t) {
  return `
    <div class="slide-content">
      ${tagsHtml(t.tags, "slide-tag")}
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
    </div>`;
}

function lockedHeroHtml() {
  return `
    <div class="slide-content">
      ${tagsHtml(["敬請期待"], "slide-tag")}
      <h3>🔒 下一個主題即將公布</h3>
      <p>請持續關注，精彩內容準備中。</p>
    </div>`;
}

function cardHtml(t) {
  return `
    <a class="topic-card" href="topic.html?id=${t.id}" target="_blank" rel="noopener">
      <div class="topic-thumb" style="background-image:${t.gradient}">
        ${tagsHtml(t.tags, "tag")}
      </div>
      <div class="topic-body">
        <h3>${t.title}</h3>
        <p>${t.desc}</p>
        <div class="topic-meta">
          <span>${t.date}</span>
          <span class="read-more">查看詳情 →</span>
        </div>
      </div>
    </a>`;
}

function lockedCardHtml(t) {
  return `
    <div class="topic-card is-locked">
      <div class="topic-thumb is-locked-thumb">
        ${tagsHtml(["敬請期待"], "tag")}
      </div>
      <div class="topic-body">
        <h3>🔒 主題尚未公布</h3>
        <p>${t.date} 即將公開，敬請期待！</p>
      </div>
    </div>`;
}

// ---------- 大區塊輪播 ----------
let heroSlides = [];
let heroIndex = 0;
let heroAutoTimer = null;

const heroEl = document.getElementById("featuredHero");
const heroTrackEl = document.getElementById("heroTrack");
const heroDotsEl = document.getElementById("heroDots");
const heroPrevEl = document.getElementById("heroPrev");
const heroNextEl = document.getElementById("heroNext");

function goToHeroSlide(index) {
  if (!heroSlides.length) return;
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroTrackEl.style.transform = `translateX(-${heroIndex * 100}%)`;
  [...heroDotsEl.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === heroIndex);
  });
}

function startHeroAutoplay() {
  clearInterval(heroAutoTimer);
  if (heroSlides.length > 1) {
    heroAutoTimer = setInterval(() => goToHeroSlide(heroIndex + 1), 6000);
  }
}

function renderHeroCarousel(publishedTopics) {
  heroSlides = publishedTopics;
  heroIndex = 0;
  clearInterval(heroAutoTimer);

  if (!heroSlides.length) {
    heroEl.classList.add("is-locked");
    heroTrackEl.innerHTML = `<div class="hero-slide is-locked-slide">${lockedHeroHtml()}</div>`;
    heroDotsEl.innerHTML = "";
    heroPrevEl.hidden = true;
    heroNextEl.hidden = true;
    return;
  }

  heroEl.classList.remove("is-locked");
  heroTrackEl.innerHTML = heroSlides
    .map(
      (t) => `
    <a class="hero-slide" href="topic.html?id=${t.id}" target="_blank" rel="noopener" style="background-image:${t.gradient}">
      ${heroHtml(t)}
    </a>`
    )
    .join("");
  heroDotsEl.innerHTML = heroSlides
    .map((_, i) => `<span class="hero-dot${i === 0 ? " active" : ""}" data-index="${i}"></span>`)
    .join("");

  const multi = heroSlides.length > 1;
  heroPrevEl.hidden = !multi;
  heroNextEl.hidden = !multi;
  goToHeroSlide(0);
  startHeroAutoplay();
}

heroPrevEl.addEventListener("click", () => {
  goToHeroSlide(heroIndex - 1);
  startHeroAutoplay();
});
heroNextEl.addEventListener("click", () => {
  goToHeroSlide(heroIndex + 1);
  startHeroAutoplay();
});
heroDotsEl.addEventListener("click", (e) => {
  const dot = e.target.closest(".hero-dot");
  if (!dot) return;
  goToHeroSlide(Number(dot.dataset.index));
  startHeroAutoplay();
});
heroEl.addEventListener("mouseenter", () => clearInterval(heroAutoTimer));
heroEl.addEventListener("mouseleave", startHeroAutoplay);

function renderFeaturedLayout() {
  const sorted = sortedTopics();
  const gridTopics = sorted.slice(0, 6);
  const heroTopics = sorted.filter((t) => t.published);

  renderHeroCarousel(heroTopics);

  document.getElementById("featuredGrid").innerHTML = gridTopics
    .map((t) => (t.published ? cardHtml(t) : lockedCardHtml(t)))
    .join("");
}

// ---------- Theme toggle ----------
// 預設跟隨系統深色模式，按鈕可強制覆蓋並記住選擇
const themeToggle = document.getElementById("themeToggle");
let savedTheme = localStorage.getItem("theme"); // "dark" | "light" | null(跟隨系統)

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function effectiveTheme() {
  return savedTheme || systemTheme();
}

function applyTheme() {
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  themeToggle.textContent = effectiveTheme() === "dark" ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
  savedTheme = effectiveTheme() === "dark" ? "light" : "dark";
  localStorage.setItem("theme", savedTheme);
  applyTheme();
});

applyTheme();

// ---------- Init ----------
renderFeaturedLayout();
