import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="h-auto w-full p-1 pt-2">
      {children}
    </div>
  );
}
