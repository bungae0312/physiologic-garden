interface FigureProps {
  caption: string;
  children: React.ReactNode;
}

/** 캡션 있는 이미지/다이어그램 래퍼. docs/03 폴더 구조 설계의 `mdx/Figure` 자리. */
export function Figure({ caption, children }: FigureProps) {
  return (
    <figure className="not-prose my-8 font-sans">
      <div className="rounded-lg border border-border bg-card p-4 sm:p-6">{children}</div>
      <figcaption className="mt-2.5 text-center text-sm text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
