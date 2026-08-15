// ---------- 讀取網址參數，渲染單一主題詳情 ----------
const params = new URLSearchParams(window.location.search);
const topicId = Number(params.get("id"));
const topic = topics.find((t) => t.id === topicId);

const detailEl = document.getElementById("topicDetail");

// 把 highlights 轉成「章節」陣列：每個章節有 id / 導覽用短標題 / 內容
function buildSections(highlights) {
  if (highlights.every((h) => typeof h === "string")) {
    return [
      {
        id: "section-summary",
        navLabel: "重點摘要",
        heading: "重點摘要",
        list: highlights,
      },
    ];
  }
  return highlights.map((h, i) => ({
    id: `section-${i}`,
    navLabel: h.title.replace(/^\d+\s*/, ""),
    heading: h.title,
    body: h.body,
    image: h.image,
  }));
}

function sectionHtml(section) {
  const body = section.list
    ? `<ul class="plain-list">${section.list.map((li) => `<li>${li}</li>`).join("")}</ul>`
    : `<p>${section.body}</p>`;
  const image = section.image
    ? `<img class="section-image" src="${section.image}" alt="${section.heading}" loading="lazy">`
    : "";
  return `<section id="${section.id}"><h2>${section.heading}</h2>${image}${body}</section>`;
}

if (topic) {
  document.title = `${topic.title} | 911 電子報`;
  const sections = buildSections(topic.highlights);

  const accentStyle = topic.gradient.startsWith("url(")
    ? "background-image:none;background-color:var(--bg)"
    : `background-image:${topic.gradient}`;

  // gradient 若是真實封面照（url(...)），就在摘要區上方顯示封面圖
  const coverImageMatch = topic.gradient.match(/^url\((['"]?)(.+)\1\)$/);
  const coverImageUrl = coverImageMatch ? coverImageMatch[2] : null;
  const coverImageHtml = coverImageUrl
    ? `<img class="detail-cover-image" src="${coverImageUrl}" alt="${topic.title}" loading="lazy">`
    : "";

  detailEl.innerHTML = `
    <div class="detail-accent" style="${accentStyle}"></div>
    <div class="detail-card-inner">
      <div class="detail-top">
        <div class="detail-top-main">
          <div class="tag-group">${topic.tags
            .map((tag) => `<span class="detail-tag">${tag}</span>`)
            .join("")}</div>
          <h1>${topic.title}</h1>
        </div>
        <div class="detail-top-links">
          <a href="${topic.slidesUrl}" target="_blank" rel="noopener" class="detail-link">簡報連結</a>
        </div>
      </div>

      <div class="detail-columns">
        <aside class="detail-toc">
          <div class="toc-label">Table of contents</div>
          <nav class="toc-nav" id="tocNav">
            ${sections
              .map((s) => `<a href="#${s.id}" class="toc-link" data-toc="${s.id}">${s.navLabel}</a>`)
              .join("")}
          </nav>
        </aside>
        <div class="detail-main" id="detailMain">
          <p class="detail-desc">${topic.desc}</p>
          ${coverImageHtml}
          ${sections.map(sectionHtml).join("")}
        </div>
      </div>
    </div>`;

  // ---------- Scroll spy：捲動時高亮目前章節對應的目錄項目 ----------
  const tocLinks = Array.from(document.querySelectorAll(".toc-link"));
  const sectionEls = sections.map((s) => document.getElementById(s.id));

  if (tocLinks.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          tocLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.toc === entry.target.id);
          });
        });
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );
    sectionEls.forEach((el) => el && observer.observe(el));
    if (tocLinks[0]) tocLinks[0].classList.add("active");
  }
} else {
  document.title = "找不到主題 | 911 電子報";
  detailEl.innerHTML = `
    <div class="detail-card-inner">
      <h1>找不到這個主題</h1>
      <p class="detail-desc">請回到首頁重新選擇一個主題。</p>
    </div>`;
}

// ---------- Theme toggle（與首頁相同邏輯） ----------
const themeToggle = document.getElementById("themeToggle");
let savedTheme = localStorage.getItem("theme");

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
