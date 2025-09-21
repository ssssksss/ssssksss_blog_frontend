import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import useTeamSpaceStore from "@store/teamSpaceStore";
import useToastifyStore from "@store/toastifyStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface TeamSpaceProjectDto {
  id: number;
  title: string;
  description: string;
  teamSpaceTeam: null;
  isHidden: boolean;
}

interface ITeamSpaceProjectUpdateContainer extends IModalComponent {

}
const TeamSpaceProjectUpdateContainer = (props: ITeamSpaceProjectUpdateContainer) => {
  const teamSpaceStore = useTeamSpaceStore();
  const toastifyStore = useToastifyStore();
  const router = useRouter();
  const [activeProject, setActiveProject] = useState(0);
  const [updateProjectTitle, setUpdateProjectTitle] = useState("");
  const [updateProjectDescription, setUpdateProjectDescription] =
  useState("");
  const [updateProjectIsHidden, setUpdateProjectIsHidden] = useState(true);
  

  const fetchAllProjectList = async () => {
    const res = await fetch("/api/team-space/all-project");

    if (!res.ok) {
      throw new Error("프로젝트를 불러오는 데 실패했습니다.");
    }

    return res.json();
  };

  const {
    data: project,
    isLoading,
    error,
  } = useQuery<{data: TeamSpaceProjectDto[]} | undefined, Error, TeamSpaceProjectDto[] | undefined>({
    queryKey: ["all-project"],
    queryFn: () => fetchAllProjectList(),
    select: (cached) => cached?.data
  });

  const TeamSpaceProjectUpdateContainer = async () => {
    // 이거는 새롭게 API를 만들어서 숨긴 프로젝트도 전부 불러와야 한다.
    const response = await fetch(`/api/team-space/project?id=${activeProject}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updateProjectTitle,
        description: updateProjectDescription,
        isHidden: updateProjectIsHidden,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json(); // 응답 데이터를 JSON으로 파싱
  };

  const mutation = useMutation({
    mutationFn: TeamSpaceProjectUpdateContainer,
    onSuccess: (data: { data: ITeamSpaceProject[], msg: string, statusCode: number }) => {
      toastifyStore.setToastify({
        message: "프로젝트 수정",
      });
      if (updateProjectIsHidden == false) {
        // 활성화로 변경이 되었으니 기존 fetch를 새롭게 불러와야 한다... 보다는 반환값에 포함된것을 목록으로 넣을 수 있게 변경
        teamSpaceStore.setProjectList(data.data);
      } else {
        // 비활성화로 변경이 되었으니 기존 fetch에 project를 제거해준다. 만약 현재 클릭한 project라면 id 값을 0으로 만들어준다.
        teamSpaceStore.setProjectList(teamSpaceStore.projectList.filter(i => i.id != activeProject));
        if (teamSpaceStore.activeProject.id == activeProject) {
          teamSpaceStore.setActiveProject({
            id: 0,
            title: ""
          });
        }
      }
      props.closeModal!();
    },
    onError: (error: Error) => {
      // TODO : 에러처리는 어떻게 할지
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <div className="flex min-h-[10rem] w-full flex-col gap-4 rounded-lg border border-contrast-1 p-2">
      <div className="flex w-full gap-x-1 overflow-x-scroll whitespace-nowrap border border-b-contrast-1 pb-1 scrollbar-hide">
        {project?.map((i) => (
          <ThemeActiveButton1
            className="inline-block w-fit rounded-xl border border-contrast-1 p-1"
            key={i.id}
            onClick={() => {
              setActiveProject(i.id);
              setUpdateProjectTitle(i.title);
              setUpdateProjectDescription(i.description);
              setUpdateProjectIsHidden(i.isHidden);
              console.log("TeamSpaceProjectUpdateContainer.tsx 파일 : ",i);
            }}
            isActive={i.id == activeProject}
          >
            {i.title}
          </ThemeActiveButton1>
        ))}
      </div>
      <article className="flex flex-col gap-1">
        <h3>프로젝트 제목</h3>
        <ThemeInput1
          onChange={(e) => setUpdateProjectTitle(e.target.value)}
          type="text"
          value={updateProjectTitle}
          maxLength={30}
          placeholder="프로젝트 제목을 입력해주세요."
          className="w-full rounded-lg"
        />
      </article>
      <article className="flex flex-col gap-1">
        <h3>프로젝트 설명</h3>
        <ThemeInput1
          onChange={(e) => setUpdateProjectDescription(e.target.value)}
          value={updateProjectDescription}
          type="text"
          maxLength={30}
          placeholder="프로젝트 설명을 입력해주세요."
          className="w-full rounded-lg"
        />
      </article>
      {activeProject > 0 && (
        <article className="flex w-full gap-x-2">
          <ThemeActiveButton1
            className="h-[3rem] flex-1"
            onClick={() => setUpdateProjectIsHidden(false)}
            isActive={!updateProjectIsHidden}
          >
            활성화
          </ThemeActiveButton1>
          <ThemeActiveButton1
            className="h-[3rem] flex-1"
            onClick={() => setUpdateProjectIsHidden(true)}
            isActive={updateProjectIsHidden}
          >
            비활성화
          </ThemeActiveButton1>
        </article>
      )}
      <ThemeActiveButton1
        className="h-[3rem]"
        onClick={() => handleSubmit()}
        isActive={
          (updateProjectTitle.length > 0 &&
            project?.find((i) => i.id == activeProject)?.title !=
              updateProjectTitle) ||
          (updateProjectDescription.length > 0 &&
            project?.find((i) => i.id == activeProject)?.description !=
              updateProjectDescription) ||
          project?.find((i) => i.id == activeProject)?.isHidden !=
            updateProjectIsHidden
        }
        disabled={
          activeProject == 0 ||
          !(
            (updateProjectTitle.length > 0 &&
              project?.find((i) => i.id == activeProject)?.title !=
                updateProjectTitle) ||
            (updateProjectDescription.length > 0 &&
              project?.find((i) => i.id == activeProject)?.description !=
                updateProjectDescription) ||
            project?.find((i) => i.id == activeProject)?.isHidden !=
              updateProjectIsHidden
          )
        }
      >
        {mutation.isPending ? (
          <div className="h-full py-1 default-flex">
            <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-b-4 border-blue-500"></div>
          </div>
        ) : (
          "프로젝트 수정"
        )}
      </ThemeActiveButton1>
    </div>
  );
};
export default TeamSpaceProjectUpdateContainer;