import { sql } from "@vercel/postgres";
import type { Song } from "@/types";

let schemaReady = false;

export async function ensureSchema() {
  if (schemaReady) return;

  await sql`
    CREATE TABLE IF NOT EXISTS songs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      difficulty TEXT NOT NULL DEFAULT '未设置',
      tags JSONB NOT NULL DEFAULT '[]'::jsonb,
      focus TEXT NOT NULL DEFAULT '',
      goal TEXT NOT NULL DEFAULT '',
      context TEXT NOT NULL DEFAULT '',
      audio_url TEXT NOT NULL,
      cover_url TEXT NOT NULL DEFAULT '',
      audio_blob_path TEXT NOT NULL DEFAULT '',
      cover_blob_path TEXT NOT NULL DEFAULT '',
      lyrics JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL
    );
  `;

  schemaReady = true;
}

function rowToSong(row: Record<string, any>): Song & {
  audioBlobPath?: string;
  coverBlobPath?: string;
} {
  return {
    id: row.id,
    title: row.title,
    artist: row.artist,
    difficulty: row.difficulty,
    tags: row.tags || [],
    focus: row.focus || "",
    goal: row.goal || "",
    context: row.context || "",
    audioUrl: row.audio_url,
    coverUrl: row.cover_url || "",
    lyrics: row.lyrics || [],
    createdAt: Number(row.created_at || 0),
    updatedAt: Number(row.updated_at || 0),
    audioBlobPath: row.audio_blob_path || "",
    coverBlobPath: row.cover_blob_path || ""
  };
}

export async function listSongs() {
  await ensureSchema();
  const result = await sql`SELECT * FROM songs ORDER BY updated_at DESC`;
  return result.rows.map(rowToSong);
}

export async function getSong(id: string) {
  await ensureSchema();
  const result = await sql`SELECT * FROM songs WHERE id = ${id} LIMIT 1`;
  return result.rows[0] ? rowToSong(result.rows[0]) : null;
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
  audioBlobPath: string;
  coverBlobPath: string;
  lyrics: unknown[];
  createdAt: number;
  updatedAt: number;
}) {
  await ensureSchema();

  await sql`
    INSERT INTO songs (
      id, title, artist, difficulty, tags, focus, goal, context,
      audio_url, cover_url, audio_blob_path, cover_blob_path, lyrics, created_at, updated_at
    ) VALUES (
      ${song.id},
      ${song.title},
      ${song.artist},
      ${song.difficulty},
      ${JSON.stringify(song.tags)}::jsonb,
      ${song.focus},
      ${song.goal},
      ${song.context},
      ${song.audioUrl},
      ${song.coverUrl},
      ${song.audioBlobPath},
      ${song.coverBlobPath},
      ${JSON.stringify(song.lyrics)}::jsonb,
      ${song.createdAt},
      ${song.updatedAt}
    )
  `;
}

export async function removeSong(id: string) {
  await ensureSchema();
  const song = await getSong(id);
  if (!song) return null;
  await sql`DELETE FROM songs WHERE id = ${id}`;
  return song;
}

