"use client";

import { useEffect, useMemo, useState } from "react";
import type { Song } from "@/types";

type Props = {
  songs: Song[];
  onSongsChange?: (songs: Song[]) => void;
};

type SaveState = "idle" | "saving" | "success" | "error";

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

export function AdminSongManager({ songs, onSongsChange }: Props) {
  const [songItems, setSongItems] = useState(songs);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("全部");
  const [selectedId, setSelectedId] = useState(songs[0]?.id || "");
  const [form, setForm] = useState(() => (songs[0] ? songToForm(songs[0]) : songToForm({
    id: "",
    title: "",
    artist: "",
    difficulty: "中级",
    tags: [],
    focus: "",
    goal: "",
    context: "",
    audioUrl: "",
    coverUrl: "",
    lyrics: []
  })));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("选择一首歌后可编辑歌曲信息、时间轴和删除歌曲。");

  useEffect(() => {
    setSongItems(songs);
    if (!selectedId && songs[0]?.id) {
      setSelectedId(songs[0].id);
    }
  }, [songs, selectedId]);

  const filteredSongs = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return songItems.filter((song) => {
      const hitKeyword =
        !keyword ||
        song.title.toLowerCase().includes(keyword) ||
        song.artist.toLowerCase().includes(keyword) ||
        song.tags.join(" ").toLowerCase().includes(keyword);
      const hitDifficulty = difficulty === "全部" || song.difficulty === difficulty;
      return hitKeyword && hitDifficulty;
    });
  }, [songItems, query, difficulty]);

  const selectedSong = useMemo(
    () => songItems.find((song) => song.id === selectedId) || filteredSongs[0] || songItems[0] || null,
    [songItems, selectedId, filteredSongs]
  );

  useEffect(() => {
    if (!selectedSong) return;
    setSelectedId(selectedSong.id);
    setForm(songToForm(selectedSong));
    setSaveState("idle");
    setMessage("已加载歌曲信息，修改后点击保存即可更新曲库。");
  }, [selectedSong?.id]);

  async function saveSong() {
    if (!selectedSong) return;
    setSaveState("saving");
    setMessage("正在保存歌曲信息…");

    try {
      const res = await fetch(`/api/songs/${selectedSong.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "保存失败");
      }

      const updated = await res.json();
      const nextSongs = songItems.map((song) => (song.id === selectedSong.id ? updated : song));
      setSongItems(nextSongs);
      onSongsChange?.(nextSongs);
      setSaveState("success");
      setMessage(`已保存《${updated.title}》`);
    } catch (error) {
      setSaveState("error");
      setMessage(`保存失败：${error instanceof Error ? error.message : "未知错误"}`);
    }
  }

  async function deleteSong() {
    if (!selectedSong) return;
    const ok = window.confirm(`确定删除《${selectedSong.title}》吗？这会同时删除数据库记录和音频文件。`);
    if (!ok) return;

    setSaveState("saving");
    setMessage("正在删除歌曲…");
    try {
      const res = await fetch(`/api/songs/${selectedSong.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "删除失败");
      }
      const nextSongs = songItems.filter((song) => song.id !== selectedSong.id);
      setSongItems(nextSongs);
      onSongsChange?.(nextSongs);
      setSelectedId(nextSongs[0]?.id || "");
      setSaveState("success");
      setMessage("歌曲已删除。");
    } catch (error) {
      setSaveState("error");
      setMessage(`删除失败：${error instanceof Error ? error.message : "未知错误"}`);
    }
  }

  return (
    <section className="admin-panel">
      <div className="admin-section-head">
        <div>
          <div className="admin-eyebrow">曲库管理</div>
          <h2>歌曲增删改查</h2>
          <p>支持搜索、筛选、编辑歌曲信息、更新时间轴和删除歌曲。</p>
        </div>
        <div className="admin-actions-inline">
          <input
            className="admin-filter-input"
            placeholder="搜索标题 / 歌手 / 标签"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            className="admin-filter-select"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
          >
            <option value="全部">全部难度</option>
            <option value="入门">入门</option>
            <option value="初中级">初中级</option>
            <option value="中级">中级</option>
            <option value="进阶">进阶</option>
          </select>
        </div>
      </div>

      <div className="admin-library-layout">
        <div className="admin-song-list">
          {filteredSongs.length ? (
            filteredSongs.map((song) => {
              const active = song.id === selectedSong?.id;
              return (
                <button
                  key={song.id}
                  type="button"
                  className={`admin-song-row${active ? " is-active" : ""}`}
                  onClick={() => setSelectedId(song.id)}
                >
                  <div className="admin-song-row-main">
                    <div className="admin-song-row-title">{song.title}</div>
                    <div className="admin-song-row-sub">
                      {song.artist} · {song.difficulty || "未设置"}
                    </div>
                  </div>
                  <div className="admin-song-row-meta">
                    <span>{song.tags?.length ? song.tags.join(" · ") : "未设置标签"}</span>
                    <span>{song.lyrics?.length || 0} 句</span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="admin-empty-state">当前筛选条件下没有歌曲。</div>
          )}
        </div>

        <div className="admin-editor-card">
          {selectedSong ? (
            <>
              <div className="admin-editor-topbar">
                <div>
                  <div className="admin-eyebrow">正在编辑</div>
                  <h3>{selectedSong.title}</h3>
                  <p>{selectedSong.artist} · ID: {selectedSong.id}</p>
                </div>
                <div className="admin-actions-inline">
                  <a className="button" href={`/songs/${selectedSong.id}`} target="_blank" rel="noreferrer">
                    查看前台
                  </a>
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
            </>
          ) : (
            <div className="admin-empty-state">请先上传歌曲，随后可在这里管理曲库。</div>
          )}
        </div>
      </div>
    </section>
  );
}
