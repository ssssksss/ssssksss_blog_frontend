import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeButton1 from "@component/common/button/ThemeButton1";
import CustomEditor from "@component/common/editor/CustomEditor";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useTeamSpaceStore from "@store/teamSpaceStore";
import "@styles/reactDataRange.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamSpaceGetActionList, TeamSpaceRoleType } from "@utils/variables/teamSpaceActions";
import { addMonths, eachDayOfInterval, endOfMonth, format, getDay, isSameDay, isWithinInterval, startOfMonth, subMonths } from "date-fns";
import { ko } from "date-fns/locale";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 기본 테마

interface ITeamSpaceTaskListCreateModal extends IModalComponent {

}
const TeamSpaceTaskListCreateModal = (props: ITeamSpaceTaskListCreateModal) =>
{
  const teamSpaceStore = useTeamSpaceStore();
  const queryClient = useQueryClient();
  const [createTaskTitle, setCreateTaskTitle] = useState("");
  const [createTaskDescription, setCreateTaskDescription] = useState("");
  const [refreshValue, setRefreshValue] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // 쉬는 날 상태 (Set으로 관리 → 중복 방지)
  const [breakDays, setBreakDays] = useState<Set<string>>(new Set());
  const cachedProject = queryClient.getQueryData<{data: ITeamSpaceProject}>([
    "project",
    teamSpaceStore.activeProject.id,
  ]);
  const project = cachedProject?.data;
  const [activeAssignee, setActiveAssignee] = useState<{
    id: number;
    jobRoles: string[];
  }>({
    id: 0,
    jobRoles: [],
  });
  const [activeJobRole, setActiveJobRole] = useState<TeamSpaceRoleType>("");
  const [activeActions, setActiveActions] = useState<
    {key: string; value: string}[]
  >([]);
  const [calendarDate, setCalendarDate] = useState<
    [
      {
        startDate: Date;
        endDate: Date;
        key: string;
      },
    ]
  >([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleResize = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 16);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const changeShowDate = ({year, month}: {year: number; month: number}) => {
    setYear(year);
    setMonth(month);
  };

  const createTeamSpaceTaskListHandler = async () => {
    const {startDate, endDate} = calendarDate[0];

    // 기간 안에 있는 날짜만 필터링, 추가로 날짜 정리
    const filteredBreakDays = Array.from(breakDays)
      .filter((dayStr) => {
        const day = new Date(dayStr);
        const start = new Date(startDate);
        const end = new Date(endDate);
        day.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        return day >= start && day <= end;
      })
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((d) => new Date(d).toISOString());

    // 순서대로 정렬해서 전송
    const actionList = Object.keys(
      teamSpaceGetActionList(activeJobRole) || {},
    ).filter((key) => activeActions.some((item) => item.key === key));

    const response = await fetch("/api/team-space/task/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: createTaskTitle,
        description: createTaskDescription,
        scheduledStartAt: new Date(calendarDate[0].startDate).toISOString(),
        scheduledEndAt: new Date(calendarDate[0].endDate).toISOString(),
        projectId: teamSpaceStore.activeProject.id,
        serviceId: teamSpaceStore.activeService.id,
        operationId: teamSpaceStore.activeOperation.id,
        assigneeId: activeAssignee.id,
        jobRole: activeJobRole,
        breakDays: filteredBreakDays,
        actionList: actionList,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json(); // 응답 데이터를 JSON으로 파싱
  };

  const mutation = useMutation({
    mutationFn: createTeamSpaceTaskListHandler,
    onSuccess: (data: {
      data: ITeamSpaceTask[];
      msg: string;
      statusCode: number;
    }) => {
      queryClient.setQueryData<{data: ITeamSpaceProject}>(
        ["project", teamSpaceStore.activeProject.id],
        (old) => {
          if (!old) return old;

          const newData: ITeamSpaceProject = {
            ...old.data,
            teamSpaceServices: old.data.teamSpaceServices.map((service) => ({
              ...service,
              teamSpaceOperations: service.teamSpaceOperations.map((op) => ({
                ...op,
                teamSpaceTasks: [...(op.teamSpaceTasks || []), ...data.data],
              })),
            })),
          };

          return {
            ...old,
            data: newData, // 새로운 객체
          };
        },
      );
      props.closeModal!();
    },
    onError: (error: Error) => {},
  });

  const handleSubmit = () => {
    if (createTaskTitle == "") return;
    if (createTaskDescription == "") return;
    if (activeAssignee.id == 0) return;
    if (activeJobRole == "") return;
    mutation.mutate();
  };

  const changeDateRangePicker = (rangesByKey: RangeKeyDict) => {
    const selection = rangesByKey.selection;
    if (
      selection.startDate &&
      selection.endDate &&
      isSameDay(selection.startDate, selection.endDate)
    ) {
      setMonth(selection.startDate.getMonth() + 1);
    }
    if (
      selection.startDate?.getFullYear() != selection.endDate?.getFullYear() ||
      selection.startDate?.getMonth() != selection.endDate?.getMonth()
    ) {
      setMonth(selection.startDate!.getMonth() + 1);
      setYear(selection.startDate!.getFullYear());
    }
    setCalendarDate([
      {
        startDate: selection.startDate as Date,
        endDate: selection.endDate as Date,
        key: "selection",
      },
    ]);
  };

  const handleContentChange = (value: string) => {
    setCreateTaskDescription(value);
  };

  const addS3ImageUrl = (keyPath: string) => {};
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const toggleBreakDay = (day: Date) => {
    if (isWithinInterval(day, {start: calendarDate[0].startDate, end: calendarDate[0].endDate})) {
      const dayStr = format(day, "yyyy-MM-dd");
      setBreakDays((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(dayStr)) {
          newSet.delete(dayStr);
        } else {
          newSet.add(dayStr);
        }
        return newSet;
      });
    }
  };

  const sendPrompt = async () => {
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          model: "llama3",
          prompt: createTaskDescription,
          stream: false, // 스트리밍 필요시 true로
        }),
      });

      const data = await res.json();
      console.log("TeamSpaceTaskListCreateModal.tsx 파일 : ", data.response);
      setRefreshValue(data.response);
    } catch (err) {
      console.error("Ollama 연결 실패", err);
      console.log(
        "TeamSpaceTaskListCreateModal.tsx 파일 : ",
        "Ollama를 실행 중인지 확인하세요.",
      );
    }
  };

  return (
    <ModalTemplate style={{width: "100vw"}}>
      {props.closeButtonComponent}
      <div className="flex min-h-[10rem] w-full flex-col gap-4 overflow-y-scroll rounded-lg border border-contrast-1 p-2">
        <article className="flex flex-col gap-1">
          <h3>작업 제목 </h3>
          <ThemeInput1
            onChange={(e) => setCreateTaskTitle(e.target.value)}
            type="text"
            maxLength={30}
            placeholder="작업 제목을 입력해주세요."
            className="w-full rounded-lg"
          />
        </article>
        <article className="flex h-[40rem] flex-shrink-0 flex-col gap-1">
          <div className="flex gap-2">
            <h3>작업 설명</h3>
            {
              activeJobRole &&
              <ThemeButton1
                className="px-2"
                onClick={() => {
                  setRefreshValue("");
                  sendPrompt();
                }}
              >
              ollama 보내기
              </ThemeButton1>
            }
          </div>
          <CustomEditor
            defaultValue={""}
            handleContentChange={handleContentChange}
            addS3ImageUrl={addS3ImageUrl}
            isPreview={true}
            s3DirectoryPath="team-space/description"
            refreshValue={refreshValue}
          />
        </article>
        <article className="grid grid-cols-[120px_auto] items-start gap-1">
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            프로젝트
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {project?.title}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            서비스
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {teamSpaceStore.activeService.title}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            업무
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {teamSpaceStore.activeOperation.title}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            담당자
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {project?.teamSpaceTeam?.teamSpaceMembers.map((i) => (
              <ThemeActiveButton1
                isActive={i.id == activeAssignee.id}
                key={i.id}
                className="p-1"
                onClick={() => {
                  setActiveAssignee({
                    id: i.id,
                    jobRoles: [],
                  });
                }}
              >
                {i.nickname}
              </ThemeActiveButton1>
            ))}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            역할
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {project?.teamSpaceTeam?.teamSpaceMembers
              .find((i) => i.id == activeAssignee.id)
              ?.jobRoles.map((j) => (
                <ThemeActiveButton1
                  isActive={j == activeJobRole}
                  key={j}
                  className="p-1"
                  onClick={() => {
                    setActiveJobRole(j);
                    setActiveActions([]);
                    setRefreshValue(defaultDescription[j]);
                  }}
                >
                  {j}
                </ThemeActiveButton1>
              ))}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            행동
          </div>
          <div className="mr-1 flex min-h-[44px] w-full flex-wrap items-center gap-1 rounded-lg border border-contrast-1 p-1">
            {Object.entries(teamSpaceGetActionList(activeJobRole) || {}).map(
              ([key, value]) => (
                <ThemeActiveButton1
                  key={key}
                  isActive={activeActions.some((item) => item.key === key)}
                  className="p-1"
                  onClick={() => {
                    setActiveActions((prev) => {
                      const exists = prev.find((item) => item.key === key);
                      if (exists) {
                        return prev.filter((item) => item.key !== key);
                      } else {
                        return [
                          ...prev,
                          {key: key as string, value: value as string},
                        ];
                      }
                    });
                  }}
                >
                  {value as string}
                </ThemeActiveButton1>
              ),
            )}
          </div>
        </article>
        <article
          className={
            "bg-default-1} mt-[1rem] flex flex-col items-center gap-2 rounded-sm border border-primary-60 pt-[2rem]"
          }
        >
          <h3> 작업 제작 기간 </h3>
          <div className="relative">
            <DateRangePicker
              onChange={changeDateRangePicker}
              // maxDate={add(new Date(), { years: 1 })}
              showDateDisplay={false}
              onPreviewChange={undefined}
              preview={undefined}
              months={2}
              ranges={calendarDate}
              locale={ko}
              direction={windowWidth > 880 ? "horizontal" : "vertical"}
              rangeColors={["#00B488", "#F2FAF7"]}
              // color={"#ff0000"}
              onShownDateChange={(e) => {
                changeShowDate({
                  year: e.getFullYear(),
                  month: e.getMonth() + 1,
                });
              }}
              className="[&_.rdrDayNumber_span]:text-contrast-1 [&_.rdrDayPassive_span]:!text-gray-40 [&_.rdrMonthAndYearWrapper]:bg-default-1 [&_.rdrMonth]:bg-default-1"
            />
            <div
              className={
                "absolute left-[50%] top-6 translate-x-[-50%] font-semibold min-[880px]:left-[25%]"
              }
            >
              {year}.{month}
            </div>
            <div
              className={
                "absolute left-[50%] top-[calc(50%+46px)] translate-x-[-50%] font-semibold min-[880px]:left-[75%] min-[880px]:top-6"
              }
            >
              {year + Math.floor((month + 1) / 12)}.{(month % 12) + 1}
            </div>
          </div>
        </article>
        <article className="mt-4 flex min-h-[25.5rem] flex-shrink-0 flex-col items-center gap-2 rounded-sm border border-primary-60 p-4">
          <h3 className="font-semibold">휴일 선택</h3>

          {/* 월 이동 */}
          <div className="mb-2 flex w-full justify-between">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
              ◀ 이전달
            </button>
            <span className="font-bold">
              {format(currentMonth, "yyyy년 MM월")}
            </span>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
              다음달 ▶
            </button>
          </div>

          {/* 달력 */}
          <div className="grid grid-cols-7 gap-2">
            {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
              <div key={d} className="text-center font-semibold">
                {d}
              </div>
            ))}

            {Array.from({length: getDay(startOfMonth(currentMonth))}).map(
              (_, idx) => (
                <div key={"blank-" + idx}></div>
              ),
            )}

            {eachDayOfInterval({
              start: startOfMonth(currentMonth),
              end: endOfMonth(currentMonth),
            }).map((day) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const inRange = isWithinInterval(day, {
                start: calendarDate[0].startDate,
                end: calendarDate[0].endDate,
              });
              const isSelected = breakDays.has(dateStr);

              return (
                <button
                  key={dateStr}
                  disabled={!inRange}
                  onClick={() => toggleBreakDay(day)}
                  className={`aspect-square w-[2.25rem] rounded-md border p-2 text-sm transition-colors ${
                    !inRange
                      ? "cursor-not-allowed bg-default-2 text-contrast-2"
                      : isSelected
                        ? "text-white bg-red-500"
                        : "bg-white hover:bg-red-100"
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </article>
        <ThemeActiveButton1
          className="h-[3rem] flex-shrink-0"
          onClick={() => handleSubmit()}
          isActive={
            createTaskTitle.trim().length > 0 &&
            createTaskDescription.trim().length > 0 &&
            activeAssignee.id !== 0 &&
            activeJobRole !== ""
          }
          disabled={
            !(
              createTaskTitle.trim().length > 0 &&
              createTaskDescription.trim().length > 0 &&
              activeAssignee.id !== 0 &&
              activeJobRole !== ""
            )
          }
        >
          {mutation.isPending ? (
            <div className="h-full py-1 default-flex">
              <div className="border-white-500 aspect-square h-4 h-full animate-spin rounded-full border-b-4 border-blue-500"></div>
            </div>
          ) : (
            "작업 생성"
          )}
        </ThemeActiveButton1>
      </div>
    </ModalTemplate>
  );
};
export default TeamSpaceTaskListCreateModal;


const defaultDescription: Record<string, string> = {
  BE: `
  [예시]
  목표 : "게시판 목록 조회 API" 구현
  고려사항 : 1. 검색(제목, 작성자) 2. 필터(카테고리) 3. 페이지네이션
  기술스택 : Spring Boot, Spring Data JPA, MySQL

  API 명세를 설계하고 구현해주세요.

  결과는 아래와 같이 만들어주세요.

  \`\`\`java
  - [ ] Entity
  - 게시판 엔티티 정의

  - [ ] Repository
  - JPA Repository 작성

  - [ ] Service
  - 비즈니스 로직 구현

  - [ ] Controller
  - API 엔드포인트 구현
  \`\`\`

  그리고 ERD 구조도 간단히 보여주세요
  `,

  DE: `
  [예시]
  목표 : "게시판 목록 조회 페이지" 디자인
  고려사항 : 1. 직관적인 UI 2. 반응형 레이아웃 3. 접근성 준수(WCAG)
  기술스택 : Figma, TailwindCSS 디자인 토큰

  와이어프레임 및 컴포넌트 스타일을 설계해주세요.

  결과는 아래와 같이 만들어주세요.

  \`\`\`
  - [ ] Color System
  - 기본 색상 팔레트, WCAG 대비 4.5 이상 조합

  - [ ] Typography
  - 제목, 본문, 캡션 계층 구조 정의

  - [ ] Layout
  - 검색바, 필터, 리스트, 페이지네이션 배치
  \`\`\`

  그리고 최종 UI 컴포넌트 구조 다이어그램도 보여주세요
  `,

  FE: `
당신은 Next.js 앱 구조 설계를 도와주는 전문가입니다.  
아래 요구사항에 맞는 컴포넌트 구조 설계를 해주세요.  

[목표]  
- 게시판 목록 조회 기능 만들기  

[고려사항]  
1. 검색 기능  
2. 필터 기능  
3. 페이지네이션  

[기술스택]  
- Next.js (App Router)  
- React Query  
- Zustand  
- TailwindCSS  

[출력 형식 규칙]  
1. 반드시 아래 예시 형식을 지켜서 답변할 것.  
2. \`- [ ]\` 와 \`- 설명\` 형식만 사용할 것.  
3. \`* [ ]\`, \`###\`, \`##\`, \`*\`, 숫자 리스트 등 다른 마크다운 문법은 절대 쓰지 말 것.  
4. 코드 블록(\`\`\`) 안에 넣지 말고, 순수 마크다운 체크박스 형식으로만 출력할 것.  
5. 그룹 구분(컴포넌트, Hook 등) 하지 말고, 순서대로 나열만 할 것.  
6. 한국어로만 답할 것.
7. 설명에는 20년 FE 개발자가 고려해야할 점(유효성 검증, 에러처리 등)들을 정리해줄 것.
8. 설명이 전부 끝나면 마지막 텍스트로 "출력 시 디렉토리 구조를 텍스트로 계층적으로 표현할 때, 마지막 항목까지 포함해서 |- 기호를 사용하여 상위-하위 폴더 관계가 한눈에 보이도록 만들어 주세요."

[예시 출력 형식]
- [ ] src/폴더명/page.tsx  
- 컴포넌트 설명  
- 유효성 관련 설명
- 기타 설명

- [ ] src/components/컴포넌트명.tsx  
- 컴포넌트 설명  
- 유효성 관련 설명
- 기타 설명

- [ ] src/api/폴더명/route.ts  
- 컴포넌트 설명  
- 유효성 관련 설명
- 기타 설명

[요구사항]  
- 코드는 작성하지 말고 설명만 해주세요.
  `,

  HR: `
  [예시]
  목표 : "개발팀 채용 프로세스" 설계
  고려사항 : 1. 직무별 JD 정의 2. 공정한 평가 절차 3. 온보딩 프로세스
  기술스택 : HR SaaS (Greenhouse, Workday 등)

  채용/평가/온보딩 프로세스를 설계해주세요.

  결과는 아래와 같이 만들어주세요.

  \`\`\`
  - [ ] Job Description
  - 직무별 JD 문서화

  - [ ] Hiring Process
  - 서류 → 코딩테스트 → 인터뷰 → 최종합격

  - [ ] Onboarding
  - 입사 첫주차 가이드라인
  \`\`\`

  그리고 채용 파이프라인 다이어그램도 추가해주세요
  `,

  MK: `
  [예시]
  목표 : "게시판 기능" 런칭 마케팅 계획
  고려사항 : 1. 타겟 고객층 정의 2. 홍보 채널 (SNS, 블로그) 3. 성과 지표 (KPI)
  기술스택 : GA4, Notion, SNS Ads

  마케팅 전략 문서를 만들어주세요.

  결과는 아래와 같이 만들어주세요.

  \`\`\`
  - [ ] Campaign 목표
  - 사용자 수, 참여율 지표 설정

  - [ ] Promotion 채널
  - 인스타그램, 뉴스레터, 블로그

  - [ ] KPI Tracking
  - Google Analytics 이벤트 트래킹
  \`\`\`

  그리고 타임라인 형태의 로드맵도 작성해주세요
  `,

  PM: `
  [예시]
  목표 : "게시판 목록 조회" 프로젝트 관리
  고려사항 : 1. 역할 분담 (FE, BE, DE) 2. 일정 관리 3. 리스크 관리
  기술스택 : Jira, Confluence, Slack

  프로젝트 관리 계획을 만들어주세요.

  결과는 아래와 같이 만들어주세요.

  \`\`\`
  - [ ] Roadmap
  - 기능 개발 단계별 일정

  - [ ] Task Breakdown
  - FE, BE, DE 작업 항목 분리

  - [ ] Risk Management
  - 일정 지연, 인력 부족 리스크 관리
  \`\`\`

  그리고 Gantt 차트 형태의 일정 계획도 추가해주세요
  `,

  QA: `
  [예시]
  목표 : "게시판 목록 조회" QA 플랜
  고려사항 : 1. 기능 테스트 2. 크로스 브라우징 3. 성능 테스트
  기술스택 : Cypress, Jest, Lighthouse

  QA 시나리오를 만들어주세요.

  결과는 아래와 같이 만들어주세요.

  \`\`\`
  - [ ] Test Cases
  - 검색/필터/페이지네이션 동작 검증

  - [ ] Cross Browser Test
  - Chrome, Safari, Firefox, Edge

  - [ ] Performance Test
  - TTI, CLS, LCP 측정
  \`\`\`

  그리고 QA 리포트 템플릿도 추가해주세요
  `,
};
