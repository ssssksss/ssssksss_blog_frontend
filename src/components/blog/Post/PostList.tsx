import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout1 from "src/components/layout/Layout1";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";

//2번째 카테고리 경로
const PostList = () => {
  const router = useRouter();
  const authStore = useSelector((state: RootState) => state.authStore);
  const secondCategory = useSelector(
    (state: RootState) => state.categoryStore.secondCategoryPath
  );
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
      if (
        window.location.pathname.split("/")[3] !== "" &&
        window.location.pathname.split("/")[3] !== "undefined"
      ) {
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

  return (
    <>
      <MenuContainer>
        {posts.length === 0 && <Blank> 아무런 게시글이 없습니다. </Blank>}
        {authStore.role === "ROLE_ADMIN" && (
          <MenuAddItem>
            <Link
              href={"/blog/[firstCategory]/[secondCategory]/[post]/add"}
              as={router.asPath + "/post/add"}
            >
              <a> 글 추가 </a>
            </Link>
          </MenuAddItem>
        )}
        {posts.map((i, index) => (
          <MenuItem key={i.id}>
            <Link
              href={"/blog/[firstCategory]/[secondCategory]/[post]"}
              as={"/blog" + i.second_href + "/" + i.id}
            >
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

const MenuContainer = styled(CF.ColumnDiv)`
  font-size: 12px;
  margin: 0px auto 10px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
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

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.8rem;
  }
  a {
    display: block;
    padding: 6px 16px;
    background: ${({ theme }) => theme.customColors.first};
    font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
  }
  a:hover {
    color: ${({ theme }) => theme.customColors.first};
    background: white;
  }
`;

const MenuItem = styled.div`
  height: 60px;
  margin: 4px 0px;
  outline: solid ${theme.backgroundColors.grayLight} 1px;
  font-size: 1rem;
  font-family: ${theme.customFonts.GmarketSansBold};
  color: white;
  background: ${theme.backgroundColors.secondary};
  border-radius: 8px;

  &:hover {
    color: ${theme.backgroundColors.secondaryDark};
    background: white;
    transition: 0.5s;
  }

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
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

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
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
  font-family: ${theme.customFonts.CookieRunRegular};
`;
const MenuDate = styled.div``;
const Blank = styled.div`
  width: 100%;
  height: 100px;
  ${({ theme }) => theme.flex.flexCenter};
  font-size: 20px;
  /* font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular}; */
`;
