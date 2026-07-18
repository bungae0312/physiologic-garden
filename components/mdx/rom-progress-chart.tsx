const Y_TICKS = [0, 35, 70, 105, 140] as const;
const X_TICKS = [0, 2, 6, 9, 12] as const;
const DATA_POINTS = [
  { week: 0, deg: 0 },
  { week: 2, deg: 90 },
  { week: 6, deg: 110 },
  { week: 9, deg: 125 },
  { week: 12, deg: 135 },
] as const;

const CHART_X = { min: 40, max: 440 };
const CHART_Y = { min: 10, max: 190 };
const DOMAIN_X_MAX = 12;
const DOMAIN_Y_MAX = 140;

const scaleX = (week: number) =>
  CHART_X.min + (week / DOMAIN_X_MAX) * (CHART_X.max - CHART_X.min);
const scaleY = (deg: number) =>
  CHART_Y.max - (deg / DOMAIN_Y_MAX) * (CHART_Y.max - CHART_Y.min);

/**
 * "Image" 요구사항을 대신하는 실제 이미지 자산 대신, 도메인과 관련된
 * 간단한 라인 차트를 인라인 SVG로 그린다. 외부 이미지를 핫링크하지
 * 않는 이유는 docs/03에서 콘텐츠 이미지를 content/notes 하위에
 * 콜로케이션하기로 정한 것과 같은 맥락 — 지금은 실제 자산 파이프라인이
 * 없으니, 깨진 이미지 대신 실제로 렌더링되는 데이터를 보여준다.
 */
export function RomProgressChart() {
  const points = DATA_POINTS.map((d) => `${scaleX(d.week)},${scaleY(d.deg)}`).join(" ");

  return (
    <svg
      viewBox="0 0 480 220"
      className="w-full font-sans"
      role="img"
      aria-label="Line chart showing knee flexion range of motion increasing from 0 degrees at week 0 to approximately 135 degrees by week 12"
    >
      {Y_TICKS.map((deg) => (
        <g key={deg}>
          <line
            x1={CHART_X.min}
            y1={scaleY(deg)}
            x2={CHART_X.max}
            y2={scaleY(deg)}
            className="stroke-border"
            strokeWidth={1}
          />
          <text
            x={CHART_X.min - 8}
            y={scaleY(deg) + 4}
            textAnchor="end"
            className="fill-muted-foreground text-[10px] tabular-nums"
          >
            {deg}°
          </text>
        </g>
      ))}

      {X_TICKS.map((week) => (
        <text
          key={week}
          x={scaleX(week)}
          y={208}
          textAnchor="middle"
          className="fill-muted-foreground text-[10px] tabular-nums"
        >
          {week}w
        </text>
      ))}

      <polyline
        points={points}
        fill="none"
        className="stroke-primary"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {DATA_POINTS.map((d) => (
        <circle
          key={d.week}
          cx={scaleX(d.week)}
          cy={scaleY(d.deg)}
          r={3.5}
          className="fill-primary"
        />
      ))}
    </svg>
  );
}
