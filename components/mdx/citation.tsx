/**
 * 문장 단위 인라인 근거 표시. 블록 단위로 문헌을 그대로 발췌하는
 * Callout(variant="quote")과는 용도가 다르다(docs/07 §2 참고) — 이건
 * 본문 중간에 찍히는 작은 각주 번호이고, 하단 ReferenceList의 항목과
 * id로 연결된다.
 */
export function Citation({ n, refId }: { n: number; refId: string }) {
  return (
    <sup id={`citation-${refId}`}>
      <a
        href={`#ref-${refId}`}
        className="rounded px-0.5 font-sans text-[0.7em] font-medium text-primary no-underline hover:underline"
        aria-label={`See reference ${n}`}
      >
        [{n}]
      </a>
    </sup>
  );
}
