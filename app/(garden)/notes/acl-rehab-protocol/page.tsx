import { Badge } from "@/components/ui/badge";
import { TocNav } from "@/components/layout/toc-nav";

/**
 * 더미 노트 상세 페이지.
 * docs/07-article-page-ux.md의 상단/본문 구조를 참고한 정적 목데이터이며,
 * 실제 콘텐츠 파이프라인(docs/04)이 붙기 전까지는 이 경로 하나만 존재한다.
 * TOC는 여기서만 지역적으로 구성한다 — 홈페이지 등 다른 페이지엔 없다.
 */
export default function DemoNotePage() {
  return (
    <div className="flex flex-1">
      <article className="min-w-0 flex-1 px-6 py-8 sm:px-10">
        <div className="mx-auto w-full max-w-[720px]">
          <p className="text-sm text-muted-foreground">
            물리치료 <span className="mx-1.5">›</span> 무릎{" "}
            <span className="mx-1.5">›</span> 전방십자인대손상 재활 프로토콜
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            전방십자인대손상 재활 프로토콜
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">운동학</Badge>
            <Badge className="border-transparent bg-success/15 text-success">
              🌿 evergreen
            </Badge>
            <span>· 3일 전 수정 · 읽기 8분</span>
          </div>

          <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold">
            <h2>개요</h2>
            <p>
              전방십자인대(ACL) 재건술 후 재활은 조직 치유 단계에 맞춰 하중과
              가동범위를 점진적으로 늘려가는 것이 핵심이다. 이 노트는 수술 후
              12주까지의 단계별 목표와 금기 동작을 정리한다.
            </p>

            <h2>1단계: 급성기 (0~2주)</h2>
            <p>
              염증 조절과 완전 신전 확보가 이 시기의 최우선 목표다. 과도한
              부하는 이식건의 유합을 방해할 수 있으므로 체중지지는 보조기
              착용 하에 점진적으로 허용한다.
            </p>

            <h3>관절가동범위 목표</h3>
            <p>2주 시점까지 신전 0˚, 굴곡 90˚ 이상을 목표로 한다.</p>

            <h3>금기 동작</h3>
            <p>개방성 사슬 무릎 신전 운동, 저항성 스쿼트는 이 시기 금기다.</p>

            <h2>2단계: 근력 강화기 (3~8주)</h2>
            <p>
              닫힌 사슬 운동 중심으로 대퇴사두근과 햄스트링 근력을
              회복시키며, 고유수용성 감각 훈련을 함께 시작한다.
            </p>

            <h2>3단계: 기능 회복기 (9~12주)</h2>
            <p>
              달리기, 방향전환 동작을 단계적으로 도입하며 스포츠 특이적
              훈련을 준비한다.
            </p>

            <h3>스포츠 복귀 기준</h3>
            <p>
              양측 대퇴사두근 근력 차이 10% 이내, 한발 뛰기 검사(Hop test)
              대칭지수 90% 이상을 복귀 기준으로 삼는다.
            </p>
          </div>
        </div>
      </article>
      <TocNav />
    </div>
  );
}
