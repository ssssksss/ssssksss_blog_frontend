import Layout1 from "src/components/layout/Layout1";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { store } from "@/redux/store";
import { CC } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import Button from "@/components/common/button/Button";

//postView공간
const PostView = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostTypes>();
  const editorRef = useRef<Viewer>(null);
  const [loading, setLoading] = useState(true);
  const authStore = useSelector((state: RootState) => state.authStore);

  type PostTypes = {
    id: number;
    likeNumber: number;
    modifiedAt: string;
    title: string;
    nickName: string;
    content: string;
  };

  const removePostHandler = () => {
    AxiosInstance({
      url: "/api/post",
      method: "DELETE",
      data: {
        id: post?.id,
      },
    })
      .then((response) => {
        router.push(
          window.location.pathname.substring(
            0,
            window.location.pathname.lastIndexOf("/")
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    if (
      window.location.pathname.split("/")[3] !== "" &&
      window.location.pathname.split("/")[3] !== "undefined"
    ) {
      AxiosInstance({
        url: "/api/post",
        method: "GET",
        params: {
          firstHref: window.location.pathname.split("/")[2],
          secondHref: window.location.pathname.split("/")[3],
          id: Number(window.location.pathname.split("/")[4]),
        },
      })
        .then((response) => {
          let res = response.data.data.post;
          setPost(res);
          const viewerInstance = editorRef.current?.getInstance();
          viewerInstance?.setMarkdown(res.content);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      {loading ? (
        <Container> 로딩중 ... </Container>
      ) : (
        <Container>
          <Head>
            <title> {post?.title} </title>
          </Head>
          <PostViewTitle> {post?.title} </PostViewTitle>
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
              <CC.RowDiv>
                <CC.Img
                  alt="userInfo_icon"
                  src="/img/ui-icon/userInfo_icon.png"
                  width="20px"
                  height="20px"
                  noCursor={true}
                />
                <span> : {post?.nickName} </span>
              </CC.RowDiv>
            </CC.ColumnCenterDiv>
            <CC.RowRightDiv padding="0px 5px" gap={5}>
              {authStore.role === "ROLE_ADMIN" && (
                <>
                  <Button
                    status="green"
                    onClick={() =>
                      router.push(
                        router.asPath.substring(
                          0,
                          router.asPath.lastIndexOf("/")
                        ) +
                          "/post/update?id=" +
                          post?.id
                      )
                    }
                  >
                    수정
                  </Button>
                  <Button status="lightred" onClick={() => removePostHandler()}>
                    삭제
                  </Button>
                </>
              )}
              <Button
                status="purple"
                onClick={() =>
                  router.push(
                    router.asPath.substring(0, router.asPath.lastIndexOf("/"))
                  )
                }
              >
                목록
              </Button>
            </CC.RowRightDiv>
          </PostViewHeader>
          <PostViewBody>
            <Viewer
              initialValue={post?.content}
              theme="black"
              ref={editorRef}
            />
          </PostViewBody>
        </Container>
      )}
    </>
  );
};

PostView.layout = Layout1;
export default PostView;

const Container = styled.div`
  border-radius: ${theme.borderRadius.xs};
  max-width: ${theme.customScreen.maxWidth};
  margin: 0px auto;
`;
const PostViewTitle = styled.h2`
  width: 100%;
  padding: 0px 10px;
  border-radius: 10px 10px 0px 0px;
  min-height: 40px;
  font-size: ${theme.fontSizes.md};
  background: ${theme.backgroundColors.green};
  color: white;
  font-family: ${theme.fontFamily.cookieRunRegular};
  ${theme.flex.row.center.center};
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
  margin-top: 4px;
  background: #fefefe;
  padding: 10px;
  border-radius: 0px 0px 10px 10px;
`;
