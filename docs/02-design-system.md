# 디자인 시스템

Apple Developer Documentation, Vercel Docs, Obsidian Publish, Raycast를 레퍼런스로 삼는다.

## 디자인 원칙

| 원칙 | 내용 | 출처 |
|---|---|---|
| 1. 콘텐츠가 인터페이스다 | UI 크롬은 콘텐츠를 위해 물러난다 | Apple Dev Docs, Vercel Docs |
| 2. 키보드 우선, 마우스는 대안 | 검색·내비게이션·탐색이 모두 키보드로 완결 | Raycast |
| 3. 구조는 눈에 보여야 한다 | 태그·백링크·위계·성장 단계가 화면에서 바로 읽힘 | Obsidian Publish |
| 4. 절제된 밀도(Calm Density) | 정보 밀도는 높게, 시각적 소음은 낮게 | Apple Dev Docs |
| 5. 하나의 악센트, 많은 중립색 | 색은 의미를 전달할 때만 | Vercel, Raycast |
| 6. 모션은 상태를 설명한다, 장식하지 않는다 | 애니메이션은 상태 변화 신호일 뿐 | Raycast |
| 7. 임상적 신뢰감(Clinical Credibility) | 정확하고 차분한 톤 유지 | 프로젝트 고유 |

---

## 1. Typography

**서체**: UI/본문 — **Pretendard**(한글·라틴·숫자 혼용에 최적화, Inter/SF Pro와 메트릭 호환). 코드/데이터 — **JetBrains Mono** 또는 **Geist Mono**.

| Role | Size/Line-height | Weight |
|---|---|---|
| Display | 40/48 | Semibold |
| Title (H1) | 32/40 | Bold |
| Heading 2 | 24/32 | Semibold |
| Heading 3 | 20/28 | Semibold |
| Heading 4 | 17/24 | Semibold |
| Body Large | 17/28 (line-height 1.65) | Regular |
| Body | 15/26 | Regular |
| Caption | 13/20 | Regular/Medium |
| Code | 14/22 | Regular (Mono) |

Weight는 Regular/Medium/Semibold/Bold 4단만 사용(Light·Black 배제).

---

## 2. Spacing

4px 베이스 그리드: `4·8·12·16·24·32·48·64·96`. 컴포넌트 내부는 4~16, 컴포넌트 간은 24~48, 섹션/페이지 레벨은 64~96.

---

## 3. Grid

3단 레이아웃: `[Sidebar 280px] [Content max 720px] [TOC 240px]`. 본문 최대 폭은 항상 720px 고정(와이드 모니터에서도 여백만 확장). 단, 홈페이지처럼 "훑어보는" 페이지는 이 규칙에서 예외(05번 문서 참고).

Breakpoint: `<768` 모바일(드로어+상단 접이식 목차) / `768~1279` 태블릿(아이콘 레일+TOC 숨김) / `≥1280` 데스크톱(3단 전체) / `≥1536` 와이드(여백만 확장).

---

## 4. Color

토큰 구조: 중립 스케일 + 단일 악센트 + 시맨틱 컬러(info/success/warning/danger).

| 레이어 | 역할 |
|---|---|
| `bg-base`/`bg-raised`/`bg-overlay` | 배경 깊이 단계 |
| `text-primary`/`text-secondary`/`text-tertiary` | 텍스트 대비 3단계 |
| `border-subtle`/`border-default` | 구분선 2단계 |
| `accent`/`accent-subtle` | 단일 강조색과 옅은 배경 버전 |
| `info`/`success`/`warning`/`danger` | Callout·상태 표시 전용 |

**악센트 컬러 제안**: 틸(Teal)/시안 계열 단일 색. 흔한 SaaS 파란색과 차별화되면서 "청결·정확"의 임상적 인상, 다크모드에서 은은한 발광 효과.

---

## 5. Dark Mode

