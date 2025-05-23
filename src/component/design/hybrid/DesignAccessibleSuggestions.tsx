import { getReadableTextColors } from "@utils/function/colorUtils";

interface Props {
  bgColor: string;
  onSelect: (color: string) => void;
}

export default function DesignAccessibleSuggestions({bgColor, onSelect}: Props) {
  const suggestions = getReadableTextColors(bgColor);
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">
        추천 텍스트 색상 (대비율 ≥ 4.5)
      </h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            className="h-8 w-8 rounded-full border border-gray-300"
            style={{backgroundColor: color}}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}
