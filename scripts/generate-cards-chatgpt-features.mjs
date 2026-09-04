import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "./lib/card-renderer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "output", "chatgpt-features");

const BRAND = "@ai.upgrade_up";

// 주제: 챗GPT, 이 기능 몰랐으면 반만 쓴 거예요
// 슬라이드 구성 (style-minimal.md 2번): 표지 -> 문제 제기 -> 기능 6개(포인트) -> 요약/CTA
const CARDS = [
  {
    type: "cover",
    badges: ["#챗GPT", "#AI꿀팁"],
    title: "이 기능 몰랐으면<br>챗GPT 반만 썼어요",
    subtitle: "지금 켜야 할 숨은 기능 6가지",
  },
  {
    type: "content",
    eyebrow: "PROBLEM",
    title: "혹시 그냥 질문만 하고<br>끝내고 있진 않나요?",
    body: "챗GPT는 질문만 받는 도구가<br>아니라, 함께 일하는 파트너예요.",
  },
  {
    type: "content",
    eyebrow: "FEATURE 01",
    title: `매번 설명 안 해도<br><span class="hl">나를 기억</span>해요`,
    body: "직업, 말투, 관심사를 저장해두면<br>답변이 딱 나에게 맞춰져요.",
    icon: "sparkles",
  },
  {
    type: "content",
    eyebrow: "FEATURE 02",
    title: `사진·문서를 올리면<br><span class="hl">알아서 분석</span>해요`,
    body: "화면 캡처, PDF, 엑셀까지<br>내용을 읽고 요약해줘요.",
    icon: "upload",
  },
  {
    type: "content",
    eyebrow: "FEATURE 03",
    title: `타이핑 대신<br><span class="hl">말로 대화</span>할 수 있어요`,
    body: "이동 중이거나 손이 바쁠 때<br>대화하듯 물어볼 수 있어요.",
    icon: "mic",
  },
  {
    type: "content",
    eyebrow: "FEATURE 04",
    title: `긴 글과 코드는<br><span class="hl">캔버스</span>에서 편집`,
    body: "채팅으로 왔다 갔다 하지 않고<br>옆 편집창에서 바로 다듬어요.",
    icon: "edit",
  },
  {
    type: "content",
    eyebrow: "FEATURE 05",
    title: `최신 정보도<br><span class="hl">실시간 검색</span>해요`,
    body: "오늘 뉴스, 최신 자료까지<br>바로 찾아서 답해줘요.",
    icon: "globe",
  },
  {
    type: "content",
    eyebrow: "FEATURE 06",
    title: `흩어진 대화는<br><span class="hl">프로젝트</span>로 정리`,
    body: "주제별로 폴더처럼 묶어두면<br>필요할 때 바로 찾아요.",
    icon: "folder",
  },
  {
    type: "summary",
    eyebrow: "SUMMARY",
    title: "이제 챗GPT,<br>제대로 써볼까요?",
    items: [
      "나를 기억하는 맞춤 답변",
      "파일·음성·검색까지 한 번에",
      "대화는 프로젝트로 깔끔하게",
    ],
    cta: "저장해두고 하나씩<br>켜서 써보세요",
  },
];

renderDeck({ brand: BRAND, cards: CARDS, outDir: OUT_DIR }).catch((err) => {
  console.error(err);
  process.exit(1);
});
