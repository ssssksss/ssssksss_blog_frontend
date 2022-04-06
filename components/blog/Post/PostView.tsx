import Layout1 from "@/components/layout/Layout1";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";

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
      method: "POST",
      data: {
        id: Number(post?.id),
      },
    })
      .then((response) => {
        console.log("포스트를 성공적으로 삭제");
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
    console.log("post/index.tsx");
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
        <div> 로딩중 ... </div>
      ) : (
        <Container>
          <Title> {post?.title} </Title>
          <SubSpace>
            <ModifiedAt> {post?.modifiedAt.substring(0, 10)} </ModifiedAt>
            <UserId> {post?.userId} </UserId>
            <LikeNumber> 👍 {post?.likeNumber} </LikeNumber>
            <RemoveButton onClick={() => removePostHandler()}>
              삭제
            </RemoveButton>
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
          </SubSpace>
          <MyBlock>
            <Viewer
              initialValue={post?.content}
              theme="black"
              ref={editorRef}
            />
          </MyBlock>
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
  position: relative;
  padding: 4px;
`;
const ModifiedAt = styled.div`
  font-size: 16px;
  position: absolute;
`;
const UserId = styled.div`
  position: absolute;
  top: 30px;
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
  position: absolute;
`;
const LikeNumber = styled.button`
  position: absolute;
  border-radius: 10px;
  border: none;
  right: 205px;
  ${Button}
`;
const RemoveButton = styled.button`
  right: 75px;
  ${Button}
`;
const UpdateButton = styled.a`
  right: 140px;
  ${Button}
`;
const CancelButton = styled.button`
  right: 10px;
  ${Button}
`;
const Title = styled.h2`
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
  background: ${({ theme }) => theme.customColors.thirdTitle};
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  padding: 0px 140px;
  ${({ theme }) => theme.flex.flexCenter};
`;

const MyBlock = styled.div`
  min-height: 600px;
  margin-top: 10px;
  background: white;
  padding: 10px;
  border-radius: 0px 0px 10px 10px;
`;
