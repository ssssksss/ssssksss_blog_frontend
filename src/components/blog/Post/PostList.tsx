import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout1 from "src/components/layout/Layout1";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import AxiosInstance from "@/utils/axios/AxiosInstance";

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
    user_id: string;
  };

  useEffect(() => {
    if (secondCategory !== "") {
      if (
        window.location.pathname.split("/")[2] !== "" &&
        window.location.pathname.split("/")[2] !== "undefined"
      ) {
        AxiosInstance({
          url: "/ssssksss/posts",
          method: "GET",
          params: {
            firstHref: window.location.pathname.split("/")[1],
            secondHref: window.location.pathname.split("/")[2],
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
    <React.StrictMode>
      <MenuContainer>
        {posts.length === 0 && <Blank> 아무런 게시글이 없습니다. </Blank>}
        {authStore.role === "ROLE_ADMIN" && (
          <MenuAddItem>
            <Link
              href={"/[firstCategory]/[secondCategory]/[post]/add"}
              as={router.asPath + "/post/add"}
            >
              <a> +++ 내용 추가 +++ </a>
            </Link>
          </MenuAddItem>
        )}
        {posts.map((i, index) => (
          <MenuItem key={i.id}>
            <Link
              href={"/[firstCategory]/[secondCategory]/[post]"}
              as={i.second_href + "/" + i.id}
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
    </React.StrictMode>
  );
};
PostList.layout = Layout1;
export default PostList;

const MenuContainer = styled.div`
  background: ${({ theme }) => theme.customColors.third};
  font-size: 12px;
  padding: 4px;
  margin: auto;
  border-radius: 10px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
`;
const CommonMenuItemStyle = css`
  height: 60px;
  margin: 4px 0px;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  background: ${({ theme }) => theme.customColors.first};
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
`;
const MenuAddItem = styled.div`
  ${CommonMenuItemStyle};
  font-size: 1rem;

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.8rem;
  }
  a {
    display: block;
    height: 100%;
    border-radius: 10px;
    ${({ theme }) => theme.flex.flexCenter};
  }
  a:hover {
    color: ${({ theme }) => theme.customColors.first};
    background: white;
  }
`;
const MenuItem = styled.div`
  ${CommonMenuItemStyle};
  font-size: 1rem;

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.8rem;
  }

  &:hover {
    color: ${({ theme }) => theme.customColors.first};
    background: white;
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
  padding: 6px 16px 0px 10px;
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
  color: #dddddd;
  align-content: space-around;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const MenuDate = styled.div``;
const Blank = styled.div`
  width: 100%;
  height: 100px;
  ${({ theme }) => theme.flex.flexCenter};
  font-size: 20px;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
`;
