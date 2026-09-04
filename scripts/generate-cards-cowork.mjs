import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "./lib/card-renderer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "output", "cards");

const BRAND = "@ai.upgrade.up";

// 주제: 클로드 코워크를 써야만 하는 이유
// 슬라이드 구성 (style-minimal.md 2번): 표지 -> 문제 제기 -> 본문 포인트 4개 -> 요약/CTA
const CARDS = [
  {
    type: "cover",
    badges: ["#클로드코워크", "#업무자동화"],
    title: "클로드 코워크를<br>써야만 하는 이유",
    subtitle: "혼자 일하지 말고, 클로드와 함께 일하세요",
  },
  {
    type: "content",
    eyebrow: "PROBLEM",
    title: "리서치도, 초안도<br>전부 혼자 하고 있나요?",
    body: "그 시간, 클로드와 나눠서<br>훨씬 가볍게 만들 수 있어요.",
  },
  {
    type: "content",
    eyebrow: "POINT 01",
    title: `수십 개 자료도<br><span class="hl">몇 분 만에</span> 요약합니다`,
    body: "여러 문서를 동시에 읽고<br>핵심만 짚어서 정리해줘요.",
  },
  {
    type: "content",
    eyebrow: "POINT 02",
    title: `빈 화면 앞 고민 대신<br><span class="hl">바로 초안</span>을 받아보세요`,
    body: "보고서, 기획안, 이메일까지<br>초안을 함께 만들어가요.",
  },
  {
    type: "content",
    eyebrow: "POINT 03",
    title: `코드 리뷰, 디버깅까지<br>개발 속도를 <span class="hl">함께</span> 높여요`,
    body: "복잡한 로직도 설명하며<br>같이 풀어가는 파트너예요.",
  },
  {
    type: "content",
    eyebrow: "POINT 04",
    title: `매번 반복되는 업무는<br>클로드에게 <span class="hl">맡겨</span>보세요`,
    body: "이메일 정리, 데이터 정리 같은<br>반복 작업 시간을 줄여줘요.",
  },
  {
    type: "summary",
    eyebrow: "SUMMARY",
    title: "정리하면, 클로드 코워크는",
    items: [
      "리서치는 몇 분 만에",
      "초안·코드 작업은 가볍게",
      "반복 업무는 자동으로",
    ],
    cta: "오늘부터 업무 파트너로<br>저장 &amp; 팔로우",
  },
];

renderDeck({ brand: BRAND, cards: CARDS, outDir: OUT_DIR }).catch((err) => {
  console.error(err);
  process.exit(1);
});
