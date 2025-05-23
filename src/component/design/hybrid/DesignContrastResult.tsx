import { getContrastRatio, getWcagGrade } from "@utils/function/colorUtils";

interface Props {
  textColor: string;
  bgColor: string;
}

export default function DesignContrastResult({textColor, bgColor}: Props) {
  const ratio = getContrastRatio(textColor, bgColor);
  const grade = getWcagGrade(ratio);

  return (
    <div>
      <p className="text-sm font-medium">대비율: {ratio.toFixed(2)}:1</p>
      <span
        className={`text-white mt-1 inline-block rounded px-3 py-1 ${
          grade === "AAA"
            ? "bg-green-600"
            : grade === "AA"
              ? "bg-yellow-500"
              : grade.includes("Large")
                ? "bg-yellow-400"
                : "bg-red-500"
        }`}
      >
        WCAG 등급: {grade}
      </span>
    </div>
  );
}
