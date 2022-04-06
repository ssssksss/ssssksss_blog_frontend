import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

const UpdateEditor = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [areaTextContent, setAreaTextContent] = useState("");
  const editorRef = useRef<Editor>(null);
  const locationHref = window.location.pathname;

  useEffect(() => {
    AxiosInstance({
      url: "/ssssksss/post/view",
      method: "GET",
      params: {
        firstHref: window.location.pathname.split("/")[1],
        secondHref: window.location.pathname.split("/")[2],
        id: Number(window.location.search.split("=")[1]),
      },
    })
      .then((response) => {
        let res = response.data.data.post;
        setAreaTextContent(res);
        setTitle(res.title);
        setDescription(res.description);
        const editorInstance = editorRef.current?.getInstance();
        editorInstance?.setMarkdown(res.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateHandler = () => {
    console.log("handleUpdate");
    const editorInstance = editorRef.current?.getInstance();
    const MarkdownContent = editorInstance?.getMarkdown();
    AxiosInstance({
      url: "/ssssksss/post/update",
      method: "POST",
      data: {
        id: Number(window.location.search.split("=")[1]),
        title: title,
        description: description,
        content: MarkdownContent,
        secondHref:
          "/" + locationHref.split("/")[1] + "/" + locationHref.split("/")[2],
      },
    })
      .then((response) => {
        alert("포스트가 수정되었습니다.");
        router.push(
          "/" +
            locationHref.split("/")[1] +
            "/" +
            locationHref.split("/")[2] +
            "/" +
            window.location.search.split("=")[1]
        );
      })
      .catch((error) => {
        alert("에러가 발생하였습니다.");
      });
  };

  return (
    <div>
      <Title
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></Title>
      <Description
        placeholder="간략한 설명을 입력해주세요"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <div style={{ background: "white" }}>
        <Editor
          initialValue={areaTextContent}
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          //initialEditType="wysiwyg"
          useCommandShortcut={true}
          ref={editorRef}
        />
      </div>
      <EditorFooter>
        <SubmitButton onClick={() => updateHandler()}> 수정 </SubmitButton>
        <CancelButton onClick={() => router.back()}>취소</CancelButton>
      </EditorFooter>
    </div>
  );
};

export default UpdateEditor;

const Title = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  background: ${({ theme }) => theme.customColors.thirdTitle};
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  padding: 0px 140px;

  &::placeholder {
    color: white;
  }
`;
const Description = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  text-align: center;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  padding: 0px 140px;

  &::placeholder {
  }
`;
const TextArea = styled.textarea`
  margin-top: 5px;
  resize: none;
  width: 100%;
  min-height: 400px;
  padding: 10px;
  background: white;
  border: solid black 1px;
`;
const EditorFooter = styled.div`
  margin-top: 5px;
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

const Button = css`
  background: white;
  height: 30px;
  border-radius: 10px;
  border: solid black 1px;
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  ${({ theme }) => theme.flex.flexCenter};
  cursor: pointer;
  &:hover {
    background: #aeaeae;
  }
`;
const SubmitButton = styled.button`
  ${Button}
`;
const CancelButton = styled.button`
  ${Button}
`;
