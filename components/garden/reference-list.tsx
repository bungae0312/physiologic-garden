import { ARTICLE_SECTION_CLASS } from "@/components/garden/section-spacing";

export interface Reference {
  id: string;
  text: React.ReactNode;
}

/**
 * 각 항목에 본문으로 돌아가는 back-link(↑)를 달아 왕복 탐색 마찰을
 * 줄인다(docs/07 §5). frontmatter가 없는 지금은 페이지에서 배열로
 * 직접 넘긴다.
 */
export function ReferenceList({ references }: { references: Reference[] }) {
  if (references.length === 0) return null;

  return (
    <section aria-labelledby="references-heading" className={ARTICLE_SECTION_CLASS}>
      <h2
        id="references-heading"
        className="text-lg font-semibold tracking-tight text-foreground"
      >
        References
      </h2>
      <ol className="mt-4 space-y-3">
        {references.map((reference, index) => (
          <li
            key={reference.id}
            id={`ref-${reference.id}`}
            className="flex gap-3 text-sm text-muted-foreground"
          >
            <span className="tabular-nums">[{index + 1}]</span>
            <span className="flex-1">{reference.text}</span>
            <a
              href={`#citation-${reference.id}`}
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`Back to citation ${index + 1} in text`}
            >
              ↑
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
