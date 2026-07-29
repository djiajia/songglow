"use client";

import { useMemo, useState } from "react";
import type { LyricLine } from "@/types";

type EditableSong = {
  id: string;
  title: string;
  artist: string;
  difficulty: string;
  lyrics: LyricLine[];
};

type Status = Record<string, string>;
type Saving = Record<string, boolean>;

function lyricsToText(lyrics: LyricLine[]) {
  return lyrics
    .map((line) => `${line.start}|${line.end}|${line.en || ""}|${line.zh || ""}`)
    .join("\n");
}

export function AdminSongEditor({ songs }: { songs: EditableSong[] }) {
  const initialValues = useMemo(
    () =>
      songs.reduce<Record<string, string>>((acc, song) => {
        acc[song.id] = lyricsToText(song.lyrics || []);
        return acc;
      }, {}),
    [songs]
  );
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [status, setStatus] = useState<Status>({});
  const [saving, setSaving] = useState<Saving>({});

  async function saveLyrics(songId: string) {
    setSaving((prev) => ({ ...prev, [songId]: true }));
    setStatus((prev) => ({ ...prev, [songId]: "正在保存时间轴…" }));

    try {
      const res = await fetch(`/api/songs/${songId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lyrics: values[songId] || ""
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "保存失败");
      }

      setStatus((prev) => ({ ...prev, [songId]: "时间轴已保存" }));
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        [songId]: `保存失败：${error instanceof Error ? error.message : "未知错误"}`
      }));
    } finally {
      setSaving((prev) => ({ ...prev, [songId]: false }));
    }
  }

  return (
    <section className="hero" style={{ marginTop: 24 }}>
      <h2>编辑已上传歌曲时间轴</h2>
      <p>上传后也可以直接在这里补歌词时间轴，不用重新传音频。</p>
      <div className="stack" style={{ marginTop: 18 }}>
        {songs.length ? (
          songs.map((song) => (
            <div key={song.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{song.title}</div>
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>
                    {song.artist} · {song.difficulty}
                  </div>
                </div>
                <a className="button" href={`/songs/${song.id}`} target="_blank" rel="noreferrer">
                  打开歌曲页
                </a>
              </div>

              <label style={{ display: "block", marginTop: 16 }}>
                歌词时间轴
                <textarea
                  rows={10}
                  value={values[song.id] || ""}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [song.id]: e.target.value
                    }))
                  }
                  placeholder={`每行：开始秒数|结束秒数|英文歌词|中文翻译\n例如：0.5|4.2|Yesterday once more|昨日重现`}
                />
              </label>

              <div className="stack" style={{ marginTop: 12 }}>
                <button
                  className="button primary"
                  type="button"
                  disabled={Boolean(saving[song.id])}
                  onClick={() => saveLyrics(song.id)}
                >
                  {saving[song.id] ? "保存中…" : "保存时间轴"}
                </button>
                <div style={{ color: status[song.id]?.startsWith("保存失败") ? "#b42318" : "var(--muted)", fontSize: 13 }}>
                  {status[song.id] || "支持空白保存；留空后点击保存会清空当前时间轴。"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card">
            <div style={{ color: "var(--muted)" }}>当前还没有已上传歌曲。</div>
          </div>
        )}
      </div>
    </section>
  );
}
