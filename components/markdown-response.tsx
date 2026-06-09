import type { ReactNode } from "react";
import { sanitizeResponse } from "@/lib/response-sanitizer";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-black text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function MarkdownResponse({ text }: { text: string }) {
  const clean = sanitizeResponse(text);
  const lines = clean.split(/\r?\n/);
  const elements: ReactNode[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) {
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      elements.push(
        <h3 key={`heading-${index}`} className="mt-2 text-base font-black text-slate-950 first:mt-0">
          {renderInline(heading[2])}
        </h3>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }
      index -= 1;
      elements.push(
        <ul key={`list-${index}`} className="my-2 list-disc space-y-1 pl-5">
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+[.、)]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+[.、)]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+[.、)]\s+/, ""));
        index += 1;
      }
      index -= 1;
      elements.push(
        <ol key={`ordered-${index}`} className="my-2 list-decimal space-y-1 pl-5">
          {items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{renderInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (line.startsWith(">")) {
      elements.push(
        <blockquote key={`quote-${index}`} className="my-2 rounded-2xl border-l-4 border-blue-400 bg-blue-50/70 px-4 py-3">
          {renderInline(line.replace(/^>\s*/, ""))}
        </blockquote>,
      );
      continue;
    }

    elements.push(
      <p key={`paragraph-${index}`} className="my-1 first:mt-0 last:mb-0">
        {renderInline(line)}
      </p>,
    );
  }

  return <div className="space-y-1">{elements.length > 0 ? elements : "已收到请求。"}</div>;
}
