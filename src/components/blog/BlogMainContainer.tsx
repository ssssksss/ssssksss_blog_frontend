import styled from '@emotion/styled';
import { CC } from '@/styles/commonComponentStyle';
import { ViewIcon } from '/public/img/ui-icon/ic-like.svg';
import { LikeIcon } from '/public/img/ui-icon/ic-view.svg';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import Button from '../common/button/Button';
import Dropdown from '../common/dropdown/Dropdown';
import { useEffect, useState, useRef } from 'react';
import { Input } from '@/components/common/input/Input';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BlogAPI } from '@/api/BlogAPI';
import { useLoading } from '@/src/hooks/useLoading';
import BlogItem from './BlogItem';
import { SET_BLOG_POST_LIST } from '@/redux/store/blog';
import { store } from '@/redux/store';
import Select from '@/components/common/select/Select';
import { IconsSvg } from '../common/icons/IconsSvg';
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
  const mainContainerRef = useRef<null>();

  const orderBlogListHandler = (data: any) => {
    if (!blogStore.firstCategoryId || !blogStore.secondCategoryId) return;
    loadingFunction(
      BlogAPI.getBlogPostList({
        secondCategoryId: blogStore.secondCategoryId,
        sort: data.value,
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
  };

  useEffect(() => {
    if (
      !blogStore.secondCategoryId ||
      blogStore.secondCategoryId == 'undefined'
    )
      return;
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
        <CC.RowDiv pd={'4px 0px 4px 4px'} gap={8}>
          <Select
            onChange={orderBlogListHandler}
            defaultValue={{
              value: '',
              name: '최신순',
            }}
            w={'90px'}
            data={[
              { name: '최신순', value: '', bg: '' },
              { name: '조회수순', value: 'viewNumber', bg: '' },
              { name: '좋아요순', value: 'likeNumber', bg: '' },
            ]}
          ></Select>

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
      <MainContainer ref={mainContainerRef}>
        {blogStore.blogPostList?.map((i, index) => (
          <Link href={`/blog/${i.id}`} key={`${i.id}${index}`}>
            <a>
              <BlogItem element={i}></BlogItem>
            </a>
          </Link>
        ))}
        <FixedContainer gap={4}>
          {authStore.role === 'ROLE_ADMIN' && (
            <BlogSearchItem href={`/blog/create`}>
              <CC.RowCenterDiv pd={'2px'} gap={2} w={'32px'} h={'32px'}>
                <IconsSvg.EditIcon fill={'black80'} w={'32px'} />
              </CC.RowCenterDiv>
            </BlogSearchItem>
          )}
          <Button onClick={() => mainContainerRef.current.scrollTo(0, 0)}>
            <CC.RowCenterDiv pd={'2px'} gap={2} w={'32px'} h={'32px'}>
              <Image src={Icons.UpArrowIcon} alt="up-arrow" />
            </CC.RowCenterDiv>
          </Button>
          {/* onClick={() => window.scrollTo(0, document.body.scrollHeight)} */}
          <Button
            onClick={() =>
              mainContainerRef.current.scrollTo(
                0,
                mainContainerRef.current.scrollHeight
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
  width: 100%;
  height: 100%;
  gap: 8px;
  position: relative;
  overflow: scroll;
  padding: 4px;
  outline: solid ${props => props.theme.main.primary40} 2px;
  border-radius: 10px;
`;
const BlogSearchItem = styled(Link)`
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
  position: relative;
`;

const FixedContainer = styled(CC.ColumnDiv)`
  position: sticky;
  width: max-content;
  left: calc(100% - 20px);
  bottom: 10px;
  padding: 4px;
  opacity: 0.8;
  border-radius: 8px;
  background: ${props => props.theme.main.primary20};

  & > :hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;
