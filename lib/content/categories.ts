import type { GrowthStage } from "@/components/garden/growth-badge";

export interface CategoryArticle {
  /** 있으면 실제 /notes/[slug]로 연결, 없으면 아직 본문이 없는 더미 카드(href="#") */
  noteSlug?: string;
  title: string;
  excerpt: string;
  tags: string[];
  growth: GrowthStage;
  /** 표시 문자열이 아니라 정렬 가능한 원값 — formatDaysAgo로만 문자열화한다 */
  daysAgo: number;
  /** "인기" 정렬의 근거. 실제 방문자 수를 트래킹하는 인프라가 없는 정적 사이트라,
   *  트래픽 대신 이 정원 안에서 실제로 측정 가능한 신호(백링크 수)를 쓴다 —
   *  가짜 조회수를 지어내지 않고 이미 설계된 백링크 그래프 개념을 재사용한 것. */
  backlinkCount: number;
}

export interface Category {
  slug: string;
  name: string;
  parentCategory: string;
  description: string;
  articles: CategoryArticle[];
}

/**
 * content/notes/ 파이프라인(docs/04)이 없어 카테고리별 노트 목록을 손으로
 * 유지한다. 함수 인터페이스(getCategoryBySlug 등)는 실제 파이프라인이
 * 붙었을 때 내부 구현만 바뀌고 호출부는 그대로 두려는 의도다(docs/03
 * lib/content/ 설계와 동일한 이유).
 */
const CATEGORIES: Record<string, Category> = {
  shoulder: {
    slug: "shoulder",
    name: "Shoulder",
    parentCategory: "Orthopedic PT",
    description:
      "Rotator cuff pathology, impingement, instability, and post-operative protocols across the shoulder complex.",
    articles: [
      {
        title: "Post-Op Total Shoulder Arthroplasty Guidelines",
        excerpt:
          "Precautions and progressive ROM targets for the first 12 weeks after anatomic and reverse total shoulder arthroplasty.",
        tags: ["PostOp", "RehabProtocol"],
        growth: "seedling",
        daysAgo: 2,
        backlinkCount: 2,
      },
      {
        noteSlug: "rotator-cuff-assessment-checklist",
        title: "Rotator Cuff Tear Assessment Checklist",
        excerpt:
          "Special test combinations ranked by sensitivity and specificity, with a differential diagnosis decision path.",
        tags: ["RotatorCuff", "SpecialTests"],
        growth: "budding",
        daysAgo: 5,
        backlinkCount: 9,
      },
      {
        title: "Scapular Dyskinesis: Assessment and Correction",
        excerpt:
          "Visual observation criteria for scapular dyskinesis and a corrective exercise progression for serratus anterior control.",
        tags: ["ScapularControl", "RehabProtocol"],
        growth: "budding",
        daysAgo: 8,
        backlinkCount: 7,
      },
      {
        title: "Frozen Shoulder: Staged Rehabilitation Protocol",
        excerpt:
          "A freezing-frozen-thawing staged approach to adhesive capsulitis, matching intensity of mobilization to irritability.",
        tags: ["AdhesiveCapsulitis", "RehabProtocol"],
        growth: "evergreen",
        daysAgo: 12,
        backlinkCount: 14,
      },
      {
        title: "Overhead Athlete Return-to-Throw Progression",
        excerpt:
          "An interval throwing program structured around scapular control and external rotation strength milestones.",
        tags: ["SportsMedicine", "RehabProtocol"],
        growth: "budding",
        daysAgo: 15,
        backlinkCount: 6,
      },
      {
        title: "Shoulder Impingement Differential Diagnosis",
        excerpt:
          "Distinguishing subacromial impingement from rotator cuff tear and labral pathology using clustered special tests.",
        tags: ["Impingement", "SpecialTests"],
        growth: "evergreen",
        daysAgo: 20,
        backlinkCount: 22,
      },
      {
        title: "SLAP Lesion Classification and Management",
        excerpt:
          "Snyder classification types I–IV mapped to conservative versus surgical management pathways.",
        tags: ["LabralTear", "SpecialTests"],
        growth: "evergreen",
        daysAgo: 30,
        backlinkCount: 18,
      },
      {
        title: "Shoulder Special Tests: Sensitivity & Specificity Review",
        excerpt:
          "A literature review comparing diagnostic accuracy across the most commonly taught shoulder special tests.",
        tags: ["SpecialTests", "Research"],
        growth: "evergreen",
        daysAgo: 45,
        backlinkCount: 11,
      },
    ],
  },
  knee: {
    slug: "knee",
    name: "Knee",
    parentCategory: "Orthopedic PT",
    description:
      "Ligament, meniscus, and patellofemoral pathology — from acute post-op protocols to degenerative conditions.",
    articles: [
      {
        noteSlug: "acl-rehab-protocol",
        title: "ACL Reconstruction Rehabilitation Protocol",
        excerpt:
          "A phase-based framework for restoring range of motion, strength, and sport-specific function after ACL reconstruction.",
        tags: ["ACL", "RehabProtocol", "SportsMedicine"],
        growth: "evergreen",
        daysAgo: 3,
        backlinkCount: 20,
      },
      {
        title: "Patellofemoral Pain Syndrome Assessment",
        excerpt:
          "A movement-system approach to PFPS, screening hip abductor strength and dynamic knee valgus together.",
        tags: ["PFPS", "SpecialTests"],
        growth: "evergreen",
        daysAgo: 25,
        backlinkCount: 13,
      },
      {
        title: "Knee Osteoarthritis: Conservative Management Pathway",
        excerpt:
          "A stepped-care model spanning load management, quadriceps strengthening, and bracing before surgical referral.",
        tags: ["Osteoarthritis", "RehabProtocol"],
        growth: "budding",
        daysAgo: 18,
        backlinkCount: 8,
      },
      {
        title: "Meniscus Tear: Conservative Management",
        excerpt:
          "Candidate selection criteria for a non-operative approach and a criteria-based progression through four stages.",
        tags: ["Meniscus", "RehabProtocol"],
        growth: "seedling",
        daysAgo: 7,
        backlinkCount: 5,
      },
    ],
  },
};

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES[slug];
}

export function getAllCategorySlugs(): string[] {
  return Object.keys(CATEGORIES);
}
