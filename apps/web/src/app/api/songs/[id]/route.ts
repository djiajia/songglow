import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSong, removeSong, updateSongLyrics } from "@/lib/db";
import { deleteFileIfExists } from "@/lib/upload";
import type { LyricLine } from "@/types";

export const runtime = "nodejs";

function parseLyrics(input: unknown): LyricLine[] {
  const raw = String(input || "").trim();
  if (!raw) return [];

  try {
    const json = JSON.parse(raw);
    if (Array.isArray(json)) {
      return json
        .map((row) => ({
          start: Number(row?.start ?? 0),
          end: Number(row?.end ?? 0),
          en: String(row?.en ?? ""),
          zh: String(row?.zh ?? "")
        }))
        .filter(
          (row) =>
            (row.en || row.zh) &&
            Number.isFinite(row.start) &&
            Number.isFinite(row.end) &&
            row.end > row.start &&
            !(row.en.trim() === "英文歌词" && row.zh.trim() === "中文翻译")
        )
        .sort((a, b) => a.start - b.start);
    }
  } catch {
    // ignore
  }

  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [start, end, en, zh] = line.split("|");
      return {
        start: Number(start || 0),
        end: Number(end || 0),
        en: (en || "").trim(),
        zh: (zh || "").trim()
      };
    })
    .filter(
      (row) =>
        (row.en || row.zh) &&
        Number.isFinite(row.start) &&
        Number.isFinite(row.end) &&
        row.end > row.start &&
        !(row.en.trim() === "英文歌词" && row.zh.trim() === "中文翻译")
    )
    .sort((a, b) => a.start - b.start);
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const song = await getSong(params.id);
  if (!song) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }
  const { audioStoragePath, coverStoragePath, ...publicSong } = song;
  return NextResponse.json(publicSong);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ message: "未登录或权限失效" }, { status: 401 });
  }

  const song = await getSong(params.id);
  if (!song) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const lyrics = parseLyrics(body?.lyrics);
  const updatedSong = await updateSongLyrics(params.id, lyrics);

  if (!updatedSong) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }

  const { audioStoragePath, coverStoragePath, ...publicSong } = updatedSong;
  return NextResponse.json(publicSong);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ message: "未登录或权限失效" }, { status: 401 });
  }

  const song = await removeSong(params.id);
  if (!song) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }

  await deleteFileIfExists(song.audioStoragePath || song.audioUrl);
  await deleteFileIfExists(song.coverStoragePath || song.coverUrl);

  return NextResponse.json({ ok: true });
}
