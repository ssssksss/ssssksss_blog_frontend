import theme from "@/styles/theme";
import styled from "@emotion/styled";
import Button from "./../../common/button/Button";
import { RootState } from "@/redux/store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SET_FIRST_CATEGORY_PATH, SET_SECOND_CATEGORY_PATH } from "@/redux/store/category";
import { css } from "@emotion/react";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { CC } from "@/styles/commonComponentStyle";
import { store } from "@/redux/store";
import { SET_TOASTIFY_MESSAGE } from "@/redux/store/toastify";
import CustomModal from "@/components/Modal/CustomModal";
import Input from "@/components/common/input/Input";
import Space from "@/components/common/space/Space";
import { useRouter } from "next/router";
import { dateFormat4y2m2d } from "@/utils/fucntion/dateFormat";
import { fewDaysAgoDate } from "@/components/common/function/Date";

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogMenu.tsx
 * @version 0.0.1 "2023-06-17 17:45:26"
 * @description 설명
 */

interface blogItemType {
  title: String;
  description: String;
  userName: String;
  likeNUmber: Number;
  commentNumber: Number;
  firstCategory: String;
  secondCategory: String;
  positionIndex: Number;
  accessYn: Boolean;
  modifiedAt: String;
  count: Number;
  id: Number;
}

const BlogMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const themeStore = useSelector((state: RootState) => state.themeStore);
  const categoryStore = useSelector((state: RootState) => state.categoryStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  const [randomData, setRandomData] = useState(Math.random());
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [secondCategoriesState, setSecondCategoriesState] = useState([]);
  const [blogItemList, setBlogItemList] = useState([]);
  const [createSecondCategoryState, setCreateSecondCategoryState] = useState("");
  const [updateSecondCategoryState, setUpdateSecondCategoryState] = useState("");
  const [removeSecondCategoryState, setRemoveSecondCategoryState] = useState("");

  const FirstCategoryButtonList = [
    ["frontend", "frontend"],
    ["backend", "backend"],
    ["database", "database"],
    ["server-cloud", "server-cloud"],
    ["github", "github"],
    ["3d-design", "3d-design"],
    ["ai-computer-science", "AI-CS"],
    ["etc", "etc"],
  ];

  /**
   * @description 1번째 카테고리 리덕스 state에 보관하고 api로 목록불러오는 함수
   * , url을 1번째, 2번째 카테고리에 맞게 자동으로 변경
   */
  const FirstCategoryHandler = async (firstCategory: string) => {
    dispatch(SET_FIRST_CATEGORY_PATH(firstCategory));
    setRandomData(Math.random());
    let secondCategories = await readSecondCategoryHandler(firstCategory);
    await readBlogItemListHandler(firstCategory, secondCategories?.length === 0 ? "undefined" : secondCategories[0]);
  };

  /**
   *
   * @param firstCategory
   * @description firstCategory를 넣어서 secondCategories 목록들을 불러오는 함수
   * @example frontend를 넣으면 html,css,js 등등을 불러온다.
   */
  const readSecondCategoryHandler = async (firstCategory: string) => {
    let returnValue;
    await AxiosInstance({
      url: "/api/blog-category",
      method: "GET",
      params: {
        firstCategory,
      },
    })
      .then((response) => {
        setSecondCategoriesState(response.data.data.blogSecondeCategory);
        returnValue = response.data.data.blogSecondeCategory;
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: "error",
              message: "중복된 데이터입니다",
            })
          );
        } else {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: "error",
              message: error.response?.data.msg,
            })
          );
        }
      });
    return returnValue;
  };
  /**
   * @description 블로그 리스트를 불러오는 함수
   */
  const readBlogItemListHandler = async (firstCategory: string, secondCategory: string) => {
    router.push("/blog/" + firstCategory + "/" + secondCategory);
    store.dispatch(SET_SECOND_CATEGORY_PATH(secondCategory));
    if (secondCategory === "undefined") {
      setBlogItemList([]);
    }
    await AxiosInstance({
      url: "/api/blog-items",
      method: "GET",
      params: {
        firstCategory: firstCategory,
        secondCategory: secondCategory,
      },
    })
      .then((response) => {
        setBlogItemList(response.data.data.BlogItemList);
      })
      .catch((error) => {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: "error",
            message: error.response?.data.msg,
          })
        );
      });
  };

  /**
   * @param firstCategory
   * @description firstCategory와 createSecondCategoryState 상태값을 이용해서 secondCategory 목록을 만드는 함수
   * @example frontend와 html을 넣으면 [frontend,html] DB필드가 생성이 된다.
   */
  const createSecondCategoryHandler = async () => {
    if (createSecondCategoryState === "") return;
    await AxiosInstance({
      url: "/api/blog-category",
      method: "POST",
      data: {
        firstCategory: categoryStore.firstCategory,
        secondCategory: createSecondCategoryState,
      },
    })
      .then((response) => {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: "success",
            message: "카테고리가 추가되었습니다.",
          })
        );
        setSecondCategoriesState([...secondCategoriesState, createSecondCategoryState]);
      })
      .catch((error) => {
        if (error?.response?.status === 409) {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: "error",
              message: "중복된 데이터입니다",
            })
          );
        } else {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: "error",
              message: error.response?.data.msg,
            })
          );
        }
      });
    setCreateSecondCategoryState("");
  };

  // url경로를 이용하여 첫번째 카테고리에 포함된 목록들을 받아오는 기능
  useEffect(async () => {
    let firstCategory = window.location.pathname.split("/")[2];
    store.dispatch(SET_FIRST_CATEGORY_PATH(firstCategory));
    let secondCategories = await readSecondCategoryHandler(firstCategory);
    await readBlogItemListHandler(
      firstCategory,
      secondCategories === undefined ? "undefined" : window.location.pathname.split("/")[3]
    );
  }, []);

  return (
    <Container>
      {isOpenModal && (
        <CustomModal
          title={categoryStore.firstCategory}
          height={"40px"}
          toggleModal={() => setIsOpenModal(!isOpenModal)}>
          <CC.RowDiv backgroundColor="white" padding={"8px"} gap={4} border={"solid 1px black"}>
            <CC.ColumnCenterDiv width="100%" height="60px" gap={2}>
              <span> 카테고리 추가 </span>
              <Input
                placeholder="영어소문자와 '-'으로만 입력해주세요"
                value={createSecondCategoryState}
                onChange={(e) => setCreateSecondCategoryState(e.target.value)}
              />
            </CC.ColumnCenterDiv>
            <Button status="green" width="40px" height="40px" onClick={() => createSecondCategoryHandler()}>
              추가
            </Button>
          </CC.RowDiv>
          <CC.RowDiv backgroundColor="white" padding={"8px"} gap={4} border={"solid 1px black"}>
            <CC.ColumnDiv width="100%" height="60px" gap={2}>
              <span> 카테고리 변경(작동안됨) </span>
              <Input placeholder="영어소문자와 '-'으로만 입력해주세요" />
              <Input placeholder="영어소문자와 '-'으로만 입력해주세요" />
            </CC.ColumnDiv>
            <Button status="orange" width="40px" height="40px">
              버튼
            </Button>
          </CC.RowDiv>
          <CC.RowDiv backgroundColor="white" padding={"8px"} gap={4} border={"solid 1px black"}>
            <CC.ColumnDiv width="100%" height="60px" gap={2}>
              <span> 카테고리 삭제(작동안됨) </span>
              <Input placeholder="영어소문자와 '-'으로만 입력해주세요" />
            </CC.ColumnDiv>
            <Button width="40px" height="40px" status="danger">
              버튼
            </Button>
          </CC.RowDiv>
        </CustomModal>
      )}

      <CategoryContainer>
        <FirstCategoryContainer themeStore={themeStore}>
          {FirstCategoryButtonList.map((i, index) => (
            <FirstCategoryItemButton onClick={() => FirstCategoryHandler(i[0])}>
              <div> {i[1]} </div>
              <FirstCategoryItemCount> 1 </FirstCategoryItemCount>
            </FirstCategoryItemButton>
          ))}
        </FirstCategoryContainer>
        <SecondCategoryContainer themeStore={themeStore} categoryStore={categoryStore} key={randomData}>
          <header>
            <span>{FirstCategoryButtonList.filter((i) => i[0] === categoryStore.firstCategory).map((i) => i[0])}</span>
            {authStore.role === "ROLE_ADMIN" && <Button onClick={() => setIsOpenModal(true)}> + </Button>}
          </header>
          <MenuContainer>
            {secondCategoriesState?.map((i, index) => (
              <SecondCategoryItemButton
                index={index}
                onClick={() => readBlogItemListHandler(categoryStore.firstCategory, i)}>
                <div> {i} </div>
                <SecondCategoryItemCount> 1 </SecondCategoryItemCount>
              </SecondCategoryItemButton>
            ))}
          </MenuContainer>
        </SecondCategoryContainer>
      </CategoryContainer>
      <CategoryListContainer themeStore={themeStore} categoryStore={categoryStore}>
        <header>
          <span>{categoryStore.secondCategory}</span>
          {authStore.role === "ROLE_ADMIN" && (
            <Button onClick={() => router.push(document.location.href + "/add")}>+</Button>
          )}
        </header>
        <CategoryListDiv>
          {blogItemList.map((i: blogItemType) => (
            <Button
              status="white1"
              onClick={() =>
                router.push("/blog/" + categoryStore.firstCategory + "/" + categoryStore.secondCategory + "/" + i.id)
              }>
              <CC.ColumnBetweenDiv width="100%" gap={16}>
                <CC.RowBetweenDiv>
                  <BlogItemTitle> {i.title} </BlogItemTitle>
                  <div>
                    <span> 👍 {i.likeNumber} </span>
                    <span> 🗨️ {i.commentNumber} </span>
                    <span> 👀 {i.count} </span>
                  </div>
                </CC.RowBetweenDiv>
                <CC.RowBetweenDiv>
                  <BlogItemDescription> {i.description} </BlogItemDescription>
                  <CC.ColumnDiv>
                    <span> {fewDaysAgoDate(dateFormat4y2m2d(i.modifiedAt))} </span>
                  </CC.ColumnDiv>
                </CC.RowBetweenDiv>
              </CC.ColumnBetweenDiv>
            </Button>
          ))}
        </CategoryListDiv>
      </CategoryListContainer>
    </Container>
  );
};

