"use client";

import { Moon, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSearchModal } from "@/components/garden/search-modal-provider";

/**
 * 로고와 "큰" 검색창은 이제 Sidebar(SidebarHeader)가 맡는다 — 데스크톱에서
 * 둘 다 펼쳐져 있으면 같은 걸 두 번 보여주는 셈이라, 여기 로고는 사이드바가
 * 안 보이는 모바일(드로어가 닫힌 상태)에서만 노출한다(md:hidden).
 * 검색 버튼은 사이드바 검색 버튼과 동일하게 같은 팔레트를 연다 — 테마
 * 버튼만 아직 자리만 잡아둔 상태(실제 다크모드 전환은 이번 범위 밖).
 */
export function SiteHeader() {
  const { setOpen } = useSearchModal();

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-1 h-5 md:hidden" />

      <a
        href="#"
        className="text-sm font-semibold tracking-tight text-foreground md:hidden"
      >
        physiologic
      </a>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="icon-sm" onClick={() => setOpen(true)}>
          <Search />
          <span className="sr-only">검색</span>
        </Button>
        <Button variant="outline" size="icon-sm">
          <Moon />
          <span className="sr-only">테마 전환</span>
        </Button>
      </div>
    </header>
  );
}
