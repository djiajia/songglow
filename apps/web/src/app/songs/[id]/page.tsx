import Link from "next/link";
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
