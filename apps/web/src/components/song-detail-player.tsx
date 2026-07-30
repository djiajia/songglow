"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LyricLine } from "@/types";

type Props = {
  title: string;
  artist: string;
  audioUrl: string;
  focus?: string;
  goal?: string;
  lyrics?: LyricLine[];
};

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function SongDetailPlayer({ title, artist, audioUrl, focus, goal, lyrics = [] }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const safeLyrics = useMemo(
    () =>
      lyrics
        .filter(
          (line) =>
            (line.en || line.zh) &&
            Number.isFinite(line.start) &&
            Number.isFinite(line.end) &&
            line.end > line.start &&
            !(line.en.trim() === "英文歌词" && line.zh.trim() === "中文翻译")
        )
        .sort((a, b) => a.start - b.start),
    [lyrics]
  );
  const progressRatio = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  const activeIndex = useMemo(() => {
    if (!safeLyrics.length) return -1;

    const exactIndex = safeLyrics.findIndex((line, idx) => {
      const nextStart = safeLyrics[idx + 1]?.start;
      const activeUntil = nextStart ?? line.end + 0.35;
      return currentTime >= line.start && currentTime < activeUntil;
    });
    if (exactIndex >= 0) return exactIndex;
    return -1;
  }, [currentTime, safeLyrics]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const node = lineRefs.current[activeIndex];
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  return (
    <>
      <section className="hero">
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
          {title} <span style={{ color: "var(--muted)", fontWeight: 600 }}>· {artist}</span>
        </h1>
        <p>
          {focus || "未设置学习重点"}
          {goal ? ` · ${goal}` : ""}
        </p>
        <div className="stack">
          <audio
            ref={audioRef}
            controls
            src={audioUrl}
            style={{ width: "100%" }}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
            onSeeking={(event) => setCurrentTime(event.currentTarget.currentTime)}
          />
          <div className="song-progress-rail" aria-hidden="true">
            <div className="song-progress-fill" style={{ width: `${progressRatio}%` }} />
          </div>
          <div className="song-progress-meta">
            <span>当前播放 {formatTime(currentTime)}</span>
            <span>总时长 {formatTime(duration)}</span>
          </div>
          <div className="song-current-line">
            当前句：
            <strong>{activeIndex >= 0 ? safeLyrics[activeIndex]?.en || safeLyrics[activeIndex]?.zh : "等待播放开始"}</strong>
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13 }}>
            播放器进度会联动当前歌词行，高亮后会自动滚动到可见区域。
          </div>
        </div>
      </section>

      <div className="grid" style={{ gridTemplateColumns: "1fr", marginTop: 18 }}>
        <div className="card">
          <span className="tag">歌词</span>
          <h3 style={{ marginTop: 10 }}>逐句时间轴</h3>
          <p>当前版本展示上传的时间轴歌词，播放时会自动高亮并跟随滚动。</p>
          <div className="song-lyrics-list">
            {safeLyrics.length ? (
              safeLyrics.map((line, idx) => {
                const isActive = idx === activeIndex;
                const isPassed = activeIndex > idx;

                return (
                  <div
                    key={`${line.start}-${line.end}-${idx}`}
                    ref={(node) => {
                      lineRefs.current[idx] = node;
                    }}
                    className={`song-lyric-card${isActive ? " is-active" : ""}${isPassed ? " is-passed" : ""}`}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>{line.en}</div>
                      <div className="song-lyric-time">
                        {line.start}s–{line.end}s
                      </div>
                    </div>
                    <div className="song-lyric-translation">{line.zh}</div>
                  </div>
                );
              })
            ) : (
              <div style={{ color: "var(--muted)" }}>暂无歌词时间轴…</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
