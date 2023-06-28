import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { Editor } from "@toast-ui/react-editor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { AWSS3Prefix } from "@/components/common/variables/url";
import { store } from "@/redux/store";
import Button from "@/components/common/button/Button";
import theme from "@/styles/theme";
import chart from "@toast-ui/editor-plugin-chart";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { SET_TOASTIFY_MESSAGE } from "@/redux/store/toastify";
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogItemEditor.tsx
 * @version 0.0.1 "2023-06-20 08:43:52"
 * @description 설명
 */
const BlogItemEditor = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const blogContentForm = [
    "# <span style='color: #f91600'>[1] 제목</span> \n" +
      "## <span style='color: #f99700'>{1} 설명</span> \n" +
      "## <span style='color: #f99700'>{2} 예시</span> \n" +
      "### <span style='color: #1200ff'>ex1)</span> \n" +
      "#### <span style='color: #cb00ff'>결과</span> \n" +
      "### <span style='color: #1200ff'>ex2)</span> \n" +
      "#### <span style='color: #cb00ff'>결과</span> \n" +
      "---",
    "# <span style='color: #f91600'>[1] 제목</span> \n" +
      "## <span style='color: #f99700'>{1} 설명</span> \n" +
      "## <span style='color: #f99700'>{2} 문법</span> \n" +
      "## <span style='color: #f99700'>{3} 예시</span> \n" +
      "### <span style='color: #1200ff'>ex1)</span> \n" +
      "#### <span style='color: #cb00ff'>결과</span> \n" +
      "### <span style='color: #1200ff'>ex2)</span> \n" +
      "#### <span style='color: #cb00ff'>결과</span> \n" +
      "---",
    "| 속성 | 설명 |  \n" + "| --- | --- | \n" + "|  | | \n" + "|  |  | \n" + "|  |  | \n" + "|  |   | \n",
  ];
  const [areaTextContent, setAreaTextContent] = useState(blogContentForm[0]);
  const editorRef = useRef<Editor>(null);
  const locationHref = window.location.pathname;
  const blogUrl = "/blog/" + locationHref.split("/")[2] + "/" + locationHref.split("/")[3];
  const authStore = useSelector((state: RootState) => state.authStore);
  const themeStore = useSelector((state: RootState) => state.themeStore);
  const categoryStore = useSelector((state: RootState) => state.categoryStore);

  const submitHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    AxiosInstance({
      url: "/api/blog-item",
      method: "POST",
      data: {
        title: title,
        description: description,
        content: getContent_md,
        firstCategory: categoryStore.firstCategory,
        secondCategory: categoryStore.secondCategory,
      },
    })
      .then((response) => {
        router.push(blogUrl);
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  const updateHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const MarkdownContent = editorInstance?.getMarkdown();
    AxiosInstance({
      url: "/api/blog-item",
      method: "PUT",
      data: {
        id: router.query?.id,
        title: title,
        description: description,
        content: MarkdownContent,
      },
    })
      .then((response) => {
        router.back();
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  const uploadHandler = async (file: any) => {
    let formData = new FormData();
    formData.append("files", file);
    formData.append("directory", "/" + locationHref.split("/")[2]);
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
        url: "/api/blog-item",
        method: "GET",
        params: {
          id: router.query?.id,
        },
      })
        .then((response) => {
          let res = response.data.data.blogItem;
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
            themeStore={themeStore}
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
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
              previewStyle="tab"
              height={`calc(100vh - 180px)`}
              initialEditType="markdown"
              useCommandShortcut={true}
              ref={editorRef}
              plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const imageURL: any = await uploadHandler(blob);
                  callback(`${AWSS3Prefix}${imageURL[0]}`, "");
                },
              }}
              viewer={true}
              // language="ko-KR"
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
            <Button width="100%" status="green" onClick={() => (props.edit ? updateHandler() : submitHandler())}>
              {props.edit ? "수정" : "제출"}
            </Button>
            <Button width="100%" status="lightred" onClick={() => router.back()}>
              취소
            </Button>
          </EditorFooter>
          <BlogItemContentFormContainer>
            <BlogItemContentFormButton
              theme={themeStore}
              onClick={() => {
                navigator.clipboard.writeText(blogContentForm[0]);
                store.dispatch(
                  SET_TOASTIFY_MESSAGE({
                    type: "success",
                    message: "폼1이 복사되었습니다.",
                  })
                );
              }}>
              폼1
            </BlogItemContentFormButton>
            <BlogItemContentFormButton
              theme={themeStore}
              onClick={() => {
                navigator.clipboard.writeText(blogContentForm[1]);
                store.dispatch(
                  SET_TOASTIFY_MESSAGE({
                    type: "success",
                    message: "폼2이 복사되었습니다.",
                  })
                );
              }}>
              폼2
            </BlogItemContentFormButton>
            <BlogItemContentFormButton
              theme={themeStore}
              onClick={() => {
                navigator.clipboard.writeText(blogContentForm[2]);
                store.dispatch(
                  SET_TOASTIFY_MESSAGE({
                    type: "success",
                    message: "테이블1 이 복사되었습니다.",
                  })
                );
              }}>
              테1
            </BlogItemContentFormButton>
          </BlogItemContentFormContainer>
        </Container>
      )}
    </>
  );
};
export default BlogItemEditor;

const Container = styled.section`
  position: relative;
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;
  /* background: ${theme.backgroundColors.background2}; */
  .toastui-editor-toolbar {
    position: sticky;
    top: 40px;
    z-index: 1;
  }
  .toastui-editor-main {
    border-top: solid transparent 4px;
    padding-top: 4px;
  }
`;

const Title = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  /* ${themeStore.menuBackground} 이렇게 하면 무한로딩이 된다 왜 그런지 이유를
  나중에 알아보기 */
  background: ${(props) => props.themeStore.menuBackground};
  font-family: ${theme.fontFamily.cookieRunRegular};
  font-size: ${theme.fontSizes.lg};
  padding: 0px 10px;
  z-index: 2;
  border: none;

  &::placeholder {
    color: white;
  }
`;
const Description = styled.input`
  width: 100%;
  height: 30px;
  text-align: center;
  color: black;
  font-family: ${theme.fontFamily.cookieRunRegular};
  font-size: ${theme.fontSizes.md};
  z-index: 2;
  padding: 0px 10px;
  border: none;

  &::placeholder {
    color: black;
  }
`;
const EditorContainer = styled.div`
  background-color: white;
  height: calc(100vh - 300px);
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
const EditorFooter = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  position: fixed;
  bottom: 10px;
  background: rgba(255, 255, 255, 0.5);
`;

const BlogItemContentFormContainer = styled.section`
  right: 0px;
  top: 200px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
  position: fixed;
  display: flex;
  flex-flow: nowrap column;
  padding: 4px;
  background: #eaeaea;
  gap: 2px;
`;

const BlogItemContentFormButton = styled.button`
  padding: 2px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 6px -3px;
  border-radius: 4px;
`;
