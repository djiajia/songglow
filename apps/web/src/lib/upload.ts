import { put, del } from "@vercel/blob";

export async function uploadFile(file: File, pathname: string) {
  return put(pathname, file, {
    access: "public",
    addRandomSuffix: true
  });
}

export async function deleteBlobIfExists(urlOrPath?: string) {
  if (!urlOrPath) return;
  try {
    await del(urlOrPath);
  } catch {
    // ignore cleanup errors
  }
}

