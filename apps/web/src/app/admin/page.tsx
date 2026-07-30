import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/auth";
import { listSongs } from "@/lib/db";
import { AdminSongManager } from "@/components/admin-song-manager";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
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

  const songs = await listSongs().catch(() => []);
  const total = songs.length;
  const withLyrics = songs.filter((song) => song.lyrics?.length).length;
  const withTags = songs.filter((song) => song.tags?.length).length;
  const latest = [...songs]
    .sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0))
    .slice(0, 1)[0];

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">SongGlow Admin</div>
        <nav className="nav">
          <Link href="/">返回曲库</Link>
          <Link href="/admin/new">新增歌曲</Link>
        </nav>
        <div className="admin-actions-inline">
          <Link className="button" href="/api/health" target="_blank">
            健康检查
          </Link>
          <Link className="button primary" href="/admin/new">
            新增歌曲
          </Link>
          <form action="/api/admin/logout" method="post">
            <button className="button" type="submit">
              退出后台
            </button>
          </form>
        </div>
      </header>
      <div className="admin-dashboard">
        <section className="admin-hero">
          <div>
            <div className="admin-eyebrow">SongGlow Admin</div>
            <h1>曲库管理后台</h1>
            <p>先在列表中浏览曲库，再进入独立的新增页或编辑页处理歌曲资料和时间轴。</p>
            <div className="admin-hero-actions">
              <Link className="button primary" href="/admin/new">
                去新增歌曲
              </Link>
            </div>
          </div>
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <span>歌曲总数</span>
              <strong>{total}</strong>
            </div>
            <div className="admin-stat-card">
              <span>已配时间轴</span>
              <strong>{withLyrics}</strong>
            </div>
            <div className="admin-stat-card">
              <span>已加标签</span>
              <strong>{withTags}</strong>
            </div>
            <div className="admin-stat-card">
              <span>最近更新</span>
              <strong>{latest ? `${latest.title} · ${latest.artist}` : "暂无歌曲"}</strong>
            </div>
          </div>
        </section>
        <AdminSongManager songs={songs} />
      </div>
    </div>
  );
}
