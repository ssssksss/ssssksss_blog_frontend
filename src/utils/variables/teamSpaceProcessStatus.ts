export const ProcessStatus = {
  PLANNED: "계획", // 작업이 계획된 상태 (아직 시작 전)
  ON_HOLD: "보류", // 외부 요인 등으로 인해 일시 중단된 상태
  FIX_REQUIRED: "수정 필요", // 완료 후 버그 등 수정이 필요한 상태
  IN_PROGRESS: "진행", // 작업이 진행 중인 상태
  TESTING: "테스트", // QA나 테스트가 진행 중인 상태
  BUG_FIXING: "버그 수정", // 버그 수정 작업이 진행 중인 상태
  REOPENED: "재오픈", // 완료되었으나 재작업 등으로 다시 열린 상태
  REVIEW_REQUESTED: "검토 요청", // 작업 완료 후 검토 요청이 된 상태
  REVIEW_REJECTED: "검토 반려", // 검토에서 반려되어 수정이 필요한 상태
  REVIEW_APPROVED: "검토 승인", // 검토가 승인된 상태
  COMPLETED: "완료", // 작업이 완료된 상태 (내부 완료)
  RELEASE: "릴리즈 준비", // 릴리즈 준비가 완료된 상태 (배포 전 단계)
  DEPLOYED: "배포 완료", // 운영 환경에 배포 완료된 상태
  CANCELLED: "취소", // 작업이 취소된 상태
} as const;

/**
 * 상태를 그룹으로 분류
 * @param {keyof typeof ProcessStatus} status - ProcessStatus key 값
 * @returns {"대기중" | "진행중" | "검토중" | "완료" | "기타"}
 */
export function mapTeamSpaceProcessStatusToGroup(
  status: string,
): "대기중" | "진행중" | "검토중" | "완료" | "기타" {
  const waiting = [
    "PLANNED",
    "ON_HOLD",
    "FIX_REQUIRED",
  ];

  const inProgress = [
    "IN_PROGRESS",
    "TESTING",
    "BUG_FIXING",
    "REOPENED",
  ];

  const reviewing = [
    "REVIEW_REQUESTED",
    "REVIEW_REJECTED",
    "REVIEW_APPROVED",
  ];

  const completed = [
    "COMPLETED",
    "RELEASE",
    "DEPLOYED",
    "CANCELLED",
  ];

  if (waiting.includes(status)) return "대기중";
  if (inProgress.includes(status)) return "진행중";
  if (reviewing.includes(status)) return "검토중";
  if (completed.includes(status)) return "완료";
  return "기타";
}
