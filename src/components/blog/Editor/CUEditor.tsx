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

interface ICUEditorProps {
  edit?: boolean;
}

const CUEditor = (props: ICUEditorProps) => {
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
        router.push(postUrlHref + "/" + router.query?.id);
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
        console.log("index.tsx : ", response);
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
          firstHref: router.asPath.split("/")[1],
          secondHref: router.asPath.split("/")[2],
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
          <div style={{ background: "white" }}>
            <Editor
              initialValue={areaTextContent}
              previewStyle="vertical"
              height="800px"
              initialEditType="markdown"
              useCommandShortcut={true}
              ref={editorRef}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const imageURL: any = await uploadHandler(blob);
                  console.log(imageURL);
                  callback(`${AWSS3Prefix}${imageURL[0]}`, "");
                },
              }}
            />
          </div>
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

export default CUEditor;
const Container = styled.section``;

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
