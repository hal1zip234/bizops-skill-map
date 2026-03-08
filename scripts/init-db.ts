import fs from "fs";
import path from "path";
import { db } from "@/lib/db";

const schemaPath = path.join(process.cwd(), "data", "schema.sql");
const schemaSql = fs.readFileSync(schemaPath, "utf8");

db.exec(schemaSql);
console.log("Database initialized:", process.env.SQLITE_PATH ?? path.join(process.cwd(), "data", "jobs.db"));
