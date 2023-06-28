import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import ModalFirstCategory from "../../Modal/ModalFirstCategory";
import { SET_FIRST_CATEGORY_PATH } from "@/redux/store/category/actions";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import theme from "@/styles/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { store } from "./../../../../redux/store/index";

const BlogFirstMenu = () => {
  const router = useRouter();
  const [firstCategory, setFirstCategory] = useState<FirstCategoryTypes[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryChange, setCategoryChange] = useState(false);
  const dispatch = useDispatch();
  const authStore = useSelector((state: RootState) => state.authStore);

  const firstCategoryHandler = (pathValue: string) => {
    store.dispatch(SET_FIRST_CATEGORY_PATH(pathValue));
    router.push("/blog1" + "/" + pathValue + "/temp");
  };

  useEffect(() => {
    store.dispatch(SET_FIRST_CATEGORY_PATH(window.location.pathname.split("/")[2]));
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
                }}>
                ➕
              </PlusButton>
            )}
          </Title>
        ))}
      </MenuTitle>
      <MenuContainer>
        {[1, 2, 3, 4].map((el: any, index: number) => (
          <MenuList key={el} index={index}>
            {firstCategory.map(
              (i) =>
                i.line === el && (
                  <MenuItem
                    key={i.id}
                    active={"/" + router.asPath.split("/")[2] === i.firstHref}
                    onClick={() => firstCategoryHandler(i.firstHref.split("/")[1])}>
                    {i.name} <MenuCount> {i.count} </MenuCount>
                  </MenuItem>
                )
            )}
          </MenuList>
        ))}
      </MenuContainer>
    </Container>
  );
};

export default BlogFirstMenu;

const Container = styled.div`
  margin: auto;
  padding: 10px;
  max-width: ${theme.customScreen.maxWidth};
  background-color: ${theme.backgroundColors};
`;
const MenuTitle = styled.div`
  background: ${theme.backgroundColors.purpleDark};
  color: white;
  height: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-size: ${theme.fontSizes.md};
  font-family: ${theme.fontFamily.gmarketSansBold};
  position: relative;
`;
const Title = styled.div`
  height: 40px;
  ${theme.flex.row.center.center};
  position: relative;
`;
const PlusButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  right: 2px;
  ${theme.flex.row.center.center};

  @media only screen and (max-width: ${theme.customScreen.sm}) {
    width: 10px;
    height: 10px;
    font-size: 0.8rem;
  }
`;
const MenuContainer = styled.div`
  background: ${theme.backgroundColors.purple};
  color: white;
  min-height: 260px;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  padding: 4px;
`;
const MenuList = styled.div<{ index: number }>`
  --index: ${(props) => (props.index % 4) + "s"};
  animation: ${animationKeyFrames.RightToLeftFadein} var(--index);
  display: grid;
  grid-template-rows: repeat(1fr);
  min-width: 80px;
  gap: 6px;

  &:nth-of-type(n + 2) {
    border-left: dashed 1px white;
  }
`;
const MenuItem = styled.a<{ active: boolean }>`
  ${theme.flex.row.center.center};
  background: ${(props) => (props.active ? "white" : theme.backgroundColors.purple)};
  color: ${(props) => (props.active ? theme.backgroundColors.purple : "white")};
  font-family: ${theme.fontFamily.gmarketSansBold};
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
    color: ${theme.backgroundColors.purple};
    background: white;
    & > div {
      mix-blend-mode: darken;
    }
  }

  @media only screen and (max-width: ${theme.customScreen.sm}) {
    font-size: ${theme.fontSizes.xs};
  }
`;

const MenuCount = styled.span`
  position: absolute;
  right: 4px;

  @media only screen and (max-width: ${theme.customScreen.md}) {
    display: none;
  }
`;
