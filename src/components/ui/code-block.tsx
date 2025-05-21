"use client";

import { useEffect, useState } from "react";
import { getHighlighter } from "shikiji";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showHeader?: boolean;
  fileName?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  className,
  showHeader = false,
  fileName,
}: CodeBlockProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    getHighlighter({
      themes: ["github-dark"],
      langs: ["typescript", "javascript"],
    }).then((highlighter) => {
      const highlighted = highlighter.codeToHtml(code, {
        lang: language,
        theme: "github-dark",
      });
      setHtml(highlighted);
    });
  }, [code, language]);

  return (
    <div
      className={cn(
        "overflow-hidden font-mono text-sm bg-[#1e1e1e] rounded-lg shadow-2xl",
        className
      )}
    >
      {showHeader && (
        <div className="flex items-center h-9 px-4 bg-[#323232]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          {fileName && (
            <div className="ml-4 text-xs text-zinc-400">{fileName}</div>
          )}
        </div>
      )}
      <div className="overflow-x-auto [&_pre]:bg-transparent [&_pre]:p-0 [&_code]:leading-relaxed">
        <div
          className="p-4 whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
