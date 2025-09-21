export type TeamSpaceRoleType =
  | "BE"
  | "DE"
  | "FE"
  | "HR"
  | "MK"
  | "PM"
  | "QA"
  | "";

export function teamSpaceGetActionList(
  role: TeamSpaceRoleType,
): Record<string, string> {
  switch (role) {
    case "BE":
      return BeActionList;
    case "DE":
      return DeActionList;
    case "FE":
      return FeActionList;
    case "HR":
      return HrActionList;
    case "MK":
      return MkActionList;
    case "PM":
      return PmActionList;
    case "QA":
      return QaActionList;
  }

  return {}; // TS 안전하게 빈 객체 반환
}


export const BeActionList = {
  ENTITY_DEFINITION: "엔티티 정의",
  DTO_DEFINITION: "DTO 정의",
  ENUM_DEFINITION: "ENUM 정의",
  REPOSITORY_CREATION: "Repository 생성",
  SERVICE_LOGIC: "서비스 로직 구현",
  VALIDATION_LOGIC: "유효성 검증",
  CONTROLLER_API: "API 컨트롤러 구현",
  EXCEPTION_HANDLING: "예외 처리",
  SECURITY_CONFIG: "Spring Security 설정",
  AUTH_CHECK: "인증/인가 처리",
  TEST_CODE: "테스트 코드 작성",
  DOCUMENTATION: "API 문서화",
  PERFORMANCE_OPTIMIZATION: "성능 최적화",
  LOGGING_MONITORING: "로깅 및 모니터링",
  FEATURE_FLAG: "기능 플래그 처리",
  MESSAGE_QUEUE: "메시지 큐 연동",
  BATCH_JOB: "배치 작업 처리",
  FILE_UPLOAD: "파일 업로드 및 S3 처리",
  CI_CD_CONFIG: "CI/CD 설정",
  CODE_REVIEW: "코드리뷰 대응",
  API_VERSIONING: "API 버전 관리",
  DATABASE_MIGRATION: "데이터베이스 마이그레이션",
  CACHE_MANAGEMENT: "캐시 관리",
  EVENT_DRIVEN_DESIGN: "이벤트 기반 설계",
  CONTAINERIZATION: "Docker 컨테이너화",
  MONOLITH_TO_MICROSERVICES: "모놀리식 → 마이크로서비스 전환",
  SYSTEM_DESIGN: "시스템 설계 및 아키텍처",
  SECURITY_AUDIT: "보안 감사",
  DEPLOYMENT: "배포",
  ROLLBACK_PLAN: "롤백 계획 수립",
  OTHER: "기타",
};

export const DeActionList = {
  REQUIREMENT_ANALYSIS: "요구사항 분석",
  WIREFRAME: "와이어프레임 제작",
  UI_DESIGN: "UI 디자인",
  UX_IMPROVEMENT: "UX 개선",
  STYLE_GUIDE: "스타일 가이드 정리",
  COMPONENT_DESIGN: "컴포넌트 디자인",
  ICONOGRAPHY: "아이콘 제작",
  TYPOGRAPHY: "타이포그래피 설정",
  DESIGN_SYSTEM: "디자인 시스템 구축",
  RESPONSIVE_DESIGN: "반응형 디자인",
  DARK_MODE_DESIGN: "다크모드 디자인",
  ACCESSIBILITY_CHECK: "접근성 확인",
  PROTOTYPE: "프로토타입 제작",
  DEVELOPER_HANDOFF: "개발자 전달 준비",
  DESIGN_REVIEW: "디자인 리뷰 대응",
  FEEDBACK_APPLY: "피드백 반영",
  IMAGE_OPTIMIZATION: "이미지 최적화",
  FILE_ORGANIZATION: "파일 정리",
  TESTING_SUPPORT: "테스트 지원",
  DOCUMENTATION: "디자인 문서화",
  COLOR_PALETTE_SELECTION: "색상 팔레트 선정",
  ANIMATION_DESIGN: "애니메이션 디자인",
  USER_RESEARCH: "사용자 조사 및 분석",
  COMPETITOR_ANALYSIS: "경쟁사 분석",
  BRANDING: "브랜드 아이덴티티 디자인",
  USABILITY_TESTING: "사용성 테스트 진행",
  CONTENT_LAYOUT: "콘텐츠 레이아웃 설계",
  INTERACTION_DESIGN: "인터랙션 디자인",
  DESIGN_TREND_RESEARCH: "최신 디자인 트렌드 조사",
  CROSS_BROWSER_TESTING: "크로스 브라우저 테스트",
  SEO_FRIENDLY_DESIGN: "SEO 친화적 디자인",
  PRINT_MATERIAL_PREPARATION: "인쇄물 디자인 준비",
  CLIENT_PRESENTATION: "클라이언트 프레젠테이션 준비",
  OTHER: "기타",
};

