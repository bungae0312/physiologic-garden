import type { Metadata } from "next";
import { ArticleHeader } from "@/components/garden/article-header";
import { TableOfContents, type TocHeading } from "@/components/garden/table-of-contents";
import { TagList } from "@/components/garden/tag-list";
import { ReferenceList, type Reference } from "@/components/garden/reference-list";
import { RelatedNotes, type RelatedItem } from "@/components/garden/related-notes";
import { ArticlePagination } from "@/components/garden/article-pagination";
import { Callout } from "@/components/mdx/callout";
import { CodeBlock } from "@/components/mdx/code-block";
import { Citation } from "@/components/mdx/citation";
import { Figure } from "@/components/mdx/figure";
import { RomProgressChart } from "@/components/mdx/rom-progress-chart";
import { DataTable } from "@/components/mdx/data-table";
import { estimateReadingMinutes } from "@/lib/content/reading-time";

/**
 * 더미 노트 상세 페이지. content/notes/ 파이프라인(docs/04)이 생기기 전까지는
 * 이 파일 하나가 "노트 하나"를 손으로 대신한다.
 *
 * 헤딩은 TOC와 본문이 같은 배열(HEADINGS)을 참조해 텍스트가 두 곳에
 * 중복되지 않는다 — 나중에 rehype가 헤딩 트리를 자동 추출해도
 * TableOfContents가 받는 prop 모양은 그대로다.
 */
const HEADINGS = [
  { id: "overview", text: "Overview", level: 2 },
  { id: "phase-1-acute", text: "Phase 1: Acute Phase (Weeks 0–2)", level: 2 },
  { id: "rom-goals", text: "Range of Motion Goals", level: 3 },
  { id: "contraindications", text: "Contraindicated Movements", level: 3 },
  { id: "phase-2-strengthening", text: "Phase 2: Strengthening Phase (Weeks 3–8)", level: 2 },
  { id: "phase-3-functional", text: "Phase 3: Functional Return Phase (Weeks 9–12)", level: 2 },
  { id: "return-to-sport", text: "Return-to-Sport Criteria", level: 3 },
] as const satisfies readonly TocHeading[];

const [overview, phase1, romGoals, contraindications, phase2, phase3, returnToSport] =
  HEADINGS;

const REFERENCES: Reference[] = [
  {
    id: "kisner",
    text: (
      <>
        Kisner C, Colby LA. <em>Therapeutic Exercise: Foundations and Techniques</em>, 8th
        ed. F.A. Davis; 2022.
      </>
    ),
  },
  {
    id: "wright",
    text: (
      <>
        Wright RW, Preston E, Fleming BC, et al. &ldquo;A Systematic Review of Anterior
        Cruciate Ligament Reconstruction Rehabilitation.&rdquo;{" "}
        <em>Journal of the American Academy of Orthopaedic Surgeons</em>. 2015;23(3):164–174.
      </>
    ),
  },
];

const BACKLINKS: RelatedItem[] = [
  { title: "Return-to-Sport Criteria: A Case Report", category: "Case Study" },
  { title: "Meniscus Tear: Conservative Management", category: "Orthopedic PT" },
];

const SUGGESTED: RelatedItem[] = [
  { title: "Functional Anatomy of the Knee", category: "Lecture Notes" },
  { title: "Neuromuscular Control Basics", category: "Lecture Notes" },
];

// 손으로 어림잡은 단어 수 — 실제 파이프라인이 붙으면 컴파일된 plain text에서 센다.
const ESTIMATED_WORD_COUNT = 1400;

export const metadata: Metadata = {
  title: "ACL Reconstruction Rehabilitation Protocol · physiologic",
  description:
    "A phase-based framework for restoring range of motion, strength, and sport-specific function after ACL reconstruction, structured around graft healing timelines.",
};

