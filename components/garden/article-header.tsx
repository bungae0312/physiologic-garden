import { Badge } from "@/components/ui/badge";
import { ArticleBreadcrumb, type BreadcrumbItem } from "@/components/garden/breadcrumb";
import { GrowthBadge, type GrowthStage } from "@/components/garden/growth-badge";

interface ArticleHeaderProps {
  breadcrumb: BreadcrumbItem[];
  title: string;
  description: string;
  category: string;
  growth: GrowthStage;
  updatedAt: string;
  readingMinutes: number;
}

/**
 * Title + Description(lede)은 font-serif를 써서 본문과 같은 "읽는 글" 톤을
 * 이어가고, 메타 행은 font-sans 그대로 둬서 UI 정보라는 걸 시각적으로
 * 구분한다. 위아래 보더로 메타 행을 감싼 건 저널 마스트헤드 느낌을
 * 의도한 디테일이다.
 */
export function ArticleHeader({
  breadcrumb,
  title,
  description,
  category,
  growth,
  updatedAt,
  readingMinutes,
}: ArticleHeaderProps) {
  return (
    <header>
      <ArticleBreadcrumb items={breadcrumb} />

      <h1 className="mt-3 font-serif text-4xl leading-[1.15] font-bold tracking-tight text-balance text-foreground sm:text-[2.75rem]">
        {title}
      </h1>

      <p className="mt-4 font-serif text-xl leading-relaxed text-pretty text-muted-foreground">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-border py-3 font-sans text-sm text-muted-foreground">
        <Badge variant="secondary">{category}</Badge>
        <GrowthBadge stage={growth} />
        <span aria-hidden>·</span>
        <span>Updated {updatedAt}</span>
        <span aria-hidden>·</span>
        <span>{readingMinutes} min read</span>
      </div>
    </header>
  );
}
