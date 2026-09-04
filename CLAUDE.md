# CLAUDE.md

## 프로젝트 한 줄 설명

`style-minimal.md`에 정의된 다크 미니멀 디자인 시스템을 따르는 인스타그램 카드뉴스(1080x1350 PNG, 5~10장)를 HTML/CSS + Playwright 스크린샷으로 자동 생성하는 프로젝트.

## 브랜드 정보

- **현재 인스타그램 계정 핸들**: `@ai.upgrade_up` — 새로 카드뉴스 deck을 만들 때 `BRAND` 기본값으로 이 핸들을 쓴다.
- 기존에 만들어둔 deck들(`generate-cards.mjs`의 `@ai.upgrade`, `generate-cards-cowork.mjs`의 `@ai.upgrade.up` 등)은 만들 당시 핸들이 그대로 남아있는 과거 산출물이며, 별도 요청 없이 소급 수정하지 않는다.

## 폴더 구조

```
style-minimal.md              # 디자인 시스템 문서(색상/폰트/레이아웃/그래픽 요소 규격) — 모든 카드뉴스의 SSOT
CLAUDE.md                     # 이 파일

package.json                  # type: module, devDependency: playwright
package-lock.json

scripts/
  lib/
    card-renderer.mjs         # 공통 렌더러. BASE_CSS(style-minimal.md를 그대로 구현한 CSS) +
                               # HTML 빌더 + renderDeck({brand, cards, outDir}) export.
                               # 모든 deck 스크립트가 이 함수 하나로 렌더링한다.
  generate-cards.mjs                    # deck #1: "클로드를 써야 하는 이유" (5장, brand @ai.upgrade)
  generate-cards-cowork.mjs             # deck #2: "클로드 코워크를 써야만 하는 이유" (7장, brand @ai.upgrade.up)
  generate-cards-free-ai-tools.mjs      # deck #3: "무료 AI 도구 모음" (9장)
  generate-cards-chatgpt-features.mjs   # deck #4: "챗GPT 숨은 기능" (9장)
  generate-cards-prompt-formula.mjs     # deck #5: "프롬프트 공식" (10장) — compare/quote-box 타입 실사용 예시
  generate-cards-<topic>.mjs            # (앞으로 추가될) 새 주제 deck — 아래 "새 주제로 카드뉴스 만들기" 참고

input/                         # 사용자가 참고 자료(원고, 브리프 등)를 넣어두는 용도. 현재 비어 있음(예약 폴더).

output/
  sample-minimal/card_01~05.png  # deck #1 결과물
  cards/card_01~07.png + caption.md          # deck #2 결과물
  free-ai-tools/card_01~09.png + caption.md  # deck #3 결과물
  chatgpt-features/card_01~09.png + caption.md # deck #4 결과물
  prompt-formula/card_01~10.png + caption.md   # deck #5 결과물
  <새 deck 폴더>/card_01~NN.png  # 새 deck을 만들면 여기에 추가
                                   # + 요청받으면 같은 폴더에 caption.md도 작성
```

## 카드뉴스 제작 전체 프로세스

새 카드뉴스를 만들 때는 항상 이 순서를 따른다.

### 1. 환경 확인 (최초 1회, 머신 단위)
```bash
cd /Users/leedoha/꼬마돌/physiologic-1
npm install                       # package.json의 playwright devDependency 설치
npx playwright install chromium   # Chromium 바이너리 다운로드 (~/Library/Caches/ms-playwright, repo에는 없음)
```
`node_modules`와 Playwright 브라우저 캐시는 git에 안 잡히므로, 새 머신/새 세션에서 `node scripts/generate-cards.mjs` 실행 시 `Executable doesn't exist` 에러가 나면 이 단계부터 다시 해야 한다.

