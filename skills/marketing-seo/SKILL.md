---
name: marketing-seo
description: 負責把關 SEO、AEO (AI 搜尋優化) 以及 GA4 事件追蹤的標準做法。當被要求優化網頁搜尋排名、處理行銷文案，或埋設分析代碼時觸發。
---

# 行銷與流量追蹤優化 (Marketing, SEO & GA4)

當執行此技能時，必須將原本單純的「功能性程式碼」升級為「具備行銷與追蹤價值」的程式碼。即使使用者沒有明說，也請嚴格遵守以下三大面向，因為這決定了產品上線後的商業價值：

## 1. 基礎 SEO 與 AEO (答案引擎優化)
- **語意化 HTML (Semantic HTML)**：禁止全篇使用 `<div>` 來排版。必須正確使用 `<header>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`，讓傳統搜尋引擎與現代 AI 爬蟲（如 ChatGPT search）能精準抓取重點。
- **嚴謹的標題階層**：每個頁面只能有一個 `<h1>`（包含核心關鍵字），並確保 `<h2>` 到 `<h4>` 按邏輯遞進，絕對不可為了「字體大小」而跳級使用標題標籤。
- **Meta Tags 與關鍵字萃取 (Keyword Extraction)**：
  1. 所有新頁面必須自動生成 `title`, `description`, 以及完整的 Open Graph (`og:title`, `og:description`, `og:image`) 標籤。
  2. 當撰寫或處理長篇文章/筆記時，必須**主動閱讀全文語意，精準萃取出 3-5 個高價值的核心關鍵字 (Keywords)**，並自動將其填入 Markdown Frontmatter 的 `tags` 或 `keywords` 欄位中，免除人工手動抓關鍵字的麻煩。
- **無障礙與圖片標籤**：所有 `<img>` 標籤強制加上具備高度描述性的 `alt` 屬性（這對 SEO 與視障輔助同樣重要）。

## 2. 結構化資料 (Schema.org / JSON-LD)
為了讓 Google 在搜尋結果產生高點擊率的「複合式摘要 (Rich Snippets)」，遇到以下內容時，必須自動在 `<head>` 中嵌入 JSON-LD 結構化資料：
- **文章/技術筆記**：自動生成 `Article` 或 `BlogPosting` Schema。
- **教學步驟/FAQ**：自動生成 `HowTo` 或 `FAQPage` Schema。
- **麵包屑導覽**：若有分類層級，自動生成 `BreadcrumbList` Schema。

## 3. GA4 數據追蹤 (DataLayer 埋點)
當遇到需要追蹤的互動元素（例如：CTA 按鈕點擊、表單送出、下載檔案）時，不可只寫 onClick 執行表面邏輯，必須同步埋入標準的 GA4 dataLayer 事件：
- **基本實作格式**：
  ```javascript
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'custom_interaction',
    // 必須帶入有意義的維度參數
    element_category: 'button',
    element_action: 'click',
    element_label: 'subscribe_newsletter'
  });
  ```
- **命名規範**：事件名稱 (event) 與屬性一律使用 `snake_case`（全小寫加底線），例如 `sign_up`, `download_file`，禁止使用駱駝拼寫法。

## 4. 行銷文案結構準則 (Landing Page)
若被要求撰寫 Landing Page (著陸頁) 或行銷文案：
- **架構**：自動套用 AIDA 模型 (Attention, Interest, Desire, Action) 規劃網頁區塊。
- **首屏 (Hero Section)**：必須在第一眼包含強而有力的價值主張 (Value Proposition) 與明確的單一行為呼籲 (CTA)。
- **用詞**：文案切忌假大空（如「領先業界的解決方案」），必須具體點出痛點與效益。
