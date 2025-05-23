import { useState } from "react";

interface Props {
  textColor: string;
  bgColor: string;
}

const filters = {
  None: "",
  Protanopia: "grayscale(1) brightness(0.9)", // placeholder
  Deuteranopia: "grayscale(1) hue-rotate(45deg)", // placeholder
  Tritanopia: "grayscale(1) sepia(0.6)", // placeholder
};

export default function DesignColorBlindnessSim({textColor, bgColor}: Props) {
  const [filter, setFilter] = useState("None");

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">색맹 모드</label>
      <select
        className="rounded border px-2 py-1 text-sm"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        {Object.keys(filters).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      <div
        className="mt-3 rounded p-4"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          filter: filters[filter as keyof typeof filters],
        }}
      >
        색맹 시뮬레이션 텍스트
      </div>
    </div>
  );
}
