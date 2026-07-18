import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

/**
 * 더미 내비게이션 트리.
 * docs/04-mdx-pipeline.md 기준으로는 content/notes/ 폴더 구조에서 자동 생성되지만,
 * 지금은 레이아웃만 확인하는 단계라 정적 목데이터로 대체한다.
 */
const NAV_TREE = [
  {
    category: "물리치료",
    count: 42,
    notes: [
      { title: "전방십자인대손상 재활 프로토콜", active: true },
      { title: "반월판손상 보존적치료" },
      { title: "회전근개 파열 평가 체크리스트" },
    ],
  },
  {
    category: "운동학",
    count: 35,
    notes: [
      { title: "보행 주기와 관절 모멘트" },
      { title: "고관절 신전 패턴 이상" },
    ],
  },
  {
    category: "임상사례",
    count: 18,
    notes: [{ title: "스포츠손상 복귀 기준 사례" }],
  },
  {
    category: "참고문헌",
    count: 7,
    notes: [{ title: "Therapeutic Exercise 8th ed." }],
  },
] as const;

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
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
                {group.notes.map((note) => (
                  <SidebarMenuItem key={note.title}>
                    <SidebarMenuButton isActive={"active" in note && note.active}>
                      <span className="truncate">{note.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
