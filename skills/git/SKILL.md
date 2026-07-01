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

## Step 3: 產生摘要與 Commit Message
- 根據上一步確認的變動內容，向我做一個簡單的修改摘要。
- 幫我產生精準的 Commit 文字：
  - **語言要求**：一律使用**繁體中文**撰寫。
  - **專有名詞**：技術專有名詞（如套件名稱、框架、變數等）直接保留英文，不須硬翻。
  - 建議使用標準的 Git Commit Prefix (如 `feat:`, `fix:`, `docs:`, `refactor:` 等)。

## Step 4: 執行 Commit 與 Push
- 產生對應的 `git commit -m "..."` 與 `git push` 指令。
- **安全防呆機制**：請將統整好的指令組合（包含 add, commit, push）放在 Markdown 區塊中交由我複製執行。若我指令中有明確說「你直接幫我跑/你直接推」，你才可以使用工具幫我代為執行。
