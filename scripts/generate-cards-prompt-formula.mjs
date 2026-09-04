import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "./lib/card-renderer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "output", "prompt-formula");

const BRAND = "@ai.upgrade_up";

// 주제: 프롬프트, 사실 공식이 있었다
// 슬라이드 구성: 표지 -> 공식 공개(content) -> 적용 예시 5개(compare) -> 보너스(content+quote) -> 요약(content) -> CTA(summary, 체크리스트 없이 cta만)
const CARDS = [
  {
    type: "cover",
    badges: ["PROMPT", "ONE-LINE FORMULA"],
    title: "프롬프트,<br>사실 공식이<br>있었다",
    subtitle: "한 줄만 바꿔도 결과물이 통째로 달라지는 이유",
  },
  {
    type: "content",
    eyebrow: "THE FORMULA",
    title: `결과물 =<br><span class="hl">상황</span> + <span class="hl">기준</span> + <span class="hl">예시</span>`,
    body: `대부분 "상황"만 말하고 끝냄.<br>"기준"과 "예시"가 빠지면<br>AI는 그냥 평균값을 뱉음.<br>이 세 가지를 다 채우는 순간부터<br>결과물이 달라짐.`,
  },
  {
    type: "compare",
    eyebrow: "CASE 01 · 글쓰기",
    title: `"블로그 글<br>써줘"의 함정`,
    before: `"여행 후기 블로그 글 써줘"`,
    after: `"여행 후기 블로그 글 써줘. 20대가 공감할 캐주얼한 말투로, 실패담 하나는 꼭 넣어서"`,
    note: `상황만 있던 문장에 기준(말투)과 예시(실패담)를 더했을 뿐인데 완전히 다른 글이 나옴`,
  },
  {
    type: "compare",
    eyebrow: "CASE 02 · 코딩",
    title: `에러 대신<br>원인부터`,
    before: `"이 코드 에러 고쳐줘"`,
    after: `"이 코드 에러 고쳐줘. 원인도 한 줄로 설명하고, 같은 실수 안 하려면 뭘 조심해야 하는지도 알려줘"`,
    note: `고치기만 하면 다음에 또 같은 실수 반복함. 기준을 "이해"로 바꾸면 실력이 남음`,
  },
  {
    type: "compare",
    eyebrow: "CASE 03 · 요약",
    title: `"요약해줘"가<br>제일 위험한 말`,
    before: `"이 자료 요약해줘"`,
    after: `"이 자료 숫자·통계만 남기고 3줄로 요약해줘. 결론부터"`,
    note: `기준 없는 요약은 AI 마음대로 자름. 뭘 남길지 내가 정해야 원하는 요약이 나옴`,
  },
  {
    type: "compare",
    eyebrow: "CASE 04 · 이메일",
    title: `거절 메일,<br>관계는 지키기`,
    before: `"이 요청 거절하는 메일 써줘"`,
    after: `"이 요청 거절하는 메일 써줘. 다음 기회는 열어두는 톤으로, 이유는 한 문장만"`,
    note: `"거절"이라는 상황에 "관계 유지"라는 기준을 더하면 훨씬 프로페셔널해짐`,
  },
  {
    type: "compare",
    eyebrow: "CASE 05 · 브레인스토밍",
    title: `아이디어는<br>숫자로 가둬라`,
    before: `"마케팅 아이디어 줘"`,
    after: `"마케팅 아이디어 5개, 예산 0원인 것만, 1주일 안에 실행 가능한 것만"`,
    note: `제약이 없으면 AI는 무난한 답만 내놓음. 숫자·조건으로 좁힐수록 쓸만한 아이디어가 나옴`,
  },
  {
    type: "content",
    eyebrow: "BONUS",
    title: "아무 프롬프트에나<br>붙이는 한 마디",
    body: "마지막에 이 한 줄만 추가해보세요.",
    quote: `"애매하면 넘겨짚지 말고<br>나한테 먼저 물어봐"`,
    note: "이 한 줄이 AI가 마음대로 추측해서 엉뚱한 결과 내는 걸 막아줌",
  },
  {
    type: "content",
    eyebrow: "RECAP",
    title: "결국<br>이 세 가지만<br>기억하면 됨",
    body: "상황을 말했다면<br>기준을 더하고<br>예시로 못 박기<br>→ 이 순서만 지켜도 프롬프트 절반은 성공",
  },
  {
    type: "summary",
    eyebrow: "SAVE THIS",
    title: "다음에 프롬프트<br>막힐 때<br>다시 꺼내보세요",
    cta: `댓글에 "공식" 남기면<br>직무별 프롬프트 템플릿 더 보내드릴게요`,
  },
];

renderDeck({ brand: BRAND, cards: CARDS, outDir: OUT_DIR }).catch((err) => {
  console.error(err);
  process.exit(1);
});
