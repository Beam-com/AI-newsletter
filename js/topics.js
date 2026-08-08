// ---------- 主題列表 ----------
// 每週新增一個主題：先把新的一筆資料加進來，published 設為 false。
// 版面為「1 大區塊輪播 + 兩段式網格」：
// 依日期＋時間排序後，前 3 筆進上排（3 欄），第 4 筆之後進下排（4 欄，
// 筆數增加時自動往下多長列）；未發佈者以「敬請期待」鎖定卡呈現；
// 所有已發佈的主題（不論排序位置）都會進大區塊輪播（未發佈者絕不會出現在輪播）。
// 等要公布當週時，把 published 改成 true 即可正常顯示、可點擊、並進入輪播。
const topics = [
  {
    id: 1,
    published: true,
    tags: ["企業發展科"],
    title: "讓 62 頁員工手冊，變成你的人資小幫手",
    desc: "不用怕，AI 其實很好上手！第 1 場與企業發展科同仁共同完成，從工具挑選、資料安全、厚文件問答到提示詞技巧，用生活化比喻帶大家 3 分鐘掌握把 AI 帶入工作的實用心法。",
    gradient: "url('images/0729-Cover.png')",
    date: "7/29 (三) 14:00-15:00",
    slidesUrl: "https://km.vitalyun.com/km/readdocument.aspx?documentId=13185",
    highlights: [
      {
        title: "01　各家 AI 工具都很強，先選一個順手的來用就好",
        body: "ChatGPT、Claude、Gemini、Grok 就像不同品牌的手機，各有各的強項，沒有「絕對最好」這回事，不用糾結選哪一個，先用了再說。現在還是各家搶用戶的階段，只要註冊帳號幾乎都能免費體驗。\n公司已經買了 Gemini 企業版，用公司 Google 帳號登入就能直接用，不用另外付費。",
        image: "images/0729-Image1-SOTA_AI.png"
      },
      {
        title: "02　用 AI 前，先做兩件事保護資料安全",
        body: "① 關掉「用我的對話改善模型」：這個設定預設是開著的，意思是你打的內容可能被拿去訓練 AI，順手關掉它\n　- ChatGPT：設定→資料控制→關閉\n　- Claude：設定→隱私權→關閉\n② 檔案內含個資資料，上傳前先「消音」：簡單判斷原則——這份資料如果外流了，會不會讓人認出是「誰」？會的話，先處理再上傳，方法有 4 種，挑一種用就好：\n　- 拿掉（刪除姓名）\n　- 換掉（王小明→A 君）\n　- 模糊化（1985/03/12→40 多歲）\n　- 打馬賽克（遮住部分內容）。",
        image: "images/0729-Image2-Data Privacy-Setting.jpg"
      },
      {
        title: "03　厚厚文件不用自己翻，直接丟給 AI 用問的",
        body: "以前要查員工手冊裡的規定，得自己一頁一頁翻，或是跑去問人事。現在可以把整本手冊直接丟給 AI，像跟同事聊天一樣問它：\n　- 「我年資 3 年 2 個月，有幾天特休？」\n　- 「幫我把請假規定整理成一頁速查表。」\n小提醒：問問題時多加一句「請標出資料參考頁碼」。AI 有時候會「一本正經地講錯話」（俗稱幻覺），有頁碼我們才能回頭核對是不是真的。",
        image: "images/0729-Image3-Case-Employee-Handbook.png"
      },
      {
        title: "04　不用背咒語，話講清楚「三段」就好",
        body: "很多人以為要背特殊的「提示詞」才能把 AI 用好，其實不用，講清楚這三件事就夠了：\n① 這是什麼（我要給你一份什麼資料）\n② 要做什麼（具體任務，例如「比較兩個年度的差異」）\n③ 要長什麼樣（輸出格式：表格／條列／寫成一則公告）。\n不講清楚，AI 就會自己「看心情」決定怎麼回答你。現在的 AI 不怕你問得多，只怕你講得不夠清楚。",
        image: "images/0729-Image4-Prompt.png"
      },
      {
        title: "05　現場 Q & A",
        body: "Q1：怎麼知道 AI 沒有在亂講？請它附上參考來源、頁碼，自己點進去核對；或是把答案拿去貼給另一家 AI，交叉驗證。\nQ2：每個月都要上政府網站查法規更新，很花時間？很多政府網站有提供「電子報訂閱」或「RSS 訂閱」，內容一更新就會主動通知你。\nQ3：常常要寫格式很像的公告，每次都重打一遍？可以把固定格式做成 Gemini 的「Gem」或 ChatGPT 的「GPT」，就像存一個範本，之後只要餵當次的內容進去，格式就自動套好了。",
      },
    ],
  },
  {
    id: 2,
    published: true,
    tags: ["財計處"],
    title: "把「發票憑證登打」交給 AI",
    desc: "一疊發票、拍三張照片，AI 讀照片、照規則填欄位，人只負責覆核 2 個欄位。第 2 場與財計處同仁共同完成，從 Chat／Cowork／Code 的差異、資料安全，到憑證登打實戰與提示詞心法，3 分鐘掌握本場重點。",
    gradient: "url('images/0805-Cover.png')",
    date: "8/5 (三) 14:00-14:40",
    slidesUrl: "https://km.vitalyun.com/km/readdocument.aspx?documentId=13185",
    highlights: [
      {
        title: "01　主流 AI 工具，先求有再求好",
        body: "ChatGPT｜通用場景、圖畫得好\nGemini｜整合 Google 服務、畫圖也不錯\nClaude｜資料分析、程式開發，不會畫圖\nGrok｜ChatGPT 做不出來的，可以找 Grok 試試\n公司已經買了 Gemini 企業版，用公司 Google 帳號登入就能直接用，不用另外付費。\n重點是學概念，工具依場景挑選，或挑一個順手的先用，大膽嘗試，可以先求有、再求好。",
        image: "images/0805-Image2-AI-Tools-Overview.png"
      },
      {
        title: "02　先分清楚在用哪一種：Chat／Cowork／Code",
        body: "用 AI 常常搞混要選哪一種模式，其實分成三種：\n① CHAT（一問一答）：像聊天一樣，你問一句、它答一句，每一步你都看得到、可以隨時喊停。\n② COWORK（交辦整件事）：把一整個任務交出去，AI 會自己讀你的工作資料夾、跨檔案多步驟做完，甚至能排程定期跑，最後再回報結果給你。\n③ CODE（寫程式自動化）：進階用法，用自然語言請 AI 幫你寫程式、測試、部署。\n多數人天天用的都是 Chat，但真正省時間的其實是 Cowork──把一整件事交出去，讓它自己做完再回報。",
        image: "images/0805-Image1-Chat-Cowork-Code.png"
      },
      {
        title: "03　用 AI 前，先做兩件事保護資料安全",
        body: "① 關掉「用我的對話改善模型」：這個設定預設是開著的，意思是你打的內容可能被拿去訓練 AI，順手關掉它\n　- ChatGPT：設定→資料控制→關閉\n　- Claude：設定→隱私權→關閉\n② 含個資的資料，上傳前先「消音」：簡單判斷原則──這份資料如果外流了，會不會讓人認出是「誰」？會的話，先處理再上傳，方法有 4 種，挑一種用就好：\n　- 拿掉（刪除姓名）\n　- 換掉（王小明→A 君）\n　- 模糊化（1985/03/12→40 多歲）\n　- 打馬賽克（遮住部分內容）。",
        image: "images/0805-Image3-Data-Privacy-Setting.png"
      },
      {
        title: "04　實戰：把「發票憑證登打」交給 AI",
        body: "財計處同仁每個月月底都要處理一疊憑證，停車費、ETC 都有，一張一張看、一張一張輸入，一筆要填 12 個欄位；量大不說，規則還很細──哪一筆不可申報？稅別碼是 P07 還是 P21？填錯就要重來一次。\n解法是把照片＋規則一起交給 AI：AI 讀照片、照規則填欄位，人只要負責覆核 2 個欄位就好。\n現場示範同一張照片、用三種不同講法問 AI，結果差很多（同仁自評 0-10 分）：\n　1. 只丟照片，不給格式（3 分）：「這是一張停車費電子發票證明聯，請整理成一個表格」\n　2. 加上具體欄位（5 分）：「欄位有：序號、憑證類別、會計科目、稅別碼……」\n　3. 給脈絡、讓 AI 自己讀懂用途（6 分）：「將這張『停車費電子發票證明聯』，整理成『財計處』要的報帳『憑證發票登記』」\n最後驗收：3 張照片、9 筆憑證（其中一張藏了 4 張，最容易漏）、1 筆 P07（傳統手開發票）、5 筆 P21（熱感應發票）、3 筆不可申報（沒有發票號碼，稅額必須是 0）。\n金句：「AI 只會照你給的規則做，規則沒寫的，它會自己猜。」現場就踩到一個坑──ETC 那筆的憑證日期，規則卡沒寫清楚要用扣款日，AI 只填了通行日，這句話比示範本身更值得記住。",
        image: "images/0805-Image4-Case-Invoice-Registration.png"
      },
      {
        title: "05　提示詞心法：先讓 AI 說一遍 SOP，人再檢查",
        body: "想讓 AI 做得準，可以先給它「參考文件」和「期望產出」，讓它在動手前，先把自己打算怎麼做的工作流程（SOP）說一遍。人先檢查這份 SOP 對不對，再把它整段貼回去，請 AI 照著執行──這樣出錯的機率會小很多。\n可接受的分數可以先抓在 7 分（因人而異）：如果做了 3 次分數都沒提高，換個角度或請別人看看你的提示詞；如果 7~10 分卡了 3 次都不再進步，就交回人來做。\n記住這組心法「3-3-3」：每天找 3 個不同場景、寫 3 個版本的提示詞、每週三來 Office Hour 討論。",
        image: "images/0805-Image5-Prompt-333.png"
      },
    ],
  },
  {
    id: 3,
    published: false,
    tags: ["服務組", "工程組"],
    title: "技術手冊翻譯與維修案例彙整",
    desc: "結合 AI 翻譯技術手冊、彙整維修案例，提升服務與工程效率。",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    date: "8/12 (三) 14:00-15:00",
    slidesUrl: "https://km.vitalyun.com/km/readdocument.aspx?documentId=13185",
    highlights: [
      "AI 協助翻譯技術手冊，跨語言溝通無障礙",
      "彙整維修案例，建立可查詢的知識庫",
      "提升服務與工程作業效率",
    ],
  },
  {
    id: 4,
    published: false,
    tags: ["業務(北中南)"],
    title: "業務簡報彙整與原廠文件轉譯",
    desc: "透過 AI 彙整業務簡報並轉譯原廠文件，加速跨組資訊流通。",
    gradient: "linear-gradient(135deg, #fa709a, #fee140)",
    date: "8/20 (四) 10:30-11:30",
    slidesUrl: "https://km.vitalyun.com/km/readdocument.aspx?documentId=13185",
    highlights: [
      "AI 協助彙整業務簡報重點",
      "快速轉譯原廠文件內容",
      "加速跨組資訊流通與溝通",
    ],
  },
  {
    id: 5,
    published: false,
    tags: ["原廠組", "學術組"],
    title: "業務簡報彙整與原廠文件轉譯",
    desc: "透過 AI 彙整業務簡報並轉譯原廠文件，加速跨組資訊流通。",
    gradient: "linear-gradient(135deg, #fa709a, #fee140)",
    date: "8/20 (四) 10:30-11:30",
    slidesUrl: "https://km.vitalyun.com/km/readdocument.aspx?documentId=13185",
    highlights: [
      "AI 協助彙整業務簡報重點",
      "快速轉譯原廠文件內容",
      "加速跨組資訊流通與溝通",
    ],
  },
  {
    id: 6,
    published: false,
    tags: ["營運整合科"],
    title: "客服信件分類與法規資料整理",
    desc: "運用 AI 分類客服信件、整理法規資料，簡化營運整合作業。",
    gradient: "linear-gradient(135deg, #30cfd0, #330867)",
    date: "8/27 (四) 14:00-15:00",
    slidesUrl: "https://km.vitalyun.com/km/readdocument.aspx?documentId=13185",
    highlights: [
      "AI 自動分類客服信件，加快回覆效率",
      "整理法規資料，降低查找時間",
      "簡化營運整合作業流程",
    ],
  },
  {
    id: 7,
    published: false,
    tags: ["AI組"],
    title: "AI Coding 與軟體開發",
    desc: "介紹如何運用 AI Coding 工具加速軟體開發流程。",
    gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
    date: "9/2 (三) 14:00-15:00",
    slidesUrl: "https://km.vitalyun.com/km/readdocument.aspx?documentId=13185",
    highlights: [
      "介紹 AI Coding 工具的核心概念",
      "展示如何加速軟體開發流程",
      "分享實務應用案例與心得",
    ],
  },
];
