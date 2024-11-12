"use client";

import {useDragAndDropBlob} from "@hooks/useDragAndDropBlob";
import Image from "next/image";
import {useState} from "react";

interface IUseDragAndDropBlogTestComponent {}
const UseDragAndDropBlogTestComponent = (
  props: IUseDragAndDropBlogTestComponent,
) => {
  const [url, setUrl] = useState("");

  const fakeImageUpload = ({file, url}: {file: File; url: string}) => {
    setUrl(url);
  };

  const {isDragging, onDragEnter, onDragLeave, onDragOver, onDropOrInputEvent} =
    useDragAndDropBlob({
      fakeImageUpload,
    });

  return (
    <div className={"flex aspect-square w-[20rem] flex-col bg-red-20"}>
      <h1> 에이지의 테스트 페이지 </h1>
      <label
        className={
          "relative aspect-square w-full cursor-pointer rounded-[50%] bg-[#F2FAF7] outline outline-[1px] outline-offset-[-1px] outline-[#B8EDD9]"
        }
        htmlFor={"imageUpload"}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDropOrInputEvent}>
        {url && <Image src={url} alt="test" fill />}
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onDropOrInputEvent}
        />
      </label>
      {url}
      <button
        onClick={() => {
          throw new Error("테스트");
        }}>
        에러 발생 버튼
      </button>
    </div>
  );
};
export default UseDragAndDropBlogTestComponent;
