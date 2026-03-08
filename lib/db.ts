import path from "path";
import Database from "better-sqlite3";

const dbPath = process.env.SQLITE_PATH ?? path.join(process.cwd(), "data", "jobs.db");

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
