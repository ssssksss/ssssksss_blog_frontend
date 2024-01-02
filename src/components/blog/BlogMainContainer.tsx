import styled from '@emotion/styled';
import { CC } from '@/styles/commonComponentStyle';
import { ViewIcon } from '/public/img/ui-icon/ic-like.svg';
import { LikeIcon } from '/public/img/ui-icon/ic-view.svg';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import Button from '../common/button/Button';
import Dropdown from '../common/dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { Input } from '@/components/common/input/Input';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BlogAPI } from '@/api/BlogAPI';
import useLoading from '@/src/hooks/useLoading';
import BlogItem from './BlogItem';
import { SET_BLOG_POST_LIST } from '@/redux/store/blog';
import { store } from '@/redux/store';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogMainContainer.tsx
 * @version 0.0.1 "2023-09-25 03:17:13"
 * @description menuList=[{name. func}]
 */
const BlogMainContainer = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  const [viewMode, setViewMode] = useState(true);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const router = useRouter();
  const [isLoading, loadingFunction] = useLoading();
  const [blogOrderListOption, setBlogOrderListOption] = useState();

  const orderRecentBlogPostList = () => {
    if (!blogStore.firstCategoryId || !blogStore.secondCategoryId) return;
    loadingFunction(
      BlogAPI.getBlogPostList({
        secondCategoryId: blogStore.secondCategoryId,
      })
    )
      .then(res => {
        store.dispatch(SET_BLOG_POST_LIST(res.data.blogList));
      })
      .catch(err => {});
  };

  const orderViewBlogPostList = () => {
    if (!blogStore.firstCategoryId || !blogStore.secondCategoryId) return;
    loadingFunction(
      BlogAPI.getBlogPostList({
        secondCategoryId: blogStore.secondCategoryId,
        sort: 'viewNumber',
      })
    )
      .then(res => {
        store.dispatch(SET_BLOG_POST_LIST(res.data.blogList));
      })
      .catch(err => {});
  };

  const orderLikeBlogPostList = () => {
    if (!blogStore.firstCategoryId || !blogStore.secondCategoryId) return;
    loadingFunction(
      BlogAPI.getBlogPostList({
        secondCategoryId: blogStore.secondCategoryId,
        sort: 'likeNumber',
      })
    ).then(res => {
      store.dispatch(SET_BLOG_POST_LIST(res.data.blogList));
    });
  };

  useEffect(() => {
    if (!blogStore.firstCategoryId || !blogStore.secondCategoryId) return;
    loadingFunction(
      BlogAPI.getBlogPostList({
        secondCategoryId: blogStore.secondCategoryId,
      })
    )
      .then(res => {
        store.dispatch(SET_BLOG_POST_LIST(res.data.blogList));
      })
      .catch(err => {
        if (err.code === 400) {
          store.dispatch(SET_BLOG_POST_LIST([]));
        }
      });
  }, [blogStore.secondCategoryId]);

  useEffect(() => {
    let keyDownEventFunc = (e: Event) => {
      if (e.which === 32 && e.shiftKey) {
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
      <HeaderContainer color={'primary80'} outline={true}>
        <span>
          {`[${blogStore.firstCategoryName}/${blogStore.secondCategoryName}]`}
          검색결과 : {blogStore.blogPostList?.length}
        </span>
        <CC.RowDiv pd={'4px'} gap={8}>
          <Dropdown
            outline={true}
            color={'primary80'}
            brR={'0px'}
            bg={'gray20'}
            w={'90px'}
            menuList={[
              { name: '최신순', func: orderRecentBlogPostList },
              { name: '조회수순', func: orderViewBlogPostList },
              { name: '좋아요순', func: orderLikeBlogPostList },
            ]}
          />
          {/* <CC.RowDiv>
            {viewMode ? (
              <Image
                src={Icons.ViewList}
                alt=""
                onClick={() => setViewMode(false)}
              />
            ) : (
              <Image
                src={Icons.ViewCheckboard}
                alt=""
                onClick={() => setViewMode(true)}
              />
            )}
          </CC.RowDiv> */}
        </CC.RowDiv>
      </HeaderContainer>
      <MainContainer>
        {blogStore.blogPostList?.map((i, index) => (
          <Link href={`/blog/${i.id}`} key={`${i.id}${index}`}>
            <a>
              <BlogItem element={i}></BlogItem>
            </a>
          </Link>
        ))}
      </MainContainer>
      <FixedContainer gap={4}>
        {authStore.role === 'ROLE_ADMIN' && (
          <BlogSearchItem>
            <Link href={`/blog/create`}>
              <CC.RowCenterDiv pd={'2px'} gap={2} w={'32px'} h={'32px'}>
                <Image src={Icons.EditIcon} alt="edit" />
              </CC.RowCenterDiv>
            </Link>
          </BlogSearchItem>
        )}
        <Button onClick={() => window.scrollTo(0, 0)}>
          <CC.RowCenterDiv pd={'2px'} gap={2} w={'32px'} h={'32px'}>
            <Image src={Icons.UpArrowIcon} alt="up-arrow" />
          </CC.RowCenterDiv>
        </Button>
        <Button onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
          <CC.RowCenterDiv pd={'2px'} gap={2} w={'32px'} h={'32px'}>
            <Image src={Icons.DownArrowIcon} alt="down-arrow" />
          </CC.RowCenterDiv>
        </Button>
      </FixedContainer>
    </Container>
  );
};
export default BlogMainContainer;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  height: 100%;
  gap: 8px;
  position: relative;
  overflow: scroll;
  padding: 4px;
  outline: solid ${props => props.theme.main.primary40} 2px;
  border-radius: 10px;
`;
const BlogSearchItem = styled.li`
  cursor: pointer;
  background: ${props => props.theme.main.contrast};
`;

const HeaderContainer = styled(CC.RowBetweenDiv)`
  width: 100%;
  padding: 0px 4px;
  border: solid 1px ${props => props.theme.main.primary40};
  border-radius: ${props => props.theme.borderRadius.br10};
  padding: 4px;
  height: 40px;

  & > span:nth-of-type(1) {
    color: ${props => props.theme.colors.black40};
    font-weight: 600;
  }
`;

const MainContainer = styled(CC.ColumnDiv)`
  gap: 4px;
  ${props => props.theme.scroll.hidden};

  padding: 4px 2px;
`;

const FixedContainer = styled(CC.ColumnDiv)`
  position: fixed;
  right: 10px;
  bottom: 10px;
  padding: 4px;
  opacity: 0.8;
`;
