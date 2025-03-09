import PlanSideBar from "@component/plan/hybrid/PlanSideBar";
import { ReactNode, Suspense } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="h-auto w-full max-[639px]:pl-0 max-[1248px]:pl-[50px]">
      <Suspense fallback={<div>Loading...</div>}>
        <PlanSideBar />
      </Suspense>
      {children}
    </div>
  );
}
