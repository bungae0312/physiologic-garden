import Link from "next/link";

/**
 * (garden) 라우트 그룹 전용 404 — categories/[slug]의 notFound()가
 * 이걸 촉발시키기 전까지는 Next.js 기본 흰 배경 텍스트 화면이 그대로
 * 노출되고 있었다. 사이트 전체가 디자인 시스템을 따르는데 에러 화면만
 * 예외로 남겨두는 건 이 프로젝트 기준으로 미완성이라 판단해 추가했다.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
        This page hasn&rsquo;t grown here yet
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The note or category you&rsquo;re looking for doesn&rsquo;t exist — or hasn&rsquo;t
        been planted yet.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors duration-150 hover:border-foreground/20 hover:bg-accent"
      >
        Back to the garden
      </Link>
    </div>
  );
}
