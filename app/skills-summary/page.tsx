import { getSkillSummaryBySalaryBucket } from "@/lib/repositories";

export default function SkillsSummaryPage() {
  const rows = getSkillSummaryBySalaryBucket();

  return (
    <section>
      <h2>年収帯別スキル集計</h2>
      <p className="muted">求人本文のキーワードマッチ結果を年収帯ごとに集計しています。</p>

      {rows.length === 0 ? (
        <p className="muted">データがありません。CSVインポート後に再表示してください。</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>年収帯</th>
              <th>スキル</th>
              <th>件数</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.salaryBucket}-${row.skillName}`}>
                <td>{row.salaryBucket}</td>
                <td>{row.skillName}</td>
                <td>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
