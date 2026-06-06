import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "扬工智行 - AI校园公益服务助手",
  description:
    "面向高校学生的现代化AI校园公益服务平台，接入Dify Chatflow API。",
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
