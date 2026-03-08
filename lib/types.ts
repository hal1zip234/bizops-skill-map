export type SalaryBucket =
  | "400万未満"
  | "400-599万"
  | "600-799万"
  | "800-999万"
  | "1000万以上";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string | null;
  salary_min: number | null;
  salary_max: number | null;
  description: string;
  source_url: string | null;
  created_at: string;
};

export type SkillTag = {
  id: number;
  name: string;
};

export type JobSkill = {
  job_id: number;
  skill_tag_id: number;
  score: number;
};
