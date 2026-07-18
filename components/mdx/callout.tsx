import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Info, Lightbulb, Quote, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutVariant = "note" | "tip" | "warning" | "danger" | "quote";

const CALLOUT_CONFIG: Record<
  CalloutVariant,
  { icon: LucideIcon; label: string; className: string; iconClassName: string }
> = {
  note: {
    icon: Info,
    label: "Note",
    className: "border-info bg-info/5 [&_.callout-title]:text-info",
    iconClassName: "text-info",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    className: "border-success bg-success/5 [&_.callout-title]:text-success",
    iconClassName: "text-success",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    className: "border-warning bg-warning/5 [&_.callout-title]:text-warning",
    iconClassName: "text-warning",
  },
  danger: {
    icon: ShieldAlert,
    label: "Danger",
    className: "border-destructive bg-destructive/5 [&_.callout-title]:text-destructive",
    iconClassName: "text-destructive",
  },
  quote: {
    icon: Quote,
    label: "Quote",
    className: "border-border bg-muted/40 [&_.callout-title]:text-foreground",
    iconClassName: "text-muted-foreground",
  },
};

interface CalloutProps {
  variant: CalloutVariant;
  title?: string;
  /** quote 변형에서 출처를 표시할 때만 사용 */
  cite?: string;
  children: React.ReactNode;
}

/**
 * docs/02-design-system.md §14 스펙: 좌측 컬러 보더 + 옅은 배경 틴트,
 * 채도 높은 풀컬러 채움은 쓰지 않는다. danger만 원칙 5(절제)보다
 * 안전(원칙 7)을 우선해 대비를 더 강하게 준다(border-l-4로 다른 변형보다 두껍게 X —
 * 두께는 통일하고 색만 danger가 가장 진하도록 opacity를 올림).
 *
 * `.prose` 안에서 쓰이므로 not-prose로 타이포그래피 플러그인의 개입을 차단하고,
 * font-sans로 본문 세리프 상속을 끊어 "UI 알림"으로서의 성격을 유지한다.
 */
export function Callout({ variant, title, cite, children }: CalloutProps) {
  const { icon: Icon, label, className, iconClassName } = CALLOUT_CONFIG[variant];

  return (
    <aside
      aria-label={label}
      className={cn(
        "not-prose my-6 rounded-lg border-l-4 px-5 py-4 font-sans",
        className,
      )}
    >
      <div className="flex items-start gap-2.5">
        <Icon className={cn("mt-0.5 size-4 shrink-0", iconClassName)} aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="callout-title mb-1 text-sm font-semibold text-foreground">
            {title ?? label}
          </p>
          <div className="text-sm leading-relaxed text-foreground/90 [&>p]:m-0 [&>p+p]:mt-2">
            {children}
          </div>
          {cite && (
            <cite className="mt-2 block text-xs not-italic text-muted-foreground">
              — {cite}
            </cite>
          )}
        </div>
      </div>
    </aside>
  );
}
