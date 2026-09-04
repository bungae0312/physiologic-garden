import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "./lib/card-renderer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "output", "sample-minimal");

const BRAND = "@ai.upgrade";

// Content per style-minimal.md section 2 slide sequence:
// 1 cover -> 2 problem -> 3..N-1 content points -> N summary/CTA
const CARDS = [
  {
    type: "cover",
    badges: ["#AI", "#클로드"],
    title: "클로드를<br>써야 하는 이유",
    subtitle: "AI 챗봇, 이제 똑똑하게 골라 쓰자",
  },
  {
    type: "content",
    eyebrow: "PROBLEM",
    title: "AI 챗봇이 한둘이 아닌데,<br>비슷비슷해 보이지 않나요?",
    body: "매번 아무거나 켜서 쓰다 보면<br>답변 품질도, 속도도 들쭉날쭉하죠.",
  },
  {
    type: "content",
    eyebrow: "POINT 01",
    title: `복잡한 질문일수록<br>더 <span class="hl">정확하게</span> 답합니다`,
    body: "긴 글, 어려운 맥락도 끝까지 놓치지 않고<br>이해해서 답변해요.",
  },
  {
    type: "content",
    eyebrow: "POINT 02",
    title: `코딩부터 문서 요약까지<br><span class="hl">한 번에</span> 끝냅니다`,
    body: "따로따로 쓰던 여러 툴을<br>클로드 하나로 줄일 수 있어요.",
  },
  {
    type: "summary",
    eyebrow: "SUMMARY",
    title: "정리하면, 클로드는",
    items: [
      "복잡한 질문도 정확하게",
      "코드·문서 작업을 한 번에",
      "대화형으로 편하게",
    ],
    cta: "다음에 또 볼 수 있게 저장 &amp; 팔로우",
  },
];

renderDeck({ brand: BRAND, cards: CARDS, outDir: OUT_DIR }).catch((err) => {
  console.error(err);
  process.exit(1);
});
