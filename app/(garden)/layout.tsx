import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * App Layout — Sidebar | Content 2단 구조.
 *
 * - Desktop(≥768px): Sidebar 고정 표시
 * - Mobile(<md, <768px): Sidebar가 Drawer(Sheet)로 전환 (shadcn Sidebar 기본 동작)
 *
 * 우측 TOC 컬럼은 여기서 전역으로 그리지 않는다 — 홈페이지처럼 "훑어보는" 페이지엔
 * 목차가 필요 없고(docs/05-homepage-ux.md), 노트 본문 폭도 페이지 종류마다 다르기
 * 때문(홈은 넓은 카드 그리드, 노트는 720px 고정). 그래서 TOC와 본문 최대폭은
 * 이 레이아웃이 아니라 각 페이지(app/(garden)/notes/**)가 필요할 때 직접 구성한다.
 *
 * Footer는 Sidebar 폭까지 포함해 페이지 전체 너비로 깔린다.
 */
export default function GardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <SidebarProvider className="min-h-0 flex-1">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <SiteHeader />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </SidebarProvider>
      <SiteFooter />
    </div>
  );
}
