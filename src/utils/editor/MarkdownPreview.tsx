
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
export const convertMarkdownToHtml = (
  markdown: string,
  isPreview?: boolean,
): string => {
  let h2Count = 0;
  let html = markdown
    // 이미지 업로드 시 로딩을 보여주는 방법
    .replace(
      /!\[image\]\(blob:.*?\)/g,
      "<div class=\"w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mt-10\"></div>",
    )
    .replace(/```table\r?\n([\s\S]*?)\r?\n```/g, (match, tableContent) => {
      const lines = tableContent.trim().split("\n");
      if (lines.length < 2) return match;

      const headers = lines[0]
        .trim()
        .split("|")
        .filter(Boolean)
        .map(
          (h: string) =>
            `<th class="px-4 py-2 border border-black-80">${h.trim()}</th>`,
        )
        .join("");

      const rows = lines.slice(2).map((line: string) => {
        const cells = line
          .trim()
          .split("|")
          .filter(Boolean)
          .map(
            (cell) =>
              `<td class="px-4 py-2 border border-black-80">${cell.trim()}</td>`,
          )
          .join("");
        return `<tr>${cells}</tr>`;
      });

      // 이 코드 여러줄로 되어있으면 제대로 작동을 하지 않음 주의!!
      return `<table class="table-auto border-collapse border border-black-80 my-4"><thead><tr>${headers}</tr></thead><tbody>${rows.join("")}</tbody></table>`;
    })
    .replace(
      /^>! (.*$)/gim,
      "📌 <span class=\"py-1 font-bold text-sm font-GangwonEduHyeonokT text-gradient1 rounded-[1rem]\">$1</span>",
    )
    .replace(
      /^>tip (.*$)/gim,
      "💡<span class=\"font-OKCHAN text-gradient py-2 rounded-[1rem]\"> $1</span>",
    )
    .replace(
      /^>dir (.*$)/gim,
      " <div id=\"dir\" class=\"text-[1.125rem] py-2 rounded-[1rem]\"> 📁 $1</div>",
    )
    .replace(/^\s*-\s(.*)$/gim, "<li class=\"py-2 rounded-[1rem]\"> 🔸 $1</li>")
    .replace(
      /^>\? (.*$)/gim,
      "<span class=\"font-bold text-[1.125rem]  font-cookieRunRegular text-green-80 p-2 rounded-[1rem]\">$1</span>",
    )
    .replace(/^# (.*$)/gim, (_, title) => {
      const id = slugify(title);
      const isFirst = h2Count === 0;
      h2Count++;
      return `<h2 class="text-[1.5rem] ${isFirst ? "my-4" : "mt-12 mb-4"} border-y-4 border-primary-80 font-DNFBitBitv2 text-contrast-1 py-1 px-2 w-fit" data-index="true" id="${id}"> <span class="text-primary-80"> # </span> ${title}</h2>`;
    })
    .replace(
      /^## (.*$)/gim,
      (_, title) =>
        `<h3 class="text-[1.125rem] my-4 bg-secondary-80 text-secondary-contrast font-cookieRunRegular font-bold secondary-border-radius py-1 px-2 w-fit" data-index="true" id="${slugify(title)}">## ${title}</h3>`,
    )
    .replace(
      /^### (.*$)/gim,
      (_, title) =>
        `<h4 class="bg-third-80 my-4 text-third-contrast third-border-radius py-1 px-2 w-fit" data-index="true" id="${slugify(title)}">### ${title}</h4>`,
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
    .replace(
      /```(js|ts|tsx|html|css|java|py|jpql|ex)\s*([\s\S]*?)\s*```/g,
      (match, lang, codeBlock) => {
        let highlightedCode = highlightSyntax(
          codeBlock.replace(/<br12345>/g, "\n"),
          lang,
        );
        highlightedCode = highlightedCode.trim();
        return isPreview
          ? `<pre class=\"flex relative text-white overflow-x-scroll p-4 rounded-[1rem] bg-default-1 primary-border break-all\"><code class=\"text-[0.875rem] whitespace-pre-wrap leading-6\">${highlightedCode}</code>
        </pre>`
          : `<pre class=\"click-to-copy relative text-white overflow-x-scroll p-4 rounded-[1rem] bg-default-2 primary-border break-all\"><button class=\"absolute hover:scale-105 top-2 right-2\"><svg fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"  class=\"w-5 h-5 text-white\" viewBox=\"0 0 448 512\"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d=\"M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z\"/></svg></button><code class=\"text-[0.875rem] whitespace-pre-wrap leading-6\">${highlightedCode}</code>
        </pre>`;
      },
    )
    .replace(
      /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/[^"]+"[^>]*><\/iframe>/g,
      (match) => `<div class="flex justify-center my-4">${match}</div>`,
    )
    .replace(/<iframe/g, isPreview ? "<!iframe" : "<iframe")
    .replace(/<br12345>/g, "<br>");
  // .replace(/(<br>\s*){2,}/g, "<br>");
  html = html.replace(/<\/h1>\s*<br\s*\/?>/g, "</h1>");
  html = html.replace(/<\/h2>\s*<br\s*\/?>/g, "</h2>");
  html = html.replace(/<\/h3>\s*<br\s*\/?>/g, "</h3>");
  html = html.replace(/<\/h4>\s*<br\s*\/?>/g, "</h4>");
  html = html.replace(/<br\s*\/?>\s*<pre/g, "<pre");
  // html = html.replace(/<br\s*\/?>\s*<div id=\"dir\"/g, "<div id=\"dir\"");
  html = html.replace(
    /(?:<br>)?\s*(<li[^>]*>.*?<\/li>)(\s*(?:<br>)?\s*)+/gim,
    (match) => {
      const lis = match.match(/<li[^>]*>.*?<\/li>/g);
      if (lis) {
        return `<ul class="list-disc ml-1">\n${lis.join("\n")}\n</ul>`;
      }
      return match;
    },
  );
  let DOMPurify = null;
  if (typeof window !== "undefined") {
    const createDOMPurify = require("dompurify");
    DOMPurify = createDOMPurify(window); // 또는 globalThis

    DOMPurify.addHook("uponSanitizeElement", (node: any, data: any) => {
      if (data.tagName === "iframe" && node instanceof Element) {
        const src = node.getAttribute("src") || "";
        if (!src.startsWith("https://www.youtube.com/embed/")) {
          node.parentNode?.removeChild(node);
        }
      }
    });

    return DOMPurify.sanitize(html, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "frameborder",
        "scrolling",
        "src",
        "height",
        "width",
        "title",
        "referrerpolicy",
      ],
    });
  } else {
    return html;
  }
};

/**
 * Highlight syntax for code blocks using highlight.js.
 * @param code - The code block to highlight.
 * @param language - The language of the code block (e.g., 'js', 'ts', 'html').
 * @returns Highlighted code as an HTML string.
 */
const highlightSyntax = (code: string, language: string): string => {
  if (hljs.getLanguage(language)) {
    return hljs.highlight(code, {language}).value;
  }
  // Fallback for unsupported languages
  return hljs.highlightAuto(code).value;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\-ㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "") // 특수문자 제거 (한글 포함 허용)
    .replace(/\s+/g, "-"); // 공백은 하이픈으로
}

/**
 * Add a click event listener to handle copy functionality for code blocks.
 */

const MarkdownPreview: React.FC<{
  content: string;
  className?: string;
  isPreview?: boolean;
}> = ({content, className, isPreview}) => {
  return (
    <div
      id="preview"
      className={className || EditorPreviewStyle}
      dangerouslySetInnerHTML={{
        __html: convertMarkdownToHtml(content, isPreview),
      }}
    />
  );
};

export default MarkdownPreview;
