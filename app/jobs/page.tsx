import { JobList } from "@/components/job-list";
import { listJobs } from "@/lib/repositories";

export default function JobsPage() {
  const jobs = listJobs();

  return (
    <section>
      <h2>求人一覧</h2>
      <p className="muted">CSVインポートした求人を表示します。</p>
      <JobList jobs={jobs} />
    </section>
  );
}