export default BlogMenu;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: nowrap column;
  gap: 10px;
`;

const CategoryContainer = styled.div`
  display: grid;
  min-height: 120px;

  @media (min-width: ${theme.deviceSizes.mobile}) {
    grid-template-columns: 112px auto;
    button {
      font-size: ${theme.fontSizes.xs};
    }
  }
  @media (min-width: ${theme.deviceSizes.tablet}) {
    grid-template-columns: 240px auto;
    button {
      font-size: ${theme.fontSizes.sm};
    }
  }
  @media (min-width: ${theme.deviceSizes.laptop}) {
    grid-template-columns: 240px auto;
    button {
    }
  }
`;

const FirstCategoryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 4px;

  button {
    width: 100%;
    height: 100%;
    min-height: 40px;
    font-weight: 600;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    color: ${(props) => props.themeStore.menuIconFontColor};
  }

  button:nth-of-type(1) {
    background: linear-gradient(180deg, rgba(254, 128, 0, 1) 0%, rgba(255, 161, 0, 1) 100%);
  }
  button:nth-of-type(2) {
    background: linear-gradient(180deg, rgba(201, 28, 73, 1) 0%, rgba(247, 37, 84, 1) 100%);
  }
  button:nth-of-type(3) {
    background: linear-gradient(180deg, rgba(165, 39, 201, 1) 0%, rgba(167, 98, 230, 1) 100%);
  }
  button:nth-of-type(4) {
    background: linear-gradient(180deg, rgba(5, 156, 139, 1) 0%, rgba(3, 181, 185, 1) 100%);
  }
  button:nth-of-type(5) {
    background: linear-gradient(180deg, rgba(52, 148, 230, 1) 0%, rgba(236, 110, 173, 1) 100%);
  }
  button:nth-of-type(6) {
    background: linear-gradient(180deg, rgba(0, 108, 209, 1) 0%, rgba(1, 142, 210, 1) 100%);
  }
  button:nth-of-type(7) {
    background: linear-gradient(180deg, rgba(77, 160, 176, 1) 0%, rgba(211, 157, 56, 1) 100%);
  }
  button:nth-of-type(8) {
    background: linear-gradient(180deg, rgba(253, 45, 1, 1) 0%, rgba(254, 143, 1, 1) 100%);
  }

  @media (max-width: ${theme.deviceSizes.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// const FirstCategoryItemButton = styled.button`
//   position: relative;
// `;

const FirstCategoryItemButton = styled.button`
  position: relative;
  border-radius: 0.6em;
  &:hover {
    cursor: pointer;
    animation: ${animationKeyFrames.UpToDownRepeat} 2s infinite;
  }
`;

const FirstCategoryItemCount = styled.span`
  position: absolute;
  right: 4px;
  top: 4px;
`;

