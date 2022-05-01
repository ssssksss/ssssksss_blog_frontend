import Layout1 from "@/components/layout/Layout1";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import Private from "../Auth/Private";
import Head from "next/head";

//postView공간
const PostView = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostTypes>();
  const editorRef = useRef<Viewer>(null);
  const [loading, setLoading] = useState(true);

  type PostTypes = {
    description: string;
    id: number;
    isAvailable: boolean;
    likeNumber: number;
    modifiedAt: string;
    secondHref: string;
    position: number;
    title: string;
    userId: string;
    content: string;
  };

  const removePostHandler = () => {
    AxiosInstance({
      url: "/ssssksss/post/remove",
      method: "DELETE",
      data: {
        id: Number(post?.id),
      },
    })
      .then((response) => {
        //console.log("포스트를 성공적으로 삭제");
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
    //console.log("post/index.tsx");
    if (
      window.location.pathname.split("/")[2] !== "" &&
      window.location.pathname.split("/")[2] !== "undefined"
    ) {
      AxiosInstance({
        url: "/ssssksss/post/view",
        method: "GET",
        params: {
          firstHref: window.location.pathname.split("/")[1],
          secondHref: window.location.pathname.split("/")[2],
          id: Number(window.location.pathname.split("/")[3]),
        },
      })
        .then((response) => {
          let res = response.data.data.post;
          setPost(res);
          const viewerInstance = editorRef.current?.getInstance();
          viewerInstance?.setMarkdown(res.content);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setLoading(false);
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
              <ModifiedAt>
                작성일 : {post?.modifiedAt.substring(0, 10)}{" "}
              </ModifiedAt>
              <UserId> 작성자 : {post?.userId} </UserId>
            </PostContainer1>
            <PostContainer2>
              <LikeNumber> 👍 {post?.likeNumber} </LikeNumber>
              <Private state="master">
                <Link
                  href={"/[firstCategory]/[secondCategory]/[post]/update"}
                  as={
                    router.asPath.substring(0, router.asPath.lastIndexOf("/")) +
                    "/post/update?id=" +
                    post?.id
                  }
                >
                  <UpdateButton> 수정</UpdateButton>
                </Link>
              </Private>
              <Private state="master">
                <RemoveButton onClick={() => removePostHandler()}>
                  삭제
                </RemoveButton>
              </Private>
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
                목록으로
              </CancelButton>
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
const ModifiedAt = styled.div``;
const UserId = styled.div``;
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
  ${Button}
`;
const RemoveButton = styled.button`
  ${Button}
`;
const UpdateButton = styled.a`
  ${Button}
`;
const CancelButton = styled.button`
  ${Button}
  width: 80px;
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
