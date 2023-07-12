import AxiosInstance from "@/utils/axios/AxiosInstance";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { store } from "@/redux/store";
import { CC } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import Button from "@/components/common/button/Button";
import { SET_TOASTIFY_MESSAGE } from "@/redux/store/toastify";
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogItemView.tsx
 * @version 0.0.1 "2023-06-21 01:20:28"
 * @description 설명
 */

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

type PostTypes = {
  id: number;
  likeNumber: number;
  modifiedAt: string;
  title: string;
  nickName: string;
  content: string;
};

const BlogItemView = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [post, setPost] = useState<PostTypes>();
  const editorRef = useRef<Viewer>(null);
  const [loading, setLoading] = useState(true);
  const authStore = useSelector((state: RootState) => state.authStore);
  const themeStore = useSelector((state: RootState) => state.themeStore);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [blogIndexList, setBlogIndexList] = useState<{ content: String; top: Number; tagName: String }>([]);
  const [createBlogIndexFlag, setCreateBlogIndexFlag] = useState(false);

  const removePostHandler = () => {
    AxiosInstance({
      url: "/api/blog-item",
      method: "DELETE",
      data: {
        id: post?.id,
      },
    })
      .then((response) => {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: "success",
            message: "삭제 되었습니다.",
          })
        );
        router.push(window.location.href.substring(0, window.location.href.lastIndexOf("/")));
      })
      .catch((error) => {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: "error",
            message: error.response?.data?.msg,
          })
        );
      });
  };

  useEffect(() => {
    setLoading(true);
    if (window.location.pathname.split("/")[3] !== "" && window.location.pathname.split("/")[3] !== "undefined") {
      AxiosInstance({
        url: "/api/blog-item",
        method: "GET",
        params: {
          id: window.location.pathname.split("/")[4],
        },
      })
        .then((response) => {
          let res = response.data.data.blogItem;
          setPost(res);
          const viewerInstance = editorRef.current?.getInstance();
          viewerInstance?.setMarkdown(res.content);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response?.data.statusCode === 400) {
            store.dispatch(
              SET_TOASTIFY_MESSAGE({
                type: "error",
                message: error.response.data.msg,
              })
            );
          }
          setLoading(false);
          router.push(window.location.href.substring(0, window.location.href.lastIndexOf("/")));
        });
    }
  }, []);

  /**
   *
   * @description 블로그 글 인덱스 목록을 만들어주는 함수
   */
  const createBlogIndex = () => {
    if (createBlogIndexFlag) return;
    setCreateBlogIndexFlag(true);
    let temp = document.getElementsByClassName("toastui-editor-contents")[0].querySelectorAll("h1,h2,h3,h4,h5,h6");
    let htmlTagIndexTempArray = [];
    temp.forEach((i) => {
      htmlTagIndexTempArray.push({
        content: i.textContent,
        top: i.getBoundingClientRect().top,
        tagName: i.tagName,
      });
    });
    setBlogIndexList(htmlTagIndexTempArray);
  };

  return (
    <>
      {loading ? (
        <Container> 로딩중 ... </Container>
      ) : (
        <Container>
          {isOpenModal ? (
            <BlogItemIndexSection theme={themeStore}>
              <HeaderContainer theme={themeStore}>
                <Title theme={themeStore} onClick={() => setIsOpenModal(false)}>
                  목차
                </Title>
                <Exit onClick={() => setIsOpenModal(false)}>
                  <div> </div>
                  <div> </div>
                  <div> </div>
                </Exit>
              </HeaderContainer>
              <BodyContainer theme={themeStore}>
                {blogIndexList.map((i, index) => (
                  <button key={index} onClick={() => scrollTo(0, i.top - 40)} className={i.tagName}>
                    {i.content}
                  </button>
                ))}
              </BodyContainer>
            </BlogItemIndexSection>
          ) : (
            <BlogItemIndexSectionButton
              theme={themeStore}
              onClick={() => {
                createBlogIndex();
                setIsOpenModal(true);
              }}>
              <CC.Img width={"24px"} alt="blog_index" src="/img/ui-icon/list_index_icon.png" />
            </BlogItemIndexSectionButton>
          )}
          <Head>
            <title> {post?.title} </title>
          </Head>
          <PostViewTitle themeStore={themeStore}> {post?.title} </PostViewTitle>
          <PostViewDescription> {post?.description} </PostViewDescription>
          <PostViewHeader>
            <CC.ColumnCenterDiv padding="4px">
              <CC.RowDiv>
                <CC.Img
                  alt="schedule_icon"
                  src="/img/ui-icon/schedule_icon.png"
                  width="20px"
                  height="20px"
                  noCursor={true}
                />
                <span> : {post?.modifiedAt.substring(0, 10)} </span>
              </CC.RowDiv>
              <CC.RowDiv gap={4}>
                <CC.RowDiv>
                  <CC.Img
                    alt="userInfo_icon"
                    src="/img/ui-icon/userInfo_icon.png"
                    width="20px"
                    height="20px"
                    noCursor={true}
                  />
                  <span> : {post?.userName} </span>
                </CC.RowDiv>
                <CC.RowDiv gap={2}>
                  <CC.Img
                    alt="userInfo_icon"
                    src="/img/ui-icon/blog_category_directory.png"
                    width="20px"
                    height="20px"
                    noCursor={true}
                  />
                  <Button
                    onClick={() => router.push(router.asPath.substring(0, router.asPath.lastIndexOf("/")))}
                    padding={"2px"}>
                    {router.asPath.split("/")[2] + "/" + router.asPath.split("/")[3]}
                  </Button>
                </CC.RowDiv>
              </CC.RowDiv>
            </CC.ColumnCenterDiv>
            <CC.RowRightDiv padding="0px 5px" gap={5}>
              {authStore.role === "ROLE_ADMIN" && (
                <>
                  <Button
                    padding={"2px"}
                    status="green"
                    size={"40px"}
                    onClick={() =>
                      router.push(router.asPath.substring(0, router.asPath.lastIndexOf("/")) + "/update?id=" + post?.id)
                    }>
                    수정
                  </Button>
                  <Button size={"40px"} status="lightred" padding={"2px"} onClick={() => removePostHandler()}>
                    삭제
                  </Button>
                </>
              )}
            </CC.RowRightDiv>
          </PostViewHeader>
          <PostViewBody>
            <Viewer
              initialValue={post?.content}
              theme="black"
              ref={editorRef}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
          </PostViewBody>
        </Container>
      )}
    </>
  );
};
export default BlogItemView;