### 2. 콘텐츠 기획
- 주제를 받으면 `style-minimal.md` 2번 섹션의 슬라이드 순서를 따라 **5~10장**으로 구성한다: `표지(cover) → 문제 제기(content) → 본문 포인트 N개(content) → 요약/CTA(summary)`.
- **한 슬라이드 = 한 메시지** 원칙(style-minimal.md 5번)을 지킨다. 포인트가 많아도 슬라이드당 하나씩만 담는다.
- 각 카드는 아래 네 가지 `type` 중 하나이며, 타입별로 필요한 필드가 정해져 있다 (`scripts/lib/card-renderer.mjs`의 `renderContentBlock` 참고):

  | type | 필드 | 용도 |
  |---|---|---|
  | `cover` | `badges: string[]`, `title`, `subtitle` | 1번 슬라이드. title/subtitle에 `<br>`로 줄바꿈 직접 지정 |
  | `content` | `eyebrow`, `title`, `body`(선택), `quote`(선택), `note`(선택), `icon`(선택) | 문제 제기/본문 포인트 슬라이드. title 안에서 강조 단어는 `<span class="hl">단어</span>`로 감싸면 Accent 컬러로 표시됨. `quote`는 인용구 박스(Accent 보더로 강조), `note`는 quote 아래에 오는 추가 설명 줄, `icon`은 하단 원형 아이콘 배지(사용 가능한 키는 `card-renderer.mjs`의 `ICONS` 참고) |
  | `compare` | `eyebrow`, `title`, `before`, `after`, `note` | Before/After 비교 슬라이드. `before`/`after`가 각각 비교 박스로 렌더링(AFTER는 Accent 보더로 강조), `note`는 박스 아래 설명 한 줄 |
  | `summary` | `eyebrow`, `title`, `items: string[]`(선택), `cta` | 마지막 슬라이드. items를 주면 체크리스트(3~5개 권장)가 뜨고, 생략하면 CTA 박스만 나온다(댓글 유도 등 리스트가 필요 없는 마무리에 사용). cta 아래에 brand 핸들이 자동으로 붙음 |

- 텍스트는 핵심만 남기고 임팩트 있게 — 문장형보다 구(句) 단위, 2줄 이내 권장.

### 3. 줄바꿈 안전폭 체크 (오버플로우 방지)
콘텐츠 가로 폭은 항상 **888px**(1080 - 좌우 96px×2), cta-box 안쪽은 **792px**(888 - 48px×2)이다. 폰트가 크기 때문에 긴 문장은 캔버스를 벗어날 수 있으니, 줄바꿈(`<br>`)을 넣기 전에 아래 공식으로 대략 검산한다:

```
줄 너비(px) ≈ font-size × (한글 글자수 × 0.95 + 공백수 × 0.3)
```

요소별 font-size와 한 줄 기준 안전 글자 수(한글 기준, 여유 있게):

| 요소 | font-size | 안전 폭 | 대략 안전 글자 수 |
|---|---|---|---|
| 표지 대제목 (`.cover-title`) | 94px | 888px | 한글 약 8자/줄 |
| 본문 슬라이드 제목 (`.key-title`) | 80px | 888px | 한글 약 10자/줄 |
| 요약 제목 (`.summary-title`) | 64px | 888px | 한글 약 12자/줄 |
| 표지 부제 (`.cover-subtitle`) | 42px | 888px | 한글 약 18자/줄 |
| 본문 텍스트 (`.body-text`) | 46px | 888px | 한글 약 16자/줄 |
| 체크리스트 항목 (`.check-item`) | 40px | 888px | 한글 약 19자/줄 |
| CTA 박스 텍스트 (`.cta-text`) | 36px | 792px | 한글 약 18자/줄 |
| Before/After 비교 제목 (`.compare-title`) | 58px | 888px | 한글 약 13자/줄 |
| Before/After 박스 텍스트 (`.compare-text`) | 32px | 832px(박스 안쪽 패딩 28px×2 제외) | 자동 줄바꿈되는 문단이라 안전 글자 수 계산 불필요 — 길어지면 박스 안에서 그냥 여러 줄로 감싸짐 |
| 인용구 박스 텍스트 (`.quote-box`) | 36px | 888px | 한글 약 16자/줄 |

> `.body-text`, `.compare-note`, `.compare-text`, `.cta-text`처럼 **문단형 텍스트**는 폭을 넘으면 브라우저가 자동으로 다음 줄로 감싼다 — 안전 글자 수는 "이 정도면 대략 몇 줄이 되는지" 가늠하는 용도지, 넘으면 캔버스를 뚫고 나가는 게 아니다. 반대로 `.cover-title`, `.key-title`, `.compare-title`처럼 **직접 `<br>`로 줄을 끊어서 쓰는 제목류**는 각 줄이 폭을 넘으면 실제로 오버플로우(캔버스 밖으로 잘림)가 나므로 이 표의 안전 글자 수를 반드시 지켜야 한다.

넘을 것 같으면 문장을 줄이거나 `<br>`로 더 짧게 끊는다. (판단이 애매하면 일단 렌더링 후 4번 단계에서 육안으로 확인하고 조정해도 된다.)

### 4. deck 스크립트 작성
`scripts/generate-cards-<topic>.mjs`를 새로 만든다. `scripts/generate-cards-cowork.mjs`를 템플릿으로 복사해서 `BRAND`, `OUT_DIR`, `CARDS`만 교체하면 된다:

```js
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderDeck } from "./lib/card-renderer.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "output", "<새-폴더명>");

const BRAND = "@ai.upgrade_up"; // 요청받은 브랜드명으로 교체 (기본값은 위 "브랜드 정보" 참고)

const CARDS = [ /* 위 표의 type별 필드에 맞춰 작성 */ ];

renderDeck({ brand: BRAND, cards: CARDS, outDir: OUT_DIR }).catch((err) => {
  console.error(err);
  process.exit(1);
});
```

