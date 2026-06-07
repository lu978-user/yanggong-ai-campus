import { Sparkles } from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-blue-200 bg-blue-50/45 p-6 text-center">
      <div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
        <Sparkles className="size-5" />
      </div>
      <p className="font-black text-slate-950">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}
