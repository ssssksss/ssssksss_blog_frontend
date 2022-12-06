import React, { useState, useEffect, useLayoutEffect } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import Link from "next/link";
import ModalSecondCategory from "../../Modal/ModalSecondCategory";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { SECOND_CATEGORY_ACTION } from "@/redux/store/category/actions";
import { CC } from "../../../../styles/commonComponentStyle";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import theme from "@/styles/theme";
import { Spinner4 } from "@/components/common/spinner/Spinners";

const BlogSecondMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [isHideMenu, setIsHideMenu] = useState(true);
  const authStore = useSelector((state: RootState) => state.authStore);
  const [isLoading, setIsLoading] = useState(true);
  const [secondCategory, setSecondCategory] = useState<
    SecondCategoryTypes[] | null
  >([]);
  const [categoryChange, setCategoryChange] = useState(false);
  const firstCategory = useSelector(
    (state: RootState) => state.categoryStore.firstCategoryPath
  );
  const SecondCategoryHandler = async (pathValue: string) => {
    await dispatch(SECOND_CATEGORY_ACTION({ secondCategoryPath: pathValue }));
    router.push("/blog" + pathValue);
  };

  type SecondCategoryTypes = {
    id: number;
    name: string;
    secondHref: string;
    firstHref: string;
    position: number;
    count: number;
  };

  useEffect(() => {
    dispatch(
      SECOND_CATEGORY_ACTION({
        secondCategoryPath: window.location.pathname.split("/")[3],
      })
    );
  }, []);

  useEffect(() => {
    if (firstCategory) {
      AxiosInstance({
        url: "/api/second-category",
        method: "GET",
        params: {
          firstHref: firstCategory,
        },
      })
        .then((response) => {
          setSecondCategory(response.data.data.secondCategory);
          setIsLoading(false);
        })
        .catch((error) => {
          setSecondCategory([]);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [categoryChange, firstCategory]);

  const modalHandler = (e: any) => {
    if (modalOpen === true) {
      setCategoryChange(!categoryChange);
    }
    setModalOpen(modalOpen ? false : true);
  };

  return (
    <>
      {isLoading ? (
        <Spinner4 />
      ) : (
        <Container>
          {modalOpen && <ModalSecondCategory modalHandler={modalHandler} />}
          {firstCategory && router.asPath.split("/blog")[1] && (
            <>
              <MenuTitle>
                <span>{firstCategory}</span>
                {authStore.role === "ROLE_ADMIN" && (
                  <button
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    ➕
                  </button>
                )}
                <MenuHideButton onClick={() => setIsHideMenu((prev) => !prev)}>
                  {isHideMenu ? "🔽" : "🔼"}
                </MenuHideButton>
              </MenuTitle>
              {isHideMenu && (
                <>
                  {secondCategory?.length ? (
                    <MenuContainer>
                      {secondCategory?.map((i, index) => (
                        <MenuItem
                          key={i.id}
                          active={
                            i.firstHref + "/" + router.asPath.split("/")[3] ===
                            i.secondHref
                          }
                          index={index}
                          onClick={() => SecondCategoryHandler(i.secondHref)}
                        >
                          <span> {i.name} </span>
                          <MenuCount> {i.count} </MenuCount>
                        </MenuItem>
                      ))}
                    </MenuContainer>
                  ) : (
                    <DisplayDiv> 2차 카테고리가 존재하지 않습니다. </DisplayDiv>
                  )}
                </>
              )}
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default BlogSecondMenu;

const Container = styled.div`
  margin: auto;
  padding: 10px;
  max-width: ${theme.customScreen.maxWidth};
  background-color: ${theme.backgroundColors.background2};
`;
const MenuTitle = styled.div`
  gap: 4px;
  background: ${theme.backgroundColors.orange};
  color: white;
  height: 40px;
  font-size: ${theme.fontSizes.md};
  font-family: ${theme.fontFamily.gmarketSansBold};
  position: relative;
  ${theme.flex.row.center.center};

  button {
    border-radius: 10px;
    margin-left: 4px;
    background: transparent;
  }
`;
const MenuContainer = styled.div`
  background: ${theme.backgroundColors.orangeLight};
  color: white;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px 0px;
  padding: 10px 4px;
`;

const MenuItem = styled.button<{ active: boolean; index: number }>`
  height: 30px;
  --index: ${(props) => (props.index % 4) + "s"};
  animation: ${animationKeyFrames.RightToLeftFadein} var(--index);
  font-size: ${theme.fontSizes.sm};
  color: ${(props) => (props.active ? theme.backgroundColors.orange : "white")};
  background: ${(props) => (props.active ? "white" : "transparent")};
  font-family: ${theme.fontFamily.gmarketSansBold};
  cursor: pointer;
  position: relative;
  ${theme.flex.row.center.center};

  &:nth-of-type(4n + 2),
  &:nth-of-type(4n + 3),
  &:nth-of-type(4n + 4) {
    border-left: dashed 1px black;
  }

  ${(props) =>
    props.active &&
    css`
      & > div {
        mix-blend-mode: darken;
      }
    `}

  &:hover {
    color: ${theme.backgroundColors.orange};
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
const DisplayDiv = styled(CC.RowCenterDiv)`
  background: ${theme.backgroundColors.orangeLight};
  padding: 20px 0px;
  font-size: 24px;
`;
const MenuHideButton = styled.button`
  position: absolute;
  right: 4px;
`;
