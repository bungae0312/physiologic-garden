import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // 상위 physiologic(FitCRM) 프로젝트의 package-lock.json과 워크스페이스 루트가
  // 혼동되지 않도록 이 프로젝트 디렉터리를 명시적으로 루트로 고정한다.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
