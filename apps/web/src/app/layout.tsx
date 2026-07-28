import "./globals.css";

export const metadata = {
  title: "SongGlow",
  description: "把英文歌变成可学会的课程"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

