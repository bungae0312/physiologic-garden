/**
 * 표시용 문자열("3 days ago")과 정렬용 값을 따로 손으로 맞추면 반드시
 * 어긋난다 — daysAgo 하나만 데이터에 두고 표시 문자열은 여기서 도출한다.
 * (Article 페이지의 헤딩 배열과 같은 이유: 값의 출처를 하나로 유지)
 */
export function formatDaysAgo(days: number): string {
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  const weeks = Math.round(days / 7);
  if (weeks < 5) return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;

  const months = Math.round(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}
