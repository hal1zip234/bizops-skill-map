import { SalaryBucket } from "@/lib/types";

export function classifySalary(salaryMin: number | null, salaryMax: number | null): SalaryBucket {
  const base = salaryMin ?? salaryMax ?? 0;

  if (base < 4_000_000) return "400万未満";
  if (base < 6_000_000) return "400-599万";
  if (base < 8_000_000) return "600-799万";
  if (base < 10_000_000) return "800-999万";
  return "1000万以上";
}

export const salaryBucketOrder: SalaryBucket[] = [
  "400万未満",
  "400-599万",
  "600-799万",
  "800-999万",
  "1000万以上"
];
