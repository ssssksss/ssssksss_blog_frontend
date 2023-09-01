import theme from '@/styles/theme';
import styled from '@emotion/styled';
import Button from '../../common/button/Button';
import { RootState } from '@/redux/store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  SET_FIRST_CATEGORY_PATH,
  SET_SECOND_CATEGORY_PATH,
} from '@/redux/store/category';
import { css } from '@emotion/react';
import { animationKeyFrames } from '@/styles/animationKeyFrames';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { CC } from '@/styles/commonComponentStyle';
import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import CustomModal from '@/components/Modal/CustomModal';
import Input from '@/components/common/input/Input';
import Space from '@/components/common/space/Space';
import { useRouter } from 'next/router';
import { dateFormat4y2m2d } from '@/utils/fucntion/dateFormat';
import { fewDaysAgoDate } from '@/components/common/function/Date';
import Image from 'next/image';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogPosts.tsx
 * @version 0.0.1 "2023-06-17 17:45:26"
 * @description 블로그 글 리스트 UI
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
  const [createSecondCategoryState, setCreateSecondCategoryState] =
    useState('');
  const [updateSecondCategoryState, setUpdateSecondCategoryState] =
    useState('');
  const [removeSecondCategoryState, setRemoveSecondCategoryState] =
    useState('');

  const FirstCategoryButtonList = [
    ['frontend', 'frontend'],
    ['backend', 'backend'],
    ['database', 'database'],
    ['server-cloud', 'server-cloud'],
    ['github', 'github'],
    ['3d-design', '3d-design'],
    ['ai-computer-science', 'AI-CS'],
    ['etc', 'etc'],
  ];

  /**
   * @description 1번째 카테고리 리덕스 state에 보관하고 api로 목록불러오는 함수
   * , url을 1번째, 2번째 카테고리에 맞게 자동으로 변경
   */
  const FirstCategoryHandler = async (firstCategory: string) => {
    dispatch(SET_FIRST_CATEGORY_PATH(firstCategory));
    setRandomData(Math.random());
    let secondCategories = await readSecondCategoryHandler(firstCategory);
    await readBlogItemListHandler(
      firstCategory,
      secondCategories?.length === 0 ? 'undefined' : secondCategories[0]
    );
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
      url: '/api/blog-category',
      method: 'GET',
      params: {
        firstCategory,
      },
    })
      .then(response => {
        setSecondCategoriesState(response.data.data.blogSecondeCategory);
        returnValue = response.data.data.blogSecondeCategory;
      })
      .catch(error => {
        if (error.response?.status === 409) {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: 'error',
              message: '중복된 데이터입니다',
            })
          );
        } else {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: 'error',
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
  const readBlogItemListHandler = async (
    firstCategory: string,
    secondCategory: string
  ) => {
    router.push('/blog/' + firstCategory + '/' + secondCategory);
    store.dispatch(SET_SECOND_CATEGORY_PATH(secondCategory));
    if (secondCategory === 'undefined') {
      setBlogItemList([]);
    }
    await AxiosInstance({
      url: '/api/blog-items',
      method: 'GET',
      params: {
        firstCategory: firstCategory,
        secondCategory: secondCategory,
      },
    })
      .then(response => {
        setBlogItemList(response.data.data.BlogItemList);
      })
      .catch(error => {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: 'error',
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
    if (createSecondCategoryState === '') return;
    await AxiosInstance({
      url: '/api/blog-category',
      method: 'POST',
      data: {
        firstCategory: categoryStore.firstCategory,
        secondCategory: createSecondCategoryState,
      },
    })
      .then(response => {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: 'success',
            message: '카테고리가 추가되었습니다.',
          })
        );
        setSecondCategoriesState([
          ...secondCategoriesState,
          createSecondCategoryState,
        ]);
      })
      .catch(error => {
        if (error?.response?.status === 409) {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: 'error',
              message: '중복된 데이터입니다',
            })
          );
        } else {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: 'error',
              message: error.response?.data.msg,
            })
          );
        }
      });
    setCreateSecondCategoryState('');
  };

  // url경로를 이용하여 첫번째 카테고리에 포함된 목록들을 받아오는 기능
  useEffect(async () => {
    let firstCategory = window.location.pathname.split('/')[2];
    store.dispatch(SET_FIRST_CATEGORY_PATH(firstCategory));
    let secondCategories = await readSecondCategoryHandler(firstCategory);
    await readBlogItemListHandler(
      firstCategory,
      secondCategories === undefined
        ? 'undefined'
        : window.location.pathname.split('/')[3]
    );
  }, []);

  return (
    <Container>
      {isOpenModal && (
        <CustomModal
          title={categoryStore.firstCategory}
          height={'40px'}
          toggleModal={() => setIsOpenModal(!isOpenModal)}
        >
          <CC.RowDiv
            backgroundColor="white"
            padding={'8px'}
            gap={4}
            border={'solid 1px black'}
          >
            <CC.ColumnCenterDiv width="100%" height="60px" gap={2}>
              <span> 카테고리 추가 </span>
              <Input
                placeholder="영어소문자와 '-'으로만 입력해주세요"
                value={createSecondCategoryState}
                onChange={e => setCreateSecondCategoryState(e.target.value)}
              />
            </CC.ColumnCenterDiv>
            <Button
              onClick={() => createSecondCategoryHandler()}
              size={'sm'}
              outline={true}
            >
              추가
            </Button>
          </CC.RowDiv>
          <CC.RowDiv
            backgroundColor="white"
            padding={'8px'}
            gap={4}
            border={'solid 1px black'}
          >
            <CC.ColumnDiv width="100%" height="60px" gap={2}>
              <span> 카테고리 변경(작동안됨) </span>
              <Input placeholder="영어소문자와 '-'으로만 입력해주세요" />
              <Input placeholder="영어소문자와 '-'으로만 입력해주세요" />
            </CC.ColumnDiv>
            <Button size={'sm'} outline={true}>
              버튼
            </Button>
          </CC.RowDiv>
          <CC.RowDiv
            backgroundColor="white"
            padding={'8px'}
            gap={4}
            border={'solid 1px black'}
          >
            <CC.ColumnDiv width="100%" height="60px" gap={2}>
              <span> 카테고리 삭제(작동안됨) </span>
              <Input placeholder="영어소문자와 '-'으로만 입력해주세요" />
            </CC.ColumnDiv>
            <Button size={'sm'} outline={true}>
              버튼
            </Button>
          </CC.RowDiv>
        </CustomModal>
      )}

      <CategoryContainer>
        <FirstCategoryContainer themeStore={themeStore}>
          {FirstCategoryButtonList.map((i, index) => (
            <Button onClick={() => FirstCategoryHandler(i[0])} size="sm">
              <div> {i[1]} </div>
              <FirstCategoryItemCount> 1 </FirstCategoryItemCount>
            </Button>
          ))}
        </FirstCategoryContainer>
        <SecondCategoryContainer
          themeStore={themeStore}
          categoryStore={categoryStore}
          key={randomData}
        >
          <header>
            <span>
              {FirstCategoryButtonList.filter(
                i => i[0] === categoryStore.firstCategory
              ).map(i => i[0])}
            </span>
            {authStore.role === 'ROLE_ADMIN' && (
              <Button
                onClick={() => setIsOpenModal(true)}
                outline={true}
                color={'black'}
              >
                추가
              </Button>
            )}
          </header>
          <MenuContainer>
            {secondCategoriesState?.map((secondCategory, index) => (
              <SecondCategoryItemButton
                index={index}
                active={secondCategory === categoryStore.secondCategory}
                onClick={() =>
                  readBlogItemListHandler(
                    categoryStore.firstCategory,
                    secondCategory
                  )
                }
              >
                <div> {secondCategory} </div>
                <SecondCategoryItemCount> 1 </SecondCategoryItemCount>
              </SecondCategoryItemButton>
            ))}
          </MenuContainer>
        </SecondCategoryContainer>
      </CategoryContainer>
      <CategoryListContainer
        themeStore={themeStore}
        categoryStore={categoryStore}
      >
        {authStore.role === 'ROLE_ADMIN' && (
          <header>
            <Button
              onClick={() => router.push(document.location.href + '/add')}
              outline={true}
              color={'black'}
              size="xs"
            >
              <Image
                width="24px"
                height="24px"
                src="/img/ui-icon/edit_icon.png"
              />
              글쓰기
            </Button>
          </header>
        )}
        <CategoryListDiv>
          {blogItemList.map((i: blogItemType) => (
            <Button
              onClick={() =>
                router.push(
                  '/blog/' +
                    categoryStore.firstCategory +
                    '/' +
                    categoryStore.secondCategory +
                    '/' +
                    i.id
                )
              }
              outline={true}
              color={'black'}
            >
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
                    <span>
                      {fewDaysAgoDate(dateFormat4y2m2d(i.modifiedAt))}
                    </span>
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
      font-size: ${theme.fontSizes.sm};
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
  /* grid-template-columns: repeat(4, 1fr); */
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 4px;
  grid-template-columns: repeat(2, 1fr);

  button {
    width: 100%;
    height: 100%;
    min-height: 40px;
    font-weight: 600;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    color: ${props => props.themeStore.menuIconFontColor};
  }

  @media (max-width: ${theme.deviceSizes.tablet}) {
  }
  button:nth-of-type(1) {
    background: ${theme.linearGradientColors['orange']};
  }
  button:nth-of-type(2) {
    background: ${theme.linearGradientColors['red']};
  }
  button:nth-of-type(3) {
    background: ${theme.linearGradientColors['purple']};
  }
  button:nth-of-type(4) {
    background: ${theme.linearGradientColors['turquoise']};
  }
  button:nth-of-type(5) {
    background: ${theme.linearGradientColors['bluePink']};
  }
  button:nth-of-type(6) {
    background: ${theme.linearGradientColors['blue']};
  }
  button:nth-of-type(7) {
    background: ${theme.linearGradientColors['greenBrightBrown']};
  }
  button:nth-of-type(8) {
    background: ${theme.linearGradientColors['redOrange']};
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
  opacity: 0.8;
`;

const SecondCategoryContainer = styled.section`
  padding: 2px;
  display: flex;
  flex-flow: nowrap column;
  gap: 4px;
  border-radius: 8px;
  height: 210px;

  header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
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
    height: 32px;
    min-height: 24px;
    font-weight: 600;
    border-radius: 4px;
  }

  ${props =>
    props.categoryStore.firstCategory === 'frontend' &&
    `
    background: ${theme.linearGradientColors['orange']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'backend' &&
    `
    background: ${theme.linearGradientColors['red']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'database' &&
    `
    background: ${theme.linearGradientColors['purple']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'server-cloud' &&
    `
    background: ${theme.linearGradientColors['turquoise']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'github' &&
    `
    background: ${theme.linearGradientColors['bluePink']}
  `}
  ${props =>
    props.categoryStore.firstCategory === '3d-design' &&
    `
    background: ${theme.linearGradientColors['blue']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'ai-computer-science' &&
    `
    background: ${theme.linearGradientColors['greenBrightBrown']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'etc' &&
    `
    background: ${theme.linearGradientColors['redOrange']}
  `}
`;

const MenuContainer = styled.div`
  display: grid;
  gap: 4px;
  padding: 2px;
  grid-auto-flow: row;

  @media (min-width: ${theme.deviceSizes.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    overflow: scroll;
  }
  @media (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: ${theme.deviceSizes.laptop}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const SecondCategoryItemButton = styled.button<{ active: boolean }>`
  position: relative;
  ${props =>
    props.active ||
    css`
      mix-blend-mode: screen;
    `}
  ${props =>
    props.active &&
    css`
      color: ${props => props.active && 'black'};
      background: ${theme.linearGradientColors['cottonCandy']};
    `}

    &:hover {
    background: ${theme.linearGradientColors['cottonCandy']};
    transition: 1s;
    cursor: pointer;
  }
`;

const SecondCategoryItemCount = styled(FirstCategoryItemCount)``;

const CategoryListContainer = styled.section`
  display: flex;
  flex-flow: nowrap column;
  border-radius: 8px;
  overflow: scroll;
  max-height: calc(100vh - 280px);
  outline: solid black 2px;
  font-size: ${theme.fontSizes.sm};
  position: relative;

  header {
    position: sticky;
    background: transparent;
    top: 0px;
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 4px 10px 4px 4px;
    background: white;
    box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.2);
    z-index: 20;

    & > button {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px;
      box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    & > button:hover {
      cursor: pointer;
      transform: translate(1px, 1px);
    }

    img {
      aspect-ratio: 1;
      box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.2);
      width: 24px;
      height: 24px;
    }
  }

  ${props =>
    props.categoryStore.firstCategory === 'frontend' &&
    `
    background: ${theme.linearGradientColors['orange']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'backend' &&
    `
    background: ${theme.linearGradientColors['red']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'database' &&
    `
    background: ${theme.linearGradientColors['purple']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'server-cloud' &&
    `
    background: ${theme.linearGradientColors['turquoise']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'github' &&
    `
    background: ${theme.linearGradientColors['bluePink']}
  `}
  ${props =>
    props.categoryStore.firstCategory === '3d-design' &&
    `
    background: ${theme.linearGradientColors['blue']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'ai-computer-science' &&
    `
    background: ${theme.linearGradientColors['greenBrightBrown']}
  `}
  ${props =>
    props.categoryStore.firstCategory === 'etc' &&
    `
    background: ${theme.linearGradientColors['redOrange']}
  `}
`;
const CategoryListDiv = styled.div`
  display: flex;
  flex-flow: nowrap column;
  gap: 4px;
  padding: 4px;

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
      background: ${theme.linearGradientColors['cottonCandy']};
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
