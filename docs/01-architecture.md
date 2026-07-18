# 아키텍처 설계

## 프로젝트 분석

| 요구사항 | 아키텍처 함의 |
|---|---|
| **평생 기록** (수년~수십 년 축적) | 특정 SaaS/DB에 락인되면 안 됨 → **plain text(MDX) + git**이 원본(source of truth). 기술 스택이 바뀌어도 콘텐츠는 살아남아야 함 |
| **Digital Garden** (블로그 ≠ 정원) | 발행일 중심의 선형 목록이 아니라, **성장 단계(seedling/budding/evergreen)**와 **양방향 링크(backlink)**로 지식이 유기적으로 연결되는 구조 |
| **물리치료·운동학 도메인** | 근육/관절/병리/평가/운동/임상사례가 서로 강하게 상호참조됨 → **통제된 태그 체계(taxonomy)**와 **강력한 internal link**가 일반 블로그보다 훨씬 중요 |
| **평생 축적 + 향후 공개 가능성** | 콘텐츠가 수백~수천 개로 늘어나도 무너지지 않는 **SEO/검색 구조**가 처음부터 필요 |
| **향후 AI 확장** | "내 지식 위에서 질문하기(RAG)", 자동 태깅, 관련 노트 추천 등을 염두에 두고 **원본 데이터와 파생 데이터(검색 인덱스, 임베딩)를 처음부터 분리** |

전제 스택: **Next.js (App Router) + TypeScript + MDX**.

---

## 1. 전체 디렉토리 구조

```
지식보관소/
├── content/                        # 콘텐츠 원본 (Single Source of Truth)
│   ├── notes/                      # 개별 지식 노트 (MDX)
│   │   ├── 운동학/
│   │   ├── 물리치료/
│   │   ├── 임상사례/
│   │   └── 참고문헌/
│   └── _meta/                      # 콘텐츠 메타데이터
│       ├── tags.yaml               # 통제된 태그 어휘(taxonomy)
│       └── redirects.yaml          # 슬러그 변경 시 리다이렉트 맵
│
├── app/                             # Next.js App Router
├── components/                      # UI / MDX / 도메인 컴포넌트
├── lib/
│   ├── content/                    # 콘텐츠 스키마 정의, 조회 헬퍼
│   ├── search/                     # 검색 인덱스 생성/조회
│   ├── links/                      # wikilink 파서, 백링크 그래프 빌더
│   └── seo/                        # 메타데이터 생성 헬퍼
│
├── plugins/                         # remark/rehype 커스텀 플러그인
├── public/
├── .content-cache/ (generated, gitignored)
└── content.config.ts
```

**이유**
- `content/`를 `app/`과 완전히 분리 → 콘텐츠는 "데이터", App Router는 "뷰". 프레임워크를 바꿔도 `content/`는 그대로 재사용 가능.
- `content/notes/` 하위를 **도메인 폴더(운동학/물리치료/임상사례)**로 나눈 것은 URL 구조·태그 taxonomy·breadcrumb·SEO에 그대로 재사용되는 **1차 분류축**이기 때문.
- `_meta/tags.yaml`을 코드가 아닌 데이터 파일로 분리 — "정원사(author)"가 직접 태그 체계를 관리할 수 있어야 함.
- `.content-cache/`는 검색 인덱스·링크 그래프 같은 **재생성 가능한 파생 데이터**를 위한 공간. git에 커밋하지 않음.

---

## 2. App Router 구조

```
app/
├── layout.tsx
├── page.tsx                         # 홈: 최근 업데이트 / 추천 evergreen 노트
├── notes/
│   └── [...slug]/
│       ├── page.tsx                 # 노트 상세 (catch-all → 폴더 구조 = URL 구조)
│       └── opengraph-image.tsx      # 노트별 자동 OG 이미지
├── tags/
│   ├── page.tsx
│   └── [tag]/page.tsx
├── search/
│   └── page.tsx
├── graph/
│   └── page.tsx                     # (향후) 지식 그래프 시각화 — 자리만 확보
├── api/                             # (향후 AI 엔드포인트 자리)
├── sitemap.ts
├── robots.ts
└── manifest.ts
```

**이유**
- `notes/[...slug]` catch-all: `content/notes/운동학/무릎/전방십자인대손상.mdx` 폴더 구조를 그대로 URL에 매핑 — 파일 구조 = URL 구조 = 분류 체계.
- 렌더링은 **정적 생성(SSG)**이 기본 — 콘텐츠 변경 = git commit = 재배포이므로 ISR이 굳이 필요 없음.
- `search/page.tsx`는 SEO/공유 가능한 URL을 위해 별도 라우트로, 실제 로직은 클라이언트 컴포넌트.
- `graph/page.tsx`는 라우트 자리만 미리 확보 — 백링크 그래프 데이터가 이미 준비되므로 시각화만 얹으면 됨.

---

## 3. 컴포넌트 구조

```
components/
├── ui/          # 범용 프리미티브 — 도메인 지식 없음
├── mdx/         # MDX 본문 전용 (Callout, Figure, Citation, WikiLink)
├── garden/      # 콘텐츠 메타데이터를 소비하는 도메인 컴포넌트
│   (TableOfContents, Backlinks, RelatedNotes, TagList, GrowthBadge, SearchPalette)
└── layout/      # Header, Sidebar, Footer
```