const Container = styled.section`
  border-radius: 10px;
  padding: 10px 10px 0px 10px;
  font-size: ${theme.fontSizes.sm};
  margin: 0px auto;
`;
const PostViewTitle = styled.h2`
  width: 100%;
  padding: 0px 10px;
  border-radius: 10px 10px 0px 0px;
  min-height: 40px;
  font-size: ${theme.fontSizes.md};
  color: white;
  background: ${(props) => props.themeStore.menuBackground};
  font-family: ${theme.fontFamily.cookieRunRegular};
  ${theme.flex.row.center.center};
`;

const PostViewDescription = styled.div`
  width: 100%;
  padding: 0px 10px;
  min-height: 40px;
  font-size: ${theme.fontSizes.sm};
  color: #fafafa;
  font-family: ${theme.fontFamily.cookieRunRegular};
  ${theme.flex.row.center.center};
  background-color: rgba(200, 200, 200, 0.5);
  border-top: solid #aeaeae 1px;
`;
const PostViewHeader = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-family: ${theme.fontFamily.cookieRunRegular};
  background: white;
  display: flex;
  justify-content: space-between;
`;
const PostViewBody = styled.div`
  min-height: 600px;
  margin-top: 1px;
  background: #fefefe;
  padding: 10px;
  border-radius: 0px 0px 10px 10px;
  background-color: rgba(250, 250, 250, 0.9);
`;
const BlogItemIndexSection = styled.nav`
  right: 0px;
  top: 180px;
  width: 200px;
  height: 300px;
  overflow: scroll;
  position: fixed;
  z-index: 20;
  /* IE and Edge , Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* Chrome, Safari, Opera*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: ${(props: any) => props.theme.menuBackground};
  z-index: 20;
  transform: translateZ(0);
`;
const Title = styled.div`
  padding-left: 10px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${(props: any) => props.theme.menuIconFontColor};
  border-bottom: solid black 1px;

  &:hover {
    cursor: pointer;
  }
`;
const Exit = styled.button`
  cursor: pointer;
  width: 20px;
  height: 20px;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  transform: translateZ(0);

  & > div {
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: #000;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
    transform: translateZ(0);
  }

  & > div:nth-of-type(1) {
    top: 50%;
    transform: translate(0px, -50%) rotate(405deg);
  }

  & > div:nth-of-type(2) {
    opacity: 0;
    transform: translate(0px, -50%) rotate(360deg);
  }

  & > div:nth-of-type(3) {
    top: 50%;
    transform: translate(0px, -50%) rotate(-405deg);
  }
`;
const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: nowrap column;
  background-color: ${(props: any) => props.theme.menuBackground};
  padding: 2px;
  justify-content: start;

  button {
    display: flex;
    justify-content: start;
    align-items: start;
    text-align: start;
    :hover {
      background-color: ${(props: any) => props.theme.menuBackground};
    }
  }

  .H1 {
    color: #f91600;
    padding: 4px 0px;
    background-color: #dedede;
    &:hover {
      color: #fefefe;
    }
  }
  .H2 {
    padding-left: 2px;
    color: #f99700;
    &:hover {
      color: #fefefe;
    }
  }
  .H3 {
    padding-left: 6px;
    color: #1200ff;
    &:hover {
      color: #fefefe;
    }
  }
  .H4 {
    padding-left: 8px;
    color: #cb00ff;
    &:hover {
      color: #fefefe;
    }
  }
  .H5 {
    padding-left: 10px;
    background-color: #f0f0f0;
    &:hover {
      color: #fefefe;
    }
  }
  .H6 {
    padding-left: 12px;
    &:hover {
      color: #fefefe;
    }
  }
`;

const BlogItemIndexSectionButton = styled.button`
  width: 30px;
  aspect-ratio: 1;
  right: 0px;
  top: 180px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
  position: fixed;
  z-index: 30;
  border: solid black 1px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 0px;
  &:hover {
    background-color: ${(props: any) => props.theme.menuBackground};
  }
`;
