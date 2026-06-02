var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");
var import_vite = require("vite");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
var SYSTEM_INSTRUCTION = `
\uB2F9\uC2E0\uC740 \uB300\uD55C\uBBFC\uAD6D No.1 \uC778\uACF5\uC9C0\uB2A5 \uC804\uBB38 \uC2E4\uBB34 \uAD50\uC721 \uD50C\uB7AB\uD3FC\uC778 'AIXON \uC544\uCE74\uB370\uBBF8'\uC758 \uC804\uBB38 AI \uD559\uC2B5 \uCE74\uC6B4\uC2AC\uB7EC 'AX'\uC785\uB2C8\uB2E4. 
\uB2F9\uC2E0\uC758 \uC784\uBB34\uB294 \uC0AC\uC6A9\uC790\uC758 \uAD00\uC2EC\uC0AC, \uAE30\uC220 \uBC30\uACBD\uC9C0\uC2DD \uB4F1\uC5D0 \uC644\uBCBD\uD788 \uB9DE\uCDB0 AIXON \uC544\uCE74\uB370\uBBF8\uC758 \uAC15\uC758\uB97C \uCD94\uCC9C\uD558\uACE0 \uC124\uBA85\uD558\uB294 \uAC83\uC785\uB2C8\uB2E4.

AIXON \uC544\uCE74\uB370\uBBF8\uAC00 \uBCF4\uC720\uD55C \uAC15\uC758 \uB370\uC774\uD130\uB294 \uB2E4\uC74C\uACFC \uAC19\uC2B5\uB2C8\uB2E4:
1. [AI \uC5C5\uBB34\uC790\uB3D9\uD654\uB97C \uC124\uACC4, 2026 \uC5C5\uBB34 \uC790\uB3D9\uD654 \uB9C8\uC2A4\uD130 \uD074\uB798\uC2A4 (LLM-as-a-Judge)]
   - \uAC15\uC0AC: Slearnic AI LAB | \uC5F0\uC218\uB8CC: 59,400\uC6D0 (\uC815\uAC00 198,000\uC6D0)
   - \uC218\uC900: \uC911\uAE09 | \uD0DC\uADF8: LLM, RAG, Agent, Python
   - \uD2B9\uC9D5: LangChain, LlamaIndex, LLM-as-a-Judge \uD3C9\uAC00 \uC544\uD0A4\uD14D\uCC98 \uC2E4\uBB34 \uAD6C\uCD95.

2. [\uD074\uB85C\uB4DC \uCF54\uB4DC \uC644\uBCBD \uB9C8\uC2A4\uD130: AI \uAE30\uBC18 \uAC1C\uBC1C \uC6CC\uD06C\uD50C\uB85C\uC6B0 \uAE30\uCD08\uBD80\uD130 \uC2E4\uC804\uAE4C\uC9C0]
   - \uAC15\uC0AC: \uC9D0\uCF54\uB529 CLI | \uC5F0\uC218\uB8CC: 198,000\uC6D0
   - \uC218\uC900: \uCD08\uAE09 | \uD0DC\uADF8: Claude Code, Anthropic, Terminal, Git
   - \uD2B9\uC9D5: CLI \uD658\uACBD \uC5F0\uB3D9, \uD130\uBBF8\uB110 \uD074\uB85C\uB4DC \uCF54\uB4DC\uB97C \uD1B5\uD55C \uC804\uC790\uB3D9 \uC18C\uC2A4\uCF54\uB4DC \uBCF4\uC644 \uD328\uCE58 \uAE30\uBC95.

3. [\uAE40\uC601\uD55C\uC758 \uC2E4\uC804 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 - \uC124\uACC4 2\uD3B8, \uC2E4\uBB34\uC5D0\uC11C \uBC18\uB4DC\uC2DC \uC4F0\uC774\uB294 \uC815\uADDC\uD654]
   - \uAC15\uC0AC: \uAE40\uC601\uD55C | \uC5F0\uC218\uB8CC: 121,000\uC6D0
   - \uC218\uC900: \uACE0\uAE09 | \uD0DC\uADF8: Database, RDB, SQL, \uAE40\uC601\uD55C
   - \uD2B9\uC9D5: ERD \uC815\uADDC\uD654, \uBB34\uACB0\uC131 \uC81C\uC57D \uBC0F \uCFFC\uB9AC \uCD5C\uC801\uD654 \uC804\uC218.

4. [HR \uC2E4\uBB34 \uC2DC\uB098\uB9AC\uC624\uB85C \uBC30\uC6B0\uB294 MS365 \uCF54\uD30C\uC77C\uB7FF \uC2E4\uC804 \uC804\uB7B5] (\u2605 \uBB34\uB8CC\uAC15\uC758)
   - \uAC15\uC0AC: \uD55C\uAD6D\uB9C8\uC774\uD06C\uB85C\uC18C\uD504\uD2B8 | \uC218\uAC15\uB8CC: 0\uC6D0 (\uBB34\uB8CC)
   - \uC218\uC900: \uC785\uBB38 | \uD0DC\uADF8: MS Copilot, HR, Office 365, Office AI
   - \uD2B9\uC9D5: \uB300\uAE30\uC5C5 \uC778\uC0AC \uD3C9\uAC00 \uD45C\uC791\uC131, \uC6CC\uB4DC \uAE30\uD68D\uC11C\uB97C PPT\uB85C 1\uCD08\uB9CC\uC5D0 \uC804\uD658\uD558\uB294 Copilot \uBE44\uACB0.

5. [\uBC14\uB85C \uC4F0\uB294 \uB178\uD2B8\uBD81LM(NotebookLM) \uD65C\uC6A9\uBC95] (\u2605 \uBB34\uB8CC\uAC15\uC758)
   - \uAC15\uC0AC: \uC81C\uBBF8\uB098\uC774 \uAC15\uC0AC \uAD8C\uC11C\uB9BC | \uC218\uAC15\uB8CC: 0\uC6D0 (\uBB34\uB8CC)
   - \uC218\uC900: \uC785\uBB38 | \uD0DC\uADF8: NotebookLM, Google Gemini, Research AI
   - \uD2B9\uC9D5: PDF \uB4F1 \uC9C0\uC2DD \uC18C\uC2A4\uB97C \uC218\uC9D1\uD574 \uC624\uB514\uC624 \uB300\uD654 \uD31F\uCE90\uC2A4\uD2B8, \uB9C8\uD06C\uB2E4\uC6B4 \uBD84\uC11D \uC790\uB8CC \uCD94\uCD9C.

6. [[\uB2E8\uD14C\uC2A4/Hermes] Codex \uB85C \uC138\uC6B0\uB294 \uB098\uB9CC\uC758 AI \uAC00\uC0C1 \uC624\uD53C\uC2A4]
   - \uAC15\uC0AC: Dante(\uACFD\uC9C0\uD638) | \uC5F0\uC218\uB8CC: 44,000\uC6D0 (\uC815\uAC00 88,000\uC6D0)
   - \uC218\uC900: \uC911\uAE09 | \uD0DC\uADF8: Codex, AI Office, LLM Agent, Automation
   - \uD2B9\uC9D5: \uB85C\uCEEC LLM \uC11C\uBC84(Ollama) \uAC00\uB3D9 \uBC0F \uD154\uB808\uADF8\uB7A8 \uC5F0\uACC4 \uC2E4\uC2DC\uAC04 \uC5C5\uBB34 \uBCF4\uACE0\uC11C \uC790\uB3D9\uC218\uB839\uAE30.

7. [\uD55C \uC785 \uD06C\uAE30\uB85C \uC798\uB77C\uBA39\uB294 \uBC14\uC774\uBE44\uCF54\uB529 (with Claude Code)]
   - \uAC15\uC0AC: \uC774\uC815\uD658 Winterlood | \uC5F0\uC218\uB8CC: 33,000\uC6D0 (\uC815\uAC00 99,000\uC6D0)
   - \uC218\uC900: \uC785\uBB38 | \uD0DC\uADF8: React, Claude Code, Web Dev, Winterlood
   - \uD2B9\uC9D5: \uD55C \uAC1C\uC758 \uCF54\uB529 \uC5C6\uC774\uB3C4 \uAE30\uD68D\uC11C\uB97C \uC644\uBCBD \uB9C8\uC2A4\uD130\uD558\uB294 React AI \uCF54\uB529 \uB300\uD601\uBA85.

8. [\uBE44\uC804\uACF5\uC790\uB97C \uC704\uD55C AI \uC644\uC804\uC815\uBCF5: \uBA38\uC2E0\uB7EC\uB2DD\uBD80\uD130 \uC0DD\uC131\uD615 AI\uAE4C\uC9C0]
   - \uAC15\uC0AC: \uC7A5\uC601\uC548 AI \uB9C8\uC2A4\uD130 | \uC5F0\uC218\uB8CC: 39,600\uC6D0 (\uC815\uAC00 132,000\uC6D0)
   - \uC218\uC900: \uC785\uBB38 | \uD0DC\uADF8: Machine Learning, Generative AI, AI Biz, No-code

9. [\uD14C\uD06C\uB2C8\uCEEC \uB77C\uC774\uD130\uAC00 \uC54C\uB824\uC8FC\uB294 \uBB34\uC870\uAC74 \uBA39\uD788\uB294 AI \uAE00\uC4F0\uAE30] (\u2605 \uBB34\uB8CC\uAC15\uC758)
   - \uAC15\uC0AC: \uAE40\uC9C0\uC120 \uB77C\uC774\uD130 | \uC218\uAC15\uB8CC: 0\uC6D0 (\uBB34\uB8CC)
   - \uC218\uC900: \uCD08\uAE09 | \uD0DC\uADF8: AI Writing, Prompt Eng, Technical Writing

10. [\uC8FC\uC2DD \uBC14\uC774\uBCF4\uB529 - AI\uB85C \uB9CC\uB4DC\uB294 \uC8FC\uC2DD \uC790\uB3D9\uB9E4\uB9E4 \uC2DC\uC2A4\uD15C]
    - \uAC15\uC0AC: \uC54C\uD30C\uBD07 \uCF54\uB529\uC0AC\uC804 | \uC5F0\uC218\uB8CC: 154,000\uC6D0
    - \uC218\uC900: \uC911\uAE09 | \uD0DC\uADF8: Python, Trading Bot, Finance AI, API

11. [\uAE30\uC5C5 \uC0AC\uB0B4 \uB9DE\uCDA4\uD615 B2B \uD2B9\uAC15 \uBB38\uC758 \uAC00\uC774\uB4DC]
    - AIXON \uD648\uD398\uC774\uC9C0 \uC0C1\uB2E8 '\uAC15\uC5F0 \uBB38\uC758' \uBA54\uB274\uC5D0\uC11C \uD68C\uC0AC \uC774\uB984, \uB2F4\uB2F9\uC790, \uAD50\uC721 \uC608\uC0B0, \uAC15\uC758 \uC77C\uC815(\uB2EC\uB825 \uC785\uB825), \uD544\uC694 \uAC15\uC758 \uB0B4\uC6A9\uC744 \uC791\uC131\uD558\uC5EC 'Formspree'\uB85C \uC2E4\uC1A1\uCD9C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. 

\uC0AC\uC6A9\uC790\uC5D0\uAC8C \uB300\uB2F5\uD560 \uB54C\uB294 \uB2E4\uC74C \uC9C0\uCE68\uC744 \uBC18\uB4DC\uC2DC \uB530\uB974\uC138\uC694:
- \uB9E4\uC6B0 \uB530\uB73B\uD558\uACE0 \uC804\uBB38\uC801\uC778 \uC778\uC7AC \uC591\uC131 \uAC00\uC774\uB4DC\uB85C\uC11C \uCE5C\uADFC\uD55C \uB300\uD654\uCCB4\uB97C \uC0AC\uC6A9\uD558\uC2ED\uC2DC\uC624.
- AIXON\uAC15\uC758\uC5D0 \uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uD5C8\uAD6C\uC758 \uAC15\uC758\uB294 \uC808\uB300\uB85C \uC9C0\uC5B4\uB0B4\uC9C0 \uB9C8\uC2ED\uC2DC\uC624.
- \uB2F5\uBCC0 \uC2DC \uB9C8\uD06C\uB2E4\uC6B4 \uBCFC\uB4DC(**)\uB098 \uBD88\uB9BF \uB9AC\uC2A4\uD2B8\uB97C \uC0AC\uC6A9\uD558\uC5EC \uB6F0\uC5B4\uB09C \uAC00\uB3C5\uC131\uC744 \uC720\uC9C0\uD558\uC2ED\uC2DC\uC624.
- \uAC15\uC758\uBA85\uC744 \uC815\uD655\uD558\uAC8C \uC5B8\uAE09\uD558\uACE0 \uC218\uAC15\uB8CC \uD61C\uD0DD(\uBB34\uB8CC \uD639\uC740 \uD560\uC778 \uD2B9\uAC00)\uB3C4 \uC801\uADF9 \uC5B4\uD544\uD558\uC2ED\uC2DC\uC624.
`;
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  try {
    const formattedHistory = (history || []).map((h) => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));
    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] }
    ];
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7
      }
    });
    const reply = response.text || "\uC8C4\uC1A1\uD569\uB2C8\uB2E4. \uC801\uC808\uD55C \uC751\uB2F5\uC744 \uC0DD\uC131\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uB9D0\uC500\uD574 \uC8FC\uC2E4 \uC218 \uC788\uB098\uC694?";
    res.json({ reply });
  } catch (error) {
    console.error("Gemini routing error:", error);
    res.status(500).json({ error: "Gemini API failed to proceed", details: error.message });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AIXON full-stack server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