const SecondCategoryContainer = styled.section`
  padding: 2px;
  display: flex;
  flex-flow: nowrap column;
  gap: 4px;
  background: ${(props) => props.themeStore.menuBackground};
  border-radius: 8px;

  header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    mix-blend-mode: luminosity;
    position: relative;

    button {
      position: absolute;
      width: 2rem;
      height: 16px;
      right: 1px;
      top: 1px;
    }
  }

  button {
    width: 100%;
    height: 40px;
    min-height: 24px;
    font-weight: 600;
    mix-blend-mode: screen;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
  }

  ${(props) =>
    props.categoryStore.firstCategory === "frontend" &&
    css`
      background: linear-gradient(180deg, rgba(254, 128, 0, 1) 0%, rgba(255, 161, 0, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "backend" &&
    css`
      background: linear-gradient(180deg, rgba(201, 28, 73, 1) 0%, rgba(247, 37, 84, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "database" &&
    css`
      background: linear-gradient(180deg, rgba(165, 39, 201, 1) 0%, rgba(167, 98, 230, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "server-cloud" &&
    css`
      background: linear-gradient(180deg, rgba(5, 156, 139, 1) 0%, rgba(3, 181, 185, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "github" &&
    css`
      background: linear-gradient(180deg, rgba(52, 148, 230, 1) 0%, rgba(236, 110, 173, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "3d-design" &&
    css`
      background: linear-gradient(180deg, rgba(0, 108, 209, 1) 0%, rgba(1, 142, 210, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "ai-computer-science" &&
    css`
      background: linear-gradient(180deg, rgba(77, 160, 176, 1) 0%, rgba(211, 157, 56, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "etc" &&
    css`
      background: linear-gradient(180deg, rgba(253, 45, 1, 1) 0%, rgba(254, 143, 1, 1) 100%);
    `}
`;

const SecondCategoryItemButton = styled.button`
  --index: ${(props) => (props.index + 1) * 0.05 + 0.2 + "s"};
  animation: ${animationKeyFrames.RightToLeftFadein} linear var(--index);
  position: relative;

  &:hover {
    cursor: pointer;
    transition: 0.5s;
    filter: brightness(0) invert(1);
  }
`;

const SecondCategoryItemCount = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;

const MenuContainer = styled.div`
  display: grid;
  gap: 4px;
  padding: 2px;
  grid-auto-flow: row;

  @media (min-width: ${theme.deviceSizes.mobile}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 500px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 640px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: ${theme.deviceSizes.laptop}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const CategoryListContainer = styled.section`
  display: flex;
  flex-flow: nowrap column;
  background: ${(props) => props.themeStore.menuBackground};
  border-radius: 8px;
  overflow: scroll;
  max-height: calc(100vh - 260px);
  outline: solid black 2px;
  font-size: ${theme.fontSizes.sm};

  header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    position: sticky;
    top: 0;
    background: ${(props) => props.themeStore.menuBackground};
    border-radius: 8px 8px 0px 0px;
    padding: 2px 0px;
    z-index: 20;

    button {
      position: absolute;
      width: 30px;
      height: calc(100% - 4px);
      right: 1px;
      padding: 1px 0px;
    }
  }

  ${(props) =>
    props.categoryStore.firstCategory === "frontend" &&
    css`
      background: linear-gradient(180deg, rgba(254, 128, 0, 1) 0%, rgba(255, 161, 0, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "backend" &&
    css`
      background: linear-gradient(180deg, rgba(201, 28, 73, 1) 0%, rgba(247, 37, 84, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "database" &&
    css`
      background: linear-gradient(180deg, rgba(165, 39, 201, 1) 0%, rgba(167, 98, 230, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "server-cloud" &&
    css`
      background: linear-gradient(180deg, rgba(5, 156, 139, 1) 0%, rgba(3, 181, 185, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "github" &&
    css`
      background: linear-gradient(180deg, rgba(52, 148, 230, 1) 0%, rgba(236, 110, 173, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "3d-design" &&
    css`
      background: linear-gradient(180deg, rgba(0, 108, 209, 1) 0%, rgba(1, 142, 210, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "ai-computer-science" &&
    css`
      background: linear-gradient(180deg, rgba(77, 160, 176, 1) 0%, rgba(211, 157, 56, 1) 100%);
    `}
  ${(props) =>
    props.categoryStore.firstCategory === "etc" &&
    css`
      background: linear-gradient(180deg, rgba(253, 45, 1, 1) 0%, rgba(254, 143, 1, 1) 100%);
    `}
`;
const CategoryListDiv = styled.div`
  display: flex;
  flex-flow: nowrap column;
  gap: 6px;
  padding: 0px 4px;
  color: red;

  button {
    width: 100%;
    aspect-ratio: 1;
    height: 70px;
    border: solid black 1px;
    border-radius: 8px;
    padding: 2px;

    &:first-of-type {
      margin-top: 4px;
    }

    &:last-of-type {
      margin-bottom: 4px;
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
  }
`;

const BlogItemTitle = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: 800;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 100px);
`;

const BlogItemDescription = styled.div`
  align-content: space-around;
  font-size: ${theme.fontSizes.sm};
  font-family: ${theme.fontFamily.cookieRunRegular};
  color: #666666;
  text-align: start;
  max-width: calc(100% - 100px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
