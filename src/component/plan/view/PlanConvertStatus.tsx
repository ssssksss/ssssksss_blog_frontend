interface IPlanConvertStatus {
  status: string;
}

const PlanConvertStatus = (props: IPlanConvertStatus) => {
  // status 값을 한글로 변환하는 함수
  const getStatusLabel = (status: string) => {
    const statusMap: {[key: string]: string} = {
      PLANNED: "예정",
      PROGRESS: "진행중",
      COMPLETED: "완료",
      HOLD: "보류",
      CANCELED: "취소",
      REVIEW: "검토중",
      DELAYED: "지연",
    };

    return statusMap[status] || "알 수 없음"; // 기본값은 '알 수 없음'
  };

  // 상태별 색상 설정
  const getStatusColor = (status: string) => {
    const colorMap: {[key: string]: string} = {
      PLANNED: "#f0ad4e", // 예: 주황색
      PROGRESS: "#5bc0de", // 진행중: 파란색
      COMPLETED: "#5cb85c", // 완료: 초록색
      HOLD: "#d9534f", // 보류: 빨간색
      CANCELED: "#d9534f", // 취소: 빨간색
      REVIEW: "#f0ad4e", // 검토중: 주황색
      DELAYED: "#f39c12", // 지연: 노란색
    };

    return colorMap[status] || "#777"; // 기본값은 회색
  };

  const statusLabel = getStatusLabel(props.status);
  const statusColor = getStatusColor(props.status);

  return <span style={{color: statusColor}}>{statusLabel}</span>;
};

export default PlanConvertStatus;
