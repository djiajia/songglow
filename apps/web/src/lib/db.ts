import { getSupabaseAdmin } from "@/lib/supabase";
import type { LyricLine, Song } from "@/types";

export type StoredSong = Song & {
  audioStoragePath?: string;
  coverStoragePath?: string;
};

function mapLyrics(raw: string | null): LyricLine[] {
  if (!raw) return [];
  try {
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return [];
  }
}

export async function getSongById(id: string): Promise<StoredSong | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  const song = {
    ...data,
    lyrics: mapLyrics(data.lyrics),
  } as StoredSong;
  return song;
}

export async function listSongs(): Promise<StoredSong[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data.map((s) => ({
    ...s,
    lyrics: mapLyrics(s.lyrics),
  })) as StoredSong[];
}

export async function createSong(input: {
  title: string;
  artist?: string;
  lyrics?: string;
  audioStoragePath?: string;
  coverStoragePath?: string;
}): Promise<StoredSong | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("songs")
    .insert({
      title: input.title,
      artist: input.artist ?? null,
      lyrics: input.lyrics ?? null,
      audioStoragePath: input.audioStoragePath ?? null,
      coverStoragePath: input.coverStoragePath ?? null,
    })
    .select()
    .single();
  if (error) return null;
  return {
    ...data,
    lyrics: mapLyrics(data.lyrics),
  } as StoredSong;
}

export async function updateSong(id: string, input: {
  title?: string;
  artist?: string;
  lyrics?: string;
  audioStoragePath?: string;
  coverStoragePath?: string;
}): Promise<StoredSong | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("songs")
    .update({
      title: input.title,
      artist: input.artist,
      lyrics: input.lyrics,
      audioStoragePath: input.audioStoragePath,
      coverStoragePath: input.coverStoragePath,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) return null;
  return {
    ...data,
    lyrics: mapLyrics(data.lyrics),
  } as StoredSong;
}

export async function deleteSong(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("songs")
    .delete()
    .eq("id", id);
  return !error;
}
