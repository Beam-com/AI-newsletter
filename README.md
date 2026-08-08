# AI 電子週報

「每週一小時，把 AI 帶入工作」系列分享會的電子週報網站。純靜態 HTML / CSS / JS，無需建置工具。

## 專案結構

```
index.html          首頁（輪播 + 主題網格）
topic.html           主題詳情頁
css/style.css        樣式（含深色模式）
js/topics.js         主題資料（新增/發佈主題請改這裡）
js/script.js          首頁邏輯：輪播、網格、深色模式切換
js/header.js         導覽列彈窗（關於這個系列 / OFFICE HOUR / 場次）
js/topic-detail.js   主題詳情頁邏輯
images/               主題內文圖片
robots.txt            禁止搜尋引擎收錄
```

## 本機預覽

不需安裝任何套件，直接用瀏覽器開啟 `index.html`，或啟動一個簡易伺服器：

```
python3 -m http.server 8000
```

再開啟 `http://localhost:8000`。

## 新增 / 發佈主題

編輯 `js/topics.js`，在 `topics` 陣列中新增一筆資料，`published` 先設為 `false`；等要公布當週內容時，把 `published` 改成 `true` 即可上架、進入輪播。

## 部署（GitHub Pages）

Repo 設為 Public，並開啟 GitHub Pages（Settings → Pages → Source: `main` branch, root）。網站不會被搜尋引擎收錄（見 `robots.txt` 與各頁 `<meta name="robots" content="noindex, nofollow">`），但知道連結的人都能直接瀏覽，不需要 GitHub 帳號。

## 瀏覽數統計

網站使用 [GoatCounter](https://www.goatcounter.com/) 追蹤瀏覽數，`index.html` 和 `topic.html` 都在 `</body>` 前加了一行追蹤 script。每個主題詳情頁（`topic.html?id=1`、`?id=2`…）會自動被當成不同頁面分開統計，不需要額外設定。

後台報表：https://beam-ai-newsletter.goatcounter.com （需登入該帳號查看，數字不會顯示在網站頁面上）。
