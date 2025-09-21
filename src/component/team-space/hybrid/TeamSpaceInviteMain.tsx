"use client";

import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import useFetchCSR from "@hooks/useFetchCSR";
import useToastifyStore from "@store/toastifyStore";
import { useRef, useState } from "react";
import { CiMail } from "react-icons/ci";

interface ITeamSpaceMemberInvitation {
  id: number;
  teamId: number;
  projectId: number;
  projectTitle: string;
  inviterUserId: number;
  inviteeUserId: number;
  inviteeUserNickname: string;
  inviteeUserEmail: string;
  jobRolesJSON: string;
  position: ITeamSpacePosition;
  createdAt: Date; // 서버에서 ISO string으로 내려오는 경우
}

interface ITeamSpaceInviteMain {
  invitationList: {
    myInviteeList: ITeamSpaceMemberInvitation[];
    myInviterList: ITeamSpaceMemberInvitation[];
  };
}

const TeamSpaceInviteMain = (props: ITeamSpaceInviteMain) => {
  const fetchCSR = useFetchCSR();
  const [receiveInvitationList, setReceiveInvitationList] = useState(props.invitationList.myInviteeList); // 초대 받은 목록
  const [sendInvitationList, setSendInvitationList] = useState(props.invitationList.myInviterList); // 보낸 초대 목록
  const nicknameFieldRef = useRef<HTMLInputElement>(null);
  const toastifyStore = useToastifyStore();  
  
  const acceptTeamSpaceInvitation = async (
    data: ITeamSpaceMemberInvitation,
  ) => {
    if (nicknameFieldRef.current?.value.length == 0) {
      toastifyStore.setToastify({
        type: "warning",
        message: "닉네임을 입력해주세요"
      });
      return;
    };

    await fetchCSR.requestWithHandler({
      url: `/api/team-space/invite?id=${data.id}`,
      method: "PUT",
      body: {
        nickname: nicknameFieldRef.current?.value,
      },
      successMessage: "멤버 가입을 완료했습니다.",
      showSuccessToast: true,
      handleSuccess: () => {
        setReceiveInvitationList(receiveInvitationList.filter(i => i.id != data.id));
      }
    });
  };

  const deleteTeamSpaceInvitation = async (data: ITeamSpaceMemberInvitation) => {
    await fetchCSR.requestWithHandler({
      url: `/api/team-space/invite?id=${data.id}`,
      method: "DELETE",
      successMessage: "멤버 초대에서 삭제했습니다.",
      showSuccessToast: true,
      handleSuccess: () => {
        setSendInvitationList(sendInvitationList.filter((i) => i.id != data.id));
      }
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll px-2 py-4 scrollbar-hide">
      {/* 보낸 초대 관리 */}
      <section className="h-full min-h-[24rem]">
        <div className="flex min-h-[2rem] items-center gap-2 text-[2rem]">
          <CiMail size={32} /> <span>보낸 초대 관리</span>
        </div>
        <div className="flex h-auto min-h-[20rem] flex-col gap-2 overflow-y-scroll rounded-lg border border-contrast-1 p-2 scrollbar-hide">
          {sendInvitationList.length === 0 ? (
            <div className="text-gray-500">보낸 초대가 없습니다.</div>
          ) : (
            sendInvitationList.map((invite: ITeamSpaceMemberInvitation) => (
              <div
                key={invite.id}
                className="bg-white flex h-auto w-full max-w-md flex-col gap-2 rounded-lg border border-contrast-1 p-2 py-4 shadow-sm"
              >
                <div className="grid grid-cols-[5.25rem_auto] gap-2 font-medium text-gray-600">
                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    프로젝트명
                  </div>
                  <div>{invite.projectTitle}</div>

                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    닉네임
                  </div>
                  <div>{invite.inviteeUserNickname}</div>

                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    이메일
                  </div>
                  <div className="min-w-0 whitespace-pre-wrap break-words">
                    {invite.inviteeUserEmail}
                  </div>

                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    역할
                  </div>
                  <div>{JSON.parse(invite.jobRolesJSON).join(", ")}</div>

                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    직급
                  </div>
                  <div>{invite.position}</div>

                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    초대날짜
                  </div>
                  <div>{new Date(invite.createdAt).toLocaleDateString()}</div>
                </div>
                <ThemeButton1
                  className="h-[2.5rem] w-full"
                  onClick={async () => await deleteTeamSpaceInvitation(invite)}
                >
                  초대 취소하기
                </ThemeButton1>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 받은 초대 관리 */}
      <section className="h-full min-h-[24rem]">
        <div className="flex min-h-[2rem] items-center gap-2 text-[2rem]">
          <CiMail size={32} /> <span>받은 초대 관리</span>
        </div>
        <div className="flex h-auto min-h-[20rem] flex-col gap-2 overflow-y-scroll rounded-lg border border-contrast-1 p-2 scrollbar-hide">
          {receiveInvitationList.length === 0 ? (
            <div className="text-gray-500">받은 초대가 없습니다.</div>
          ) : (
            receiveInvitationList.map((invite: ITeamSpaceMemberInvitation) => (
              <div
                key={invite.id}
                className="bg-white flex h-auto w-full max-w-md flex-col gap-2 rounded-lg border border-contrast-1 p-2 py-4 shadow-sm"
              >
                <div className="grid grid-cols-[5.25rem_auto] gap-2 font-medium text-gray-600">
                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    프로젝트명
                  </div>
                  <div>{invite.projectTitle}</div>

                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    닉네임
                  </div>
                  <div>{invite.inviterUserId}</div>

                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    이메일
                  </div>
                  <div>{invite.inviteeUserEmail}</div>

                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    역할
                  </div>
                  <div>{JSON.parse(invite.jobRolesJSON).join(", ")}</div>

                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    직급
                  </div>
                  <div>{invite.position}</div>

                  <div className="rounded-lg border border-contrast-1 pl-1 font-bold">
                    초대날짜
                  </div>
                  <div>{new Date(invite.createdAt).toLocaleDateString()}</div>
                </div>
                <ThemeInput1
                  placeholder="사용할 닉네임을 입력해주세요."
                  ref={nicknameFieldRef}
                />
                <ThemeButton1
                  className="h-[2.5rem] w-full"
                  onClick={async () => await acceptTeamSpaceInvitation(invite)}
                >
                  초대 승인하기
                </ThemeButton1>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default TeamSpaceInviteMain;