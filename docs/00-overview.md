# physiologic — 물리치료·운동학 Digital Garden 설계 문서

물리치료와 운동학을 평생 기록하는 Digital Garden 프로젝트의 설계 문서 모음이다. Next.js App Router + MDX 기반이며, Apple Developer Documentation / Vercel Docs / Obsidian Publish / Raycast를 레퍼런스로 삼는다.

아직 구현 전 단계이며, 이 폴더는 설계만 담는다.

## 핵심 원칙 (모든 문서에 공통 적용)

1. **콘텐츠가 인터페이스다** — UI 크롬은 콘텐츠를 위해 물러난다.
2. **키보드 우선, 마우스는 대안** — 검색·내비게이션이 키보드로 완결된다.
3. **구조는 눈에 보여야 한다** — 태그·백링크·위계가 숨겨진 메타데이터가 아니라 화면에서 읽힌다.
4. **절제된 밀도(Calm Density)** — 정보 밀도는 높게, 시각적 소음은 낮게.
5. **하나의 악센트, 많은 중립색** — 색은 의미를 전달할 때만 쓴다.
6. **모션은 상태를 설명한다, 장식하지 않는다** — 애니메이션은 상태 변화의 신호일 뿐이다.
7. **임상적 신뢰감(Clinical Credibility)** — 의료·운동학 콘텐츠 특성상 정확하고 차분한 톤을 유지한다.

그리고 원본/파생 분리 원칙: **콘텐츠(MDX + frontmatter)만이 원본(source of truth)이고, 검색 인덱스·태그 집계·백링크 그래프·연관글 등은 언제든 재생성 가능한 파생 데이터**다. 이 구분이 아키텍처 전체를 관통한다.

## 문서 목록

| 문서 | 내용 |
|---|---|
| [01-architecture.md](./01-architecture.md) | 전체 아키텍처 — 디렉토리 구조, App Router, 컴포넌트 계층, 데이터 흐름, MDX 관리, 검색/태그/Internal Link/SEO 개요, 향후 AI 확장 구조 |
| [02-design-system.md](./02-design-system.md) | 디자인 시스템 — 타이포그래피, 스페이싱, 그리드, 컬러, 다크/라이트모드, 컴포넌트별 스펙, 애니메이션/호버/포커스, Article Layout |
| [03-project-structure.md](./03-project-structure.md) | 실제 프로젝트 폴더 구조 — app/components/lib/hooks/types/content/public/styles 등 폴더별 역할과 확장성 |
| [04-mdx-pipeline.md](./04-mdx-pipeline.md) | MDX 파일 하나로 카테고리·태그·검색·TOC·연관글이 자동 생성되는 Zero-Friction 파이프라인 |
| [05-homepage-ux.md](./05-homepage-ux.md) | 홈페이지 UX — 정보 습득 순서, 와이어프레임, 배치 이유 |
| [06-sidebar-ux.md](./06-sidebar-ux.md) | 사이드바 UX — 폴더구조/태그/최근/즐겨찾기/검색/테마/내비게이션/브레드크럼 통합 설계 |
| [07-article-page-ux.md](./07-article-page-ux.md) | Article 페이지 UX — 상단/본문/TOC/메타데이터/태그/이전·다음/연관글/인용/참고문헌 |
| [08-search-system.md](./08-search-system.md) | 검색 시스템 — Ctrl+K, 속도/정확도, 한글·영문 토크나이징, 라이브러리 선정(Orama) |

## 아직 결정되지 않은 것 (다음 논의 대상)

- 실제 콘텐츠 파이프라인 도구 확정 (Velite 등)
- Related Post 스코어링 가중치 구체적 수치
- 악센트 컬러(틸/시안 제안) 최종 확정
- 다크모드 기본 채택 여부 최종 확정
- `content.config.ts` frontmatter 스키마 필드 확정
