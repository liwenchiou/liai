---
name: git
description: Git 自動化協作流程與 Commit 撰寫規範
---

# Git Workflow

當我明確要求你「幫我執行 git」、「幫我 commit」或類似指令時，請嚴格遵守以下標準作業流程：

## Step 1: 環境確認
- 優先確認目前的終端機路徑（CWD）是否確實位於本專案的正確路徑下，避免在錯誤的目錄執行指令。

## Step 2: 暫存與修改檢查 (Staging & Diff)
- 決定要加入版控的範圍：使用 `git add .` 或只針對有修改的檔案進行加入。
- 必須使用 `git diff`（或 `git diff --staged`）來確認**實際上做了什麼修改**，藉此精準了解程式碼的上下文變動。

## Step 3: 發布前資安快篩 (Pre-Push Security Check - CRITICAL)
- **防禦敏感外洩**：根據 `git diff` 的結果，嚴格肉眼審查是否有意外 add 了 `.env`、私鑰 (`.pem`, `.key`) 或任何包含 Hardcoded API Key、密碼的程式碼。
- **大腦防護檢查**：確保沒有把 `.agents` (LIAI 大腦資料夾) 意外納入 Commit 中。
- **中斷機制**：若發現任何潛在的資安漏洞或不該 Push 的檔案，**必須立刻中斷流程並發出紅色警告**，要求我移除該檔案後才能繼續。

## Step 4: 產生摘要與 Commit Message
- 確認資安無虞後，根據變動內容向我做一個簡單的修改摘要。
- 幫我產生精準的 Commit 文字：
  - **語言要求**：一律使用**繁體中文**撰寫。
  - **專有名詞**：技術專有名詞直接保留英文，不須硬翻。
  - 建議使用標準的 Git Commit Prefix (如 `feat:`, `fix:`, `docs:`, `refactor:` 等)。

## Step 5: 執行 Commit 與 Push
- 產生對應的 `git commit -m "..."` 與 `git push` 指令。
- **安全防呆機制**：請將統整好的指令組合放在 Markdown 區塊中交由我複製執行。若我明確指示「你幫我跑」，你才可以使用工具代為執行。
