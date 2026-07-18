import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { TocNav } from "@/components/layout/toc-nav";

/**
 * App Layout — Sidebar | Content | TOC 3단 구조.
 *
 * - Desktop(xl, ≥1280px): 세 컬럼 모두 표시
 * - Tablet(md~xl, 768~1279px): TOC 컬럼 숨김, Sidebar는 고정 표시
 * - Mobile(<md, <768px): Sidebar가 Drawer(Sheet)로 전환 (shadcn Sidebar 기본 동작)
 *
 * Footer는 Sidebar 폭까지 포함해 페이지 전체 너비로 깔린다(docs/05-homepage-ux.md 와이어프레임 참고).
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
          <div className="flex flex-1">
            <main className="min-w-0 flex-1 px-6 py-8 sm:px-10">{children}</main>
            <TocNav />
          </div>
        </div>
      </SidebarProvider>
      <SiteFooter />
    </div>
  );
}
