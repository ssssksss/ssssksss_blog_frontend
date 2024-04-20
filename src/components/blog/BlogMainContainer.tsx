import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import { IconsSvg } from '@components/common/icons/IconsSvg';
import Select from '@components/common/select/Select';
import Text from '@components/common/text/Text';
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
  const authStore = useSelector((state: RootState) => state.authStore);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const router = useRouter();
  const mainContainerRef = useRef<null>();
  const blogListResData = BlogAPI.getBlogList();

  const orderBlogListHandler = (data: unknown) => {
    if (!blogStore.activeFirstCategory || !blogStore.activeSecondCategory)
      return;
    store.dispatch(
      rootActions.blogStore.setBlogListOrderOption({
        blogListOrderOption: data.value,
      }),
    );
  };

  useEffect(() => {
    const keyDownEventFunc = (e: KeyboardEvent) => {
      // shift + Space를 누르게 되면 글 작성하는 화면으로 이동
      if (
        e.code  === "Space" &&
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


  if (blogListResData == undefined || blogListResData?.status != 'success') return <div> 로딩중... </div>;
  if (blogListResData.data?.json == null) return <div> 데이터가 없습니다. </div>
  const { blogList, blogListDefaultImageUrl } = blogListResData.data?.json == null && {blogList: [], blogListDefaultImageUrl: ""};
  

  return (
    <CC.ColLeftStartBox w={'100%'} gap={8}>
      <HeaderContainer outline={1} pd={"0rem 0.5rem"}>
        <Text>검색결과 : {blogList.length || '0'}</Text>
        <CC.RowDiv pd={'0.5rem'}>
          <Select
            onChange={orderBlogListHandler}
            defaultValue={{
              value: blogStore.blogListOrderOption,
              name:
                blogStore.blogListOrderOption == 'viewNumber'
                  ? '조회수순'
                  : '최신순',
            }}
            w={'6rem'}
            h={'1.5rem'}
            data={[
              { name: '최신순', value: '', bg: '' },
              { name: '조회수순', value: 'viewNumber', bg: '' },
              // { name: '좋아요순', value: 'likeNumber', bg: '' },
            ]}
          ></Select>
        </CC.RowDiv>
      </HeaderContainer>
      <MainContainer ref={mainContainerRef} outline={1}>
        {blogList?.map((i, index) => (
          <Link href={`/blog/${i.id}`} key={`${i.id}${index}`} prefetch={false}>
            <BlogItem
              element={i}
              viewMode={true}
              defaultImageUrl={blogListDefaultImageUrl}
            ></BlogItem>
          </Link>
        ))}
      </MainContainer>
      <FixedContainer>
          <CC.ColLeftCenterBox bg={'primary20'} pd={'0.4rem'} gap={8}>
            {authStore.role == 'ROLE_ADMIN' && (
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
              onClick={() =>
                window.scrollTo(0, window.document.body.scrollHeight)
              }
            >
              <Image src={Icons.DownArrowIcon} alt="down-arrow" />
            </Button>
          </CC.ColLeftCenterBox>
      </FixedContainer>
    </CC.ColLeftStartBox>
  );
};
export default BlogMainContainer;

const HeaderContainer = styled(CC.RowBetweenStartBox)`
  width: 100%;
  border-radius: 0.5rem;
  height: 3rem;
  background: ${(props) => props.theme.main.contrast};
`;

const MainContainer = styled(CC.ColLeftStartBox)`
  width: 100%;
  gap: 0.5rem;
  ${(props) => props.theme.scroll.hiddenY};
  scroll-behavior: smooth;
  padding: 0.5rem;
  & > a {
    width: 100%;
  }
`;

const FixedContainer = styled(CC.ColumnDiv)`
  position: sticky;
  height: 0px;
  left: calc(100% - 2rem);
  top: 4rem;
  opacity: 0.6;

  & > div {
    position: fixed;
    top: 80vh;
    right: 0px;
  }

  button {
    background: ${(props) => props.theme.main.contrast};
    width: 2rem;
    height: 2rem;
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
