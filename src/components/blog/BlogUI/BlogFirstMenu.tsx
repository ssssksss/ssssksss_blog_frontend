import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import ModalFirstCategory from "../../Modal/ModalFirstCategory";
import { FIRST_CATEGORY_ACTION } from "@/redux/store/category/actions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/reducers";

const BlogFirstMenu = () => {
  const router = useRouter();
  const [firstCategory, setFirstCategory] = useState<FirstCategoryTypes[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryChange, setCategoryChange] = useState(false);
  const dispatch = useDispatch();
  const authStore = useSelector((state: RootState) => state.authStore);

  const firstCategoryHandler = (pathValue: string) => {
    dispatch(FIRST_CATEGORY_ACTION({ firstCategoryPath: pathValue }));
  };

  useEffect(() => {
    dispatch(
      FIRST_CATEGORY_ACTION({
        firstCategoryPath: window.location.pathname.split("/")[1],
      })
    );
  }, []);

  useEffect(() => {
    AxiosInstance({
      url: "/api/first-category",
      method: "GET",
    })
      .then((response) => {
        setFirstCategory(response.data.data.firstCategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryChange]);

  type FirstCategoryTypes = {
    id: number;
    name: string;
    firstHref: string;
    line: number;
    position: number;
    count: number;
  };

  const firstCategoryTitles = [
    {
      position: 1,
      name: "프론트엔드",
    },
    {
      position: 2,
      name: "백엔드",
    },
    {
      position: 3,
      name: "서버,DB",
    },
    {
      position: 4,
      name: "기타",
    },
  ];

  const modalHandler = (e: any) => {
    setModalOpen(modalOpen ? false : true);
    if (modalOpen === true) {
      setCategoryChange(!categoryChange);
    }
  };

  return (
    <Container>
      <MenuTitle>
        {modalOpen && <ModalFirstCategory modalHandler={modalHandler} />}
        {firstCategoryTitles.map((i) => (
          <Title key={i.position}>
            <span> {i.name} </span>
            {authStore.role === "ROLE_ADMIN" && (
              <PlusButton
                value={i.position}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                +
              </PlusButton>
            )}
          </Title>
        ))}
      </MenuTitle>
      <MenuContainer>
        <MenuList>
          {firstCategory.map(
            (i) =>
              i.line === 1 && (
                <Link key={i.id} href={"/[firstCategory]"} as={i.firstHref}>
                  <MenuItem
                    active={"/" + router.asPath.split("/")[1] === i.firstHref}
                    onClick={() =>
                      firstCategoryHandler(i.firstHref.split("/")[1])
                    }
                  >
                    {i.name} <MenuCount> {i.count} </MenuCount>
                  </MenuItem>
                </Link>
              )
          )}
        </MenuList>
        <MenuList>
          {firstCategory.map(
            (i) =>
              i.line === 2 && (
                <Link key={i.id} href={"/[firstCategory]"} as={i.firstHref}>
                  <MenuItem
                    active={"/" + router.asPath.split("/")[1] === i.firstHref}
                    onClick={() =>
                      firstCategoryHandler(i.firstHref.split("/")[1])
                    }
                  >
                    {i.name} <MenuCount> {i.count} </MenuCount>
                  </MenuItem>
                </Link>
              )
          )}
        </MenuList>
        <MenuList>
          {firstCategory.map(
            (i) =>
              i.line === 3 && (
                <Link key={i.id} href={"/[firstCategory]"} as={i.firstHref}>
                  <MenuItem
                    active={"/" + router.asPath.split("/")[1] === i.firstHref}
                    onClick={() =>
                      firstCategoryHandler(i.firstHref.split("/")[1])
                    }
                  >
                    {i.name} <MenuCount> {i.count} </MenuCount>
                  </MenuItem>
                </Link>
              )
          )}
        </MenuList>
        <MenuList>
          {firstCategory.map(
            (i) =>
              i.line === 4 && (
                <Link key={i.id} href={"/[firstCategory]"} as={i.firstHref}>
                  <MenuItem
                    active={"/" + router.asPath.split("/")[1] === i.firstHref}
                    onClick={() =>
                      firstCategoryHandler(i.firstHref.split("/")[1])
                    }
                  >
                    {i.name} <MenuCount> {i.count} </MenuCount>
                  </MenuItem>
                </Link>
              )
          )}
        </MenuList>
      </MenuContainer>
    </Container>
  );
};

export default BlogFirstMenu;

const Container = styled.div`
  margin: 10px auto;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
`;
const MenuTitle = styled.div`
  background: ${({ theme }) => theme.customColors.firstTitle};
  color: white;
  height: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-size: 20px;
  border-radius: 10px 10px 0px 0px;
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
  position: relative;

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 14px;
  }
`;
const Title = styled.div`
  width: 100%;
  height: 40px;
  ${({ theme }) => theme.flex.flexCenter};
  position: relative;
  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.8rem;
  }
`;
const PlusButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  right: 2px;
  ${({ theme }) => theme.flex.flexCenter};

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    width: 10px;
    height: 10px;
    font-size: 0.8rem;
  }
`;
const MenuContainer = styled.div`
  background: ${({ theme }) => theme.customColors.first};
  color: white;
  min-height: 260px;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  border-radius: 0px 0px 10px 10px;
  padding: 4px;
`;
const MenuList = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr);
  min-width: 80px;
  gap: 6px;

  &:nth-child(n + 2) {
    border-left: dashed 1px white;
  }

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    a {
      font-size: 10px;
    }
  }
`;
const MenuItem = styled.a<{ active: boolean }>`
  ${({ theme }) => theme.flex.flexCenter};
  background: ${(props) =>
    props.active ? "white" : ({ theme }) => theme.customColors.first};
  color: ${(props) =>
    props.active ? ({ theme }) => theme.customColors.first : "white"};
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.active &&
    css`
      & > div {
        mix-blend-mode: darken;
      }
    `}

  &:hover {
    color: ${({ theme }) => theme.customColors.first};
    background: white;

    & > div {
      mix-blend-mode: darken;
    }
  }
`;

const MenuCount = styled.div`
  position: absolute;
  right: 4px;
  width: 28px;
  padding: 2px 2px 2px 0px;
  display: flex;
  justify-content: end;
`;
