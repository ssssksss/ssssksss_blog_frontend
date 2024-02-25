import { BlogAPI } from '@api/BlogAPI';
import { Icons } from '@components/common/icons/Icons';
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
import Button from '../common/button/Button';
import { IconsSvg } from '../common/icons/IconsSvg';
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
  const { data: blogListResData } = BlogAPI.getBlogList();

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
      <HeaderContainer color={'primary80'}>
        <span>
          {`[${store.getState().blogStore.activeBlogFirstCategoryName}/${
            store.getState().blogStore.activeBlogSecondCategoryName
          }]`}
          검색결과 : {blogListResData?.json?.blogList.length || '0'}
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
            data={[
              { name: '최신순', value: '', bg: '' },
              { name: '조회수순', value: 'viewNumber', bg: '' },
              // { name: '좋아요순', value: 'likeNumber', bg: '' },
            ]}
          ></Select>
        </CC.RowDiv>
      </HeaderContainer>
      <MainContainer ref={mainContainerRef}>
        {blogListResData?.json?.blogList?.map((i, index) => (
          <Link href={`/blog/${i.id}`} key={`${i.id}${index}`}>
            <a>
              <BlogItem element={i}></BlogItem>
            </a>
          </Link>
        ))}
        <FixedContainer>
          {store.getState().authStore.id ===
            store.getState().blogStore.activeBlogUserId && (
            <BlogSearchItem href={`/blog/create`}>
              <CC.RowCenterDiv
                w={'100%'}
                h={'32px'}
                bg={'white80'}
                brR={'10px'}
              >
                <IconsSvg.EditIcon fill={'black80'} w={'32px'} />
              </CC.RowCenterDiv>
            </BlogSearchItem>
          )}
          <Button onClick={() => mainContainerRef.current.scrollTo(0, 0)}>
            <CC.RowCenterDiv pd={'2px'} gap={2} w={'32px'} h={'32px'}>
              <Image src={Icons.UpArrowIcon} alt="up-arrow" />
            </CC.RowCenterDiv>
          </Button>
          <Button
            onClick={() =>
              mainContainerRef.current.scrollTo(
                0,
                mainContainerRef.current.scrollHeight,
              )
            }
          >
            <CC.RowCenterDiv pd={'2px'} gap={2} w={'32px'} h={'32px'}>
              <Image src={Icons.DownArrowIcon} alt="down-arrow" />
            </CC.RowCenterDiv>
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
  padding: 4px;
  gap: 4px;
  ${(props) => props.theme.scroll.hidden};
  position: relative;
  min-height: 200px;
`;
const BlogSearchItem = styled(Link)`
  cursor: pointer;
  background: ${(props) => props.theme.main.contrast};
`;

const HeaderContainer = styled(CC.RowBetweenDiv)`
  width: 100%;
  padding: 0px 4px;
  border: solid 1px ${(props) => props.theme.main.primary40};
  border-radius: ${(props) => props.theme.borderRadius.br10};
  padding: 4px;
  height: 40px;
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
  @media (pointer: coarse) {
    max-height: calc(100% - 128px - 72px - 60px - 40px);
  }
`;

const FixedContainer = styled(CC.ColumnDiv)`
  position: sticky;
  width: max-content;
  left: calc(100% - 20px);
  bottom: 20px;
  padding: 4px;
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
