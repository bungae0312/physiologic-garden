"use client";

import { FileText, Moon, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchModal } from "@/components/garden/search-modal-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

/**
 * 더미 내비게이션 트리.
 * docs/04-mdx-pipeline.md 기준으로는 content/notes/ 폴더 구조에서 자동 생성되지만,
 * 지금은 UI/UX만 확인하는 단계라 정적 목데이터로 대체한다.
 *
 * 카테고리 아이콘은 넣지 않는다(docs/06-sidebar-ux.md — 아이콘은 카테고리가
 * 많아질수록 소음이 된다는 원칙). 대신 개별 노트 항목에는 문서 아이콘을 붙여,
 * 사이드바가 아이콘 전용 레일로 접혔을 때도 "이건 문서다"라는 최소한의
 * 단서가 남도록 했다.
 */
const NAV_TREE = [
  {
    category: "Orthopedic PT",
    count: 42,
    notes: [
      { title: "ACL Reconstruction Rehabilitation Protocol", active: true },
      { title: "Meniscus Tear: Conservative Management" },
      { title: "Rotator Cuff Tear Assessment Checklist" },
    ],
  },
  {
    category: "Clinical Exercise",
    count: 35,
    notes: [
      { title: "Gait Cycle & Joint Moments" },
      { title: "Hip Extension Pattern Dysfunction" },
    ],
  },
  {
    category: "Lecture Notes",
    count: 12,
    notes: [
      { title: "Functional Anatomy of the Knee" },
      { title: "Neuromuscular Control Basics" },
    ],
  },
  {
    category: "Research",
    count: 7,
    notes: [{ title: "Therapeutic Exercise, 8th Edition" }],
  },
  {
    category: "Case Study",
    count: 18,
    notes: [{ title: "Return-to-Sport Criteria: A Case Report" }],
  },
] as const;

export function AppSidebar() {
  const { setOpen } = useSearchModal();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="gap-3 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            P
          </div>
          <span className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            physiologic
          </span>
        </div>

        {/* Search Button — 헤더/홈페이지 검색 버튼과 같은 팔레트를 연다 */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Search"
              onClick={() => setOpen(true)}
              className="border border-sidebar-border text-muted-foreground transition-colors duration-150 hover:border-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <Search className="size-4 shrink-0" />
              <span className="flex-1 truncate">Search…</span>
              <kbd className="rounded border border-sidebar-border bg-sidebar-accent px-1 py-0.5 font-mono text-[10px] group-data-[collapsible=icon]:hidden">
                ⌘K
              </kbd>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {NAV_TREE.map((group) => (
          <SidebarGroup key={group.category}>
            <SidebarGroupLabel>
              {group.category}
              <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                {group.count}
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.notes.map((note) => {
                  const active = "active" in note && note.active;
                  return (
                    <SidebarMenuItem key={note.title}>
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={note.title}
                        className={cn(
                          "border-l-2 border-l-transparent pl-[6px] transition-colors duration-150",
                          active &&
                            "border-l-primary bg-sidebar-accent font-medium text-sidebar-accent-foreground",
                        )}
                      >
                        <FileText className="size-4 shrink-0" />
                        <span className="truncate">{note.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Settings"
              className="transition-colors duration-150"
            >
              <Settings className="size-4 shrink-0" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Dark Mode"
              className="transition-colors duration-150"
            >
              <Moon className="size-4 shrink-0" />
              <span>Dark Mode</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* 사이드바 우측 경계의 드래그 핸들 — 클릭해도 접기/펼치기 토글 */}
      <SidebarRail />
    </Sidebar>
  );
}
