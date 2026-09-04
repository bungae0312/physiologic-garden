import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// Shared HTML/CSS card-news renderer, implementing style-minimal.md.
// Each deck script (scripts/generate-cards*.mjs) supplies brand/cards/outDir
// and calls renderDeck() — see style-minimal.md 8번 for the layout constants
// baked into BASE_CSS below (top-anchored content, unified 96px margins,
// bottom glow gradient, gradient badges).

export const BASE_CSS = `
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  :root {
    --bg-primary: #0B0B0D;
    --bg-secondary: #18181C;
    --accent: #6C6CF0;
    --text-body: #FFFFFF;
    --text-muted: #9CA0AA;
    --success: #4ADE80;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    width: 1080px;
    height: 1350px;
    background: var(--bg-primary);
    overflow: hidden;
  }

  body {
    font-family: 'Pretendard', sans-serif;
    color: var(--text-body);
  }

  .slide {
    position: relative;
    width: 1080px;
    height: 1350px;
    display: flex;
    flex-direction: column;
    /* vertical: 60px safe-zone floor; horizontal: 96px (=9%) content-area
       margin applied uniformly so brand/page-num/title/body all share one
       left/right baseline (style-minimal.md 5번, 8번) */
    padding: 60px 96px;
    background-color: var(--bg-primary);
    /* every slide gets a subtle accent glow rising from the bottom edge,
       so the lower whitespace reads as designed atmosphere rather than
       an empty gap (style-minimal.md 6번) */
    background-image: radial-gradient(ellipse 900px 520px at 50% 104%, rgba(108, 108, 240, 0.35) 0%, transparent 70%);
  }

  .slide--cover {
    background-image:
      radial-gradient(circle at 26% 22%, rgba(108, 108, 240, 0.42), transparent 55%),
      radial-gradient(circle at 88% 10%, rgba(108, 108, 240, 0.22), transparent 50%),
      radial-gradient(ellipse 900px 520px at 50% 104%, rgba(108, 108, 240, 0.35) 0%, transparent 70%);
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }

  .brand {
    font-size: 28px;
    font-weight: 600;
    color: var(--text-body);
    letter-spacing: 0.2px;
  }

  .page-num {
    font-size: 26px;
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: 0.5px;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    /* top-anchored (not centered): keeps the headline's start position
       identical across every slide regardless of how much text it has,
       so the carousel doesn't jump around while swiping. Anchor sits a
       bit lower than the old 110px so the (now bigger) title reads as
       more centered in the frame instead of hugging the header. */
    justify-content: flex-start;
    padding-top: 170px;
  }

  .badges { display: flex; gap: 14px; margin-bottom: 44px; }

  .badge {
    display: inline-block;
    background: linear-gradient(135deg, #8484FF 0%, #6C6CF0 100%);
    color: #FFFFFF;
    font-size: 30px;
    font-weight: 800;
    letter-spacing: 0.3px;
    padding: 14px 32px;
    border-radius: 999px;
    box-shadow: 0 10px 28px rgba(108, 108, 240, 0.55), inset 0 0 0 1px rgba(255, 255, 255, 0.16);
  }

  .cover-title {
    font-size: 94px;
    font-weight: 800;
    line-height: 1.16;
    letter-spacing: -1.5px;
  }

  .cover-subtitle {
    margin-top: 40px;
    font-size: 42px;
    font-weight: 500;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .eyebrow {
    font-size: 30px;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: 4px;
    margin-bottom: 36px;
  }

  .key-title {
    font-size: 80px;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -1px;
  }

  .hl { color: var(--accent); }

  .body-text {
    margin-top: 44px;
    font-size: 46px;
    font-weight: 500;
    color: var(--text-body);
    line-height: 1.45;
  }

  /* Before/After 비교 (style-minimal.md 6번: Secondary BG 박스 + Accent 보더 강조) */
  .compare-title {
    font-size: 58px;
    font-weight: 800;
    line-height: 1.25;
    letter-spacing: -0.5px;
    margin-bottom: 36px;
  }

  .compare-box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 36px;
  }

  .compare-row { display: flex; flex-direction: column; gap: 10px; }

  .compare-label {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .compare-label.before { color: var(--text-muted); }
  .compare-label.after { color: var(--accent); }

  .compare-text {
    background: var(--bg-secondary);
    border-radius: 16px;
    padding: 24px 28px;
    font-size: 32px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--text-body);
  }

  .compare-text.before {
    border: 1px solid rgba(156, 160, 170, 0.25);
    color: var(--text-muted);
  }

  .compare-text.after {
    border: 2px solid var(--accent);
    box-shadow: 0 10px 24px rgba(108, 108, 240, 0.22);
  }

  .compare-note {
    font-size: 32px;
    font-weight: 500;
    line-height: 1.5;
    color: var(--text-body);
  }

  .quote-box {
    margin-top: 44px;
    background: var(--bg-secondary);
    border: 2px solid var(--accent);
    border-radius: 16px;
    padding: 32px 36px;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.4;
    color: var(--text-body);
    box-shadow: 0 10px 24px rgba(108, 108, 240, 0.22);
  }

  .icon-badge {
    margin-top: 56px;
    width: 168px;
    height: 168px;
    flex-shrink: 0;
    border-radius: 999px;
    background: var(--bg-secondary);
    border: 2px solid var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 20px 40px rgba(108, 108, 240, 0.25);
  }

  .icon-badge svg {
    width: 84px;
    height: 84px;
    color: var(--accent);
  }

  .summary-title {
    font-size: 64px;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 64px;
  }

  .checklist { display: flex; flex-direction: column; gap: 32px; margin-bottom: 68px; }

  .check-item {
    display: flex;
    align-items: center;
    gap: 22px;
    font-size: 40px;
    font-weight: 600;
  }

  .check-mark {
    color: var(--success);
    font-size: 40px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .cta-box {
    background: var(--bg-secondary);
    border: 2px solid var(--accent);
    border-radius: 16px;
    padding: 44px 48px;
  }

  .cta-text {
    font-size: 36px;
    font-weight: 500;
    line-height: 1.5;
  }

  .cta-handle {
    margin-top: 18px;
    font-size: 40px;
    font-weight: 800;
    color: var(--accent);
  }

  .dots {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    padding-top: 24px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--text-muted);
    opacity: 0.4;
  }

  .dot.active {
    width: 28px;
    background: var(--accent);
    opacity: 1;
  }
`;

