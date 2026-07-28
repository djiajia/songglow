import { getSupabaseAdmin, getSupabaseBucket } from "@/lib/supabase";

type UploadedFile = {
  url: string;
  pathname: string;
};

function extractStoragePath(urlOrPath?: string) {
  if (!urlOrPath) return "";
  if (!urlOrPath.startsWith("http://") && !urlOrPath.startsWith("https://")) {
    return urlOrPath.replace(/^\/+/, "");
  }

  try {
    const bucket = getSupabaseBucket();
    const url = new URL(urlOrPath);
    const markers = [
      `/storage/v1/object/public/${bucket}/`,
      `/storage/v1/object/sign/${bucket}/`
    ];

    for (const marker of markers) {
      const index = url.pathname.indexOf(marker);
      if (index >= 0) {
        return decodeURIComponent(url.pathname.slice(index + marker.length));
      }
    }
  } catch {
    return "";
  }

  return "";
}

export async function uploadFile(file: File, pathname: string): Promise<UploadedFile> {
  const supabase = getSupabaseAdmin();
  const bucket = getSupabaseBucket();
  const normalizedPath = pathname.replace(/^\/+/, "");

  const { error } = await supabase.storage.from(bucket).upload(normalizedPath, file, {
    cacheControl: "3600",
    contentType: file.type || undefined,
    upsert: false
  });

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(normalizedPath);
  return {
    url: data.publicUrl,
    pathname: normalizedPath
  };
}

export async function deleteFileIfExists(urlOrPath?: string) {
  const pathname = extractStoragePath(urlOrPath);
  if (!pathname) return;

  try {
    const supabase = getSupabaseAdmin();
    const bucket = getSupabaseBucket();
    await supabase.storage.from(bucket).remove([pathname]);
  } catch {
    // ignore cleanup errors
  }
}
