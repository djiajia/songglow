import type { Song } from "@/types";

export function apiBase(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "";
}

export async function fetchSongs(): Promise<Song[]> {
  const res = await fetch(`${apiBase()}/api/songs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
}

export async function fetchSong(id: string): Promise<Song> {
  const res = await fetch(`${apiBase()}/api/songs/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch song");
  return res.json();
}
