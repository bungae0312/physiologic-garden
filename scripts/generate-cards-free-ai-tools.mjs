import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "./lib/card-renderer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "output", "free-ai-tools");

const BRAND = "@ai.upgrade";

// 주제: 이거 모르면 손해! 무료 AI 도구 모음
// 슬라이드 구성 (style-minimal.md 2번): 표지 -> 문제 제기 -> 도구 6개(포인트) -> 요약/CTA
const CARDS = [
  {
    type: "cover",
    badges: ["#무료AI도구", "#AI꿀팁"],
    title: "이거 모르면 손해!<br>무료 AI 도구 모음",
    subtitle: "돈 안 내고도 이만큼 됩니다",
  },
  {
    type: "content",
    eyebrow: "PROBLEM",
    title: "유료 AI만<br>찾고 있지 않았나요?",
    body: "알고 보면 무료로 쓸 수 있는<br>도구들이 훨씬 많아요.",
  },
  {
    type: "content",
    eyebrow: "TOOL 01",
    title: `대화·글쓰기는<br><span class="hl">ChatGPT 무료판</span>으로`,
    body: "아이디어 정리부터 초안까지<br>가입만 하면 바로 써볼 수 있어요.",
    icon: "chat",
  },
  {
    type: "content",
    eyebrow: "TOOL 02",
    title: `출처까지 알려주는<br><span class="hl">Perplexity</span>`,
    body: "검색하듯 질문하면<br>근거 링크까지 같이 정리해줘요.",
    icon: "search",
  },
  {
    type: "content",
    eyebrow: "TOOL 03",
    title: `디자인은<br><span class="hl">Canva AI</span>로 뚝딱`,
    body: "카드뉴스, 썸네일도<br>무료 템플릿으로 만들 수 있어요.",
    icon: "design",
  },
  {
    type: "content",
    eyebrow: "TOOL 04",
    title: `영상 자막은<br><span class="hl">CapCut</span>이 자동으로`,
    body: "말한 내용을 알아서 인식해서<br>자막을 바로 붙여줘요.",
    icon: "video",
  },
  {
    type: "content",
    eyebrow: "TOOL 05",
    title: `자료 요약은<br><span class="hl">NotebookLM</span>으로`,
    body: "업로드한 문서 안에서만<br>찾아서 정리해줘요.",
    icon: "notebook",
  },
  {
    type: "content",
    eyebrow: "TOOL 06",
    title: `회의록은<br><span class="hl">클로바노트</span>가 대신`,
    body: "녹음만 하면 대화를<br>자동으로 정리해줘요.",
    icon: "mic",
  },
  {
    type: "summary",
    eyebrow: "SUMMARY",
    title: "정리하면, 이 6가지는",
    items: [
      "대화·글쓰기도 무료로",
      "검색·요약도 무료로",
      "디자인·영상도 무료로",
    ],
    cta: "저장해두고 필요할 때<br>하나씩 써보세요",
  },
];

renderDeck({ brand: BRAND, cards: CARDS, outDir: OUT_DIR }).catch((err) => {
  console.error(err);
  process.exit(1);
});
