# 프로젝트 폴더 구조 (Next.js App Router 기준)

```
지식보관소/
│
├── app/
│   ├── (garden)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── notes/[...slug]/
│   │   │   ├── page.tsx
│   │   │   ├── opengraph-image.tsx
│   │   │   ├── loading.tsx
│   │   │   └── not-found.tsx
│   │   ├── tags/
│   │   │   ├── page.tsx
│   │   │   └── [tag]/page.tsx
│   │   ├── search/page.tsx
│   │   └── graph/page.tsx
│   ├── api/                        # 지금은 비어있음 (예약 공간)
│   ├── layout.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   └── manifest.ts
│
├── components/
│   ├── ui/
│   ├── mdx/
│   ├── garden/
│   └── layout/
│
├── lib/
│   ├── content/
│   ├── links/
│   ├── search/
│   ├── seo/
│   └── utils/
│
├── hooks/
├── types/
│
├── content/
│   ├── notes/
│   │   ├── 운동학/
│   │   ├── 물리치료/
│   │   ├── 임상사례/
│   │   └── 참고문헌/
│   └── _meta/
│       ├── tags.yaml
│       └── redirects.yaml
│
├── plugins/
├── config/
├── scripts/
├── styles/
│
├── public/
│   ├── fonts/
│   ├── og/
│   └── notes-assets/
│
├── .content-cache/                 # gitignore
│
├── content.config.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## app/ — 라우팅 전용, 로직은 두지 않는다

페이지를 "조합"만 한다. 데이터 조회는 `lib/`, 화면 조각은 `components/`에서 가져와 배치.

- `(garden)/` route group — 향후 `(studio)`(저작 도구), `(marketing)` 같은 형제 그룹이 추가돼도 URL/레이아웃이 서로 침범하지 않게.
- 각 라우트에 `loading.tsx`/`not-found.tsx` 개별 배치.
- `notes/[...slug]`는 catch-all로 `content/notes/` 깊이를 그대로 반영.
- `api/`는 지금 비어있지만 미리 만들어둠 — 향후 `api/ask`(RAG), `api/reindex`가 구조 변경 없이 추가되도록.

**확장성**: 다국어 지원 시 `app/[lang]/(garden)/...`로 한 단계만 감싸면 됨.

---

## components/ — "무엇을 아는가"로 4계층 분리

| 폴더 | 아는 것 | 모르는 것 |
|---|---|---|
| `ui/` | 순수 UI 상태 | 도메인, 콘텐츠 구조 |
| `mdx/` | "MDX 본문 안에서 쓰인다"는 것 | 라우팅, 데이터 조회 방식 |
| `garden/` | frontmatter, 태그 인덱스, 백링크 그래프 | 자신이 어느 라우트에서 쓰이는지 |
| `layout/` | 페이지 뼈대 | 개별 노트 콘텐츠 |

**확장성**: `ui/`가 커지면 그때 `ui/primitives/`, `ui/patterns/`로 쪼갠다 — 지금 미리 쪼개지 않는다(과설계 금지).

---

## lib/ — 순수 로직, UI를 모른다

| 폴더 | 책임 |
|---|---|
| `content/` | `getNoteBySlug`, `getAllNotes`, `getNotesByTag` 등 조회 헬퍼 |
| `links/` | 위키링크 파서 결과 해석, 백링크 그래프 조회 |
| `search/` | 검색 인덱스 조회 어댑터 |
| `seo/` | `generateMetadata` 헬퍼, JSON-LD 빌더 |
| `utils/` | 도메인 무관 범용 함수 |

**확장성**: AI 기능이 붙을 때 `lib/ai/`가 형제로 추가됨. `lib/content/`가 이미 정제된 텍스트+메타데이터를 반환하므로 새 폴더 추가만으로 확장.

---

## hooks/ — 클라이언트 상호작용만 담당

테마 토글, 검색 팔레트 상태+`⌘K` 리스너, TOC 스크롤 스파이, 반응형 브레이크포인트 감지. 이 폴더가 비대해진다면 "정적으로 만들 수 있었던 걸 불필요하게 클라이언트화하고 있다"는 신호.

---

## types/ — 모듈 경계를 넘나드는 타입만

콘텐츠 컬렉션 타입은 `content.config.ts`가 자동 생성하므로 여기 두지 않음. `lib/`와 `components/`가 동시에 참조하는 타입만: `Note`, `Backlink`, `TagTaxonomyEntry`, `SearchResult`, `GraphEdge`.

---

## content/ — 유일한 원본

`notes/` 하위 카테고리 폴더 = 1차 분류축, `_meta/tags.yaml` = 통제 태그 어휘, `_meta/redirects.yaml` = 슬러그 변경 이력. 카테고리가 늘면 폴더 추가로 끝 — 코드 변경 없음.

---

## public/ — 정적 파일, 콘텐츠 이미지는 예외 처리

- `fonts/`, `og/`(기본 OG 이미지 폴백)
- `notes-assets/` — 콘텐츠 이미지는 원래 `content/notes/**/`에 노트와 나란히 두고(Obsidian 첨부파일 방식), 빌드 스크립트가 `public/notes-assets/`로 복사. 저작 시점 편의와 서빙 요구사항을 분리.

---

## styles/ — 디자인 토큰의 코드화

`globals.css`, 라이트/다크 토큰 값. 컴포넌트 파일 안에 하드코딩된 색상/여백이 들어가지 않도록 — 모든 시각적 값이 여기 토큰을 거침.

---

## 추가 제안 폴더

- **plugins/** — remark/rehype 커스텀 플러그인. 빌드 타임 콘텐츠 파이프라인 전용이라 `lib/`와 성격이 달라 분리.
- **config/** — 사이트 전역 설정(내비게이션, 사이트명 등) — 로직 아닌 데이터.
- **scripts/** — taxonomy 검증, 깨진 링크 리포트 등 유지보수 스크립트. "평생 기록" 프로젝트에서 시간이 지날수록 중요해짐.
- **.content-cache/** — 재생성 가능한 파생 데이터, gitignore.
