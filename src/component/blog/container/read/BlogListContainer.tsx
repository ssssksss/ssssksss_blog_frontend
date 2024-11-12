"use client";

import BlogListBox from "@component/blog/hybrid/readList/BlogListBox";


interface IBlogListContainer {

}
const BlogListContainer = (props: IBlogListContainer) => {

  const sortHandler = (value: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("sort");
    if (value) {
      params.set("sort", value);
    }
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  return (
    <>
      {/* <BlogListHeader /> */}
      <BlogListBox />
    </>
  );
};
export default BlogListContainer;