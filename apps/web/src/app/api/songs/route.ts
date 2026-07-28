import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { isAdminAuthenticated } from "@/lib/auth";
import { insertSong, listSongs } from "@/lib/db";
import { uploadFile } from "@/lib/upload";

export const runtime = "nodejs";

function parseTags(input: FormDataEntryValue | null) {
  return String(input || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseLyrics(input: FormDataEntryValue | null) {
  const raw = String(input || "").trim();
  if (!raw) return [];

  try {
    const json = JSON.parse(raw);
    if (Array.isArray(json)) {
      return json
        .map((row) => ({
          start: Number(row.start ?? 0),
          end: Number(row.end ?? 0),
          en: String(row.en ?? ""),
          zh: String(row.zh ?? "")
        }))
        .filter((row) => row.en || row.zh);
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
    .filter((row) => row.en || row.zh);
}

export async function GET() {
  const songs = await listSongs();
  return NextResponse.json(
    songs.map(({ audioBlobPath, coverBlobPath, ...publicSong }) => publicSong)
  );
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ message: "未登录或权限失效" }, { status: 401 });
  }

  const formData = await request.formData();
  const audio = formData.get("audio");

  if (!(audio instanceof File) || audio.size === 0) {
    return NextResponse.json({ message: "请上传音频文件" }, { status: 400 });
  }

  const cover = formData.get("cover");
  const id = nanoid(10);
  const now = Date.now();

  const audioBlob = await uploadFile(audio, `songs/${id}/audio-${audio.name}`);
  let coverBlob = null;

  if (cover instanceof File && cover.size > 0) {
    coverBlob = await uploadFile(cover, `songs/${id}/cover-${cover.name}`);
  }

  const song = {
    id,
    title: String(formData.get("title") || "未命名歌曲").trim(),
    artist: String(formData.get("artist") || "未知歌手").trim(),
    difficulty: String(formData.get("difficulty") || "未设置").trim(),
    tags: parseTags(formData.get("tags")),
    focus: String(formData.get("focus") || "").trim(),
    goal: String(formData.get("goal") || "").trim(),
    context: String(formData.get("context") || "").trim(),
    audioUrl: audioBlob.url,
    coverUrl: coverBlob?.url || "",
    audioBlobPath: audioBlob.pathname,
    coverBlobPath: coverBlob?.pathname || "",
    lyrics: parseLyrics(formData.get("lyrics")),
    createdAt: now,
    updatedAt: now
  };

  await insertSong(song);
  return NextResponse.json(song);
}
