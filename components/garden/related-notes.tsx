import { cn } from "@/lib/utils";
import { ARTICLE_SECTION_CLASS } from "@/components/garden/section-spacing";

export interface RelatedItem {
  title: string;
  category: string;
}

interface RelatedNotesProps {
  /** 저자가 실제로 [[ ]]로 연결한, 가장 신뢰도 높은 관계 */
  backlinks: RelatedItem[];
  /** 태그·카테고리 겹침으로 추정한 관계 */
  suggested: RelatedItem[];
}

/**
 * 두 그룹을 하나로 합치지 않는다 — 독자가 "저자의 의도적 연결"과
 * "시스템의 추측"을 구분할 수 있어야 신뢰도가 유지된다(docs/07 §6).
 * 태그 겹침이 아예 없으면 suggested 섹션 자체를 렌더링하지 않는다.
 */
export function RelatedNotes({ backlinks, suggested }: RelatedNotesProps) {
  if (backlinks.length === 0 && suggested.length === 0) return null;

  return (
    <section className={cn(ARTICLE_SECTION_CLASS, "space-y-8")}>
      {backlinks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Referenced by
          </h2>
          <ul className="mt-4 space-y-2">
            {backlinks.map((item) => (
              <li key={item.title}>
                <a
                  href="#"
                  className="text-sm text-foreground underline decoration-dotted underline-offset-4 transition-colors hover:decoration-solid"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggested.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Related by topic
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {suggested.map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-border px-4 py-3 transition-colors hover:border-foreground/20"
              >
                <p className="text-xs text-muted-foreground">{item.category}</p>
                <a href="#" className="mt-1 block text-sm font-medium text-foreground">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