export const FeActionList = {
  TYPE_DEFINITION: "1. 타입정의(req, res)",
  COMPONENT_STRUCTURE: "2. 컴포넌트 구조 설계",
  MOCK_PUBLISHING: "3. Mock + 퍼블리싱 작업",
  STATE_MANAGEMENT: "4. 상태 관리 도입(useState, zustand 등)",
  LOGIC_EVENT_HANDLER: "5. 함수 및 이벤트 핸들러 정의",
  MOCK_API: "6. Mock API 작성",
  API_INTEGRATION: "7. 실제 API 연결",
  FIELD_ERROR: "8. 필드 에러 처리",
  API_ERROR: "9. API 에러 처리",
  INITIAL_LOADING: "10. 초기 로딩 처리",
  API_LOADING: "11. API 로딩 처리",
  DARK_MODE: "12. 다크 모드",
  FIELD_VALIDATION: "13. 필드 유효성",
  FORM_VALIDATION: "14. 폼 유효성",
  PRE_SUBMIT_VALIDATION: "15. 제출 여부 가능 유효성",
  RESPONSIVE: "16. 반응형",
  ACCESSIBILITY: "17. 접근성",
  TEST_CODE: "18. 테스트 코드",
  PERFORMANCE: "19. 퍼포먼스 향상",
  BROWSER_COMPATIBILITY: "20. 브라우저 호환성",
  DEVICE_COMPATIBILITY: "21. 기기 호환",
  SECURITY_AUTH: "22. 보안, 권한 처리 점검",
  I18N: "23. 다국어 처리",
  DOCUMENTATION: "24. 문서화",
  CODE_REVIEW: "25. 코드 리뷰",
  SEO: "26. SEO",
  ANALYTICS: "27. 사용자 분석 도구",
};

export const HrActionList = {
  RECRUITMENT_PLANNING: "채용 계획 수립 및 채용 공고 작성",
  CANDIDATE_SCREENING: "지원자 서류 심사",
  INTERVIEW_SCHEDULING: "면접 일정 조율",
  INTERVIEW_CONDUCT: "면접 진행 및 평가",
  BACKGROUND_CHECKS: "배경 조사 및 신원 확인",
  ONBOARDING_PROCESS: "신규 입사자 온보딩 진행",
  TRAINING_DEVELOPMENT: "교육 프로그램 기획 및 진행",
  PERFORMANCE_EVALUATION: "직원 평가 및 피드백 제공",
  EMPLOYEE_RELATIONS_MANAGEMENT: "직원 상담, 갈등 조정",
  PAYROLL_MANAGEMENT: "급여 계산 및 지급 관리",
  BENEFITS_ADMINISTRATION: "복리후생 관리",
  POLICY_DEVELOPMENT: "HR 정책 수립 및 업데이트",
  COMPLIANCE_MANAGEMENT: "법규 준수 및 내부 감사",
  EXIT_INTERVIEW: "퇴사 면담 진행",
  EMPLOYEE_RECORDS_MAINTENANCE: "인사 기록 관리",
  HR_REPORTING: "인사 관련 통계 및 보고서 작성",
  WORKPLACE_SAFETY_MANAGEMENT: "안전 교육 및 사고 예방 관리",
  DIVERSITY_AND_INCLUSION: "다양성 및 포용성 프로그램 운영",
  EMPLOYEE_ENGAGEMENT: "직원 만족도 조사 및 개선 활동",
  HR_TECHNOLOGY_MANAGEMENT: "HR 시스템 및 도구 관리",
  SUCCESSION_PLANNING: "후계자 계획 수립",
  TALENT_MANAGEMENT: "인재 육성 및 관리",
  COMPENSATION_PLANNING: "보상 계획 및 실행",
  LABOR_RELATIONS_MANAGEMENT: "노사 관계 관리",
  WORKFORCE_PLANNING: "인력 계획 수립",
  EMPLOYEE_WELLNESS_PROGRAMS: "직원 복지 및 건강 증진 프로그램",
  HR_COMMUNICATIONS: "HR 관련 커뮤니케이션 관리",
  EMPLOYEE_SURVEYS: "직원 설문 조사 기획 및 분석",
  TALENT_ACQUISITION_STRATEGY: "인재 확보 전략 수립",
  INTERNATIONAL_HR_MANAGEMENT: "해외 인사 관리",
  OTHER: "기타 HR 업무",
};

