import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout1 from "src/components/layout/Layout1";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { CC } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import Loading1 from "@/components/common/loading/Loading1";

//2번째 카테고리 경로
const PostList = () => {
  const router = useRouter();
  const authStore = useSelector((state: RootState) => state.authStore);
  const secondCategory = useSelector((state: RootState) => state.categoryStore);
  const [posts, setPosts] = useState<PostsTypes[]>([]);

  type PostsTypes = {
    id: number;
    description: string;
    like_number: number;
    modified_at: string;
    second_href: string;
    position: number;
    access_yn: boolean;
    title: string;
    nick_name: string;
  };

  useEffect(() => {
    if (secondCategory !== "") {
      if (window.location.pathname.split("/")[3] !== "" && window.location.pathname.split("/")[3] !== "undefined") {
        AxiosInstance({
          url: "/api/posts",
          method: "GET",
          params: {
            firstHref: window.location.pathname.split("/")[2],
            secondHref: window.location.pathname.split("/")[3],
          },
        })
          .then((response) => {
            let res = response.data.data.posts;
            setPosts(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [secondCategory]);

  if (router.isFallback) {
    return (
      <div>
        <Loading1 />
      </div>
    );
  }

  return (
    <>
      <MenuContainer>
        {posts.length === 0 && <Blank> 아무런 게시글이 없습니다. </Blank>}
        {authStore.role === "ROLE_ADMIN" && (
          <MenuAddItem>
            <Link href={"/blog/[firstCategory]/[secondCategory]/[post]/add"} as={router.asPath + "/post/add"}>
              <a> 글 추가 </a>
            </Link>
          </MenuAddItem>
        )}
        {posts.map((i, index) => (
          <MenuItem key={i.id}>
            <Link href={"/blog/[firstCategory]/[secondCategory]/[post]"} as={"/blog" + i.second_href + "/" + i.id}>
              <Item>
                <ItemTitle>
                  [{index + 1}] {i.title}
                </ItemTitle>
                <MenuDate> {i.modified_at.substring(0, 10)} </MenuDate>
                <Description> {i.description} </Description>
                <div> 👍 {i.like_number} </div>
              </Item>
            </Link>
          </MenuItem>
        ))}
      </MenuContainer>
    </>
  );
};
PostList.layout = Layout1;
export default PostList;

const MenuContainer = styled(CC.ColumnDiv)`
  font-size: 12px;
  margin: 0px auto 10px;
  max-width: ${theme.customScreen.maxWidth};
  position: relative;
  padding: 4px 10px;
  gap: 4px;
  border-top: solid ${theme.backgroundColors.gray} 4px;
  border-bottom: solid ${theme.backgroundColors.gray} 4px;
`;

const MenuAddItem = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 30px;
  align-items: center;
  color: white;

  @media only screen and (max-width: ${theme.customScreen.sm}) {
    font-size: 0.8rem;
  }
  a {
    display: block;
    padding: 6px 16px;
    background: ${theme.backgroundColors.orange};
    font-family: ${theme.fontFamily.gmarketSansBold};
  }
  a:hover {
    color: ${theme.backgroundColors.orange};
    background: white;
  }
`;

const MenuItem = styled.div`
  height: 60px;
  margin: 4px 0px;
  outline: solid ${theme.backgroundColors.grayLight} 1px;
  font-size: 1rem;
  font-family: ${theme.fontFamily.gmarketSansBold};
  color: white;
  background: ${theme.backgroundColors.purple};
  border-radius: 8px;

  &:hover {
    color: ${theme.backgroundColors.purpleDark};
    background: white;
    transition: 0.5s;
  }

  @media only screen and (max-width: ${theme.customScreen.sm}) {
    font-size: 0.8rem;
  }

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(236, 222, 227, 1) 0%,
      rgba(222, 220, 233, 1) 20%,
      rgba(202, 208, 224, 1) 40%,
      rgba(209, 199, 214, 1) 60%,
      rgba(239, 199, 200, 1) 80%,
      rgba(244, 231, 206, 1) 100%
    );
    transition: 1s;
  }
`;
const Item = styled.a`
  display: grid;
  height: 100%;
  grid-template-columns: calc(100% - 100px) 100px;
  gap: 0px 5px;
  align-content: space-evenly;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 6px 10px 0px;
  cursor: pointer;
  line-height: normal;

  @media only screen and (max-width: ${theme.customScreen.sm}) {
    grid-template-columns: auto 80px;
  }
`;
const ItemTitle = styled.p`
  align-content: space-around;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Description = styled.div`
  color: ${theme.backgroundColors.grayLight};
  align-content: space-around;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-family: ${theme.fontFamily.cookieRunRegular};
`;
const MenuDate = styled.div``;
const Blank = styled.div`
  width: 100%;
  height: 100px;
  ${theme.flex.row.center.center};
  font-size: 20px;
`;
