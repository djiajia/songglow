import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSong, removeSong } from "@/lib/db";
import { deleteFileIfExists } from "@/lib/upload";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const song = await getSong(params.id);
  if (!song) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }
  const { audioStoragePath, coverStoragePath, ...publicSong } = song;
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
