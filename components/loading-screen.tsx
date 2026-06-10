"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100000] grid place-items-center bg-[#edf5ff] transition-all duration-500 dark:bg-slate-950 ${
        visible ? "opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="animate-float-soft relative grid size-20 place-items-center overflow-hidden rounded-[28px] border border-white/80 bg-white/85 shadow-2xl backdrop-blur-2xl dark:border-slate-700 dark:bg-slate-900/85">
          <Image src="/logo.png" alt="扬工智行" fill priority className="object-contain p-3" />
        </div>
        <p className="mt-5 text-2xl font-black tracking-normal text-slate-950 dark:text-slate-100">
          扬工智行
        </p>
        <p className="mt-1 text-lg font-black tracking-tight text-blue-700">YPI</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">AI-Powered Student Growth Platform</p>
        <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-blue-100 dark:bg-slate-800">
          <div className="loading-progress h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />
        </div>
      </div>
    </div>
  );
}
