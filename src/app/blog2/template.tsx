import Blog2FloatMenu from "@component/blog2/hybrid/Blog2FloatMenu";
import { ReactNode } from "react";

export default function Template({children}: {children: ReactNode}) {
  return (
    <div className="h-auto w-full p-1">
      {children}
      <Blog2FloatMenu />
    </div>
  );
}
