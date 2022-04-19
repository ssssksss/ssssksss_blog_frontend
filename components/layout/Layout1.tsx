import React from "react";
import BlogFirstMenu from "@/components/blog/BlogUI/BlogFirstMenu";
import BlogSecondMenu from "@/components/blog/BlogUI/BlogSecondMenu";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout1 = ({ children }: AppLayoutProps) => {
  return (
    <>
      <BlogFirstMenu />
      <BlogSecondMenu />
      {children}
    </>
  );
};

export default Layout1;
