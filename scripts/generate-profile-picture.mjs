import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_PATH = path.join(ROOT, "output", "profile-picture.png");

// 인스타그램 프로필 사진용 정사각형 워드마크.
// 원형으로 크롭되므로 텍스트는 중앙에 여백을 넉넉히 두고 배치.
// style-minimal.md의 Primary BG(#0B0B0D) + Accent(#6C6CF0) 글로우를 그대로 사용.
const SIZE = 1080;

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<style>
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${SIZE}px; height: ${SIZE}px; background: #0B0B0D; }
  .wrap {
    width: ${SIZE}px;
    height: ${SIZE}px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0B0B0D;
    background-image: radial-gradient(circle at 50% 50%, rgba(108, 108, 240, 0.4), transparent 62%);
  }
  .logo {
    font-family: 'Pretendard', sans-serif;
    font-weight: 800;
    font-size: 140px;
    letter-spacing: -1.5px;
    color: #FFFFFF;
  }
</style>
</head>
<body>
  <div class="wrap"><div class="logo">ai.upgrade</div></div>
</body>
</html>`;

async function main() {
  await mkdir(path.dirname(OUT_PATH), { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: SIZE, height: SIZE },
    deviceScaleFactor: 1,
  });

  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: OUT_PATH });
  console.log(`saved ${OUT_PATH}`);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
