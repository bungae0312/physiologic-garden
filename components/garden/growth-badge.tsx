import { Badge } from "@/components/ui/badge";

export type GrowthStage = "seedling" | "budding" | "evergreen";

const GROWTH_CONFIG: Record<GrowthStage, { emoji: string; label: string }> = {
  seedling: { emoji: "🌱", label: "Seedling" },
  budding: { emoji: "🌿", label: "Budding" },
  evergreen: { emoji: "🌳", label: "Evergreen" },
};

/**
 * Tag(고카디널리티 → 중립색)와 달리 Badge는 저카디널리티 상태값이라
 * 색을 줘도 소음이 되지 않는다(docs/02 §16). 성장 단계는 독자의 기대치를
 * 미리 조정하는 신호라 태그보다 살짝 더 또렷하게 만든다.
 */
export function GrowthBadge({ stage }: { stage: GrowthStage }) {
  const { emoji, label } = GROWTH_CONFIG[stage];
  return (
    <Badge className="gap-1 border-transparent bg-success/15 font-normal text-success">
      <span aria-hidden>{emoji}</span>
      {label}
    </Badge>
  );
}
