import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import useTeamSpaceStore from "@store/teamSpaceStore";
import useToastifyStore from "@store/toastifyStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface ITeamSpaceProjectDeleteContainer extends IModalComponent {

}
const TeamSpaceProjectDeleteContainer = (props: ITeamSpaceProjectDeleteContainer) => {
  const teamSpaceStore = useTeamSpaceStore();
  const toastifyStore = useToastifyStore();
  const [choiceProjectId, setChoiceProjectId] = useState(0);
  
  const deleteTeamSpaceProjectHandler = async () => {
    const response = await fetch(
      `/api/team-space/project?id=${choiceProjectId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json(); // 응답 데이터를 JSON으로 파싱
  };

  const mutation = useMutation({
    mutationFn: deleteTeamSpaceProjectHandler,
    onSuccess: (data: {
      data: ITeamSpaceProject;
      msg: string;
      statusCode: number;
    }) => {
      teamSpaceStore.setProjectList([...teamSpaceStore.projectList.filter(i=>i.id != choiceProjectId)]);
      if (teamSpaceStore.activeProject.id == choiceProjectId) {
        teamSpaceStore.setActiveProject({
          id: 0,
          title: ""
        });
      }
      toastifyStore.setToastify({
        message: "프로젝트 삭제",
      });
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
      <div className="grid h-full grid-cols-[4rem_auto] items-center rounded-md border-2 border-contrast-1 p-1">
        <div className="font-semibold">프로젝트 </div>
        <div className="flex gap-x-1 overflow-x-scroll whitespace-nowrap px-1 scrollbar-hide">
          {teamSpaceStore.projectList.map((i) => (
            <ThemeActiveButton1
              className="inline-block w-fit rounded-xl border border-contrast-1 px-2 py-1"
              key={i.id}
              isActive={i.id === choiceProjectId}
              onClick={() => {
                setChoiceProjectId(i.id);
              }}
            >
              {i.title}
            </ThemeActiveButton1>
          ))}
        </div>
      </div>
      <ThemeActiveButton1
        className="h-[3rem]"
        onClick={() => handleSubmit()}
        isActive={
          choiceProjectId > 0
        }
      >
        {mutation.isPending ? (
          <div className="h-full py-1 default-flex">
            <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-b-4 border-blue-500"></div>
          </div>
        ) : (
          "프로젝트 삭제"
        )}
      </ThemeActiveButton1>
    </div>
  );
};
export default TeamSpaceProjectDeleteContainer;