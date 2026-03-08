import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section>
      <h2>ページが見つかりません</h2>
      <Link href="/jobs">求人一覧へ戻る</Link>
    </section>
  );
}
