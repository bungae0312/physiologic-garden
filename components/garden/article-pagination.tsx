interface AdjacentNote {
  title: string;
}

interface ArticlePaginationProps {
  /** 형제 노트가 속한 카테고리명 — "다음 글"이 아니라 "같은 카테고리의 다른 노트"라는 맥락을 라벨에 명시 */
  category: string;
  previous?: AdjacentNote;
  next?: AdjacentNote;
}

/**
 * 발행 시간순이 아니라 같은 폴더(카테고리) 안의 형제 노트를 보여준다
 * (docs/07 §7) — "다음에 읽어야 할 순서"가 아니라 "같은 주제를 계속
 * 둘러보고 싶다면 여기"라는 가벼운 편의 기능이라 시각적 비중을 가장
 * 낮게 둔다. 둘 다 없으면 섹션 자체를 생략한다.
 */
export function ArticlePagination({ category, previous, next }: ArticlePaginationProps) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Adjacent notes" className="mt-16 border-t border-border pt-6">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          {previous && (
            <a href="#" className="group block">
              <span className="text-xs text-muted-foreground">← {category}</span>
              <span className="mt-1 block font-medium text-foreground transition-colors group-hover:text-muted-foreground">
                {previous.title}
              </span>
            </a>
          )}
        </div>
        <div className="text-right">
          {next && (
            <a href="#" className="group block">
              <span className="text-xs text-muted-foreground">{category} →</span>
              <span className="mt-1 block font-medium text-foreground transition-colors group-hover:text-muted-foreground">
                {next.title}
              </span>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
