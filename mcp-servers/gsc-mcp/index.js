import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { google } from "googleapis";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 取得 __dirname 在 ES module 中的等效寫法
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 讀取 .env
dotenv.config({ path: path.join(__dirname, '.env') });

// 初始化 Google Auth
let auth;
let searchconsole;

try {
  // 會自動抓取環境變數 GOOGLE_APPLICATION_CREDENTIALS 的路徑
  auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  searchconsole = google.searchconsole({ version: 'v1', auth });
} catch (error) {
  console.error("無法初始化 Google Auth，請確認 GOOGLE_APPLICATION_CREDENTIALS 環境變數是否正確設定。");
  process.exit(1);
}

// 建立 MCP Server
const server = new Server(
  {
    name: "gsc-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 註冊 Tool: 取得搜尋分析資料
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_search_analytics",
        description: "取得 Google Search Console 的流量與搜尋分析資料 (點擊數、曝光數、CTR、排名)。",
        inputSchema: {
          type: "object",
          properties: {
            siteUrl: {
              type: "string",
              description: "GSC 的網站資源 URL (例如: 'sc-domain:example.com' 或 'https://example.com/')",
            },
            startDate: {
              type: "string",
              description: "查詢起始日期 (YYYY-MM-DD)",
            },
            endDate: {
              type: "string",
              description: "查詢結束日期 (YYYY-MM-DD)",
            },
            dimensions: {
              type: "array",
              items: { type: "string" },
              description: "分析維度，允許的值包括: 'query', 'page', 'country', 'device', 'date'。如果不帶入，則回傳整體數據。",
            },
            rowLimit: {
              type: "number",
              description: "回傳的資料筆數上限，預設 50",
            },
          },
          required: ["siteUrl", "startDate", "endDate"],
        },
      },
    ],
  };
});

// 實作 Tool 功能
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_search_analytics") {
    const { siteUrl, startDate, endDate, dimensions, rowLimit = 50 } = request.params.arguments;

    try {
      const response = await searchconsole.searchanalytics.query({
        siteUrl: siteUrl,
        requestBody: {
          startDate: startDate,
          endDate: endDate,
          dimensions: dimensions || [],
          rowLimit: rowLimit,
        },
      });

      const rows = response.data.rows || [];
      const formattedResult = rows.map((row) => ({
        keys: row.keys,
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              status: "success",
              siteUrl,
              data: formattedResult.length > 0 ? formattedResult : "No data found for the given criteria."
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching GSC data: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
  
  throw new Error("Tool not found");
});

// 啟動 Stdio 傳輸
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GSC MCP Server is running on stdio");
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
