import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GrowthBadge, type GrowthStage } from "@/components/garden/growth-badge";

export interface ArticleCardProps {
  /** 실제 노트 페이지가 있을 때만 넘긴다 — 없으면 "#"로 폴백해 아직 없는 페이지로
   *  이동하는 척하지 않는다(다른 더미 카드들과 동일한 규칙). */
  href?: string;
  category: string;
  title: string;
  excerpt: string;
  tags: string[];
  growth: GrowthStage;
  updatedAt: string;
}

/**
 * 홈페이지 "최근 기록"과 Category 페이지가 같은 카드를 쓴다 — 원래 홈페이지
 * page.tsx 안에 인라인으로 있던 마크업을 그대로 옮긴 것이라 기존 화면은
 * 픽셀 단위로 그대로다. 이 컴포넌트는 데이터만 받고 언어를 모르므로,
 * 홈페이지의 한글 더미 데이터와 이 카테고리 페이지의 영문 더미 데이터를
 * 그대로 각자 유지한 채 구조만 공유한다.
 */
export function ArticleCard({
  href = "#",
  category,
  title,
  excerpt,
  tags,
  growth,
  updatedAt,
}: ArticleCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="h-full border-border transition-colors hover:border-foreground/20">
        <CardContent className="px-5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            {category}
          </div>
          <h3 className="mt-2 line-clamp-1 font-semibold text-foreground">{title}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                #{tag}
              </Badge>
            ))}
            <GrowthBadge stage={growth} />
            <span className="ml-auto text-xs text-muted-foreground">{updatedAt}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
