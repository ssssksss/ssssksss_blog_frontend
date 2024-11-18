/* eslint-disable quotes */

export const convertMarkdownToHtml = (
  markdown: string,
  isPreview?: boolean,
) => {
  let html = markdown
    // .replace(
    //   /^> (.*$)/gim,
    //   '<span class="font-bold italic text-[1.25rem] font-yanoljaYacheBold p-2 rounded-[1rem]">$1</span>',
    // )
    .replace(
      /^>! (.*$)/gim,
      '📌 <span class="py-1 font-bold text-[1.125rem] font-GangwonEduHyeonokT text-gradient1 rounded-[1rem]">$1</span>',
    )
    .replace(
      /^>tip (.*$)/gim,
      '💡<span class="text-[1.125rem] font-HakgyoansimPuzzleTTF-Black text-gradient p-2 rounded-[1rem]"> $1</span>',
    )
    .replace(
      /^>\? (.*$)/gim,
      '<span class="font-bold text-[1.25rem]  font-cookieRunRegular text-green-80 p-2 rounded-[1rem]">$1</span>',
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-[1.375rem] text-primary-80 font-DNFBitBitv2 default-outline shadow-md pt-2 pb-1 px-2 w-fit" id="$1" data-index="true"># $1</h1>',
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-[1.25rem] text-secondary-80  font-bold font-DNFBitBitv2 default-outline-nocolor shadow-md  py-1 px-2 w-fit" id="$1" data-index="true">## $1</h2>',
    )
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-[1.125rem] text-third-80 font-DNFBitBitv2  default-outline-nocolor shadow-md  py-1 px-2 w-fit" id="$1" data-index="true">### $1</h3>',
    )
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(
      /!\[([^\]]+)\]\(([^)]+)\)/g,
      '<div class="flex justify-center px-8 my-[1rem]"> <img src="$2" alt="$1" class="max-w-full h-auto rounded-[1rem]" /> </div>',
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>',
    )
    .replace(/^\s*\-\s(.*$)/gim, '<li class="ml-1">$1</li>')
    // .replace(/`([^`]+)`/g, '<code class="px-1 rounded bg-red-20">$1</code>')
    .replace(
      /```ex\s*([\s\S]*?)\s*```/g,
      '<div class=" bg-gray-20 overflow-x-scroll px-2 py-6 scrollbar-hide rounded-[1rem] break-all">$1</div>',
    )
    .replace(/```java\s*([\s\S]*?)\s*```/g, (match, codeBlock) => {
      const temp = highlightSyntax(codeBlock.trim(), isPreview); // trim()을 사용해 앞뒤 공백과 개행을 제거
      return `<pre class="bg-gray-40 default-outline overflow-x-scroll p-1 scrollbar-hide rounded break-all"><code class="whitespace-pre-wrap">${temp}</code></pre>`;
    })
    .replace(/```py\s*([\s\S]*?)\s*```/g, (match, codeBlock) => {
      const temp = highlightSyntax(codeBlock.trim(), isPreview); // trim()을 사용해 앞뒤 공백과 개행을 제거
      return `<pre class="bg-gray-40 default-outline overflow-x-scroll p-1 scrollbar-hide rounded break-all"><code class="whitespace-pre-wrap">${temp}</code></pre>`;
    })
    .replace(/```html\s*([\s\S]*?)\s*```/g, (match, codeBlock) => {
      const temp = highlightSyntax(codeBlock.trim(), isPreview); // trim()을 사용해 앞뒤 공백과 개행을 제거
      return `<pre class="bg-black-60 text-white-80 font-D2Coding overflow-x-scroll pt-8 pb-4 px-1 scrollbar-hide rounded-[1rem] break-all"><code class="whitespace-pre-wrap">${temp}</code></pre>`;
    })
    .replace(/```css\s*([\s\S]*?)\s*```/g, (match, codeBlock) => {
      const temp = highlightSyntax(codeBlock.trim(), isPreview); // trim()을 사용해 앞뒤 공백과 개행을 제거
      return `<pre class="bg-black-60 text-white-80 font-D2Coding overflow-x-scroll pt-8 pb-4 px-1 scrollbar-hide rounded-[1rem] break-all"><code class="whitespace-pre-wrap">${temp}</code></pre>`;
    })
    .replace(/```js\s*([\s\S]*?)\s*```/g, (match, codeBlock) => {
      const temp = highlightSyntax(codeBlock.trim(), isPreview); // trim()을 사용해 앞뒤 공백과 개행을 제거
      return `<pre class="bg-black-60 text-white-80 font-D2Coding overflow-x-scroll pt-8 pb-4 px-1 scrollbar-hide rounded-[1rem] break-all"><code class="whitespace-pre-wrap">${temp}</code></pre>`;
    })
    .replace(/```ts\s*([\s\S]*?)\s*```/g, (match, codeBlock) => {
      const temp = highlightSyntax(codeBlock.trim(), isPreview); // trim()을 사용해 앞뒤 공백과 개행을 제거
      return `<pre class="bg-white-80 default-outline overflow-x-scroll p-1 scrollbar-hide rounded break-all"><code class="whitespace-pre-wrap">${temp}</code></pre>`;
    });

  html = html.replace(/\n/g, "<br>");
  return html;
};

const highlightSyntax = (code: string, isPreview?: boolean) => {
  // Define some basic syntax rules
  const keywords = [
    "function",
    "const",
    "let",
    "var",
    "if",
    "else",
    "for",
    "while",
    "return",
  ];
  const specialChars1 = ["{", "}"];
  const specialChars2 = ["(", ")"];
  const specialChars3 = ["[", "]"];
  // const specialChars4 = ["<", ">"];

  // Helper function to escape HTML special characters
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Split the code into lines
  const lines = code.split("\n");

  // Process each line
  const highlightedLines = lines.map((line, lineIndex) => {
    // Split each line into tokens
    const tokens = line.split(/(\s+)/).filter(Boolean);

    // Process each token
    const highlightedTokens = tokens.map((token) => {
      // if (keywords.includes(token)) {
      //   return `<span style="color: blue;">${escapeHtml(token)}</span>`;
      // } else if (specialChars1.includes(token)) {
      //   return `<span style="color: black; background: #8000800f;">${escapeHtml(token)}</span>`;
      // } else if (specialChars2.includes(token)) {
      //   return `<span style="color: black; background: #0000FF0f;">${escapeHtml(token)}</span>`;
      // } else if (specialChars3.includes(token)) {
      //   return `<span style="color: black; background: #8000800f;">${escapeHtml(token)}</span>`;
      // } else if (specialChars4.includes(token)) {
      //   return `<span style="color: black; background: #8000800f;">${escapeHtml(token)}</span>`;
      // } else if (token.startsWith('"') || token.startsWith("'")) {
      //   return `<span style="color: green;">${escapeHtml(token)}</span>`;
      // } else if (!isNaN(+token)) {
      //   return `<span style="color: blue;">${escapeHtml(token)}</span>`;
      // }
      return escapeHtml(token);
    });

    // Join the tokens back into a line
    // return `<div class="select-none inline-block w-[1.5rem] text-center ">${(
    //   lineIndex + 1
    // )
    //   .toString()
    //   .padStart(2, "0")}</div> ${highlightedTokens.join("")}`;
    return `${highlightedTokens.join("")}`;
  });

  const str = isPreview ? "\n" : "";
  // Join the lines and wrap in a pre tag
  return `<pre class="rounded-[0.3125rem] leading-5">${highlightedLines.join(
    str,
  )}</pre>`;
};
