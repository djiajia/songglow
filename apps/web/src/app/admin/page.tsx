import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/auth";
import { listSongs } from "@/lib/db";
import { AdminSongEditor } from "@/components/admin-song-editor";
import { AdminUploadForm } from "@/components/admin-upload-form";

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

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">SongGlow Admin</div>
        <nav className="nav">
          <Link href="/">返回曲库</Link>
        </nav>
        <Link className="button" href="/api/health" target="_blank">
          健康检查
        </Link>
      </header>
      <AdminUploadForm />
      <AdminSongEditor songs={songs} />
    </div>
  );
}aa
