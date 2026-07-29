import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function SongDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return async function SongDetailPageAsync() {
    const { id } = await params;
    const h = headers();
    const host = h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "https";
    const apiUrl = `${proto}://${host}/api/songs/${id}`;
    const res = await fetch(apiUrl, { cache: "no-store" });
    const data = await res.json();

    if (!data || !data.song) {
      notFound();
    }

    const song = data.song;
    const { title, artist, album, coverUrl, duration, lyricTimeList } = song;

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            <img src={coverUrl} alt={title} className="w-48 h-48 object-cover rounded-lg shadow-xl mb-6" />
            <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>
            <p className="text-gray-400 text-center mb-6">{artist} · {album}</p>
            <p className="text-gray-500 text-center mb-8">时长: {duration}</p>
            {lyricTimeList && lyricTimeList.length > 0 ? (
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4">歌词时间轴</h2>
                <div className="space-y-2">
                  {lyricTimeList.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 p-3 rounded hover:bg-white/5">
                      <span className="font-mono text-green-400 w-20">{item.time}</span>
                      <span className="flex-1">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-12">暂无歌词时间轴...</div>
            )}
          </div>
        </div>
      </div>
    );
  };
}
