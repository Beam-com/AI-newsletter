// ---------- Header 導覽 + 彈窗（關於這個系列 / OFFICE HOUR / 場次） ----------

// 場次時間表（對應每場實體分享會）
const sessionSchedule = [
  {
    no: 1,
    date: "7/29（三）",
    time: "14:00–15:00",
    dept: "企業發展科",
    location: "遠見廳",
    scenarios: ["員工手冊知識問答", "SOP 改版差異比對"],
  },
  {
    no: 2,
    date: "8/5（三）",
    time: "10:30–11:30",
    dept: "財計處",
    location: "積極廳",
    scenarios: ["憑證與統計報表整理", "Excel 公式與樞紐即問即答", "獎金計算輔助、月結檢查清單"],
  },
  {
    no: 3,
    date: "8/12（三）",
    time: "14:00–15:00",
    dept: "服務組＋工程組",
    location: "積極廳",
    scenarios: ["Service Manual 翻譯", "設備手冊關鍵字查詢、維修案例彙整輔助判斷（日期需與科主管確認裝機排程）"],
  },
  {
    no: 4,
    date: "8/20（四）",
    time: "10:30–11:30",
    dept: "業務（北中南）",
    location: "積極廳",
    scenarios: ["客戶簡報形象化", "拜訪／會議紀錄整理", "銷售資料快速分析"],
  },
  {
    no: 5,
    date: "8/20（四）",
    time: "14:00–15:00",
    dept: "原廠組＋學術組",
    location: "積極廳",
    scenarios: ["原廠英文信件重點萃取與回覆", "原廠文件轉 PPT／Word", "文獻整理成教材", "Forecast 草稿"],
  },
  {
    no: 6,
    date: "8/27（四）",
    time: "14:00–15:00",
    dept: "營運整合科",
    location: "積極廳",
    scenarios: ["客服信件分類與回覆", "許可證／仿單／UDI 資料整理", "出貨異常標準回覆"],
  },
  {
    no: 7,
    date: "9/2（三）",
    time: "14:00–15:00",
    dept: "AI組",
    location: "遠見廳",
    scenarios: ["AI Coding 與軟體開發"],
  },
];

const officeHourQuestions = [
  "帳號怎麼開、工具怎麼裝",
  "操作卡在哪一步不知道怎麼繼續",
  "我手上這件事，到底能不能用 AI 做？",
  "這份資料能不能上傳、要先處理什麼",
];

// ---------- Render helpers ----------
function scenariosHtml(scenarios) {
  return `<ul>${scenarios.map((s) => `<li>${s}</li>`).join("")}</ul>`;
}

function aboutModalHtml() {
  return `
    <h2>關於這個系列</h2>
    <div class="modal-text">
      <p>每週三或四，用一小時，資訊組走進一個部門，一起把 AI 帶入實際工作情境，共規劃 7 場。</p>
      <p>每場主題主要來自各部門在 6 月需求調查提出的真實痛點，現場直接示範，並帶同仁動手做自己提的那一題。</p>
      <p>輪到的部門歡迎攜帶筆電，一起參與操作；還沒輪到的部門也不用擔心，每場重點都會整理成《AI電子報》，分享給全公司同仁參考。</p>
      <p>想知道確切時間與對象部門？歡迎點選上方「場次」查看完整時間表。</p>
    </div>`;
}

function officeHourModalHtml() {
  return `
    <h2>OFFICE HOUR</h2>
    <div class="modal-text">
      <p>全公司開放，不限部門！不用報名、不必準備，帶著疑問直接殺進來就對了～部門還沒輪到場次也沒關係，一樣歡迎你來湊熱鬧！</p>
      <p>每週 15:00–15:30 準時開攤，想知道確切時間地點，翻翻「場次」就知道囉！</p>
    </div>
    <div class="modal-text">
      <p style="margin-top:16px; font-weight:700; color:var(--text);">可以問：</p>
      <ul class="modal-plain-list">
        ${officeHourQuestions.map((q) => `<li>${q}</li>`).join("")}
      </ul>
    </div>`;
}

function sessionsModalHtml() {
  return `
    <h2>場次</h2>
    <p class="modal-note">※實作項目滿滿，但時間有限，可能無法逐一登場示範，請大家見諒～</p>
    <div class="modal-table-wrap">
      <table class="modal-table">
        <thead>
          <tr><th>場次</th><th>日期</th><th>時間</th><th>對象部門</th><th>地點</th><th>應用情境參考</th></tr>
        </thead>
        <tbody>
          ${sessionSchedule
            .map(
              (s) => `
            <tr>
              <td>${s.no}</td>
              <td class="nowrap">${s.date}</td>
              <td>${s.time}</td>
              <td>${s.dept}</td>
              <td class="nowrap">${s.location}</td>
              <td>${scenariosHtml(s.scenarios)}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`;
}

const modalRenderers = {
  about: aboutModalHtml,
  officehour: officeHourModalHtml,
  sessions: sessionsModalHtml,
};

// ---------- Modal 開關 ----------
const modalOverlayEl = document.getElementById("modalOverlay");
const modalBodyEl = document.getElementById("modalBody");
const modalCloseEl = document.getElementById("modalClose");

function openModal(type) {
  const render = modalRenderers[type];
  if (!render || !modalOverlayEl) return;
  modalBodyEl.innerHTML = render();
  modalOverlayEl.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modalOverlayEl) return;
  modalOverlayEl.classList.remove("is-open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".nav-link[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});

if (modalCloseEl) modalCloseEl.addEventListener("click", closeModal);
if (modalOverlayEl) {
  modalOverlayEl.addEventListener("click", (e) => {
    if (e.target === modalOverlayEl) closeModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
