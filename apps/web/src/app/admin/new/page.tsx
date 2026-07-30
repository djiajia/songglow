import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/auth";
import { AdminUploadForm } from "@/components/admin-upload-form";

export const dynamic = "force-dynamic";

export default function AdminNewSongPage() {
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

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">SongGlow Admin</div>
        <nav className="nav">
          <Link href="/admin">返回列表</Link>
          <Link href="/">返回曲库</Link>
        </nav>
      </header>

      <div className="admin-page-stack">
        <section className="hero">
          <div className="admin-eyebrow admin-eyebrow-dark">新增歌曲</div>
          <h1>创建新的曲库条目</h1>
          <p>在独立页面上传音频、补充标签和学习信息。创建成功后会自动进入歌曲编辑页，继续维护歌词时间轴。</p>
        </section>

        <AdminUploadForm redirectOnSuccess />
      </div>
    </div>
  );
}
