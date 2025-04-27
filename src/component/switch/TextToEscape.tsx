"use client";

import React, { useState } from "react";

const TextToEscape = () => {
  const [text, setText] = useState("");
  const [escapedText, setEscapedText] = useState("");

  // 이스케이프 처리를 위한 함수
  const escapeText = (input: string) => {
    return input
      .replace(/["\\]/g, "\\$&")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");
  };

  // 입력 값이 변경될 때마다 처리
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    setEscapedText(escapeText(newText));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <div style={{width: "45%", paddingRight: "10px"}}>
        <h3>원본 텍스트</h3>
        <textarea
          value={text}
          onChange={handleTextChange}
          rows={10}
          style={{width: "100%", padding: "10px", fontFamily: "monospace"}}
        />
      </div>

      <div style={{width: "45%", paddingLeft: "10px"}}>
        <h3>이스케이프 처리된 텍스트</h3>
        <textarea
          value={escapedText}
          readOnly
          rows={10}
          style={{
            width: "100%",
            padding: "10px",
            fontFamily: "monospace",
            backgroundColor: "#f4f4f4",
          }}
        />
      </div>
    </div>
  );
};

export default TextToEscape;
