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
        <CC.RowDiv pd={'0.4rem'}>
          <Select
            onChange={orderBlogListHandler}
            defaultValue={{
              value: blogStore1.blogListOrderOption,
              name:
                blogStore1.blogListOrderOption == 'viewNumber'
                  ? '조회수순'
                  : '최신순',
            }}
            w={'9rem'}
            h={'2.2rem'}
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
      </MainContainer>
      <FixedContainer>
        {store.getState().authStore.id == 13 && (
          <Link href={`/blog/create`}>
            <Button>
              <IconsSvg.EditIcon fill={'black80'} />
            </Button>
          </Link>
        )}
        <Button onClick={() => window.scrollTo(0, 0)}>
          <Image src={Icons.UpArrowIcon} alt="up-arrow" />
        </Button>
        <Button
          onClick={() => window.scrollTo(0, window.document.body.scrollHeight)}
        >
          <Image src={Icons.DownArrowIcon} alt="down-arrow" />
        </Button>
      </FixedContainer>
    </Container>
  );
};
export default BlogMainContainer;

const Container = styled(CC.ColumnDiv)`
  gap: 0.4rem;
  position: relative;
  padding: 0.2rem;
`;
const HeaderContainer = styled(CC.RowBetweenDiv)`
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.br10};
  padding: 0.2rem;
  height: 3rem;
  background: ${(props) => props.theme.main.contrast};
  outline: solid ${(props) => props.theme.main.primary20} 0.1rem;
`;

const MainContainer = styled(CC.ColumnDiv)`
  gap: 0.4rem;
  ${(props) => props.theme.scroll.hidden};
  background: ${(props) => props.theme.main.contrast};
  scroll-behavior: smooth;
  padding: 0.2rem;
`;

const FixedContainer = styled(CC.ColumnDiv)`
  position: sticky;
  width: max-content;
  left: calc(100% - 2rem);
  bottom: 2rem;
  padding: 0.2rem;
  opacity: 0.9;
  border-radius: 0.8rem;
  background: ${(props) => props.theme.main.secondary40};
  gap: 0.4rem;

  button {
    background: ${(props) => props.theme.main.contrast};
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
  }

  & > :hover {
    cursor: pointer;
    background: ${(props) => props.theme.main.primary80};
  }
`;
