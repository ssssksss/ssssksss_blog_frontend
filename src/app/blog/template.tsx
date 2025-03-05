import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="p-1 w-full h-auto">{children}</div>
  );
}
