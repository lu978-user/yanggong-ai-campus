import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "扬工智行 - 大学生成长机会与关怀服务平台",
  description:
    "面向高校学生的大学生成长机会与关怀服务平台，突出成长规划、机会发现、学习资源与成长关怀。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
