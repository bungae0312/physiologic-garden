"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * CodeBlock의 유일한 상호작용 지점. 클립보드 쓰기 하나만 하는
 * 자기완결적 상태라 "레이아웃엔 기능을 넣지 말라"는 이전 단계 원칙과
 * 충돌하지 않는다 — 검색/테마처럼 아직 없는 시스템에 기대는 게 아니라
 * 이 컴포넌트 안에서 전부 끝난다.
 */
export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
