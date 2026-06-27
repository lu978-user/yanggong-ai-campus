"use client";

import { AppShell } from "@/components/app-shell";
import { HeroSection } from "@/components/home/hero-section";
import { CoreEntrySection } from "@/components/home/core-entry-section";
import { OpportunityEngineSection } from "@/components/home/opportunity-radar-section";
import { PlatformCapabilities } from "@/components/home/platform-capabilities";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="min-w-0 overflow-x-hidden px-4 py-4 sm:px-6 lg:px-8">
        <main className="mx-auto max-w-[1720px] space-y-4">
          <HeroSection />
          <CoreEntrySection />
          <OpportunityEngineSection />
          <PlatformCapabilities />
          <section className="rounded-[28px] border border-slate-200/70 bg-white/70 p-6 text-sm leading-7 text-slate-600 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">YPI Foundation</p>
            <h2 className="mt-3 text-2xl font-black text-slate-950 dark:text-slate-100">扬工底蕴，服务学生成长</h2>
            <p className="mt-3 max-w-4xl">
              扬工智行面向扬州工业职业技术学院学生，将校园导航、成长机会、学习资源、学生事务、安全教育与心理关怀整合为清晰可用的 AI 校园公益服务平台。
            </p>
          </section>
        </main>
      </div>
    </AppShell>
  );
}
