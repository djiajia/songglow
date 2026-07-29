"use client";

import { useMemo, useState } from "react";
import type { Song } from "@/types";
import { AdminSongManager } from "@/components/admin-song-manager";
import { AdminUploadForm } from "@/components/admin-upload-form";

export function AdminDashboard({ initialSongs }: { initialSongs: Song[] }) {
  const [songs, setSongs] = useState(initialSongs);

  const stats = useMemo(() => {
    const total = songs.length;
    const withLyrics = songs.filter((song) => song.lyrics?.length).length;
    const withTags = songs.filter((song) => song.tags?.length).length;
    const latest = [...songs]
      .sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0))
      .slice(0, 1)[0];

    return {
      total,
      withLyrics,
      withTags,
      latest: latest ? `${latest.title} · ${latest.artist}` : "暂无歌曲"
    };
  }, [songs]);

  return (
    <div className="admin-dashboard">
      <section className="admin-hero">
        <div>
          <div className="admin-eyebrow">SongGlow Admin</div>div>
          <h1>曲库管理后台</h1>h1>
          <p>在一个页面里完成歌曲上传、搜索筛选、编辑信息、维护时间轴和删除歌曲。</p>p>
        </div>div>
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <span>歌曲总数</span>span>
            <strong>{stats.total}</strong>strong>
          </div>div>
          <div className="admin-stat-card">
            <span>已配时间轴</span>span>
            <strong>{stats.withLyrics}</strong>strong>
          </div>div>
          <div className="admin-stat-card">
            <span>已加标签</span>span>
            <strong>{stats.withTags}</strong>strong>
          </div>div>
          <div className="admin-stat-card">
            <span>最近更新</span>span>
            <strong>{stats.latest}</strong>strong>
          </div>div>
        </div>div>
      </section>section>

      <div className="admin-main-grid">
        <AdminUploadForm onCreated={(song) => setSongs((prev) => [song, ...prev])} />
        <AdminSongManager songs={songs} onSongsChange={setSongs} />
      </div>div>
    </div>div>
  );
}</div>





















