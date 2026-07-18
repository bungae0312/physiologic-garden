"use client";

import { useRouter } from "next/navigation";
import { FileText, Folder, Hash } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface NoteResult {
  title: string;
  breadcrumb: string;
  href?: string;
}

interface CategoryResult {
  title: string;
  count: string;
  href: string;
}

interface TagResult {
  title: string;
  count: string;
}

/**
 * 검색 기능은 없다 — 입력창은 진짜로 타이핑을 받지만(cmdk의 정상 동작),
 * <Command shouldFilter={false}>로 cmdk의 내장 매칭 로직만 꺼서 결과가
 * 입력값에 따라 걸러지지 않게 했다. 여기 보이는 목록은 "검색하면 이런
 * 모양으로 나온다"를 보여주는 고정 더미다.
 *
 * 이미 사이트에 한글(홈페이지)·영문(사이드바/노트/카테고리) 콘텐츠가
 * 섞여 있는 상태를 그대로 반영해 더미 결과도 두 언어를 섞었다 —
 * docs/08 검색 설계의 "한영 혼용 검색"을 결과 목록에서도 보여주려는
 * 의도다. ACL 노트와 Shoulder/Knee 카테고리는 실제로 존재하는
 * 페이지라 선택하면 진짜로 이동한다.
 */
const NOTE_RESULTS: NoteResult[] = [
  {
    title: "ACL Reconstruction Rehabilitation Protocol",
    breadcrumb: "Orthopedic PT › Knee",
    href: "/notes/acl-rehab-protocol",
  },
  {
    title: "Rotator Cuff Tear Assessment Checklist",
    breadcrumb: "Orthopedic PT › Shoulder",
  },
  {
    title: "보행 주기와 관절 모멘트",
    breadcrumb: "운동학",
  },
  {
    title: "고관절 신전 패턴 이상",
    breadcrumb: "운동학",
  },
];

const CATEGORY_RESULTS: CategoryResult[] = [
  { title: "Shoulder", count: "8 notes", href: "/categories/shoulder" },
  { title: "Knee", count: "4 notes", href: "/categories/knee" },
];

const TAG_RESULTS: TagResult[] = [
  { title: "ACL", count: "14 notes" },
  { title: "슬관절", count: "23 notes" },
  { title: "SpecialTests", count: "4 notes" },
];

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();

  function selectHref(href?: string) {
    onOpenChange(false);
    if (href) router.push(href);
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search"
      description="Search notes, categories, and tags"
    >
      <Command shouldFilter={false}>
        <CommandInput placeholder="Search notes, tags, categories…" autoFocus />
        {/* 기본 max-h-72(288px)는 셋으로 나뉜 더미 결과 9개가 다 안 들어가 스크롤을
            강요한다 — 큐레이션한 데모 목록은 스크롤 없이 한 번에 보이는 게 맞다. */}
        <CommandList className="max-h-[32rem]">
          <CommandGroup heading="Recent">
            {NOTE_RESULTS.map((note) => (
              <CommandItem
                key={note.title}
                value={note.title}
                className="items-start gap-3 py-2.5"
                onSelect={() => selectHref(note.href)}
              >
                <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-foreground">{note.title}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {note.breadcrumb}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Categories">
            {CATEGORY_RESULTS.map((category) => (
              <CommandItem
                key={category.title}
                value={category.title}
                onSelect={() => selectHref(category.href)}
              >
                <Folder className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate text-foreground">{category.title}</span>
                <span className="text-xs text-muted-foreground">{category.count}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Tags">
            {TAG_RESULTS.map((tag) => (
              <CommandItem
                key={tag.title}
                value={tag.title}
                onSelect={() => selectHref(undefined)}
              >
                <Hash className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1 truncate text-foreground">{tag.title}</span>
                <span className="text-xs text-muted-foreground">{tag.count}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>

        <div className="flex items-center gap-4 border-t border-border px-3 py-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↵</kbd>
            Select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">esc</kbd>
            Close
          </span>
        </div>
      </Command>
    </CommandDialog>
  );
}
