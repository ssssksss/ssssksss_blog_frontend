import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout1 from "@/components/layout/Layout1";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import AxiosInstance from "@/utils/axios/AxiosInstance";

//2번째 카테고리 경로
const PostList = () => {
  const router = useRouter();
  const secondPath = useSelector(
    (state: RootState) => state.category.secondCategoryPath
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
    if (
      window.location.pathname.split("/")[2] !== "" &&
      window.location.pathname.split("/")[2] !== "undefined"
    ) {
      AxiosInstance({
        url: "/ssssksss/post/read",
        method: "GET",
        params: {
          firstHref: window.location.pathname.split("/")[1],
          secondHref: window.location.pathname.split("/")[2],
        },
      })
        .then((response) => {
          let res = response.data.data.posts;
          console.log(res);
          setPosts(res);
          console.log("세번째 카테고리를 성공적으로 받음");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [secondPath]);

  return (
    <React.StrictMode>
      <MenuContainer>
        {posts.length === 0 && <Blank> 아무런 게시글이 없습니다. </Blank>}
        {posts.map((i) => (
          <MenuItem key={i.id}>
            <Link
              href={"/[firstCategory]/[secondCategory]/[post]"}
              as={i.second_href + "/" + i.id}
            >
              <Item>
                <p>
                  [{i.position}] {i.title}{" "}
                </p>
                <MenuDate> {i.modified_at.substring(0, 10)} </MenuDate>
                <Description> {i.description} </Description>
                <div> 👍 {i.like_number} </div>
              </Item>
            </Link>
          </MenuItem>
        ))}
        <MenuItem>
          <Link
            href={"/[firstCategory]/[secondCategory]/[post]/add"}
            as={router.asPath + "/post/add"}
          >
            <MenuAddItem> +++ 내용 추가 +++ </MenuAddItem>
          </Link>
        </MenuItem>
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
  height: 80px;
  margin: 4px 0px;
  padding: 4px;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  background: ${({ theme }) => theme.customColors.first};
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
`;
const MenuItem = styled.div`
  ${CommonMenuItemStyle};
  font-size: 1rem;

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 14px;
  }

  &:hover {
    color: ${({ theme }) => theme.customColors.first};
    background: white;
  }
`;
const Item = styled.a`
  display: grid;
  height: 100%;
  grid-template-columns: auto 140px;
  align-content: space-around;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px 5px;
  cursor: pointer;

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    grid-template-columns: auto 120px;
  }
`;
const Description = styled.div`
  color: #dddddd;
`;
const MenuDate = styled.div``;
const MenuAddItem = styled.a`
  height: 100%;
  padding: 0px 5px;
  cursor: pointer;
  ${({ theme }) => theme.flex.flexCenter};
`;
const Blank = styled.div`
  width: 100%;
  height: 100px;
  ${({ theme }) => theme.flex.flexCenter};
  font-size: 20px;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
`;
