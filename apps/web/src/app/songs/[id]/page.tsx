import Link from "next/link";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type SongPayload = {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  lyrics?: Array<{ start: number; end: number; en: string; zh: string }>;
};

export default async function SongDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const apiUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/songs/${id}` : `/api/songs/${id}`;
  const res = await fetch(apiUrl, { cache: "no-store" });
  if (!res.ok) notFound();

  const song = (await res.json()) as SongPayload;

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
      </section>

      <div className="grid" style={{ gridTemplateColumns: "1fr", marginTop: 18 }}>
        <div className="card">
          <span className="tag">歌词</span>
          <h3 style={{ marginTop: 10 }}>逐句时间轴</h3>
          <p>当前版本展示上传的时间轴歌词（若未填写，则为空）。</p>
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
              <div style={{ color: "var(--muted)" }}>暂无歌词时间轴…</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
                  }import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// fetch with no-store and handle notFound
const song = await fetch(`/api/songs/${id}`, { cache: 'no-store' });
if (!song.ok) notFound();
const data = await song.json();
const song = data;

export default async function SongDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // keep suspense for lyrics if needed
  return (
    <div>
      <h1>Song {id}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {song.lyrics?.length ? (
          song.lyrics.map((line, i) => <div key={i}>{line}</div>)
        ) : (
          <div>暂无歌词时间轴…</div>
        )}
      </Suspense>
    </div>
  );
}
