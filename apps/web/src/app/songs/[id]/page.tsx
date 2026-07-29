import Link from "next/link";
import { notFound } from "next/navigation";
import { getSong } from "@/lib/db";
import { Suspense } from "react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function SongDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = await getSong(id);

  if (!song) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/" className="inline-block mb-6 text-sm text-gray-500 hover:text-gray-700">
          ← 返回首页
        </Link>

        <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
        <p className="text-gray-600 mb-6">{song.artist}</p>

        <div className="prose max-w-none">
          <Suspense fallback={<div className="text-gray-500">加载中...</div>}>
            {song.lyrics?.length ? (
              song.lyrics.map((line, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="text-sm text-gray-500 mb-1">
                    {line.start} – {line.end}
                  </div>
                  <div className="text-base">{line.en}</div>
                  {line.zh && <div className="text-sm text-gray-600 mt-1">{line.zh}</div>}
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">暂无歌词时间轴…</div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default SongDetailPage;
