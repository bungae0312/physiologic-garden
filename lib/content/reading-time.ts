const WORDS_PER_MINUTE = 200;

/**
 * MDX 파이프라인(docs/04)이 붙으면 본문 plain text에서 단어 수를
 * 직접 세어 넘겨줄 자리 — 지금은 더미 글의 단어 수를 손으로 어림잡아
 * 넘긴다. 계산 로직 자체는 실제로 쓰일 형태 그대로 둔다.
 */
export function estimateReadingMinutes(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
