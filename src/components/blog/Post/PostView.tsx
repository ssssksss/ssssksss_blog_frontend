import Layout1 from "src/components/layout/Layout1";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { store } from "@/redux/store";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { animationKeyFrames } from "@/styles/animationKeyFrames";

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
          <Title> {post?.title} </Title>
          <SubSpace>
            <PostContainer1>
              <CF.RowDiv>
                <CF.Img
                  alt="schedule_icon"
                  src="/img/ui-icon/schedule_icon.png"
                  width="20px"
                  height="20px"
                  noCursor={true}
                />
                : {post?.modifiedAt.substring(0, 10)}
              </CF.RowDiv>
              <CF.RowDiv>
                <CF.Img
                  alt="userInfo_icon"
                  src="/img/ui-icon/userInfo_icon.png"
                  width="20px"
                  height="20px"
                  noCursor={true}
                />
                : {post?.nickName}
              </CF.RowDiv>
            </PostContainer1>
            <PostContainer2>
              {authStore.role === "ROLE_ADMIN" && (
                <>
                  <Button
                    actionType="edit"
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
                  <Button
                    actionType="remove"
                    onClick={() => removePostHandler()}
                  >
                    삭제
                  </Button>
                </>
              )}
              <Button actionType="list" onClick={() => router.back()}>
                목록
              </Button>
            </PostContainer2>
          </SubSpace>
          <ViewerContainer>
            <Viewer
              initialValue={post?.content}
              theme="black"
              ref={editorRef}
            />
          </ViewerContainer>
        </Container>
      )}
    </>
  );
};

PostView.layout = Layout1;
export default PostView;

const Container = styled.div`
  border-radius: 10px;
  font-size: 12px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  margin: 0px auto;
  padding: 10px 10px;
`;
const SubSpace = styled.div`
  width: 100%;
  height: 60px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  background: white;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
`;
const PostContainer1 = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  gap: 4px;
  padding: 0px 4px;
  font-family: ${theme.customFonts.CookieRunRegular};

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.8rem;
  }
`;

const PostContainer2 = styled.div`
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
  padding: 0px 10px;
  gap: 5px;

  & > img:hover {
    cursor: pointer;
  }
`;
const Button = styled.button<{ actionType?: string }>`
  width: 100px;
  height: 40px;
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  align-items: center;
  padding: 0px 4px;
  font-family: ${theme.customFonts.CookieRunRegular};
  font-size: 16px;
  border-radius: 10px;

  ${(props) =>
    props.actionType === "edit" &&
    css`
      background-color: ${theme.backgroundColors.fifth};
    `}

  ${(props) =>
    props.actionType === "remove" &&
    css`
      background-color: ${theme.backgroundColors.fourth};
    `}

  ${(props) =>
    props.actionType === "list" &&
    css`
      background-color: ${theme.backgroundColors.secondary};
    `}

    &:hover {
    color: white;
    animation: ${animationKeyFrames.UpToDownRepeat} 1s infinite;
    height: 48px;
  }
`;
const Title = styled.h2`
  width: 100%;
  min-height: 40px;
  font-size: 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
  background: ${theme.backgroundColors.primary};
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  padding: 0px 10px;
  ${({ theme }) => theme.flex.flexCenter};
`;

const ViewerContainer = styled.div`
  min-height: 600px;
  margin-top: 10px;
  background: white;
  padding: 10px;
  border-radius: 0px 0px 10px 10px;
`;
