"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ArticleCard } from "@/components/garden/article-card";
import { formatDaysAgo } from "@/lib/content/relative-time";
import type { CategoryArticle } from "@/lib/content/categories";

type SortMode = "recent" | "popular";

interface ArticleExplorerProps {
  /** 카드 상단에 표시할 상위 카테고리 라벨 (예: "Orthopedic PT") */
  parentCategory: string;
  articles: CategoryArticle[];
}

/**
 * Tag Filter와 Sort가 같은 리스트를 함께 조작하므로 각자 별도 컴포넌트로
 * 쪼개 상태를 끌어올리기보다(props 배관이 늘어날 뿐 실익이 없다) 하나의
 * 클라이언트 아일랜드에서 같이 관리한다. 필터링·정렬 둘 다 이미 메모리에
 * 있는 배열을 다루는 순수 계산이라 검색(별도 인덱스 필요)이나 테마(전역
 * 상태 필요)와 달리 백엔드 없이도 완결된다.
 */
export function ArticleExplorer({ parentCategory, articles }: ArticleExplorerProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("recent");

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const article of articles) {
      for (const tag of article.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [articles]);

  const visibleArticles = useMemo(() => {
    const filtered = selectedTag
      ? articles.filter((article) => article.tags.includes(selectedTag))
      : articles;

    return [...filtered].sort((a, b) =>
      sortMode === "recent" ? a.daysAgo - b.daysAgo : b.backlinkCount - a.backlinkCount,
    );
  }, [articles, selectedTag, sortMode]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
        <FilterPill
          label="All"
          count={articles.length}
          active={selectedTag === null}
          onClick={() => setSelectedTag(null)}
        />
        {tagCounts.map(([tag, count]) => (
          <FilterPill
            key={tag}
            label={`#${tag}`}
            count={count}
            active={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <p className="text-sm text-muted-foreground">
          {visibleArticles.length} {visibleArticles.length === 1 ? "note" : "notes"}
        </p>
        <div className="inline-flex rounded-md border border-border p-0.5" role="group" aria-label="Sort">
          <SortButton
            label="Recent"
            active={sortMode === "recent"}
            onClick={() => setSortMode("recent")}
          />
          <SortButton
            label="Popular"
            active={sortMode === "popular"}
            onClick={() => setSortMode("popular")}
          />
        </div>
      </div>

      {visibleArticles.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {visibleArticles.map((article) => (
            <ArticleCard
              key={article.title}
              href={article.noteSlug ? `/notes/${article.noteSlug}` : undefined}
              category={parentCategory}
              title={article.title}
              excerpt={article.excerpt}
              tags={article.tags}
              growth={article.growth}
              updatedAt={formatDaysAgo(article.daysAgo)}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No notes match this filter yet.
        </p>
      )}
    </div>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-sm transition-colors duration-150",
        active
          ? "border-primary bg-primary/10 font-medium text-primary"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {label} <span className="tabular-nums opacity-70">{count}</span>
    </button>
  );
}

function SortButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded px-3 py-1 text-sm transition-colors duration-150",
        active ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
