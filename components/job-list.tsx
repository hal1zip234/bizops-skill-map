import Link from "next/link";
import { classifySalary } from "@/lib/salary";
import { Job } from "@/lib/types";

export function JobList({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) {
    return <p className="muted">求人データがありません。CSVをインポートしてください。</p>;
  }

  return (
    <div>
      {jobs.map((job) => (
        <article key={job.id} className="card">
          <h2>
            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
          </h2>
          <p>
            {job.company} / {job.location ?? "勤務地未設定"}
          </p>
          <p>
            年収: {job.salary_min?.toLocaleString() ?? "-"} - {job.salary_max?.toLocaleString() ?? "-"} 円
          </p>
          <p className="muted">年収帯: {classifySalary(job.salary_min, job.salary_max)}</p>
        </article>
      ))}
    </div>
  );
}
