import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "./lib/card-renderer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "output", "marketer-ai");

const BRAND = "@ai.upgrade_up";

// 주제: 마케터의 야근, 이제 AI가 대신함
// 케이스 슬라이드는 원본 대본이 "대신 이렇게" / "이렇게 던지면"으로 구조가 섞여 있어서,
// 전부 content 타입(intro body + 프롬프트 quote-box + 결과 note)으로 통일해 시각적 리듬을 맞췄다.
const CARDS = [
  {
    type: "cover",
    badges: ["AI FOR MARKETER"],
    title: "마케터의 야근,<br>이제 AI가<br>대신함",
    subtitle: "카피부터 리포트까지,<br>실제로 시간 아껴주는 활용법 7가지",
  },
  {
    type: "content",
    eyebrow: "CASE 01 · 카피라이팅",
    title: "카피 30개,<br>5분이면 끝",
    body: `"이 제품 광고 문구 써줘" 대신 이렇게 던지세요.`,
    quote: `"타겟 20대 여성, 톤은 위트있게,<br>A/B 테스트용으로 5개씩 3가지 톤으로"`,
    note: "한 번에 15개 뽑아서 반응 좋을 것만 고르면 됨.<br>문구 짜내느라 밤새는 시간이 없어짐.",
  },
  {
    type: "content",
    eyebrow: "CASE 02 · 경쟁사 분석",
    title: "경쟁사 SNS<br>일일이 안 봐도 됨",
    body: "경쟁사 계정 캡처해서 AI한테 이렇게 던지세요.",
    quote: `"이 계정들 최근 콘텐츠 패턴,<br>잘되는 포맷, 우리랑 다른 점"`,
    note: "하나하나 스크롤하며 분석하던 시간을<br>통째로 줄일 수 있음.",
  },
  {
    type: "content",
    eyebrow: "CASE 03 · 타겟 페르소나",
    title: "페르소나,<br>감으로 만들지 말기",
    body: `"20대 타겟 페르소나 만들어줘" 대신<br>데이터를 먼저 던지세요.`,
    quote: `"우리 제품 특성 + 기존 구매 데이터 요약,<br>이걸 바탕으로 페르소나 3개"`,
    note: "감이 아니라 데이터 기반 페르소나가<br>훨씬 설득력 있음 (보고할 때도 유용함)",
  },
  {
    type: "content",
    eyebrow: "CASE 04 · 콘텐츠 캘린더",
    title: "한 달 치 기획,<br>하루면 끝",
    body: `"이번 달 콘텐츠 아이디어 줘" 대신<br>이렇게 구체적으로 요청하세요.`,
    quote: `"이번 달 이슈·시즌 반영해서,<br>요일별 포맷 나눠서 20개"`,
    note: "빈 캘린더 보면서 막막했던 시간이<br>구체적인 리스트로 바로 채워짐.",
  },
  {
    type: "content",
    eyebrow: "CASE 05 · 성과 리포트",
    title: "숫자 나열 대신<br>인사이트만",
    body: "광고 성과 데이터 그대로 붙여넣고<br>이렇게 물어보세요.",
    quote: `"숫자 나열 말고, 뭐가 잘됐고 왜 그런지,<br>다음에 뭘 바꿀지 3줄로"`,
    note: "보고서 쓰다가 정작 분석할 시간이<br>없던 문제가 해결됨.",
  },
  {
    type: "content",
    eyebrow: "CASE 06 · 고객 문의 응대",
    title: "반복 질문,<br>템플릿으로 끝",
    body: "자주 오는 문의 유형을 모아서<br>이렇게 요청하세요.",
    quote: `"이 질문들에 대한 답변 템플릿,<br>우리 브랜드 톤으로"`,
    note: "매번 새로 쓰지 않고 템플릿만<br>살짝 다듬어서 바로 발송 가능.",
  },
  {
    type: "content",
    eyebrow: "CASE 07 · 이메일 마케팅",
    title: "뉴스레터,<br>제목이 반",
    body: "본문만 던져주고<br>이렇게 물어보세요.",
    quote: `"이 내용으로 오픈율 높을 제목 10개,<br>각각 이유도"`,
    note: "제목 하나로 오픈율이 갈리는데<br>여러 개 비교해보고 고를 수 있음.",
  },
  {
    type: "content",
    eyebrow: "RECAP",
    title: "결국<br>마케터가 아끼는 건<br>시간",
    body: "AI가 카피·분석·기획을 대신 하는 게 아니라<br>초안을 빨리 만들어주는 것<br>→ 그 초안 고르고 다듬는 데<br>진짜 마케터의 감각을 쓰면 됨",
  },
  {
    type: "summary",
    eyebrow: "SAVE THIS",
    title: "다음 기획할 때<br>바로 꺼내 쓰세요",
    cta: "저장해두고 팔로우하면<br>다음 활용법도 놓치지 않아요",
  },
];

renderDeck({ brand: BRAND, cards: CARDS, outDir: OUT_DIR }).catch((err) => {
  console.error(err);
  process.exit(1);
});
