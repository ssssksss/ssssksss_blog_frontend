import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <main className="p-1 w-full h-full">{children}</main>
  );
}
