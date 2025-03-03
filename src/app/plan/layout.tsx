import PlanSideBar from "@component/plan/hybrid/PlanSideBar";
import { ReactNode, Suspense } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="h-full w-full bg-default-1">
      <Suspense fallback={<div>Loading...</div>}>
        <PlanSideBar />
      </Suspense>
      {children}
    </div>
  );
}
