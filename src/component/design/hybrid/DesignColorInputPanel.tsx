interface Props {
  textColor: string;
  bgColor: string;
  setTextColor: (color: string) => void;
  setBgColor: (color: string) => void;
}

export default function DesignColorInputPanel({ textColor, bgColor, setTextColor, setBgColor }: Props) {
  return (
    <div className="flex gap-6 items-end">
      <div>
        <label className="block mb-1 text-sm font-semibold">텍스트 색상</label>
        <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
        <p className="text-xs">{textColor}</p>
      </div>
      <div>
        <label className="block mb-1 text-sm font-semibold">배경 색상</label>
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        <p className="text-xs">{bgColor}</p>
      </div>
    </div>
  );
}