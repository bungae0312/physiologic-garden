import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBreadcrumb } from "@/components/garden/breadcrumb";
import { ArticleExplorer } from "@/components/garden/article-explorer";
import { getAllCategorySlugs, getCategoryBySlug } from "@/lib/content/categories";
import { formatDaysAgo } from "@/lib/content/relative-time";

/**
 * Category 허브 페이지 — 예시로 요청받은 "Shoulder" 외에 "Knee"도 같은
 * 데이터 구조로 넣어, 이 라우트가 Shoulder 하나에 하드코딩된 게 아니라
 * 실제로 재사용 가능한 동적 라우트임을 보여준다. Knee의 ACL 노트는
 * 진짜 /notes/acl-rehab-protocol로 연결되고, 나머지 더미 글은 아직
 * 본문이 없어 카드가 href 없이 렌더된다(ArticleCard의 기본 규칙).
 *
 * 이 페이지는 "훑어보는" 목록 페이지라 Article 본문과 달리 세리프를
 * 쓰지 않는다 — Homepage와 같은 산세리프 계열 유지(docs/05 원칙).
 */

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} · physiologic`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const mostRecentDays = Math.min(...category.articles.map((article) => article.daysAgo));

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
      <header className="max-w-2xl">
        <ArticleBreadcrumb
          items={[{ label: category.parentCategory, href: "#" }, { label: category.name }]}
        />
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-3 text-lg text-pretty text-muted-foreground">{category.description}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          {category.articles.length} notes · Updated {formatDaysAgo(mostRecentDays)}
        </p>
      </header>

      <div className="mt-10">
        <ArticleExplorer parentCategory={category.parentCategory} articles={category.articles} />
      </div>
    </div>
  );
}
