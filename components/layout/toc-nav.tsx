/**
 * 우측 목차 컬럼.
 * 지금은 본문 헤딩을 파싱하지 않고 더미 헤딩 목록을 그대로 렌더링한다
 * (스크롤 스파이·자동 추출은 MDX 파이프라인이 붙는 단계에서 구현).
 */
const DUMMY_HEADINGS = [
  { level: 2, text: "개요" },
  { level: 2, text: "1단계: 급성기 (0~2주)" },
  { level: 3, text: "관절가동범위 목표" },
  { level: 3, text: "금기 동작" },
  { level: 2, text: "2단계: 근력 강화기 (3~8주)" },
  { level: 2, text: "3단계: 기능 회복기 (9~12주)" },
  { level: 3, text: "스포츠 복귀 기준" },
];

export function TocNav() {
  return (
    <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-60 shrink-0 overflow-y-auto py-8 pr-6 pl-4 xl:block">
      <p className="mb-3 text-xs font-medium text-muted-foreground">목차</p>
      <nav>
        <ul className="space-y-2 border-l border-border text-sm">
          {DUMMY_HEADINGS.map((heading, index) => (
            <li key={index} style={{ paddingLeft: heading.level === 3 ? "1.5rem" : "0.75rem" }}>
              <a
                href="#"
                className="-ml-px block border-l-2 border-transparent py-0.5 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
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
