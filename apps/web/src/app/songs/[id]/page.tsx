import Link from "next/link";
import { notFound } from "next/navigation";
import { getSong } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SongDetailPage({ params }: { params: { id: string } }) {
  const song = await getSong(params.id);
  if (!song) notFound();

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">{song.title}</div>
        <nav className="nav">
          <Link href="/">返回曲库</Link>
          <Link href="/admin">后台上传</Link>
        </nav>
        <a className="button" href={song.audioUrl} target="_blank" rel="noreferrer">
          打开音频
        </a>
      </header>

      <section className="hero">
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
          {song.title} <span style={{ color: "var(--muted)", fontWeight: 600 }}>· {song.artist}</span>
        </h1>
        <p>
          {song.focus || "未设置学习重点"}{song.goal ? ` · ${song.goal}` : ""}
        </p>
        <div className="stack">
          <audio controls src={song.audioUrl} style={{ width: "100%" }} />
          <div style={{ color: "var(--muted)", fontSize: 13 }}>
            如果音频无法播放，请确认后端服务已启动，并且浏览器允许播放该格式。
          </div>
        </div>
      </section>

      <div className="grid" style={{ gridTemplateColumns: "1fr", marginTop: 18 }}>
        <div className="card">
          <span className="tag">歌词</span>
          <h3 style={{ marginTop: 10 }}>逐句时间轴</h3>
          <p>当前版本展示上传的时间轴歌词（若未填写，则为空）。后续可以扩展成逐句精讲、词汇/词组、练习。</p>
          <div className="stack">
            {song.lyrics?.length ? (
              song.lyrics.map((line, idx) => (
                <div key={idx} className="card" style={{ boxShadow: "none", borderColor: "var(--line)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>{line.en}</div>
                    <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "var(--muted)", fontSize: 12 }}>
                      {line.start}s–{line.end}s
                    </div>
                  </div>
                  <div style={{ color: "var(--muted)", marginTop: 6 }}>{line.zh}</div>
                </div>
              ))
            ) : (
              <div style={{ color: "var(--muted)" }}>暂无歌词时间轴（可以去 /admin 上传时填写）。</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
