import Blog2FloatMenu from "@component/blog2/hybrid/Blog2FloatMenu";
import { ReactNode } from "react";

export default function Template({children}: {children: ReactNode}) {
  return (
    <main className="h-full w-full p-1">
      {children}
      <Blog2FloatMenu />
    </main>
  );
}
