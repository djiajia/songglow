"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("请输入后台密码。");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("正在登录…");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data?.message || "登录失败");
        setLoading(false);
        return;
      }

      window.location.href = "/admin";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "登录失败");
      setLoading(false);
    }
  }

  return (
    <div className="shell">
      <section className="hero" style={{ maxWidth: 720, margin: "60px auto 0" }}>
        <h1>管理员登录</h1>
        <p>当前后台使用环境变量密码保护，适合 Vercel 初版部署。后续可以继续升级到正式账号体系。</p>
        <form className="form" onSubmit={onSubmit}>
          <label>
            后台密码
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="输入 ADMIN_PASSWORD"
              required
            />
          </label>
          <button className="button primary" type="submit" disabled={loading}>
            {loading ? "登录中…" : "进入后台"}
          </button>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>{message}</div>
        </form>
      </section>
    </div>
  );
}

