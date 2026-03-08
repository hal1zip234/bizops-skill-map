import Link from "next/link";
import { notFound } from "next/navigation";
import { classifySalary } from "@/lib/salary";
import { findJobById, findSkillsByJobId } from "@/lib/repositories";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const job = Number.isFinite(id) ? findJobById(id) : undefined;

  if (!job) {
    notFound();
  }

  const skills = findSkillsByJobId(job.id);

  return (
    <section>
      <Link href="/jobs">← 一覧へ戻る</Link>
      <h2>{job.title}</h2>
      <p>
        {job.company} / {job.location ?? "勤務地未設定"}
      </p>
      <p>
        年収: {job.salary_min?.toLocaleString() ?? "-"} - {job.salary_max?.toLocaleString() ?? "-"} 円（
        {classifySalary(job.salary_min, job.salary_max)}）
      </p>
      <h3>仕事内容</h3>
      <article className="card" style={{ whiteSpace: "pre-wrap" }}>
        {job.description}
      </article>
      <h3>抽出スキル</h3>
      {skills.length > 0 ? (
        <ul>
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">スキルタグはまだ付与されていません。</p>
      )}
    </section>
  );
}
