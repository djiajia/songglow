import { getSupabaseAdmin } from "@/lib/supabase";
import type { LyricLine, Song } from "@/types";

export type StoredSong = Song & {
  audioStoragePath?: string;
  coverStoragePath?: string;
};

function throwIfError<T>(result: { data: T; error: Error | null }): T {
  if (result.error) throw result.error;
  return result.data;
}

export function mapTags(tags?: string): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  try {
    const parsed = JSON.parse(tags);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {}
  return [tags];
}

export function mapLyrics(value: any): LyricLine[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((item) => ({
      time: item.time ?? null,
      text: item.text ?? "",
    }));
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => ({
          time: item.time ?? null,
          text: item.text ?? "",
        }));
      }
    } catch {}
    return [];
  }
  return [];
}

export async function listSongs(): Promise<StoredSong[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getSong(id: string): Promise<StoredSong | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data ?? null;
}

export async function insertSong(song: Omit<StoredSong, "id" | "created_at">): Promise<StoredSong> {
  const { data, error } = await getSupabaseAdmin()
    .from("songs")
    .insert(song)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateSongLyrics(id: string, lyrics: LyricLine[]): Promise<StoredSong> {
  const { data, error } = await getSupabaseAdmin()
    .from("songs")
    .update({ lyrics })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function removeSong(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("songs")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
