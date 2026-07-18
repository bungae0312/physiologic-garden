import { cn } from "@/lib/utils";

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
  /** 우측 정렬 + tabular-nums를 적용할 컬럼 인덱스 (docs/02 §13) */
  numericColumns?: number[];
}

/**
 * 지브라 스트라이핑 없음, 모바일에서는 가로 스크롤 컨테이너로 감싼다
 * — 셀을 임의 재배치하지 않는다(행/열 순서 자체가 임상적 의미를 가지므로).
 *
 * 헤더를 스크롤 시 sticky로 고정하는 건 docs/02 §13 스펙에 있지만
 * 일부러 뺐다: 가로 스크롤용 `overflow-x-auto` 래퍼가 CSS 오버플로우
 * 해석 규칙상 세로축까지 스크롤 컨테이너로 승격되면서, `position: sticky`가
 * 페이지가 아니라 이 래퍼 자신을 기준으로 들러붙어 첫 데이터 행을
 * 가려버리는 실제 렌더링 결함을 만들었다(스크린샷으로 재현·확인함).
 * 지금 표는 3행짜리라 sticky가 없어도 실사용에 영향이 없고, 긴 표가
 * 실제로 생기면 격리된 세로 스크롤 컨테이너를 별도로 설계해 다시 붙인다.
 */
export function DataTable({ headers, rows, numericColumns = [] }: DataTableProps) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-lg border border-border font-sans">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead className="bg-muted/60">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                scope="col"
                className={cn(
                  "border-b border-border px-4 py-2.5 text-left font-semibold text-foreground",
                  numericColumns.includes(index) && "text-right",
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border last:border-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    "px-4 py-2.5 text-muted-foreground",
                    numericColumns.includes(cellIndex) && "text-right tabular-nums",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