export const MkActionList = {
  MARKET_RESEARCH: "시장 조사",
  CAMPAIGN_PLANNING: "캠페인 기획",
  CONTENT_CREATION: "콘텐츠 제작",
  SOCIAL_MEDIA_MANAGEMENT: "SNS 관리",
  SEO_OPTIMIZATION: "SEO 최적화",
  LEAD_GENERATION: "리드 생성",
  ANALYTICS_REPORTING: "분석 및 보고",
  EMAIL_MARKETING: "이메일 마케팅",
  PPC_AD_CAMPAIGNS: "페이드 광고 캠페인 관리",
  CONTENT_MARKETING_STRATEGY: "콘텐츠 마케팅 전략 수립",
  BRAND_MANAGEMENT: "브랜드 관리",
  CUSTOMER_FEEDBACK: "고객 피드백 수집 및 분석",
  EVENT_PLANNING: "이벤트 기획 및 운영",
  PARTNERSHIP_MANAGEMENT: "제휴 및 협력사 관리",
  VIDEO_PRODUCTION: "영상 콘텐츠 제작",
  BLOG_MANAGEMENT: "블로그 운영 및 콘텐츠 작성",
  INFLUENCER_MARKETING: "인플루언서 마케팅",
  MARKET_SEGMENTATION: "시장 세분화",
  CUSTOMER_JOURNEY_MAPPING: "고객 여정 지도 작성",
  COMPETITIVE_ANALYSIS: "경쟁사 분석",
  AD_COPYWRITING: "광고 카피 작성",
  OTHER: "기타",
};

export const PmActionList = {
  SPRINT_PLANNING: "스프린트 계획 수립",
  RESOURCE_ALLOCATION: "자원 배분",
  RISK_MANAGEMENT: "리스크 관리",
  STAKEHOLDER_COMMUNICATION: "이해관계자 소통",
  PROGRESS_TRACKING: "진행 상황 추적",
  ISSUE_RESOLUTION: "문제 해결",
  REPORT_GENERATION: "보고서 작성",
  BUDGET_MANAGEMENT: "예산 관리",
  SCOPE_DEFINITION: "프로젝트 범위 정의",
  QUALITY_ASSURANCE: "품질 보증",
  TEAM_MOTIVATION: "팀 동기 부여",
  MEETING_FACILITATION: "회의 진행 및 조율",
  DOCUMENTATION: "프로젝트 문서화",
  CONTRACT_MANAGEMENT: "계약 관리",
  CHANGE_MANAGEMENT: "변경 관리",
  STAKEHOLDER_REPORTING: "이해관계자 보고",
  ROLLOUT_PLANNING: "배포 계획 수립",
  POST_PROJECT_REVIEW: "프로젝트 종료 후 리뷰",
  TRAINING_COORDINATION: "교육 및 코칭 조정",
  RISK_ANALYSIS: "위험 분석",
  COMMUNICATION_PLAN: "커뮤니케이션 계획",
  PROCUREMENT_MANAGEMENT: "조달 관리",
  PERFORMANCE_MONITORING: "성과 모니터링",
  ESCALATION_MANAGEMENT: "문제 에스컬레이션 처리",
  OTHER: "기타",
};

export const QaActionList = {
  TEST_PLAN_CREATION: "테스트 계획 수립",
  TEST_CASE_DESIGN: "테스트 케이스 설계",
  MANUAL_TESTING: "수동 테스트 수행",
  AUTOMATION_TESTING: "자동화 테스트 스크립트 작성 및 실행",
  BUG_REPORTING: "버그 리포트 작성 및 관리",
  REGRESSION_TESTING: "회귀 테스트 수행",
  PERFORMANCE_TESTING: "성능 테스트",
  SECURITY_TESTING: "보안 테스트",
  TEST_ENV_SETUP: "테스트 환경 구성 및 관리",
  TEST_RESULT_ANALYSIS: "테스트 결과 분석 및 리포트 작성",
  TEST_DOCUMENTATION: "테스트 문서화",
  CONTINUOUS_INTEGRATION_TESTING: "CI 환경에서 테스트 자동화",
  USABILITY_TESTING: "사용성 테스트",
  COMPATIBILITY_TESTING: "호환성 테스트",
  LOAD_TESTING: "부하 테스트",
  ACCESSIBILITY_TESTING: "접근성 테스트",
  SECURITY_AUDIT_PREPARATION: "보안 감사 준비",
  DEFECT_TREND_ANALYSIS: "결함 경향 분석",
  TOOL_MAINTENANCE: "테스트 도구 관리 및 유지보수",
  TEST_DATA_MANAGEMENT: "테스트 데이터 관리",
  TEST_AUTOMATION_FRAMEWORK_DEVELOPMENT: "자동화 프레임워크 개발",
  TRAINING_AND_MENTORING: "QA 교육 및 멘토링",
  OTHER: "기타",
};
