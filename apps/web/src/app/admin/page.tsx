import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAdminEnabled } from "@/lib/auth";
import { AdminUploadForm } from "@/components/admin-upload-form";

export const dynamic = "force-dynamic";

export default function AdminPage() {
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
          <p>请先在 Vercel 项目环境变量中配置 `ADMIN_PASSWORD`、`ADMIN_SESSION_TOKEN`、`POSTGRES_URL` 和 `VERCEL_BLOB_READ_WRITE_TOKEN`。</p>
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
          <Link href="/">返回曲库</Link>
        </nav>
        <Link className="button" href="/api/health" target="_blank">
          健康检查
        </Link>
      </header>
      <AdminUploadForm />
    </div>
  );
}
