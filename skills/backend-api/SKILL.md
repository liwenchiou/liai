---
name: backend-api
description: 後端 API 企業級開發規範 (支援 Node.js / Express / PHP / Laravel)。融合了 awesome-cursorrules 的分層結構與高資安防禦。
---

# 🚀 Backend API 企業級開發規範

當你（AI）被指派撰寫或修改任何後端 API 程式碼時，**必須**嚴格遵守以下所有準則。此規範汲取了社群最佳實踐，並加入了極嚴格的資安護城河。

## 1. 共通架構與 API 設計 (Architecture & API Design)
- **三層式架構 (3-Tier Architecture)**：嚴格分離 Controller (處理 HTTP 請求)、Service (商業邏輯)、Repository/Data Access (資料庫操作)。絕不允許將邏輯與資料庫查詢全塞在路由 (Route) 裡。
- **RESTful 實踐**：遵守標準 HTTP Status Codes (200, 201, 400, 401, 403, 404, 500)。
- **統一 JSON 回傳格式**：
  ```json
  {
    "status": "success" | "error",
    "message": "人類可讀的描述訊息",
    "data": { }
  }
  ```

## 2. 共通資安防禦 (Wiz Security Baseline & OWASP - CRITICAL)
- **CWE-522 (憑證保護)**：絕對禁止 Hardcode 敏感金鑰 (API Keys, DB Credentials)。一律從環境變數 (`process.env`, `$_ENV`) 讀取，並確保不被寫入版控。
- **CWE-20 (嚴格輸入驗證)**：在最前端 (Route/Controller) 攔截非法輸入。強制使用 Schema Validation (如 Joi, Zod, Laravel Form Request) 進行白名單驗證。
- **CWE-79 (防禦 XSS)**：API 回傳若包含使用者輸入字串，需確保經過 Sanitization (消毒) 處理；伺服器端渲染必須強制使用自動 Escaping 的模板引擎。
- **CWE-89/94/502 (防禦各種注入)**：
  - **資料庫**：100% 禁用字串拼接 SQL，強制使用 ORM (Prisma/Eloquent) 或參數化查詢。
  - **指令與程式碼**：絕對禁止將不可信輸入傳給 `eval()`, `new Function()`, 或 `child_process.exec`。
- **CWE-22 (防禦路徑穿越)**：涉及檔案讀寫時，必須嚴格檢驗目標路徑是否在合法沙盒內 (如利用 `path.startsWith()` 與 `path.normalize()`)。
- **CWE-352 (防禦 CSRF)**：所有具備狀態變更的 API (POST/PUT/DELETE) 必須實作 Anti-CSRF Token，或設定 `SameSite=Lax/Strict` Cookies。
- **CWE-200 (防止敏感資訊外洩)**：全域攔截錯誤，回應給前端的 Error Message 必須過濾，絕不拋出實體路徑與 Stack Trace。日誌 (Logging) 必須遮蔽敏感個資與 Token。

## 3. Node.js / Express 專屬規範
- **非同步處理**：全面禁用舊式 Callback，強制使用 `async/await`，並搭配 `try/catch` 或是全域 `asyncHandler` 捕捉錯誤。
- **中介軟體 (Middleware)**：妥善設定 CORS, Helmet (Security Headers), Rate Limiting 等防禦機制。

## 4. PHP / Laravel 專屬規範
- **現代語法**：所有原生 PHP 檔案開頭必須加上 `declare(strict_types=1);`。強制遵守 PSR-12 編碼標準。
- **物件導向**：禁止寫出純腳本 (Procedural Script)，一律封裝成類別 (Class)。
- **Laravel 最佳實踐**：優先使用 Eloquent ORM 與 Collections。注重 DX (Developer Experience)、型別安全與完整的 Docblocks。

## 5. 測試與部署 (Testing & Deployment)
- **單元測試**：核心商業邏輯 (Services) 必須具備測試覆蓋。
- **環境變數**：敏感憑證必須透過 `.env` 讀取，絕不可 Hardcode 於原始碼中。
