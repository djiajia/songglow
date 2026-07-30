"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Song } from "@/types";

type SaveState = "idle" | "saving" | "success" | "error";

type Props = {
  song: Song;
};

function lyricsToText(lyrics: Song["lyrics"]) {
  return (lyrics || [])
    .map((line) => `${line.start}|${line.end}|${line.en || ""}|${line.zh || ""}`)
    .join("\n");
}

function songToForm(song: Song) {
  return {
    title: song.title,
    artist: song.artist,
    difficulty: song.difficulty || "中级",
    tags: (song.tags || []).join(", "),
    focus: song.focus || "",
    goal: song.goal || "",
    context: song.context || "",
    lyrics: lyricsToText(song.lyrics || [])
  };
}

export function AdminSongEditorForm({ song }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(() => songToForm(song));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("修改后点击保存，即可更新曲库。");

  useEffect(() => {
    setForm(songToForm(song));
    setSaveState("idle");
    setMessage("已加载歌曲信息，修改后点击保存即可更新曲库。");
  }, [song.id]);

  const lyricCount = useMemo(() => song.lyrics?.length || 0, [song.lyrics]);

  async function saveSong() {
    setSaveState("saving");
    setMessage("正在保存歌曲信息…");

    try {
      const res = await fetch(`/api/songs/${song.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "保存失败");
      }

      const updated = await res.json();
      setForm(songToForm(updated));
      setSaveState("success");
      setMessage(`已保存《${updated.title}》`);
      router.refresh();
    } catch (error) {
      setSaveState("error");
      setMessage(`保存失败：${error instanceof Error ? error.message : "未知错误"}`);
    }
  }

  async function deleteSong() {
    const ok = window.confirm(`确定删除《${song.title}》吗？这会同时删除数据库记录和音频文件。`);
    if (!ok) return;

    setSaveState("saving");
    setMessage("正在删除歌曲…");

    try {
      const res = await fetch(`/api/songs/${song.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "删除失败");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setSaveState("error");
      setMessage(`删除失败：${error instanceof Error ? error.message : "未知错误"}`);
    }
  }

  return (
    <section className="admin-editor-card admin-detail-shell">
      <div className="admin-editor-topbar">
        <div>
          <div className="admin-eyebrow">正在编辑</div>
          <h3>{song.title}</h3>
          <p>
            {song.artist} · ID: {song.id} · {lyricCount} 句歌词
          </p>
        </div>
        <div className="admin-actions-inline">
          <Link className="button" href={`/songs/${song.id}`} target="_blank" rel="noreferrer">
            查看前台
          </Link>
          <button className="button danger" type="button" onClick={deleteSong}>
            删除歌曲
          </button>
        </div>
      </div>

      <div className="admin-form-grid">
        <label>
          歌曲名称
          <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
        </label>
        <label>
          歌手
          <input value={form.artist} onChange={(e) => setForm((prev) => ({ ...prev, artist: e.target.value }))} />
        </label>
        <label>
          难度
          <select
            value={form.difficulty}
            onChange={(e) => setForm((prev) => ({ ...prev, difficulty: e.target.value }))}
          >
            <option value="入门">入门</option>
            <option value="初中级">初中级</option>
            <option value="中级">中级</option>
            <option value="进阶">进阶</option>
          </select>
        </label>
        <label>
          标签
          <input
            value={form.tags}
            onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
            placeholder="抒情, 复古, 合唱"
          />
        </label>
        <label>
          学习重点
          <input value={form.focus} onChange={(e) => setForm((prev) => ({ ...prev, focus: e.target.value }))} />
        </label>
        <label>
          学习收益
          <input value={form.goal} onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value }))} />
        </label>
        <label className="admin-form-span-2">
          歌曲简介 / 学习背景
          <textarea
            rows={4}
            value={form.context}
            onChange={(e) => setForm((prev) => ({ ...prev, context: e.target.value }))}
          />
        </label>
        <label className="admin-form-span-2">
          歌词时间轴
          <textarea
            rows={14}
            value={form.lyrics}
            onChange={(e) => setForm((prev) => ({ ...prev, lyrics: e.target.value }))}
            placeholder={`每行：开始秒数|结束秒数|英文歌词|中文翻译\n例如：3.34|6.63|When I was young|当我年轻时`}
          />
        </label>
      </div>

      <div className="admin-editor-footer">
        <div className={`admin-status admin-status-${saveState}`}>{message}</div>
        <button className="button primary" type="button" onClick={saveSong} disabled={saveState === "saving"}>
          {saveState === "saving" ? "保存中…" : "保存修改"}
        </button>
      </div>
    </section>
  );
}
