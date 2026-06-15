"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Edit3, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  defaultOpportunities,
  getOpportunities,
  opportunityCategories,
  opportunityFollowStatuses,
  opportunityStatuses,
  resetOpportunities,
  saveOpportunities,
  type Opportunity,
} from "@/data/opportunities";

const emptyOpportunity: Opportunity = {
  id: "",
  title: "",
  category: "校园岗位",
  deadline: "",
  status: "报名中",
  followStatus: "未关注",
  recommendLevel: 4,
  targetAudience: [],
  description: "",
  requirements: "",
  applyMethod: "",
  source: "",
  tags: [],
  growthValues: [],
  completedSkills: [],
  relatedMajors: [],
  relatedGoals: [],
  isFeatured: true,
};

function createId() {
  return `opp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function splitList(value: string) {
  return value
    .split(/[,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinList(value: string[]) {
  return value.join("，");
}

export default function OpportunityAdminPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(defaultOpportunities);
  const [editing, setEditing] = useState<Opportunity | null>(null);
  const [audienceText, setAudienceText] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [growthValuesText, setGrowthValuesText] = useState("");
  const [completedSkillsText, setCompletedSkillsText] = useState("");
  const [relatedMajorsText, setRelatedMajorsText] = useState("");
  const [relatedGoalsText, setRelatedGoalsText] = useState("");

  useEffect(() => {
    setOpportunities(getOpportunities());
  }, []);

  function persist(next: Opportunity[]) {
    setOpportunities(next);
    saveOpportunities(next);
  }

  function startCreate() {
    const draft = { ...emptyOpportunity, id: createId() };
    setEditing(draft);
    setAudienceText("");
    setTagsText("");
    setGrowthValuesText("");
    setCompletedSkillsText("");
    setRelatedMajorsText("");
    setRelatedGoalsText("");
  }

  function startEdit(item: Opportunity) {
    setEditing({ ...item });
    setAudienceText(joinList(item.targetAudience));
    setTagsText(joinList(item.tags));
    setGrowthValuesText(joinList(item.growthValues));
    setCompletedSkillsText(joinList(item.completedSkills));
    setRelatedMajorsText(joinList(item.relatedMajors));
    setRelatedGoalsText(joinList(item.relatedGoals));
  }

  function removeOpportunity(id: string) {
    const next = opportunities.filter((item) => item.id !== id);
    persist(next);
    if (editing?.id === id) setEditing(null);
  }

  function clearAll() {
    persist([]);
    setEditing(null);
  }

  function restoreDefaults() {
    const next = resetOpportunities();
    setOpportunities(next);
    setEditing(null);
  }

  function updateEditing<K extends keyof Opportunity>(key: K, value: Opportunity[K]) {
    setEditing((current) => (current ? { ...current, [key]: value } : current));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;

    const nextItem: Opportunity = {
      ...editing,
      title: editing.title.trim() || "未命名机会",
      followStatus: editing.followStatus ?? "未关注",
      targetAudience: splitList(audienceText),
      tags: splitList(tagsText),
      growthValues: splitList(growthValuesText),
      completedSkills: splitList(completedSkillsText),
      relatedMajors: splitList(relatedMajorsText),
      relatedGoals: splitList(relatedGoalsText),
    };
    const exists = opportunities.some((item) => item.id === nextItem.id);
    const next = exists
      ? opportunities.map((item) => (item.id === nextItem.id ? nextItem : item))
      : [nextItem, ...opportunities];

    persist(next);
    setEditing(null);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <section className="premium-card p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black text-blue-600">Local Admin</p>
              <h1 className="mt-1 text-4xl font-black text-slate-950">机会内容管理</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                当前为本地管理模式，数据保存在当前浏览器中。你可以维护机会内容，也可以更新每条机会的跟进状态。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={startCreate}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-black text-white shadow-glow active:scale-95"
              >
                <Plus className="size-4" />
                新增机会
              </button>
              <button
                type="button"
                onClick={restoreDefaults}
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-black text-blue-700 active:scale-95"
              >
                <RotateCcw className="size-4" />
                恢复默认
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-black text-red-700 active:scale-95"
              >
                <Trash2 className="size-4" />
                清空数据
              </button>
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-black text-slate-700 active:scale-95"
              >
                <ArrowLeft className="size-4" />
                返回机会中心
              </Link>
            </div>
          </div>
        </section>

        {editing && (
          <form onSubmit={handleSubmit} className="premium-card mt-5 p-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black text-blue-600">Edit Opportunity</p>
                <h2 className="text-2xl font-black text-slate-950">
                  {opportunities.some((item) => item.id === editing.id) ? "编辑机会" : "新增机会"}
                </h2>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white active:scale-95"
              >
                <Save className="size-4" />
                保存到本地
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="标题">
                <input
                  value={editing.title}
                  onChange={(event) => updateEditing("title", event.target.value)}
                  className="admin-input"
                  placeholder="例如：班主任助理招募"
                />
              </Field>
              <Field label="类型">
                <select
                  value={editing.category}
                  onChange={(event) => updateEditing("category", event.target.value)}
                  className="admin-input"
                >
                  {opportunityCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="截止时间">
                <input
                  value={editing.deadline}
                  onChange={(event) => updateEditing("deadline", event.target.value)}
                  className="admin-input"
                  placeholder="例如：2026-06-25 或 6月25日"
                />
              </Field>
              <Field label="报名状态">
                <select
                  value={editing.status}
                  onChange={(event) => updateEditing("status", event.target.value as Opportunity["status"])}
                  className="admin-input"
                >
                  {opportunityStatuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="跟进状态">
                <select
                  value={editing.followStatus}
                  onChange={(event) => updateEditing("followStatus", event.target.value as Opportunity["followStatus"])}
                  className="admin-input"
                >
                  {opportunityFollowStatuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="推荐指数">
                <select
                  value={editing.recommendLevel}
                  onChange={(event) => updateEditing("recommendLevel", Number(event.target.value))}
                  className="admin-input"
                >
                  {[1, 2, 3, 4, 5].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="适合人群，逗号分隔">
                <input
                  value={audienceText}
                  onChange={(event) => setAudienceText(event.target.value)}
                  className="admin-input"
                  placeholder="大一，大二，学生干部"
                />
              </Field>
              <Field label="简介">
                <textarea
                  value={editing.description}
                  onChange={(event) => updateEditing("description", event.target.value)}
                  className="admin-input min-h-28"
                />
              </Field>
              <Field label="报名条件">
                <textarea
                  value={editing.requirements}
                  onChange={(event) => updateEditing("requirements", event.target.value)}
                  className="admin-input min-h-28"
                />
              </Field>
              <Field label="报名方式">
                <textarea
                  value={editing.applyMethod}
                  onChange={(event) => updateEditing("applyMethod", event.target.value)}
                  className="admin-input min-h-28"
                />
              </Field>
              <div className="grid gap-4">
                <Field label="来源">
                  <input
                    value={editing.source}
                    onChange={(event) => updateEditing("source", event.target.value)}
                    className="admin-input"
                    placeholder="例如：学院通知 / 团委公众号"
                  />
                </Field>
                <Field label="标签，逗号分隔">
                  <input
                    value={tagsText}
                    onChange={(event) => setTagsText(event.target.value)}
                    className="admin-input"
                    placeholder="竞赛，证书，实践"
                  />
                </Field>
                <Field label="成长价值标签，逗号分隔">
                  <input
                    value={growthValuesText}
                    onChange={(event) => setGrowthValuesText(event.target.value)}
                    className="admin-input"
                    placeholder="组织协调，沟通表达，学生工作经验"
                  />
                </Field>
                <Field label="已完成获得能力，逗号分隔">
                  <input
                    value={completedSkillsText}
                    onChange={(event) => setCompletedSkillsText(event.target.value)}
                    className="admin-input"
                    placeholder="组织能力，表达能力，项目经验"
                  />
                </Field>
                <Field label="关联专业，逗号分隔">
                  <input
                    value={relatedMajorsText}
                    onChange={(event) => setRelatedMajorsText(event.target.value)}
                    className="admin-input"
                    placeholder="计算机应用技术，软件技术，人工智能技术应用"
                  />
                </Field>
                <Field label="关联目标，逗号分隔">
                  <input
                    value={relatedGoalsText}
                    onChange={(event) => setRelatedGoalsText(event.target.value)}
                    className="admin-input"
                    placeholder="竞赛，就业，专转本"
                  />
                </Field>
                <label className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white/70 px-4 py-3 text-sm font-black text-slate-700">
                  <input
                    type="checkbox"
                    checked={editing.isFeatured}
                    onChange={(event) => updateEditing("isFeatured", event.target.checked)}
                    className="size-4"
                  />
                  是否推荐
                </label>
              </div>
            </div>
          </form>
        )}

        <section className="mt-5 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {opportunities.map((item) => (
            <article key={item.id} className="premium-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">{item.category}</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">截止：{item.deadline || "未设置"}</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{item.status}</span>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-black text-violet-700">跟进：{item.followStatus}</span>
                {item.isFeatured && (
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">推荐</span>
                )}
              </div>
              <h2 className="text-xl font-black text-slate-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              <p className="mt-3 text-sm font-black text-blue-700">推荐指数：{"★".repeat(item.recommendLevel)}{"☆".repeat(5 - item.recommendLevel)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.targetAudience.map((tag) => (
                  <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 grid gap-2">
                {item.growthValues.length > 0 && (
                  <AdminTagGroup label="成长价值" tags={item.growthValues} tone="cyan" />
                )}
                {item.completedSkills.length > 0 && (
                  <AdminTagGroup label="完成能力" tags={item.completedSkills} tone="violet" />
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white active:scale-95"
                >
                  <Edit3 className="size-4" />
                  编辑
                </button>
                <button
                  type="button"
                  onClick={() => removeOpportunity(item.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-700 active:scale-95"
                >
                  <Trash2 className="size-4" />
                  删除
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function AdminTagGroup({ label, tags, tone }: { label: string; tags: string[]; tone: "cyan" | "violet" }) {
  const toneClass = tone === "cyan" ? "bg-cyan-50 text-cyan-700" : "bg-violet-50 text-violet-700";

  return (
    <div>
      <p className="mb-2 text-xs font-black text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className={`rounded-full px-3 py-1 text-xs font-bold ${toneClass}`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
