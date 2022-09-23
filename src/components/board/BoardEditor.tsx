import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { AWSS3Prefix } from "@/components/common/variables/url";
//import chart from "@toast-ui/editor-plugin-chart";
//import "tui-chart/dist/tui-chart.css";
//import "highlight.js/styles/github.css";
//import "tui-color-picker/dist/tui-color-picker.css";
//import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
//import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
//import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
//import uml from "@toast-ui/editor-plugin-uml";

interface IBoardEditorProps {
  edit?: boolean;
}

const BoardEditor = (props: IBoardEditorProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [areaTextContent, setAreaTextContent] = useState("");
  const editorRef = useRef<Editor>(null);
  const locationHref = window.location.pathname;
  const postUrlHref =
    "/" + locationHref.split("/")[1] + "/" + locationHref.split("/")[2];
  const authStore = useSelector((state: RootState) => state.authStore);

  const submitHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    AxiosInstance({
      url: "/api/post",
      method: "POST",
      data: {
        title: title,
        description: description,
        content: getContent_md,
        secondHref: postUrlHref,
      },
    })
      .then((response) => {
        router.push(postUrlHref);
      })
      .catch((error) => {
        alert("에러가 발생하였습니다.");
      });
  };

  const updateHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const MarkdownContent = editorInstance?.getMarkdown();
    AxiosInstance({
      url: "/api/post",
      method: "PUT",
      data: {
        id: Number(router.query?.id),
        title: title,
        description: description,
        content: MarkdownContent,
        secondHref: postUrlHref,
      },
    })
      .then((response) => {
        // 그냥 글 리스트로 이동하는 것이 편해서 수정
        // router.push(postUrlHref + "/" + router.query?.id);
        router.push(postUrlHref);
      })
      .catch((error) => {
        alert("에러가 발생하였습니다.");
      });
  };

  const uploadHandler = async (file: any) => {
    let formData = new FormData();
    formData.append("files", file);
    formData.append("directory", "/" + locationHref.split("/")[1]);
    let temp;
    await AxiosInstance({
      url: "/s3/image",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      data: formData,
      withCredentials: true,
    })
      .then((response) => {
        temp = response.data;
      })
      .catch((error) => {
        console.log("index.tsx : ", error.response);
      });
    return temp;
  };

  useEffect(() => {
    if (props.edit) {
      AxiosInstance({
        url: "/api/post",
        method: "GET",
        params: {
          firstHref: router.asPath.split("/")[2],
          secondHref: router.asPath.split("/")[3],
          id: router.query?.id,
        },
      })
        .then((response) => {
          let res = response.data.data.post;
          setAreaTextContent(res.content);
          setTitle(res.title);
          setDescription(res.description);
          const editorInstance = editorRef.current?.getInstance();
          editorInstance?.setMarkdown(res.content);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      {authStore.role === "ROLE_ADMIN" && (
        <Container>
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
          <EditorContainer>
            <Editor
              initialValue={areaTextContent}
              // previewStyle="vertical"
              height="800px"
              // initialEditType="markdown"
              // useCommandShortcut={true}
              ref={editorRef}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const imageURL: any = await uploadHandler(blob);
                  callback(`${AWSS3Prefix}${imageURL[0]}`, "");
                  // "blog"+directory+"/"+fileName
                },
              }}
              toolbarItems={[
                // 툴바 옵션 설정
                ["heading", "bold", "italic", "strike"],
                ["hr", "quote"],
                ["ul", "ol", "task", "indent", "outdent"],
                ["table", "image", "link"],
                ["code", "codeblock"],
              ]}
            />
          </EditorContainer>
          <EditorFooter>
            <SubmitButton
              onClick={() => (props.edit ? updateHandler() : submitHandler())}
            >
              {props.edit ? "수정" : "제출"}{" "}
            </SubmitButton>
            <CancelButton onClick={() => router.back()}>취소</CancelButton>
          </EditorFooter>
        </Container>
      )}
    </>
  );
};

export default BoardEditor;
const Container = styled.section`
  position: relative;
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;

  .toastui-editor-toolbar {
    position: sticky;
    top: 0px;
    z-index: 1;
  }
  .toastui-editor-main {
    padding-top: 20px;
  }
`;

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
  z-index: 2;

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
  z-index: 2;
`;
const EditorFooter = styled.div`
  margin-top: 5px;
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  position: sticky;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.5);
`;
const EditorContainer = styled.div`
  background-color: white;
  &::before {
    content: "";
    background-size: 50%;
    background-image: url("/img/backgroundImage/원피스.jpg");
    background-repeat: repeat-x;
    background-position: right bottom;
    opacity: 0.2;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 80px;
  }
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
