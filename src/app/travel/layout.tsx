import TravelSideBar from "@component/travel/hybrid/TravelSideBar";
import {ReactNode, Suspense} from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <TravelSideBar />
      </Suspense>
      {children}
    </div>
  );
}
