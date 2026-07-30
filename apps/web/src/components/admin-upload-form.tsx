"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Song } from "@/types";

type Status =
  | { type: "idle"; message: string }
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function AdminUploadForm({
  onCreated,
  redirectOnSuccess = false
}: {
  onCreated?: (song: Song) => void;
  redirectOnSuccess?: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>({
    type: "idle",
    message: "上传音频后，前台首页会自动显示并支持播放。"
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const audio = fd.get("audio");

    if (!(audio instanceof File) || audio.size === 0) {
      setStatus({ type: "error", message: "请先选择音频文件。" });
      return;
    }

    setStatus({ type: "loading", message: "正在上传…" });

    try {
      const res = await fetch("/api/songs", {
        method: "POST",
        body: fd
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "上传失败");
      }

      const data = await res.json();
      onCreated?.(data);
      setStatus({
        type: "success",
        message: redirectOnSuccess ? `上传成功：${data.title}，正在跳转编辑页…` : `上传成功：${data.title}（返回列表即可看到）`
      });
      form.reset();
      if (redirectOnSuccess && data?.id) {
        router.push(`/admin/${data.id}`);
        router.refresh();
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: `上传失败：${error instanceof Error ? error.message : "未知错误"}`
      });
    }
  }

  return (
    <section className="admin-panel admin-panel-soft">
      <div className="admin-section-head">
        <div>
          <div className="admin-eyebrow">新增歌曲</div>
          <h2>上传到曲库</h2>
          <p>上传音频、补充歌曲信息，并可在导入时直接写入歌词时间轴。</p>
        </div>
        <div className="admin-actions-inline">
          <Link className="button" href="/admin">
            返回列表
          </Link>
        </div>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <label>
          歌曲名称
          <input name="title" placeholder="例如：Imagine" required />
        </label>
        <label>
          歌手
          <input name="artist" placeholder="例如：John Lennon" required />
        </label>
        <label>
          难度
          <select name="difficulty" defaultValue="中级">
            <option value="入门">入门</option>
            <option value="初中级">初中级</option>
            <option value="中级">中级</option>
            <option value="进阶">进阶</option>
          </select>
        </label>
        <label>
          标签（逗号分隔）
          <input name="tags" placeholder="抒情,入门,短句" />
        </label>
        <label>
          适合练什么
          <input name="focus" placeholder="连读、情绪表达、弱读听辨" />
        </label>
        <label>
          学习收益
          <input name="goal" placeholder="学完后理解副歌核心表达" />
        </label>
        <label>
          歌曲简介/学习背景
          <textarea name="context" rows={3} placeholder="描述这首歌为什么适合学习、适合什么用户。" />
        </label>
        <label>
          音频文件（必填）
          <input name="audio" type="file" accept="audio/*" required />
        </label>
        <label>
          封面（可选）
          <input name="cover" type="file" accept="image/*" />
        </label>
        <label>
          歌词时间轴（可选）
          <textarea
            name="lyrics"
            rows={8}
            placeholder={`每行：开始秒数|结束秒数|英文歌词|中文翻译\n例如：0.5|4.2|Imagine there's no heaven|想象没有天堂`}
          />
        </label>

        <button className="button primary" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "上传中…" : "保存到曲库"}
        </button>
        <div style={{ color: status.type === "error" ? "#b42318" : "var(--muted)", fontSize: 13 }}>
          {status.message}
        </div>
      </form>
    </section>
  );
}
