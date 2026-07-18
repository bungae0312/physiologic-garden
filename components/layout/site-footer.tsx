export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="flex flex-col items-center gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>노트 128개 · 마지막 업데이트 3일 전</p>
        <nav className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground">
            About
          </a>
          <a href="#" className="hover:text-foreground">
            RSS
          </a>
          <a href="#" className="hover:text-foreground">
            Source
          </a>
        </nav>
      </div>
    </footer>
  );
}
