# BizOps Skill Map (MVP Scaffold)

Next.js + TypeScript + SQLite で、経営管理系求人の保存と年収帯別スキル集計を行うための雛形です。

## ディレクトリ構成

```txt
app/
  jobs/
    [id]/page.tsx      # 求人詳細
    page.tsx           # 求人一覧
  skills-summary/
    page.tsx           # 年収帯別スキル集計
  layout.tsx
  page.tsx
components/
  job-list.tsx
lib/
  db.ts                # SQLite接続
  repositories.ts      # 参照系クエリ
  salary.ts            # 年収帯分類ロジック
  skill-extractor.ts   # キーワードマッチ
  types.ts
data/
  schema.sql           # DBスキーマ
  sample-jobs.csv      # サンプルCSV
scripts/
  init-db.ts           # DB初期化
  import-jobs.ts       # CSV取り込み + スキル抽出
```

## DB schema

- `jobs`
- `skill_tags`
- `job_skills`

詳細は `data/schema.sql` を参照してください。

## セットアップ

```bash
npm install
npm run db:init
npm run import:csv -- data/sample-jobs.csv
npm run dev
```

## CSVフォーマット

```csv
title,company,location,salary_min,salary_max,description,source_url
```

## 年収帯分類

- 400万未満
- 400-599万
- 600-799万
- 800-999万
- 1000万以上

`salary_min` を優先し、未設定時は `salary_max` を使用します。
