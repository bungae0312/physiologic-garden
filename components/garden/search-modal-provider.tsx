"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SearchModal } from "@/components/garden/search-modal";

interface SearchModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchModalContext = createContext<SearchModalContextValue | null>(null);

/**
 * 헤더·사이드바·홈페이지 히어로의 검색 버튼이 전부 "같은 팔레트를 여는
 * 세 개의 진입점"이라는 게 docs/06 §6의 설계였다 — 그러니 열림 상태는
 * 하나의 컨텍스트로 공유하고, 단축키 리스너도 여기 한 곳에만 둔다.
 * 이 프로젝트에서 이미 같은 모양으로 쓰인 SidebarProvider/useSidebar
 * 패턴을 그대로 따랐다.
 */
export function SearchModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SearchModalContext.Provider value={{ open, setOpen }}>
      {children}
      <SearchModal open={open} onOpenChange={setOpen} />
    </SearchModalContext.Provider>
  );
}

export function useSearchModal() {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error("useSearchModal must be used within SearchModalProvider");
  }
  return context;
}
