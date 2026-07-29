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

  const activeIndex = useMemo(() => {
    if (!lyrics.length) return -1;

    const exactIndex = lyrics.findIndex((line) => currentTime >= line.start && currentTime <= line.end);
    if (exactIndex >= 0) return exactIndex;

    let previousIndex = -1;
    for (let i = 0; i < lyrics.length; i += 1) {
      if (currentTime >= lyrics[i].start) previousIndex = i;
    }
    return previousIndex;
  }, [currentTime, lyrics]);

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
          <div className="song-progress-meta">
            <span>当前播放 {formatTime(currentTime)}</span>
            <span>总时长 {formatTime(duration)}</span>
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
            {lyrics.length ? (
              lyrics.map((line, idx) => {
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
