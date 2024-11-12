"use client";

import Blog2ListBox from "../../hybrid/readList/Blog2ListBox";

interface IBlog2ListContainer {

}
const Blog2ListContainer = (props: IBlog2ListContainer) => {

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
      {/* <Blog2ListHeader /> */}
      <Blog2ListBox />
    </>
  );
};
export default Blog2ListContainer;