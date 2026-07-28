import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="shell">
      <section className="hero" style={{ maxWidth: 760, margin: "60px auto 0" }}>
        <h1>没有找到这首歌</h1>
        <p>它可能还没有上传到曲库，或者已经被删除。你可以先返回首页查看现有歌曲，或去后台继续上传。</p>
        <div className="stack" style={{ marginTop: 18 }}>
          <Link href="/" className="button primary">
            返回曲库
          </Link>
          <Link href="/admin" className="button">
            打开后台
          </Link>
        </div>
      </section>
    </div>
  );
}