렌더러(`renderDeck`)가 카드 장수(`cards.length`)에 맞춰 우상단 페이지 번호(`01/NN`)와 하단 dot 인디케이터 개수를 자동 계산하므로, 장수를 바꿔도 스크립트 쪽에서 따로 손댈 게 없다.

### 5. 렌더링
```bash
node scripts/generate-cards-<topic>.mjs
```
`output/<새-폴더명>/card_01.png`부터 순서대로 저장된다.

### 6. 검증 (반드시 수행)
1. 픽셀 크기 확인 — 전부 1080x1350이어야 함:
   ```bash
   cd output/<새-폴더명> && for f in *.png; do sips -g pixelWidth -g pixelHeight "$f"; done
   ```
2. **Read 툴로 카드 이미지를 전부 열어서 육안 확인**: 텍스트 잘림/오버플로우, 줄바꿈 이상, 좌우 여백 불균형, 겹침 여부. 특히 3번 단계에서 계산이 애매했던 슬라이드는 꼭 확인.
3. 문제가 있으면 `CARDS` 데이터의 텍스트/줄바꿈만 수정하고 다시 5번부터 반복 (CSS는 건드릴 필요 없음).

### 7. (요청 시) 인스타그램 캡션 작성
`output/<새-폴더명>/caption.md`에 후크 문장 + 카드 핵심 포인트 요약 + 저장/팔로우 CTA + 해시태그로 작성한다. `output/cards/caption.md`가 참고 예시.

## 디자인(스타일) 자체를 바꿔달라는 요청을 받았을 때

이건 콘텐츠가 아니라 **`scripts/lib/card-renderer.mjs`의 `BASE_CSS`를 수정하는 작업**이며, 모든 deck에 동시에 영향을 준다. 순서:

1. `scripts/lib/card-renderer.mjs`의 `BASE_CSS`(폰트 크기/색상/여백/그라데이션 등)를 수정한다.
2. **기존에 만들어져 있던 deck 스크립트를 전부 재실행**해서 회귀가 없는지 확인한다 (`node scripts/generate-cards.mjs`, `node scripts/generate-cards-cowork.mjs` 등 — `scripts/generate-cards-*.mjs` 전체).
3. 결과를 Read 툴로 육안 확인 (오버플로우, 겹침, 여백 균형).
4. **`style-minimal.md`도 반드시 함께 갱신한다** — 이 문서가 디자인 시스템의 원본(SSOT)이므로, 코드만 바꾸고 문서를 갱신하지 않으면 다음 세션에서 다시 어긋난다. 보통 4번(타이포그래피 표), 5~6번(레이아웃/그래픽 요소), 8번(구현 참고사항, 실제 픽셀값) 섹션이 대상.
5. 위 "3. 줄바꿈 안전폭 체크" 표의 font-size/안전 글자 수도 실제로 바뀐 값에 맞춰 이 CLAUDE.md에서 갱신한다.

## 알아두면 좋은 것들

- **폰트**: Pretendard를 jsDelivr CDN에서 매 렌더링마다 불러오므로 네트워크 연결이 필요하다. 오프라인 환경이면 렌더링이 실패하거나 기본 폰트로 깨져 나온다.
- **좌우 여백 통일**: `.slide` padding이 `60px 96px`(상하/좌우)로, 로고·페이지번호·본문 텍스트가 전부 같은 좌우 기준선(96px)을 공유한다. 임의로 개별 요소에 다른 좌우 padding을 주지 않는다.
- **세로 배치는 상단 고정**: `.content`는 `padding-top: 170px`(최초 110px에서, 제목·본문 폰트를 키우면서 헤더에 너무 붙어 보인다는 피드백을 받아 상향)로 상단 고정되어 있고 `justify-content: center`를 쓰지 않는다. 슬라이드마다 텍스트 분량이 달라도 제목 시작 위치가 항상 동일해야 캐러셀을 넘길 때 자연스럽다 — 이 규칙을 깨지 않는다.
- **하단 여백은 정상**: 텍스트가 짧은 슬라이드는 하단에 여백(+ 은은한 accent 글로우)이 남는데, 이는 "정보 과다 금지" 원칙에 따른 의도된 디자인이지 버그가 아니다.
- **`summary` 카드의 handle**: 별도로 지정하지 않으면 `renderDeck`이 자동으로 `brand` 값을 채운다.
- **재현성**: `output/` 아래 파일은 스크립트 실행 결과물이라 언제든 다시 만들 수 있다. `scripts/`와 `style-minimal.md`가 진짜 소스이고, `output/`은 산출물일 뿐이라는 점을 기억한다.