export default function AclRehabProtocolPage() {
  return (
    <div className="flex flex-1">
      <article className="min-w-0 flex-1 px-6 py-8 sm:px-10">
        <div className="mx-auto w-full max-w-[720px]">
          <ArticleHeader
            breadcrumb={[
              { label: "Orthopedic PT", href: "#" },
              { label: "Knee", href: "#" },
              { label: "ACL Reconstruction Rehabilitation Protocol" },
            ]}
            title="ACL Reconstruction Rehabilitation Protocol"
            description="A phase-based framework for restoring range of motion, strength, and sport-specific function after ACL reconstruction, structured around graft healing timelines rather than arbitrary calendar milestones."
            category="Orthopedic PT"
            growth="evergreen"
            updatedAt="3 days ago"
            readingMinutes={estimateReadingMinutes(ESTIMATED_WORD_COUNT)}
          />

          <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none font-serif prose-headings:scroll-mt-20 prose-headings:font-serif prose-headings:font-semibold prose-p:leading-[1.75]">
            <h2 id={overview.id}>{overview.text}</h2>
            <p>
              Rehabilitation after anterior cruciate ligament (ACL) reconstruction is not a
              fixed calendar — it is paced by graft healing biology. Load and range of
              motion are advanced in step with the graft&rsquo;s ligamentization process,
              and progression criteria matter more than the number of weeks elapsed. This
              note outlines three phases spanning the first twelve weeks: what each phase
              targets, what remains off-limits, and how readiness to advance is judged.
            </p>

            <h2 id={phase1.id}>{phase1.text}</h2>
            <p>
              The acute phase prioritizes inflammation control and restoration of full
              passive knee extension. Delayed extension recovery is one of the strongest
              predictors of anterior knee pain and arthrofibrosis later in
              rehabilitation<Citation n={1} refId="kisner" />, so it is treated as
              non-negotiable even before strength work begins.
            </p>

            <h3 id={romGoals.id}>{romGoals.text}</h3>
            <p>
              By the end of week 2, the target is 0° of extension (matching the
              uninvolved limb) and at least 90° of flexion. Extension is checked prone,
              not supine, to rule out a compensated pattern from hip flexion.
            </p>

            <h3 id={contraindications.id}>{contraindications.text}</h3>
            <Callout variant="danger" title="Contraindicated in Weeks 0–2">
              <p>
                Open-chain knee extension against resistance and unsupported single-leg
                weight-bearing are contraindicated during the acute phase — both generate
                excessive anterior tibial translation and can compromise graft fixation
                before biological incorporation begins.
              </p>
            </Callout>

            <h2 id={phase2.id}>{phase2.text}</h2>
            <p>
              Once full passive extension is confirmed and effusion is controlled, training
              shifts to closed-chain strengthening and early proprioceptive work. The table
              below summarizes weight-bearing status and representative exercises across
              all three phases for quick reference.
            </p>

            <DataTable
              headers={["Phase", "Weeks", "ROM Goal", "Weight-Bearing", "Key Exercises"]}
              numericColumns={[1, 2]}
              rows={[
                ["1 — Acute", "0–2", "0–90°", "Protected (brace-locked)", "Quad sets, ankle pumps"],
                ["2 — Strengthening", "3–8", "0–130°", "Full", "Closed-chain squats, step-ups"],
                ["3 — Functional Return", "9–12", "Full", "Full", "Plyometrics, agility drills"],
              ]}
            />

            <Callout variant="quote" cite="Wright et al., JAAOS, 2015">
              <p>
                Restoration of quadriceps strength — not time since surgery — is the
                strongest predictor of successful return to pre-injury activity
                levels<Citation n={2} refId="wright" />.
              </p>
            </Callout>

            <h2 id={phase3.id}>{phase3.text}</h2>
            <p>
              As closed-chain strength approaches symmetry with the uninvolved limb,
              running, cutting, and plyometric drills are introduced progressively. Range
              of motion should already be full and pain-free entering this phase; the
              chart below shows the expected flexion trajectory across all three phases for
              a typical, uncomplicated recovery.
            </p>

            <Figure caption="Figure 1. Expected knee flexion range of motion by week post-surgery.">
              <RomProgressChart />
            </Figure>

            <h3 id={returnToSport.id}>{returnToSport.text}</h3>
            <p>
              Clearance for unrestricted sport is judged against symmetry, not the
              calendar. The Limb Symmetry Index (LSI) is calculated for each of four hop
              tests, and all four must clear the threshold below before progression to
              unrestricted training.
            </p>

            <CodeBlock
              language="formula"
              code={`Limb Symmetry Index (LSI)

LSI (%) = (Involved Limb Value / Uninvolved Limb Value) × 100

Example — Single-Leg Hop for Distance
  Involved limb   : 162 cm
  Uninvolved limb : 180 cm
  LSI = (162 / 180) × 100 = 90.0%

Criterion for sport clearance: LSI ≥ 90% across all four hop tests.`}
            />
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <TagList tags={["ACL", "Knee", "RehabProtocol", "SportsMedicine"]} />
          </div>

          <ReferenceList references={REFERENCES} />
          <RelatedNotes backlinks={BACKLINKS} suggested={SUGGESTED} />
          <ArticlePagination
            category="Orthopedic PT"
            next={{ title: "Meniscus Tear: Conservative Management" }}
          />
        </div>
      </article>
      <TableOfContents headings={HEADINGS} />
    </div>
  );
}
