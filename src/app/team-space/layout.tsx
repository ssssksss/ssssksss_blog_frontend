import TeamSpaceSideBar from "@component/team-space/hybrid/TeamSpaceSideBar";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="h-full w-full max-[1320px]:pl-[50px] max-[639px]:pl-0 p-2">
      <TeamSpaceSideBar />
      {children}
    </div>
  );
}
