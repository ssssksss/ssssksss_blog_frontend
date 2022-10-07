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
                  alt="calendar_icon"
                  src="/img/ui-icon/calendar_icon.png"
                  width="20px"
                  height="20px"
                  noCursor={true}
                />
                : {post?.modifiedAt.substring(0, 10)}{" "}
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
              <LikeNumber>
                <CF.Img
                  alt="post_thumb_up"
                  src="/img/ui-icon/thumb_up_icon.png"
                  width="30px"
                  height="30px"
                />
                {post?.likeNumber}
              </LikeNumber>
              {authStore.role === "ROLE_ADMIN" && (
                <>
                  <CF.Img
                    alt="post_edit"
                    src="/img/ui-icon/edit_icon.png"
                    width="30px"
                    height="30px"
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
                  />
                  <CF.Img
                    alt="post_delete"
                    src="/img/ui-icon/delete_icon.png"
                    width="30px"
                    height="30px"
                    onClick={() => removePostHandler()}
                  />
                </>
              )}
              <CF.Img
                alt="post_list"
                src="/img/ui-icon/list_icon.png"
                width="30px"
                height="30px"
                onClick={() =>
                  router.push(
                    "/blog/" +
                      router.asPath.split("/")[2] +
                      "/" +
                      router.asPath.split("/")[3]
                  )
                }
              />
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
  background: ${({ theme }) => theme.customColors.third};
  border-radius: 10px;
  padding: 10px;
  font-size: 12px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  margin: 0px auto;
`;
const SubSpace = styled.div`
  width: 100%;
  height: 60px;
  font-size: 20px;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  background: white;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
`;
const PostContainer1 = styled.div`
  height: 60px;
  display: flex;
  flex-flow: wrap column;
  justify-content: space-evenly;
  padding: 0px 10px;

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
`;
const Button = css`
  width: 60px;
  height: 30px;
  background: #aeaeae;
  border-radius: 10px;
  border: none;
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  ${({ theme }) => theme.flex.flexCenter};
  cursor: pointer;
  &:hover {
    background: white;
  }
  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    width: 40px;
    font-size: 0.8rem;
  }
`;
const LikeNumber = styled.button`
  border-radius: 10px;
  border: none;
`;
const Title = styled.h2`
  width: 100%;
  min-height: 40px;
  font-size: 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
  background: ${({ theme }) => theme.customColors.thirdTitle};
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
