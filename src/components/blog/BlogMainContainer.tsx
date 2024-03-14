import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import { IconsSvg } from '@components/common/icons/IconsSvg';
import Select from '@components/common/select/Select';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import BlogItem from './BlogItem';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogMainContainer.tsx
 * @version 0.0.1 "2023-09-25 03:17:13"
 * @description menuList=[{name. func}]
 */
const BlogMainContainer = () => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  const router = useRouter();
  const mainContainerRef = useRef<null>();
  const blogListResData = BlogAPI.getBlogList();

  const orderBlogListHandler = (data: any) => {
    if (
      !blogStore.activeBlogFirstCategoryId ||
      !blogStore.activeBlogSecondCategoryId
    )
      return;
    store.dispatch(
      rootActions.blogStore1.setBlogListOrderOption({
        blogListOrderOption: data.value,
      }),
    );
  };

  useEffect(() => {
    let keyDownEventFunc = (e: Event) => {
      // shift + Space를 누르게 되면 글 작성하는 화면으로 이동
      if (
        e.which === 32 &&
        e.shiftKey &&
        store.getState().blogStore.activeBlogUserId ==
          store.getState().authStore.id
      ) {
        router.push('/blog/create');
      }
    };

    window.addEventListener('keydown', keyDownEventFunc);

    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <span>
          검색결과 : {blogListResData?.data?.json?.blogList.length || '0'}
        </span>
        <CC.RowDiv pd={'4px 0px 4px 4px'} gap={8}>
          <Select
            onChange={orderBlogListHandler}
            defaultValue={{
              value: blogStore1.blogListOrderOption,
              name:
                blogStore1.blogListOrderOption == 'viewNumber'
                  ? '조회수순'
                  : '최신순',
            }}
            w={'90px'}
            h={'22px'}
            data={[
              { name: '최신순', value: '', bg: '' },
              { name: '조회수순', value: 'viewNumber', bg: '' },
              // { name: '좋아요순', value: 'likeNumber', bg: '' },
            ]}
          ></Select>
        </CC.RowDiv>
      </HeaderContainer>
      <MainContainer ref={mainContainerRef}>
        {blogListResData?.data?.json?.blogList?.map((i, index) => (
          <Link href={`/blog/${i.id}`} key={`${i.id}${index}`} prefetch={false}>
            <BlogItem
              element={i}
              viewMode={true}
              defaultImageUrl={
                blogListResData?.data.json?.blogListDefaultImageUrl
              }
            ></BlogItem>
          </Link>
        ))}
        <FixedContainer>
          {store.getState().authStore.id == 13 && (
            <Link href={`/blog/create`}>
              <Button w={'32px'}>
                <IconsSvg.EditIcon fill={'black80'} />
              </Button>
            </Link>
          )}
          <Button
            onClick={() => mainContainerRef.current.scrollTo(0, 0)}
            w={'32px'}
          >
            <Image src={Icons.UpArrowIcon} alt="up-arrow" />
          </Button>
          <Button
            w={'32px'}
            onClick={() =>
              mainContainerRef.current.scrollTo(
                0,
                mainContainerRef.current.scrollHeight,
              )
            }
          >
            <Image src={Icons.DownArrowIcon} alt="down-arrow" />
          </Button>
        </FixedContainer>
      </MainContainer>
    </Container>
  );
};
export default BlogMainContainer;

const Container = styled(CC.ColumnDiv)`
  border-radius: 10px;
  background: ${(props) => props.theme.main.primary20};
  padding: 2px;
  gap: 4px;
  ${(props) => props.theme.scroll.hidden};
  position: relative;
  min-height: 200px;
`;
const HeaderContainer = styled(CC.RowBetweenDiv)`
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.br10};
  padding: 4px;
  height: 30px;
  background: ${(props) => props.theme.main.contrast};

  & > span:nth-of-type(1) {
    color: ${(props) => props.theme.colors.black40};
    font-weight: 600;
    padding: 4px;
    @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
      //max-width보다 작을 떄
      font-size: 0.8rem;
    }
  }
`;

const MainContainer = styled(CC.ColumnDiv)`
  gap: 4px;
  ${(props) => props.theme.scroll.hidden};
  background: ${(props) => props.theme.main.contrast};
  border-radius: ${(props) => props.theme.borderRadius.br10};
  padding: 4px;
  scroll-behavior: smooth;
`;

const FixedContainer = styled(CC.ColumnDiv)`
  position: sticky;
  width: max-content;
  left: calc(100% - 20px);
  bottom: 20px;
  padding: 2px;
  opacity: 0.9;
  border-radius: 8px;
  background: ${(props) => props.theme.main.secondary40};
  gap: 4px;

  & > button {
    background: ${(props) => props.theme.main.contrast};
  }

  & > :hover {
    transform: scale(1.2);
    cursor: pointer;
    background: ${(props) => props.theme.main.primary80};
  }

  @media (max-width: 400px) {
    //max-width보다 작을 떄
    bottom: 4px;
    div {
      width: 24px;
    }
    button {
      width: 24px;
      aspect-ratio: 1;
    }
  }
`;
