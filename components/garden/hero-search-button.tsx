"use client";

import { Search } from "lucide-react";
import { useSearchModal } from "@/components/garden/search-modal-provider";

/**
 * 홈페이지 히어로 검색창의 실제 동작 부분만 클라이언트 컴포넌트로 뺐다 —
 * Homepage 전체를 "use client"로 만들면 카테고리/최근 기록 같은 정적
 * 목록까지 전부 클라이언트에서 렌더링하게 되므로, 상호작용이 필요한
 * 이 버튼 하나만 섬(island)으로 분리했다.
 */
export function HeroSearchButton() {
  const { setOpen } = useSearchModal();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="mt-8 flex h-12 w-full items-center gap-3 rounded-lg border border-border bg-card px-4 text-left text-muted-foreground transition-colors hover:border-foreground/20"
    >
      <Search className="size-4 shrink-0" aria-hidden />
      <span className="flex-1 text-base">노트, 태그, 개념 검색…</span>
      <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">
        ⌘K
      </kbd>
    </button>
  );
}
