interface Props {
  textColor: string;
  bgColor: string;
}

export default function DesignPreviewExamples({textColor, bgColor}: Props) {
  const style = {backgroundColor: bgColor, color: textColor};
  return (
    <div className="space-y-2">
      <div className="rounded-2xl p-4 shadow" style={style}>
        예시 문단: 이 문장은 색상 조합을 테스트하는 예시입니다.
      </div>
      <button className="px-4 py-2 shadow rounded-2xl" style={style}>
        버튼 예시
      </button>
    </div>
  );
}
