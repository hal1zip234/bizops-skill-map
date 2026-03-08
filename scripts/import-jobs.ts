import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { db } from "@/lib/db";
import { extractSkillsFromText } from "@/lib/skill-extractor";

/**
 * CSV format:
 * title,company,location,salary_min,salary_max,description,source_url
 */

function upsertSkillTag(name: string): number {
  db.prepare("INSERT OR IGNORE INTO skill_tags (name) VALUES (?)").run(name);
  const row = db.prepare("SELECT id FROM skill_tags WHERE name = ?").get(name) as { id: number };
  return row.id;
}

function main() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.error("Usage: npm run import:csv -- <csv_file_path>");
    process.exit(1);
  }

  const absCsvPath = path.resolve(process.cwd(), csvPath);
  const content = fs.readFileSync(absCsvPath, "utf8");

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  }) as Array<Record<string, string>>;

  const insertJobStmt = db.prepare(`
    INSERT INTO jobs (title, company, location, salary_min, salary_max, description, source_url)
    VALUES (@title, @company, @location, @salary_min, @salary_max, @description, @source_url)
  `);

  const insertJobSkillStmt = db.prepare(`
    INSERT OR REPLACE INTO job_skills (job_id, skill_tag_id, score)
    VALUES (?, ?, ?)
  `);

  const tx = db.transaction(() => {
    for (const record of records) {
      const result = insertJobStmt.run({
        title: record.title,
        company: record.company,
        location: record.location || null,
        salary_min: record.salary_min ? Number(record.salary_min) : null,
        salary_max: record.salary_max ? Number(record.salary_max) : null,
        description: record.description,
        source_url: record.source_url || null
      });

      const jobId = Number(result.lastInsertRowid);
      const skills = extractSkillsFromText(record.description || "");

      for (const skillName of skills) {
        const skillTagId = upsertSkillTag(skillName);
        insertJobSkillStmt.run(jobId, skillTagId, 1);
      }
    }
  });

  tx();
  console.log(`Imported ${records.length} jobs from ${csvPath}`);
}

main();
