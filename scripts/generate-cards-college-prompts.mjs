import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "./lib/card-renderer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "output", "college-prompts");

const BRAND = "@ai.upgrade_up";

// 주제: 이 프롬프트, 학점 좀 올려줌
// 대본 케이스가 대부분 "약한 프롬프트 대신 이 프롬프트" 대비 구조라 compare(Before/After)를 기본으로 쓰고,
// CASE 05(자소서)만 "초안 쓴 다음" 워크플로 제안이라 대비할 before가 없어 content+quote로 처리.
const CARDS = [
  {
    type: "cover",
    badges: ["AI FOR 대학생"],
    title: "이 프롬프트,<br>학점 좀<br>올려줌",
    subtitle: "과제부터 시험공부까지,<br>저장해두면 진짜 쓸 프롬프트 7가지",
  },
  {
    type: "compare",
    eyebrow: "CASE 01 · 과제 방향 잡기",
    title: "뭘 써야할지<br>모를 때",
    before: `"과제 주제 뭘로 해야 할까"`,
    after: `"이 과제 주제 [OO], 채점기준이 [독창성/논리성]이라면 어떤 방향으로 써야 감점 안 당해? 예시 목차도 같이"`,
    note: "막막하게 시작하는 대신 채점 기준부터 거꾸로 설계하면 방향이 확실해짐",
  },
  {
    type: "compare",
    eyebrow: "CASE 02 · 요약 정리",
    title: "전공서적,<br>다 안 읽어도 됨",
    before: `"이거 요약해줘"`,
    after: `"이 챕터, 시험에 나올만한 핵심 개념만 뽑아서 각 개념당 한 문장으로. 예시나 배경설명은 다 빼고"`,
    note: "시험 직전엔 핵심만 압축해야 함. 예시까지 다 넣으면 오히려 헷갈림",
  },
  {
    type: "compare",
    eyebrow: "CASE 03 · 발표 준비",
    title: "PPT 스크립트,<br>어색함 없이",
    before: `"발표 대본 써줘"`,
    after: `"이 내용으로 발표 스크립트, 3분 분량, 청중은 같은 학과 학생들, 첫 문장은 질문으로 시작해서 집중시켜줘"`,
    note: "시간·청중·오프닝까지 정해줘야 로봇같은 발표 대본이 안 나옴",
  },
  {
    type: "compare",
    eyebrow: "CASE 04 · 조별과제",
    title: "조원들<br>분량 나눌 때",
    before: `"역할 분담 어떻게 해"`,
    after: `"이 프로젝트를 4명이서 하는데, 각자 강점이 [자료조사/PPT/발표/글쓰기]야. 공평하게 역할 나누고 마감일도 역산해서 짜줘"`,
    note: "감으로 나누면 꼭 한 명이 몰림. 역산 스케줄까지 맡기면 싸울 일이 줄어듦",
  },
  {
    type: "content",
    eyebrow: "CASE 05 · 자소서·이력서",
    title: "자소서,<br>뻔한 문장 걸러내기",
    body: "초안 쓴 다음 이렇게 시켜보세요.",
    quote: `"이 자소서에서 AI가 쓴 것처럼 뻔하게<br>느껴지는 문장 찾아서 표시해줘.<br>왜 뻔한지도 한 줄로"`,
    note: "AI로 쓴 자소서는 AI가 오히려 제일 잘 걸러냄. 검수용으로 쓰는 게 핵심",
  },
  {
    type: "compare",
    eyebrow: "CASE 06 · 스터디플랜",
    title: "시험 D-7,<br>계획이 안 잡힐 때",
    before: `"공부 계획 짜줘"`,
    after: `"시험까지 7일, 과목은 [A,B,C], 각 과목 난이도랑 분량 다르면 그거 반영해서 하루 단위로 뭘 얼마나 봐야 하는지 짜줘"`,
    note: "과목별 난이도·분량 정보를 줘야 현실적인 계획이 나옴. 뭉뚱그리면 계획도 뭉뚱그려짐",
  },
  {
    type: "compare",
    eyebrow: "CASE 07 · 영어 과제",
    title: "번역기 말고<br>이렇게",
    before: `"영어로 번역해줘"`,
    after: `"이 문장, academic 하게 다시 써줘. 너무 캐주얼한 표현 있으면 바꿔주고, 왜 바꿨는지도 알려줘"`,
    note: `번역만 하면 문법은 맞는데 어색한 문장이 나옴. "이유"까지 물어보면 다음엔 스스로 씀`,
  },
  {
    type: "content",
    eyebrow: "RECAP",
    title: "공통점<br>딱 하나",
    body: `위 7개 프롬프트 전부<br><span class="hl">"막연한 요청"</span> 대신<br><span class="hl">"기준 + 상황 + 예시"</span>를 넣었을 뿐<br>→ 조건 하나만 채워도 결과가 달라짐`,
  },
  {
    type: "summary",
    eyebrow: "SAVE THIS",
    title: "이번 학기<br>과제할 때<br>바로 꺼내 쓰세요",
    cta: "과제 마감 전에<br>친구한테 공유해두는 것도 추천",
  },
];

renderDeck({ brand: BRAND, cards: CARDS, outDir: OUT_DIR }).catch((err) => {
  console.error(err);
  process.exit(1);
});
