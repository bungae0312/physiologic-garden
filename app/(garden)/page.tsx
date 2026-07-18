import Link from "next/link";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Documentation Homepage.
 * 블로그형 최신순 나열이 아니라 "무엇이 있고 어디서 시작할지"를 보여주는
 * 진입점이다 — docs/05-homepage-ux.md의 정보 순서를 따르되, 이번 지시대로
 * Hero / Category Cards / Popular Tags 섹션을 명시적으로 구성했다.
 * 콘텐츠 파이프라인이 없어 전부 정적 목데이터다.
 */

const CATEGORIES = [
  { name: "물리치료", count: 42, description: "평가, 치료 기법, 임상 프로토콜" },
  { name: "운동학", count: 35, description: "관절, 근육, 움직임 분석" },
  { name: "임상사례", count: 18, description: "실제 환자 케이스 스터디" },
  { name: "참고문헌", count: 7, description: "인용 문헌과 근거 자료" },
] as const;

const RECENT_ARTICLES = [
  {
    title: "전방십자인대손상 재활 프로토콜",
    category: "운동학",
    excerpt: "수술 후 12주까지의 단계별 부하 기준과 금기 동작을 정리한다.",
    tags: ["ACL", "슬관절"],
    growth: "evergreen",
    updatedAt: "3일 전",
  },
  {
    title: "회전근개 파열 평가 체크리스트",
    category: "물리치료",
    excerpt: "특수검사 조합별 민감도·특이도와 감별진단 순서를 정리한다.",
    tags: ["회전근개", "견관절"],
    growth: "budding",
    updatedAt: "5일 전",
  },
  {
    title: "보행 주기와 관절 모멘트",
    category: "운동학",
    excerpt: "입각기·유각기 구간별 고관절·슬관절 모멘트 변화를 다룬다.",
    tags: ["보행분석"],
    growth: "evergreen",
    updatedAt: "1주 전",
  },
  {
    title: "반월판손상 보존적치료",
    category: "물리치료",
    excerpt: "수술 없이 접근 가능한 대상군 선정 기준과 진행 단계.",
    tags: ["슬관절", "반월판"],
    growth: "seedling",
    updatedAt: "1주 전",
  },
  {
    title: "스포츠손상 복귀 기준 사례",
    category: "임상사례",
    excerpt: "한발 뛰기 검사 대칭지수를 기준으로 복귀를 판단한 사례 기록.",
    tags: ["스포츠손상", "복귀기준"],
    growth: "budding",
    updatedAt: "2주 전",
  },
  {
    title: "고관절 신전 패턴 이상",
    category: "운동학",
    excerpt: "둔근 저활성으로 인한 대상 동작과 감별 평가 방법.",
    tags: ["고관절"],
    growth: "seedling",
    updatedAt: "2주 전",
  },
] as const;

const POPULAR_TAGS = [
  { name: "ACL", count: 14 },
  { name: "슬관절", count: 23 },
  { name: "보행분석", count: 9 },
  { name: "회전근개", count: 11 },
  { name: "스포츠손상", count: 8 },
  { name: "관절가동범위", count: 17 },
  { name: "고관절", count: 6 },
  { name: "근막통증", count: 5 },
] as const;

const RECENTLY_UPDATED = [
  { title: "전방십자인대손상 재활 프로토콜", updatedAt: "3일 전" },
  { title: "회전근개 파열 평가 체크리스트", updatedAt: "5일 전" },
  { title: "무릎 관절가동범위 정상치", updatedAt: "6일 전" },
  { title: "보행 주기와 관절 모멘트", updatedAt: "1주 전" },
  { title: "근막통증증후군 트리거포인트 지도", updatedAt: "1주 전" },
] as const;

const GROWTH_LABEL: Record<string, string> = {
  seedling: "🌱 seedling",
  budding: "🌿 budding",
  evergreen: "🌳 evergreen",
};

export default function GardenHome() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-16 px-6 py-12 sm:space-y-20 sm:px-10 sm:py-16">
      {/* Hero + 검색창 */}
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
          물리치료와 운동학을 기록하는 Digital Garden
        </h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          임상 경험과 문헌을 하나의 지식 그래프로 연결하며 평생 기록합니다.
        </p>

        {/*
          입력창이 아니라 팔레트를 여는 버튼이다 — 헤더의 검색 트리거, 사이드바의
          검색 진입점(docs/06)과 같은 팔레트를 여는 세 번째 진입점일 뿐, 검색 로직을
          여기 따로 두지 않는다. 아직 팔레트 자체가 없어 지금은 시각적 자리만 잡는다.
        */}
        <button
          type="button"
          className="mt-8 flex h-12 w-full items-center gap-3 rounded-lg border border-border bg-card px-4 text-left text-muted-foreground transition-colors hover:border-foreground/20"
        >
          <Search className="size-4 shrink-0" aria-hidden />
          <span className="flex-1 text-base">노트, 태그, 개념 검색…</span>
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
            ⌘K
          </kbd>
        </button>
      </section>

      {/* Category Cards */}
      <section>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
          주제로 둘러보기
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Card
              key={category.name}
              className="border-border transition-colors hover:border-foreground/20"
            >
              <CardContent className="px-5">
                <div className="flex items-center justify-between">
                  <span className="size-2 rounded-full bg-primary" aria-hidden />
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {category.count}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-foreground">{category.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            최근 기록
          </h2>
          <Link
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {RECENT_ARTICLES.map((article) => (
            <Card
              key={article.title}
              className="border-border transition-colors hover:border-foreground/20"
            >
              <CardContent className="px-5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                  {article.category}
                </div>
                <h3 className="mt-2 line-clamp-1 font-semibold text-foreground">
                  {article.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                      #{tag}
                    </Badge>
                  ))}
                  <Badge className="border-transparent bg-success/15 font-normal text-success">
                    {GROWTH_LABEL[article.growth]}
                  </Badge>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {article.updatedAt}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Tags */}
      <section>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
          인기 태그
        </h2>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TAGS.map((tag) => (
            <Badge
              key={tag.name}
              variant="outline"
              className="gap-1.5 px-3 py-1 text-sm font-normal text-foreground"
            >
              #{tag.name}
              <span className="text-muted-foreground">{tag.count}</span>
            </Badge>
          ))}
        </div>
      </section>

      {/* Recently Updated */}
      <section>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
          최근 수정됨
        </h2>
        <div className="divide-y divide-border rounded-lg border border-border">
          {RECENTLY_UPDATED.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-4 px-5 py-3.5"
            >
              <span className="truncate text-sm text-foreground">{item.title}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {item.updatedAt}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
