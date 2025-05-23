"use client";

import { getRandomAccessiblePair } from "@utils/function/colorUtils";
import { useState } from "react";
import DesignAccessibleSuggestions from "./DesignAccessibleSuggestions";
import DesignColorInputPanel from "./DesignColorInputPanel";
import DesignContrastResult from "./DesignContrastResult";
import DesignPreviewExamples from "./DesignPreviewExamples";

interface IDesignColorHome {}
const DesignColorHome = (props: IDesignColorHome) => {
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const handleRandomColors = () => {
    const {text, bg} = getRandomAccessiblePair();
    setTextColor(text);
    setBgColor(bg);
  };

  return (
    <main className="min-h-screen space-y-8 bg-gray-100 p-10">
      <div>
        <h1 className="text-2xl font-bold pb-2">🎨 WCAG 색상 대비 도우미</h1>

        <button
          onClick={() => handleRandomColors()}
          className="rounded bg-[#010706] px-4 py-2 font-semibold text-[#e7bc93] shadow"
        >
          🎲 랜덤 색상 생성
        </button>
      </div>

      <DesignColorInputPanel
        textColor={textColor}
        bgColor={bgColor}
        setTextColor={setTextColor}
        setBgColor={setBgColor}
      />

      <DesignContrastResult textColor={textColor} bgColor={bgColor} />

      <DesignPreviewExamples textColor={textColor} bgColor={bgColor} />

      <DesignAccessibleSuggestions bgColor={bgColor} onSelect={setTextColor} />

      {/* <DesignColorBlindnessSim textColor={textColor} bgColor={bgColor} /> */}
    </main>
  );
};
export default DesignColorHome;
