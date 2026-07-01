<div align="center">

# 🧠 LIAI (Global AI Brain)

**一次設定，全域共用的超級 AI 協作大腦**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![AI Powered](https://img.shields.io/badge/AI-Powered-FF6B6B.svg)]()
[![Security: SkillSpector](https://img.shields.io/badge/Security-SkillSpector-green.svg)]()

</div>

---

**LIAI** 是一個專為進階開發者打造的「全域 AI 技能庫」。傳統上，我們必須在每一個新專案中重新教導 AI 如何寫 Code、如何遵守設計規範；而透過 LIAI，你只需要透過 bind mount 將這個專案掛載為工作目錄下的 `.agents`，你的 AI 助手就能瞬間繼承產品經理、資深架構師、UI 設計師與文案專家的所有靈魂。

## ✨ 核心特色 (Features)

- 🤖 **自動情境映射 (Auto-Trigger)**：不需要死記硬背指令。當你說「幫我查資料」或「幫我刻畫面」時，LIAI 會自動在背景觸發對應的原生 Web 工具或是前端設計規範。
- 🛡️ **極致的安全防護**：內建 NVIDIA `SkillSpector` 強制掃描機制，徹底阻絕含有竊密木馬 (Info Stealer) 或遠端惡意代碼 (RCE) 的第三方開源外掛。
- 📦 **頂級開源技能整合**：
  - `superpowers`：強制 TDD 測試驅動與系統架構最佳實踐。
  - `pm-skills`：自動切換 PM 視角，產出高品質 PRD 與 User Story。
  - `frontend-design`：強制套用 Vercel 極簡黑白高質感設計規範。
  - `humanizer-zh`：徹底消除生硬的 AI 翻譯腔，產出流暢繁體中文。
- 🛠️ **客製化內部工具**：內建自製的 Git 提交 SOP、快速部署腳本，以及高質量 `README` 自動生成器。

## 🚀 快速開始 (Quick Start)

### 安裝 LIAI 大腦

在你的新專案中，你可以透過軟連結 (Symlink) 或是 Docker Bind Mount 的方式，將 LIAI 掛載為該專案的 `.agents` 目錄：

```bash
# 進入你的新專案目錄
cd /path/to/your/new/project

# 建立軟連結，讓 AI 自動讀取全域大腦
ln -s /path/to/liai .agents
```

### 使用範例 (Usage)

掛載完成後，你只需要在編輯器中對 AI 說出自然語言，LIAI 就會自動接管工作流：

- **啟動新專案**：「我想開發一個任務管理 APP」 ➡️ *AI 會自動觸發 PM-Skills 規劃需求，接著切換 Superpowers 進行架構設計。*
- **推廣專案**：「幫這個專案寫一份 README」 ➡️ *AI 會自動觸發 README-Generator，產出極具宣傳效果的說明文件。*
- **設計 UI**：「幫我刻一個登入畫面」 ➡️ *AI 會自動套用 Vercel 高質感設計規範。*

## 🏗️ 系統架構 (Architecture)

LIAI 的目錄結構經過精心設計，確保技能的純淨與可維護性：

```text
liai/
├── AGENTS.md           # 跨專案通用最高指導原則 (大腦憲法)
├── skills.json         # 外部安全第三方技能掛載清單
├── skills/             # 內部自製技能 (自動註冊載入)
│   ├── git/
│   ├── deploy/
│   └── readme-generator/
└── vendor/             # 經過 SkillSpector 掃描認證的開源技能
    ├── superpowers/
    ├── pm-skills/
    ├── humanizer-zh/
    └── anthropic-skills/
```

## 🤝 貢獻指南 (Contributing)

我們非常歡迎社群為 LIAI 提供更多安全、強大的自製技能！在提交 Pull Request 前，請務必確保：
1. 新增的第三方技能必須先通過 `skillspector scan --no-llm <path>` 的靜態安全檢測（若對結果有疑慮可拔除 `--no-llm` 啟用 LLM 語意分析）。
2. 若新增了 `skills/` 下的自製技能，請同步更新 `AGENTS.md` 裡的「全域技能自動觸發映射」。

## 📄 授權條款 (License)

本專案採用 MIT 授權條款，詳細內容請參閱 [LICENSE](LICENSE) 檔案。