// 시험 적용 중: 각 카드 하단에 넣는 심플 라인 아이콘 세트.
// content 카드에 icon: "<key>" 필드를 추가하면 렌더링됨(선택 사항, 없으면 미출력).
// style-minimal.md에는 아직 반영하지 않음 — 결과 확인 후 정식 반영 여부 결정.
const ICONS = {
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4V5z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.8-4.8"/></svg>',
  design: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.6 1.6-1.4 0-.4-.2-.7-.4-1-.2-.3-.4-.6-.4-1 0-.8.6-1.4 1.4-1.4H16a4 4 0 0 0 4-4c0-5-3.6-9-8-9z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="9.5" cy="7" r="1"/><circle cx="14.5" cy="7" r="1"/><circle cx="16.5" cy="10.5" r="1"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M10 9l6 3-6 3V9z"/></svg>',
  notebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6V3z"/><path d="M15 3v4h4"/><path d="M9 12h7M9 16h7"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/><path d="M9 21h6"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 4.8L18.5 9.7l-4.6 1.9L12 16.4l-1.9-4.8L5.5 9.7l4.6-1.9z"/><path d="M18 14.5l.85 2.15L21 17.5l-2.15.85L18 20.5l-.85-2.15L15 17.5l2.15-.85z"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/><path d="M12 15V4"/><path d="M7.5 8.5L12 4l4.5 4.5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L18.5 9.5a2 2 0 0 0-2.8-2.8L5 17.7z"/><path d="M13.5 6.5l4 4"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.5 3.9 5.7 3.9 9s-1.3 6.5-3.9 9c-2.6-2.5-3.9-5.7-3.9-9S9.4 5.5 12 3z"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h3.5l2 2.5H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
};

