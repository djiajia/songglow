import { getSupabaseAdmin } from "@/lib/supabase";
import type { LyricLine, Song } from "@/types";

export type StoredSong = Song & {
  audioStoragePath?: string;
  coverStoragePath?: string;
};

function mapTags(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item)).filter(Boolean);
}

function mapLyrics(value: unknown): LyricLine[] {
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch {
      // ignore
    }
  }

  if (!Array.isArray(value)) return [];

  return value
    .map((row) => ({
      start: Number((row as Record<string, unknown>)?.start ?? 0),
      end: Number((row as Record<string, unknown>)?.end ?? 0),
      en: String((row as Record<string, unknown>)?.en ?? ""),
      zh: String((row as Record<string, unknown>)?.zh ?? "")
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

function rowToSong(row: Record<string, any>): StoredSong {
  return {
    id: row.id,
    title: row.title,
    artist: row.artist,
    difficulty: row.difficulty || "未设置",
    tags: mapTags(row.tags),
    focus: row.focus || "",
    goal: row.goal || "",
    context: row.context || "",
    audioUrl: row.audio_url,
    coverUrl: row.cover_url || "",
    lyrics: mapLyrics(row.lyrics),
    createdAt: Number(row.created_at || 0),
    updatedAt: Number(row.updated_at || 0),
    audioStoragePath: row.audio_storage_path || "",
    coverStoragePath: row.cover_storage_path || ""
  };
}

function throwIfError(scope: string, error: { message: string } | null) {
  if (error) {
    throw new Error(`${scope}: ${error.message}`);
  }
}

export async function listSongs() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("updated_at", { ascending: false });

  throwIfError("Failed to list songs", error);
  return (data || []).map(rowToSong);
}

export async function getSong(id: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  throwIfError("Failed to get song", error);
  return data ? rowToSong(data) : null;
}

export async function insertSong(song: {
  id: string;
  title: string;
  artist: string;
  difficulty: string;
  tags: string[];
  focus: string;
  goal: string;
  context: string;
  audioUrl: string;
  coverUrl: string;
  audioStoragePath: string;
  coverStoragePath: string;
  lyrics: LyricLine[];
  createdAt: number;
  updatedAt: number;
}) {
  const supabase = getSupabaseAdmin();
  const payload = {
    id: song.id,
    title: song.title,
    artist: song.artist,
    difficulty: song.difficulty,
    tags: song.tags,
    focus: song.focus,
    goal: song.goal,
    context: song.context,
    audio_url: song.audioUrl,
    cover_url: song.coverUrl,
    audio_storage_path: song.audioStoragePath,
    cover_storage_path: song.coverStoragePath,
    lyrics: song.lyrics,
    created_at: song.createdAt,
    updated_at: song.updatedAt
  };

  const { error } = await (supabase.from("songs") as any).insert(payload);

  throwIfError("Failed to insert song", error);
}

export async function updateSongLyrics(id: string, lyrics: LyricLine[]) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await (supabase.from("songs") as any)
    .update({
      lyrics,
      updated_at: Date.now()
    })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  throwIfError("Failed to update song lyrics", error);
  return data ? rowToSong(data) : null;
}

export async function removeSong(id: string) {
  const song = await getSong(id);
  if (!song) return null;

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("songs").delete().eq("id", id);

  throwIfError("Failed to remove song", error);
  return song;
}
