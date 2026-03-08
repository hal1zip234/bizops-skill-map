import { db } from "@/lib/db";
import { classifySalary, salaryBucketOrder } from "@/lib/salary";
import { Job, SalaryBucket } from "@/lib/types";

type SkillSummaryRow = {
  salaryBucket: SalaryBucket;
  skillName: string;
  count: number;
};

export function listJobs(): Job[] {
  const stmt = db.prepare("SELECT * FROM jobs ORDER BY created_at DESC");
  return stmt.all() as Job[];
}

export function findJobById(id: number): Job | undefined {
  const jobStmt = db.prepare("SELECT * FROM jobs WHERE id = ?");
  return jobStmt.get(id) as Job | undefined;
}

export function findSkillsByJobId(jobId: number): string[] {
  const stmt = db.prepare(`
    SELECT st.name
    FROM job_skills js
    JOIN skill_tags st ON st.id = js.skill_tag_id
    WHERE js.job_id = ?
    ORDER BY js.score DESC, st.name ASC
  `);

  const rows = stmt.all(jobId) as { name: string }[];
  return rows.map((r) => r.name);
}

export function getSkillSummaryBySalaryBucket(): SkillSummaryRow[] {
  const jobs = db.prepare("SELECT id, salary_min, salary_max FROM jobs").all() as Array<{
    id: number;
    salary_min: number | null;
    salary_max: number | null;
  }>;

  const jobBucketMap = new Map<number, SalaryBucket>();
  for (const job of jobs) {
    jobBucketMap.set(job.id, classifySalary(job.salary_min, job.salary_max));
  }

  const rows = db.prepare(`
    SELECT js.job_id, st.name AS skillName
    FROM job_skills js
    JOIN skill_tags st ON st.id = js.skill_tag_id
  `).all() as Array<{ job_id: number; skillName: string }>;

  const counts = new Map<string, number>();
  for (const row of rows) {
    const bucket = jobBucketMap.get(row.job_id);
    if (!bucket) continue;
    const key = `${bucket}__${row.skillName}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const summary: SkillSummaryRow[] = [];
  for (const [key, count] of counts.entries()) {
    const [salaryBucket, skillName] = key.split("__");
    summary.push({ salaryBucket: salaryBucket as SalaryBucket, skillName, count });
  }

  return summary.sort((a, b) => {
    const bucketDiff = salaryBucketOrder.indexOf(a.salaryBucket) - salaryBucketOrder.indexOf(b.salaryBucket);
    if (bucketDiff !== 0) return bucketDiff;
    return b.count - a.count;
  });
}
