import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingSpinner({
  label = "加载中",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-bold text-slate-500", className)}>
      <Loader2 className="size-4 animate-spin text-blue-600" />
      {label}
    </span>
  );
}
