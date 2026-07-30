"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Song } from "@/types";

type Props = {
  songs: Song[];
};

export function AdminSongManager({ songs }: Props) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("全部");

  const filteredSongs = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return songs.filter((song) => {
      const hitKeyword =
        !keyword ||
        song.title.toLowerCase().includes(keyword) ||
        song.artist.toLowerCase().includes(keyword) ||
        song.tags.join(" ").toLowerCase().includes(keyword);
      const hitDifficulty = difficulty === "全部" || song.difficulty === difficulty;
      return hitKeyword && hitDifficulty;
    });
  }, [songs, query, difficulty]);

  return (
    <section className="admin-list-card">
      <div className="admin-section-head">
        <div>
          <div className="admin-eyebrow">曲库管理</div>
          <h2>歌曲列表</h2>
          <p>从这里浏览整张曲库，进入单独页面做新增和编辑。</p>
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

      <div className="admin-song-list">
        {filteredSongs.length ? (
          filteredSongs.map((song) => (
            <Link key={song.id} href={`/admin/${song.id}`} className="admin-song-row admin-link-row">
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
            </Link>
          ))
        ) : (
          <div className="admin-empty-state">当前筛选条件下没有歌曲。</div>
        )}
      </div>
    </section>
  );
}
