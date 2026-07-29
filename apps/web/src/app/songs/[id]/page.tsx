import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { SongDetailPlayer } from "@/components/song-detail-player";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SongPayload = {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  focus?: string;
  goal?: string;
  lyrics?: Array<{ start: number; end: number; en: string; zh: string }>;
};

export default async function SongDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const h = headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const apiUrl = `${proto}://${host}/api/songs/${id}`;

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
      <SongDetailPlayer
        title={song.title}
        artist={song.artist}
        audioUrl={song.audioUrl}
        focus={song.focus}
        goal={song.goal}
        lyrics={song.lyrics}
      />
    </div>
  );
}