기본 테마로 채택(제안). 순수 검정(#000) 금지 — `bg-base`는 아주 짙은 그레이, `bg-raised`/`bg-overlay`는 단계적으로 밝아지는 레이어로 입체감 표현. 텍스트도 순수 흰색 금지.

---

## 6. Light Mode

순수 흰색 대신 아주 옅은 오프화이트. 텍스트는 순수 검정 대신 짙은 그레이. 다크모드는 레이어 명도차로 깊이를 주지만, 라이트모드는 그림자+얇은 보더로 깊이를 표현(다른 메커니즘, 같은 시맨틱 토큰 구조).

---

## 7. Card

카테고리 점 → 제목 → 2줄 요약 → 태그 행 → 메타(수정일+성장 배지). 그림자 대신 1px 보더가 기본 구분 수단(다크모드에서 그림자는 거의 안 보임). 호버 시 스케일 트랜스폼 없음 — 보더 밝기+배경 미세 상승만.

---

## 8. Button

Variant: Primary(단색 악센트, 화면당 1개 원칙) / Secondary(중립 보더) / Ghost(텍스트/아이콘 버튼). Size: sm 28px / md 36px / lg 44px.

---

## 9. Input

검색 입력창은 Raycast Cmd+K 팔레트 스타일 — 좌측 아이콘, 우측 `⌘K` 힌트 배지, 포커스 시에만 보더 강조.

---

## 10. Sidebar

(상세 설계는 [06-sidebar-ux.md](./06-sidebar-ux.md) 참고) 접이식 트리, 활성 항목은 좌측 악센트 바+옅은 배경 틴트, 태블릿에서 아이콘 레일로 축소, sticky/독립 스크롤.

---

## 11. Navigation

상단 바는 최소한만: 로고, 검색 트리거(⌘K), 테마 토글. 브레드크럼은 상단 바가 아니라 각 노트 본문 상단에 위치.

---

## 12. Code Block

언어 라벨+복사 버튼(좌상단/우상단). 배경은 페이지 테마와 별개로 살짝 짙은 톤 유지 — "원문/데이터"라는 시각적 구분. Monospace + tabular-nums로 숫자 정렬.

---

## 13. Table

지브라 스트라이핑 사용하지 않음. 헤더 행 sticky. 숫자 컬럼은 우측 정렬+tabular-nums. 모바일은 가로 스크롤 컨테이너(임의 재배치 금지).

---

## 14. Callout

좌측 컬러 보더 + 옅은 배경 틴트.

| 타입 | 용도 | 색 |
|---|---|---|
| Note/Info | 참고 설명 | accent |
| Tip | 임상 팁 | 그린 |
| Warning | 주의사항 | 앰버 |
| Danger | 금기(contraindication) | 레드 |
| Quote | 인용/참고문헌 발췌 | 중립 그레이 |

Danger는 유일하게 원칙5(절제)보다 안전(원칙7)을 우선하는 예외로 대비를 더 강하게.

---

## 15. Tag

모든 태그는 중립색(그레이) pill로 통일, 태그별 고유 색 지정하지 않음. 앞에 작은 점으로 상위 카테고리만 미세 구분. 이유: 태그가 수십~수백 개로 늘어날 것을 전제로 색상 난립 방지.

---

## 16. Badge

Tag와 구분되는 별도 컴포넌트. 성장 배지(seedling/budding/evergreen)는 뚜렷한 색, 카테고리 배지(3~4개, 저카디널리티)도 색 구분 허용. **Tag(고카디널리티→중립색) vs Badge(저카디널리티→색 구분)** 규칙 차이가 핵심.

---

## 17. Animation

Duration: fast 120ms(마이크로) / base 180~200ms(패널) / slow 250~300ms(모달). 진입 ease-out, 퇴장 ease-in. 스프링은 Cmd+K 팔레트 열림에만 예외 허용. `prefers-reduced-motion` 항상 존중.

---

## 18. Hover

인터랙티브 요소의 hover는 배경 틴트/보더 밝기/텍스트 색 중 **하나만** 변화. 본문 링크는 점선 밑줄 → hover 시 실선.

---

## 19. Focus

모든 인터랙티브 요소에 시각적 포커스 링 필수. 전역 단일 토큰(악센트 컬러, 2px, 2px offset). 검색 결과·사이드바 트리는 방향키 이동 가능해야 함.

---

## 20. Article Layout

(상세 설계는 [07-article-page-ux.md](./07-article-page-ux.md) 참고)

```
브레드크럼 → 제목 → 메타 행
본문(720px, Callout/Table/Figure/WikiLink)
──────────
Tags → Reference → Backlinks/Related → Previous/Next
```

우측 sticky TOC, 스크롤 위치에 따라 현재 섹션 자동 하이라이트.