**이유**: 3계층 구분 기준은 **"무엇을 아는가"**. `ui`는 도메인을 몰라야 재사용성이 높고, `mdx`는 본문 안에서 쓰인다는 것만 알고, `garden`은 frontmatter·백링크·태그 인덱스를 직접 소비하는 유일한 계층. 이렇게 경계를 나누면 AI 기능을 넣을 때 `garden` 계층의 인터페이스는 그대로 두고 내부 구현만 바꿀 수 있음.

---

## 4. 데이터 흐름

```
저자가 MDX 작성 → git commit(버전 기록)
    → 빌드 타임 콘텐츠 파이프라인
        - frontmatter 검증, wikilink/callout 파싱
        - heading에 id 부여(TOC), plain text 추출(검색)
        - git log 기반 최종 수정일 자동 산출
    → 파생 산출물(.content-cache/, 재생성 가능)
        - 콘텐츠 컬렉션(JSON), 링크 그래프, 태그 인덱스, 검색 인덱스
    → App Router가 빌드 타임에 소비(generateStaticParams)
    → 정적 HTML + RSC payload 배포
    → 클라이언트는 상호작용 필요한 부분만 hydration
```

**이유**: 원본(1단계)과 파생(2단계)을 명확히 분리하는 것이 아키텍처 전체의 핵심 원칙. 최종 수정일을 frontmatter 수기 관리 대신 git 로그에서 자동 산출 — 저자가 갱신을 잊는 흔한 실패를 구조적으로 제거.

---

## 5. MDX 관리 방식

**파이프라인 도구**: Velite(또는 동급의 타입 세이프 MDX 파이프라인), frontmatter를 Zod 스키마로 검증.

| 필드 | 설명 |
|---|---|
| `title`, `description` | 표시/SEO용 |
| `category` | 파일 경로에서 자동 유도 |
| `tags` | `_meta/tags.yaml`에 등록된 값만 허용(미등록시 경고) |
| `growth` | `seedling` / `budding` / `evergreen` — 노트의 성숙도 |
| `references` | 인용 문헌 목록 |
| `draft` | true면 프로덕션 빌드·검색·sitemap 제외 |
| ~~createdAt/updatedAt~~ | 수기 관리 안 함 — git 히스토리에서 자동 산출 |

**플러그인**: remark-gfm, 커스텀 remark-wikilink, 커스텀 remark-callout, rehype-slug + rehype-autolink-headings.

**이유**: Zod 검증으로 태그 오타·필드 누락을 빌드 시점에 즉시 발견. `growth` 필드는 Digital Garden 고유 개념으로 SEO(noindex 처리)와 AI 검색 가중치 양쪽에 재사용됨.

---

## 6. 검색 시스템 구조 (개요)

빌드 타임에 `title/tags/category/본문 plain text`를 담은 경량 JSON 인덱스를 생성 → 클라이언트에서 인메모리 fuzzy 검색 라이브러리로 조회. 검색 팔레트(Cmd+K)를 열 때만 인덱스와 라이브러리를 동적 import.

(상세 설계는 [08-search-system.md](./08-search-system.md) 참고)

---

## 7. 태그 시스템

`_meta/tags.yaml`에 통제 어휘(별칭/상위태그/설명 포함)를 등록. 빌드 시 모든 노트의 태그가 이 어휘에 존재하는지 검증. 자유 태깅은 짧은 기간엔 편하지만 수년 축적되면 오타·동의어 난립이 반드시 발생하므로, 통제 어휘로 구조적으로 방지.

---

## 8. Internal Link 구조

본문에서 `[[슬러그]]` 또는 `[[슬러그|표시텍스트]]` 위키링크 문법 사용. 빌드 시 전체 노트의 아웃바운드 링크를 수집해 **역방향 그래프(backlink)를 자동 계산**, 각 노트 하단에 "이 노트를 참조하는 노트" 자동 표시. 미해결 링크는 빌드 실패 대신 "예정된 노트" 스타일로 렌더링.

**이유**: 양방향 링크는 Digital Garden을 블로그와 구분 짓는 핵심 요소. 물리치료·운동학처럼 개념 간 상호참조가 많은 도메인에 특히 잘 맞음.

---

## 9. SEO 구조

- `generateMetadata`로 title/description/canonical/OG 메타데이터 자동 생성
- `opengraph-image.tsx`로 노트별 자동 생성 OG 이미지
- schema.org `MedicalWebPage`/`Article` JSON-LD, `dateModified`는 git 기반 자동 산출
- `sitemap.ts`가 콘텐츠 컬렉션에서 자동 생성
- `growth: seedling` 노트는 기본 `noindex`

**이유**: 의료 관련 콘텐츠는 구글의 E-E-A-T 기준이 엄격하므로 출처·구조화 데이터·최종수정일 표기가 중요. 미성숙 노트 noindex는 SEO 품질 관리를 frontmatter 필드 하나로 해결.

---

## 10. 향후 AI 기능을 붙이기 쉬운 구조

핵심 원칙: **원본 콘텐츠/구조화 메타데이터와 AI 파생 산출물(임베딩, 요약, 자동태그)을 처음부터 분리**.

- 검색 인덱스의 plain text 추출 로직 = 임베딩 파이프라인의 입력으로 그대로 재사용
- 백링크 그래프를 활용해 관계 기반 RAG 컨텍스트 확장 가능
- 통제된 태그 어휘를 AI 자동 태깅의 "제안 가능한 라벨 집합"으로 재사용
- `growth` 단계와 git 기반 수정일이 AI 검색 결과 가중치로 활용 가능
- `app/api/`, `.content-cache/`에 확장 지점을 미리 확보
- `lib/search/` 같은 어댑터 경계 덕분에 검색 엔진을 교체해도 컴포넌트는 그대로 유지
