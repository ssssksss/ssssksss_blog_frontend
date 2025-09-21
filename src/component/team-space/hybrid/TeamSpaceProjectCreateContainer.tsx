import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import useTeamSpaceStore from "@store/teamSpaceStore";
import useToastifyStore from "@store/toastifyStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface ITeamSpaceProjectCreateContainer extends IModalComponent {

}
const TeamSpaceProjectCreateContainer = (props: ITeamSpaceProjectCreateContainer) => {
  const teamSpaceStore = useTeamSpaceStore();
  const toastifyStore = useToastifyStore();
  const [createProjectTitle, setCreateProjectTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [createProjectDescription, setCreateProjectDescription] =
    useState("");
  
  const createTeamSpaceProjectHandler = async () => {
    const response = await fetch("/api/team-space/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: createProjectTitle,
        description: createProjectDescription,
        nickname: nickname
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json(); // 응답 데이터를 JSON으로 파싱
  };

  const mutation = useMutation({
    mutationFn: createTeamSpaceProjectHandler,
    onSuccess: (data: {data: ITeamSpaceProject, msg: string, statusCode: number}) => {
      teamSpaceStore.setProjectList([data.data, ...teamSpaceStore.projectList]);
      toastifyStore.setToastify({
        message: "프로젝트 생성"
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
    <div className="flex flex-col gap-4 min-h-[10rem] border border-contrast-1 w-full rounded-lg p-2">
      <article className="flex flex-col gap-1">
        <h3>프로젝트 제목</h3>
        <ThemeInput1 onChange={(e)=>setCreateProjectTitle(e.target.value)} type="text" maxLength={30} placeholder="프로젝트 제목을 입력해주세요." className="w-full rounded-lg" /> 
      </article>
      <article className="flex flex-col gap-1">
        <h3>프로젝트 설명</h3>
        <ThemeInput1 onChange={(e)=>setCreateProjectDescription(e.target.value)} type="text" maxLength={30} placeholder="프로젝트 설명을 입력해주세요." className="w-full rounded-lg" /> 
      </article>
      <article className="flex flex-col gap-1">
        <h3>사용할 닉네임</h3>
        <ThemeInput1 onChange={(e)=>setNickname(e.target.value)} type="text" maxLength={30} placeholder="사용할 닉네임을 작성해주세요." className="w-full rounded-lg" /> 
      </article>
      <ThemeActiveButton1 className="h-[3rem]" onClick={() => handleSubmit()} isActive={createProjectTitle.length > 0 && createProjectDescription.length > 0}> {
        mutation.isPending ?                 <div className="absolute inset-0 flex items-center justify-center">
          <div className="aspect-square h-4 animate-spin rounded-full border-b-4 border-blue-500"></div>
        </div> : "프로젝트 생성"
      } </ThemeActiveButton1>
    </div>
  );
};
export default TeamSpaceProjectCreateContainer;