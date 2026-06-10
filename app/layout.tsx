import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { LoadingScreen } from "@/components/loading-screen";

export const metadata: Metadata = {
  title: "扬工智行 - AI驱动的大学生成长机会与关怀服务平台",
  description:
    "面向高校学生的大学生成长机会与关怀服务平台，聚焦成长规划、机会发现、学习资源与成长关怀。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <LoadingScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
