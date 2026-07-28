import Link from "next/link";
import { listSongs } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const songs = await listSongs().catch(() => []);

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">SongGlow</div>
        <nav className="nav">
          <Link href="/">曲库</Link>
          <Link href="/admin">后台上传</Link>
        </nav>
        <Link className="button primary" href="/admin">
          上传歌曲
        </Link>
      </header>

      <section className="hero">
        <h1>把每一首英文歌，变成一节真正学得会的课</h1>
        <p>前台从后台曲库读取歌曲并播放。上传音频与歌词时间轴后，播放页会展示逐句歌词。</p>
      </section>

      <div className="grid">
        {songs.map((song) => (
          <Link key={song.id} className="card" href={`/songs/${song.id}`}>
            <span className="tag">{song.difficulty || "未设置"}</span>
            <h3 style={{ marginTop: 10 }}>{song.title}</h3>
            <p>{song.artist}</p>
            <p style={{ marginTop: 10 }}>
              {song.tags?.length ? song.tags.join(" · ") : "未设置标签"}
            </p>
          </Link>
        ))}
        {!songs.length ? (
          <div className="card">
            <span className="tag">提示</span>
            <h3 style={{ marginTop: 10 }}>还没有歌曲</h3>
            <p>去「后台上传」添加第一首音频文件。</p>
            <div className="stack">
              <Link className="button primary" href="/admin">
                去上传
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
