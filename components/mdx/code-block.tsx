import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  /** 실제 프로그래밍 언어가 아니어도 됨 — "formula", "protocol" 같은 라벨도 허용 */
  language?: string;
  code: string;
}

/**
 * docs/02-design-system.md §12: 이 프로젝트의 코드 블록은 프로그램 코드보다
 * 측정값·프로토콜 스텝·공식 같은 구조화된 데이터를 담는 용도가 크다.
 * 라이트 모드에서도 코드 블록만은 짙은 톤을 유지해 "본문 서술이 아니라
 * 원문/데이터"라는 시각적 구분을 준다.
 */
export function CodeBlock({ language = "text", code }: CodeBlockProps) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border font-sans">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">{language}</span>
        <CopyButton code={code} />
      </div>
      <pre className="overflow-x-auto bg-muted/30 px-4 py-4 text-sm leading-relaxed">
        <code className="font-mono whitespace-pre tabular-nums">{code}</code>
      </pre>
    </div>
  );
}
