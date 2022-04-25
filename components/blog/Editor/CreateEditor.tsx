import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
//import chart from "@toast-ui/editor-plugin-chart";
//import "tui-chart/dist/tui-chart.css";
//import "highlight.js/styles/github.css";
//import "tui-color-picker/dist/tui-color-picker.css";
//import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
//import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
//import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
//import uml from "@toast-ui/editor-plugin-uml";

const CreateEditor = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [areaTextContent, setAreaTextContent] = useState("");
  const editorRef = useRef<Editor>(null);
  const changeHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    //console.log(getContent_md);
    const getContent_html = editorInstance?.getHTML();
    //console.log(getContent_html);
  };
  const locationHref = window.location.pathname;
  const handlerSubmit = () => {
    //console.log("handleSubmit");
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    AxiosInstance({
      url: "/ssssksss/post/add",
      method: "POST",
      data: {
        title: title,
        description: description,
        content: getContent_md,
        secondHref:
          "/" + locationHref.split("/")[1] + "/" + locationHref.split("/")[2],
      },
    })
      .then((response) => {
        //alert("포스트가 추가되었습니다."); //귀찮아서 주석처리 해버림
        router.push(
          "/" + locationHref.split("/")[1] + "/" + locationHref.split("/")[2]
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
          onChange={() => changeHandler()}
          ref={editorRef}
        />
      </div>
      <EditorFooter>
        <SubmitButton onClick={() => handlerSubmit()}> 제출 </SubmitButton>
        <CancelButton
          onClick={() =>
            router.push(
              "/" +
                router.asPath.split("/")[1] +
                "/" +
                router.asPath.split("/")[2]
            )
          }
        >
          취소
        </CancelButton>
      </EditorFooter>
    </div>
  );
};

export default CreateEditor;

const Title = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  background: ${({ theme }) => theme.customColors.thirdTitle};
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  padding: 0px 10px;

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
  padding: 0px 10px;

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
