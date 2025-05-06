import PlanSideBar from "@component/plan/hybrid/PlanSideBar";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="h-full w-full max-[639px]:pl-0 max-[1320px]:pl-[50px]">
      <PlanSideBar />
      {children}
    </div>
  );
}
