"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * 본문의 실제 헤딩 id를 관찰해 현재 읽고 있는 섹션을 강조한다.
 * 지금은 콘텐츠 파이프라인이 없어 헤딩 목록을 페이지에서 직접
 * 넘겨받지만(하드코딩된 별도 배열이 아니라 본문 헤딩과 같은
 * `id`를 공유하는 단일 소스), 나중에 rehype가 헤딩 트리를
 * 추출해주면 이 컴포넌트는 prop 형태만 그대로 받아 바뀔 필요가 없다.
 *
 * 헤딩이 2개 미만이면 렌더링하지 않는다(docs/07 §2).
 */
export function TableOfContents({ headings }: { headings: readonly TocHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0]!.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 overflow-y-auto py-8 pr-6 pl-4 xl:block">
      <p className="mb-3 text-xs font-medium text-muted-foreground">On this page</p>
      <nav>
        <ul className="space-y-1 border-l border-border text-sm">
          {headings.map((heading) => (
            <li key={heading.id} style={{ paddingLeft: heading.level === 3 ? "1.5rem" : "0.75rem" }}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "-ml-px block border-l-2 py-1 transition-colors duration-150",
                  activeId === heading.id
                    ? "border-foreground font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
