import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import Link from "next/link";
import ModalSecondCategory from "../../Modal/ModalSecondCategory";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/reducers";
import { SECOND_CATEGORY_ACTION } from "@/store/category/actions";

const BlogSecondMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [secondCategory, setSecondCategory] = useState<SecondCategoryTypes[]>(
    []
  );
  const [categoryChange, setCategoryChange] = useState(false);
  const firstCategory = useSelector(
    (state: RootState) => state.category.firstCategoryPath
  );

  const SecondCategoryHandler = (pathValue: string) => {
    dispatch(SECOND_CATEGORY_ACTION({ secondCategoryPath: pathValue }));
  };

  type SecondCategoryTypes = {
    id: number;
    name: string;
    secondHref: string;
    firstHref: string;
    position: number;
  };

  useEffect(() => {
    dispatch(
      SECOND_CATEGORY_ACTION({
        secondCategoryPath: window.location.pathname.split("/")[2],
      })
    );
  }, []);

  useEffect(() => {
    console.log("BlogSecondMenu.tsx");
    async function func() {
      if (
        window.location.pathname.split("/")[1] !== undefined &&
        window.location.pathname.split("/")[1] !== null
      ) {
        await AxiosInstance({
          url: "/ssssksss/second-category/read",
          method: "GET",
          params: {
            firstHref: firstCategory,
          },
        })
          .then((response) => {
            let res = response.data.data.secondCategory;
            setSecondCategory(res);
            console.log("두번째 카테고리를 성공적으로 받음");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    func();
  }, [categoryChange, firstCategory]);

  const modalHandler = (e: any) => {
    setModalOpen(modalOpen ? false : true);
    if (modalOpen === true) {
      setCategoryChange(!categoryChange);
    }
  };

  return (
    <Container>
      {modalOpen && <ModalSecondCategory modalHandler={modalHandler} />}
      {firstCategory !== "" && (
        <>
          <MenuTitle>
            <span>{firstCategory}</span>
            <button
              onClick={() => {
                setModalOpen(true);
              }}
            >
              +
            </button>
          </MenuTitle>
          <MenuContainer>
            {secondCategory.map((i) => (
              <Link key={i.id} href={i.secondHref}>
                <MenuItem
                  active={router.asPath === i.secondHref}
                  onClick={() => SecondCategoryHandler(i.secondHref)}
                >
                  {i.name}
                </MenuItem>
              </Link>
            ))}
          </MenuContainer>
        </>
      )}
    </Container>
  );
};

export default BlogSecondMenu;

const Container = styled.div`
  margin: 10px auto;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
`;
const MenuTitle = styled.div`
  background: ${({ theme }) => theme.customColors.secondTitle};
  color: white;
  height: 40px;
  font-size: 20px;
  border-radius: 10px 10px 0px 0px;
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
  ${({ theme }) => theme.flex.flexCenter};

  button {
    border-radius: 10px;
    margin-left: 4px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.8rem;
  }
`;
const MenuContainer = styled.div`
  background: ${({ theme }) => theme.customColors.second};
  color: white;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px 0px;
  border-radius: 0px 0px 10px 10px;
  padding: 10px 4px;
  font-size: 1rem;

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.6rem;
  }
`;

const MenuItem = styled.a<{ active: boolean }>`
  height: 30px;

  &:nth-child(4n + 2),
  &:nth-child(4n + 3),
  &:nth-child(4n + 4) {
    border-left: dashed 1px black;
  }

  ${({ theme }) => theme.flex.flexCenter};
  background: ${(props) =>
    props.active ? "white" : ({ theme }) => theme.customColors.second};
  color: ${(props) =>
    props.active ? ({ theme }) => theme.customColors.second : "white"};
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.customColors.second};
    background: white;
  }
`;
