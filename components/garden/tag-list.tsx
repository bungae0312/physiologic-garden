import { Badge } from "@/components/ui/badge";

/** 태그는 전부 중립색 pill — 개수가 늘어날수록 색상 구분은 소음이 된다(docs/02 §15). */
export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge variant="secondary" className="font-normal">
            #{tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
