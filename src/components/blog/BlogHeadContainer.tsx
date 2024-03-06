import { BlogAPI } from '@api/BlogAPI';
import { Icons } from '@components/common/icons/Icons';
import Input from '@components/common/input/Input';
import useIntersection from '@components/useHook/useIntersection';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { CC } from '@styles/commonComponentStyle';
import { delaySearch } from '@utils/function/delaySearch';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import BlogItem from './BlogItem';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogHeadContainer.tsx
 * @version 0.0.1 "2023-10-15 14:09:13"
 * @description 설명
 */
const BlogHeadContainer = () => {
  const [isOpenBlogItemList, setIsOpenBlogItemList] = useState(false);
  const [isInputChange, setIsInputChange] = useState(true);
  const inputRef = useRef<null>();
  const queryClient = useQueryClient();
  const {
    data: blogListResData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['searchBlogList'],
    ({ pageParam = 1 }) =>
      BlogAPI.getSearchBlogList(inputRef.current.value, pageParam),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        let temp = [];
        data?.pages.map((i) => {
          let temp1 = [
            ...i.json.blogList.map((_i) => {
              return {
                ..._i,
                defaultImageUrl: store
                  .getState()
                  .blogStore.blogCategoryList.filter(
                    (j) => j.id == _i.firstCategoryId,
                  )[0]
                  ?.secondCategoryList.filter(
                    (k) => k.id == _i.secondCategoryId,
                  )[0].thumbnailImageUrl,
              };
            }),
          ];
          temp = temp.concat(temp1);
        });
        return temp;
      },
      retry: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage?.json.blogList?.length < 10 ? undefined : nextPage;
      },
      enabled: isOpenBlogItemList && isInputChange,
    },
  );

  const infiniteScrollRef = useIntersection((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const SearchHandler = () => {
    setIsOpenBlogItemList(true);
    setIsInputChange(true);
    if (isInputChange) {
      queryClient.fetchQuery(['searchBlogList'], { retry: 0 });
    }
  };

  useEffect(() => {
    const temp = () => {
      // 검색시 리스트를 보여주는 화면과 입력할 경우에만 데이터
      setIsOpenBlogItemList(false);
      setIsInputChange(false);
    };
    if (isOpenBlogItemList) {
      window.addEventListener('click', temp);
    }

    return () => {
      window.removeEventListener('click', temp);
    };
  }, [isOpenBlogItemList]);

  return (
    <Container>
      <Input
        type="search"
        placeholder="검색어를 입력해주세요"
        color={'black80'}
        outline={true}
        h={'32px'}
        ref={inputRef}
        leftIconImage={Icons.SearchIcon.src}
        onChange={delaySearch(SearchHandler, 600)}
        onClick={() => setIsOpenBlogItemList((prev) => !prev)}
      />
      {isOpenBlogItemList && (
        <BlogSearchItemContainer
          onBlur={() => {
            setIsOpenBlogItemList(false);
          }}
          isEmpty={isOpenBlogItemList.length >= 1}
        >
          {blogListResData?.map((j, index) => (
            <li key={index}>
              <Link href={`/blog/${j.id}`} key={`${j.id}${index}`}>
                <a>
                  <BlogItem element={j}></BlogItem>
                </a>
              </Link>
            </li>
          ))}
          {hasNextPage || (
            <CC.RowCenterDiv minH={'30px'} bg={'primary40'} brR={'8px'}>
              {blogListResData?.length == 0
                ? '결과가 없습니다.'
                : '마지막 결과 입니다.'}
            </CC.RowCenterDiv>
          )}
          <div ref={infiniteScrollRef}></div>
        </BlogSearchItemContainer>
      )}
    </Container>
  );
};
export default BlogHeadContainer;

const Container = styled.div`
  gap: 4px;
  width: 100%;
  background: ${(props) => props.theme.main.primary20};
  border-radius: 10px;
  padding: 4px;
  position: relative;
`;

const BlogSearchItemContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  width: 100%;
  position: absolute;
  background: ${(props) => props.theme.main.contrast};
  outline: solid 4px ${(props) => props.theme.main.secondary80};
  padding: 16px;
  transform: translate(-4px, 6px);
  border-radius: 10px;
  gap: 8px;
  z-index: 40;
  overflow: scroll;
  height: calc(100vh - 104px);
  @media (max-height: 624px) {
    ${(props) => props.theme.scroll.hidden};
  }

  a {
    z-index: 50;
  }
`;