function renderDots(activeIndex, total) {
  return Array.from({ length: total }, (_, i) => {
    const cls = i === activeIndex ? "dot active" : "dot";
    return `<span class="${cls}"></span>`;
  }).join("");
}

function renderContentBlock(card) {
  if (card.type === "cover") {
    return `
      <div class="badges">
        ${card.badges.map((b) => `<span class="badge">${b}</span>`).join("")}
      </div>
      <div class="cover-title">${card.title}</div>
      <div class="cover-subtitle">${card.subtitle}</div>
    `;
  }

  if (card.type === "content") {
    return `
      <div class="eyebrow">${card.eyebrow}</div>
      <div class="key-title">${card.title}</div>
      ${card.body ? `<div class="body-text">${card.body}</div>` : ""}
      ${card.quote ? `<div class="quote-box">${card.quote}</div>` : ""}
      ${card.note ? `<div class="body-text">${card.note}</div>` : ""}
      ${card.icon && ICONS[card.icon] ? `<div class="icon-badge">${ICONS[card.icon]}</div>` : ""}
    `;
  }

  if (card.type === "compare") {
    return `
      <div class="eyebrow">${card.eyebrow}</div>
      <div class="compare-title">${card.title}</div>
      <div class="compare-box">
        <div class="compare-row">
          <div class="compare-label before">BEFORE</div>
          <div class="compare-text before">${card.before}</div>
        </div>
        <div class="compare-row">
          <div class="compare-label after">AFTER</div>
          <div class="compare-text after">${card.after}</div>
        </div>
      </div>
      <div class="compare-note">${card.note}</div>
    `;
  }

  // summary
  return `
    <div class="eyebrow">${card.eyebrow}</div>
    <div class="summary-title">${card.title}</div>
    ${
      card.items && card.items.length
        ? `<div class="checklist">
      ${card.items
        .map(
          (item) => `
        <div class="check-item">
          <span class="check-mark">✓</span>
          <span>${item}</span>
        </div>`
        )
        .join("")}
    </div>`
        : ""
    }
    <div class="cta-box">
      <div class="cta-text">${card.cta}</div>
      <div class="cta-handle">${card.handle}</div>
    </div>
  `;
}

function buildHTML(card, index, total, brand) {
  const pageNum = `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
  const slideClass = card.type === "cover" ? "slide slide--cover" : "slide";

  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<style>${BASE_CSS}</style>
</head>
<body>
  <div class="${slideClass}">
    <div class="header-row">
      <div class="brand">${brand}</div>
      <div class="page-num">${pageNum}</div>
    </div>
    <div class="content">
      ${renderContentBlock(card)}
    </div>
    <div class="dots">${renderDots(index, total)}</div>
  </div>
</body>
</html>`;
}

export async function renderDeck({ brand, cards, outDir }) {
  await mkdir(outDir, { recursive: true });

  const cardsWithHandle = cards.map((c) =>
    c.type === "summary" ? { ...c, handle: c.handle ?? brand } : c
  );

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 1,
  });

  for (let i = 0; i < cardsWithHandle.length; i++) {
    const html = buildHTML(cardsWithHandle[i], i, cardsWithHandle.length, brand);
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const fileName = `card_${String(i + 1).padStart(2, "0")}.png`;
    const outPath = path.join(outDir, fileName);
    await page.screenshot({ path: outPath });
    console.log(`saved ${outPath}`);
  }

  await browser.close();
}
