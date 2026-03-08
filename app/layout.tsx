import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BizOps Skill Map",
  description: "経営管理系求人のスキル集計ダッシュボード"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header className="header">
          <h1>BizOps Skill Map</h1>
          <nav>
            <Link href="/jobs">求人一覧</Link>
            <Link href="/skills-summary">年収帯別スキル集計</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
