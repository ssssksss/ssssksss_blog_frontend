
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
  // Step 1: 코드블록 임시 저장
  const codeBlocks: {lang: string; code: string}[] = [];
  markdown = markdown.replace(
    /```(js|ts|tsx|html|css|java|py|jpql|ex)?\s*([\s\S]*?)\s*```/g,
    (_, lang = "", code) => {
      codeBlocks.push({lang, code});
      return `@@CODEBLOCK_${codeBlocks.length - 1}@@`;
    },
  );

  let h2Count = 0;
  let html = markdown
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
    .replace(
      /!\[([^\]]+)\]\(([^)]+)\)/g,
      "<div class=\"flex justify-center px-8 my-[1rem]\"> <img src=\"$2\" alt=\"$1\" class=\"max-w-full h-auto rounded-[1rem]\" /> </div>",
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      "<a href=\"$2\" class=\"text-blue-600 hover:underline\" target=\"_blank\">$1</a>",
    )
    .replace(/\n/g, "<br12345>")
    .replace(
      /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/[^"]+"[^>]*><\/iframe>/g,
      (match) => `<div class="flex justify-center my-4">${match}</div>`,
    )
    .replace(/<iframe/g, isPreview ? "<!iframe" : "<iframe")
    .replace(/<br12345>/g, "<br>");

  html = html
    .replace(/<\/h1>\s*<br\s*\/?>/g, "</h1>")
    .replace(/<\/h2>\s*<br\s*\/?>/g, "</h2>")
    .replace(/<\/h3>\s*<br\s*\/?>/g, "</h3>")
    .replace(/<\/h4>\s*<br\s*\/?>/g, "</h4>")
    .replace(/<br\s*\/?>\s*<pre/g, "<pre")
    .replace(
      /(?:<br>)?\s*(<li[^>]*>.*?<\/li>)(\s*(?:<br>)?\s*)+/gim,
      (match) => {
        const lis = match.match(/<li[^>]*>.*?<\/li>/g);
        if (lis) {
          return `<ul class="list-disc ml-1">\n${lis.join("\n")}\n</ul>`;
        }
        return match;
      },
    );

  // Step 3: 코드블록 복원
  html = html.replace(/@@CODEBLOCK_(\d+)@@/g, (_, index) => {
    const {lang, code} = codeBlocks[Number(index)];
    const highlighted = highlightSyntax(code, lang || "plaintext").trim();
    return isPreview
      ? `<pre class="flex relative text-black-100 overflow-x-scroll p-4 rounded-[1rem] bg-gray-10 primary-border break-all"><code class="text-[0.875rem] whitespace-pre-wrap leading-6">${highlighted}</code></pre>`
      : `<pre class="click-to-copy  text-black-100 relative overflow-x-scroll p-4 rounded-[1rem] bg-gray-10 primary-border break-all"><button class="absolute hover:scale-105 top-2 right-2">...</button><code class="text-[0.875rem] whitespace-pre-wrap leading-6">${highlighted}</code></pre>`;
  });

  let DOMPurify = null;
  if (typeof window !== "undefined") {
    const createDOMPurify = require("dompurify");
    DOMPurify = createDOMPurify(window);
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
