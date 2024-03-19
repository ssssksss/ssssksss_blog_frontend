import { BlogAPI } from '@api/BlogAPI';
import { Icons } from '@components/common/icons/Icons';
import Input from '@components/common/input/Input';
import useIntersection from '@components/useHook/useIntersection';
import styled from '@emotion/styled';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { delaySearch } from '@utils/function/delaySearch';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import BlogItem from './BlogItem';
import BlogRecentListContainer from './BlogRecentListContainer';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogHeadContainer.tsx
 * @version 0.0.1 "2023-10-15 14:09:13"
 * @description 설명
 */
const BlogHeadContainer = () => {
  const [isOpenBlogItemList, setIsOpenBlogItemList] = useState(false);
  const [_, setIsInputChange] = useState(true);
  const inputRef = useRef<null>();
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  const {
    data: blogListResData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['searchBlogList', inputRef.current?.value],
    ({ pageParam = 1 }) =>
      BlogAPI.getSearchBlogList(inputRef.current.value, pageParam),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      select: (data) => {
        // ! 새로운 데이터가 오면 기존 이미지들로 디폴트 값을 채워준다.
        let temp = [];
        data?.pages.map((i) => {
          let temp1 = [
            ...i.json.blogList.map((_i) => {
              return {
                ..._i,
                defaultImageUrl:
                  blogStore1.secondCategoryList[_i.firstCategoryId][
                    _i.secondCategoryId
                  ].thumbnailImageUrl,
              };
            }),
          ];
          temp = temp.concat(temp1);
        });
        return temp;
      },
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage?.json.blogList?.length < 10 ? undefined : nextPage;
      },
      onSuccess: () => {
        setIsInputChange(false);
      },
      // enabled: isOpenBlogItemList && isInputChange,
      enabled: isOpenBlogItemList,
    },
  );

  const infiniteScrollRef = useIntersection((entry, observer) => {
    // ref를 감지할 경우 실행되는 로직작성
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  const SearchHandler = () => {
    setIsOpenBlogItemList(true);
    setIsInputChange(true);
  };

  useEffect(() => {
    const temp = () => {
      setIsOpenBlogItemList(false);
    };
    window.addEventListener('click', temp);

    return () => {
      window.removeEventListener('click', temp);
    };
  }, []);

  return (
    <Container>
      <CC.RelativeBox>
        <Input
          type="search"
          placeholder="검색어를 입력해주세요"
          color={'black80'}
          outline={true}
          w={'calc(100% - 4rem)'}
          h={'2.4rem'}
          ref={inputRef}
          leftIconImage={Icons.SearchIcon.src}
          onChange={delaySearch(SearchHandler, 300)}
          onClick={(e) => {
            setIsOpenBlogItemList((prev) => !prev);
            e.stopPropagation();
          }}
        />
        <BlogRecentListContainer />
      </CC.RelativeBox>
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
                <BlogItem element={j} viewMode={true}></BlogItem>
              </Link>
            </li>
          ))}
          {hasNextPage || (
            <CC.RowCenterDiv minH={'3.2rem'} bg={'primary40'} brR={'0.8rem'}>
              {blogListResData?.length == 0
                ? '결과가 없습니다.'
                : '마지막 결과 입니다.'}
            </CC.RowCenterDiv>
          )}
          <div ref={infiniteScrollRef}></div>
        </BlogSearchItemContainer>
      )}
      {isOpenBlogItemList && <Overlay />}
    </Container>
  );
};
export default BlogHeadContainer;

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 0.4rem;
`;

const BlogSearchItemContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  position: absolute;
  width: calc(100% - 0.8rem);
  z-index: 11;
  transform: translate(0rem, 0.8rem);
  ${(props) => props.theme.scroll.hiddenY};
  height: calc(100vh - 9.6rem);
  overscroll-behavior: contain;
  border-radius: 0.4rem;
`;

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  border-radius: 0.8rem;
  opacity: 0.8;
  border: 0rem;
  z-index: 10;
  background: ${(props) => props.theme.colors.black80};
`;
