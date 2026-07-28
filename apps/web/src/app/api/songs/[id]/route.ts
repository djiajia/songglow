import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSong, removeSong } from "@/lib/db";
import { deleteBlobIfExists } from "@/lib/upload";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const song = await getSong(params.id);
  if (!song) {
    return NextResponse.json({ message: "Song not found" }, { status: 404 });
  }
  const { audioBlobPath, coverBlobPath, ...publicSong } = song;
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

  await deleteBlobIfExists(song.audioBlobPath || song.audioUrl);
  await deleteBlobIfExists(song.coverBlobPath || song.coverUrl);

  return NextResponse.json({ ok: true });
}
