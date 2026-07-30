import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/auth";
import { getSong } from "@/lib/db";
import { AdminSongEditorForm } from "@/components/admin-song-editor-form";

export const dynamic = "force-dynamic";

export default async function AdminSongDetailPage({ params }: { params: { id: string } }) {
  if (!isAdminEnabled()) {
    return (
      <div className="shell">
        <header className="topbar">
          <div className="brand">SongGlow Admin</div>
          <nav className="nav">
            <Link href="/">返回曲库</Link>
          </nav>
        </header>
        <section className="hero">
          <h1>还没有配置后台环境变量</h1>
          <p>请先在项目环境变量中配置 `ADMIN_PASSWORD`、`ADMIN_SESSION_TOKEN`、`SUPABASE_URL`、`SUPABASE_SERVICE_ROLE_KEY` 和 `SUPABASE_BUCKET`。</p>
        </section>
      </div>
    );
  }

  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  const song = await getSong(params.id);
  if (!song) {
    notFound();
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">SongGlow Admin</div>
        <nav className="nav">
          <Link href="/admin">返回列表</Link>
          <Link href="/admin/new">新增歌曲</Link>
          <Link href="/">返回曲库</Link>
        </nav>
      </header>

      <div className="admin-page-stack">
        <section className="hero">
          <div className="admin-eyebrow admin-eyebrow-dark">编辑歌曲</div>
          <h1>{song.title}</h1>
          <p>在独立编辑页维护歌曲资料、学习信息和歌词时间轴。保存成功后会立即写回曲库。</p>
        </section>

        <AdminSongEditorForm song={song} />
      </div>
    </div>
  );
}
