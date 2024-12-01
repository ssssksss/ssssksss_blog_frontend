import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/panda-syntax-light.css"; // 코드 블록 스타일
import React from "react";
import { EditorPreviewStyle } from "./EditorTailwindcssStyle";

// 언어 등록
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("java", java);
hljs.registerLanguage("css", css);

/**
 * Convert Markdown to HTML with syntax highlighting and copy button for code blocks.
 * @param markdown - The Markdown string to convert.
 * @param isPreview - Whether the output is for preview mode.
 * @returns The converted HTML string.
 */
export const convertMarkdownToHtml = (markdown: string, isPreview?: boolean): string => {
  let html = markdown
    .replace(
      /^>! (.*$)/gim,
      "📌 <span class=\"py-1 font-bold text-[1.125rem] font-GangwonEduHyeonokT text-gradient1 rounded-[1rem]\">$1</span>",
    )
    .replace(
      /^>tip (.*$)/gim,
      "💡<span class=\"text-[1.125rem] font-OKCHAN text-gradient py-2 rounded-[1rem]\"> $1</span>",
    )
    .replace(
      /^>\? (.*$)/gim,
      "<span class=\"font-bold text-[1.125rem]  font-cookieRunRegular text-green-80 p-2 rounded-[1rem]\">$1</span>",
    )
    .replace(
      /^# (.*$)/gim,
      "<h1 class=\"text-[1.375rem] text-primary-80 font-DNFBitBitv2 default-outline shadow-md py-1 px-2 w-fit\" id=\"$1\" data-index=\"true\"># $1</h1>",
    )
    .replace(
      /^## (.*$)/gim,
      "<h2 class=\"text-[1.25rem] text-secondary-80 font-bold font-DNFBitBitv2 default-outline-nocolor shadow-md py-1 px-2 w-fit\" id=\"$1\" data-index=\"true\">## $1</h2>",
    )
    .replace(
      /^### (.*$)/gim,
      "<h3 class=\"text-[1.125rem] text-third-80 font-DNFBitBitv2  default-outline-nocolor shadow-md  py-1 px-2 w-fit\" id=\"$1\" data-index=\"true\">### $1</h3>",
    )
    // .replace(/\*\*(.*?)\*\*/g, "<strong class=\"font-bold\">$1</strong>")
    // .replace(/\*(.*?)\*/g, "<em class=\"italic\">$1</em>")
    .replace(
      /!\[([^\]]+)\]\(([^)]+)\)/g,
      "<div class=\"flex justify-center px-8 my-[1rem]\"> <img src=\"$2\" alt=\"$1\" class=\"max-w-full h-auto rounded-[1rem]\" /> </div>",
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      "<a href=\"$2\" class=\"text-blue-600 hover:underline\" target=\"_blank\">$1</a>",
    )
    // 일반 코드와 코드블록안에 \n을 각각 다르게 처리하기 위해서 임시로 값을 변경
    .replace(/\n/g, "<br12345>")
    .replace(/^\s*\-\s(.*$)/gim, "<li class=\"ml-1\">$1</li>")
    .replace(
      /```(js|ts|tsx|html|css|java|py|ex)\s*([\s\S]*?)\s*```/g,
      (match, lang, codeBlock) => {
        let highlightedCode = highlightSyntax(
          codeBlock.replace(/<br12345>/g, "\n"),
          lang,
        );
        highlightedCode = highlightedCode.trim();
        return `<pre class=\"text-white overflow-x-scroll p-4 rounded-[1rem] bg-gray-20 default-outline break-all\"><code class=\"text-[12px] whitespace-pre-wrap leading-3\">${highlightedCode}</code></pre>`;
      },
    )
    .replace(/<br12345>/g, "<br>");
  html = html.replace(/<\/h1>\s*<br\s*\/?>/g, "</h1>");
  return html;
};

/**
 * Highlight syntax for code blocks using highlight.js.
 * @param code - The code block to highlight.
 * @param language - The language of the code block (e.g., 'js', 'ts', 'html').
 * @returns Highlighted code as an HTML string.
 */
const highlightSyntax = (code: string, language: string): string => {
  if (hljs.getLanguage(language)) {
    return hljs.highlight(code, { language }).value;
  }
  // Fallback for unsupported languages
  return hljs.highlightAuto(code).value;
};

/**
 * Add a click event listener to handle copy functionality for code blocks.
 */

const MarkdownPreview: React.FC<{ content: string, className?: string }> = ({ content, className }) => {

  return (
    <div
      id= "preview"
      className={className || EditorPreviewStyle}
      dangerouslySetInnerHTML={{
        __html: convertMarkdownToHtml(content, true),
      }}
    />
  );
};

export default MarkdownPreview;
