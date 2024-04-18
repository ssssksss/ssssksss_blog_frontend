import { BlogAPI } from '@api/BlogAPI';
import { Icons } from '@components/common/icons/Icons';
import Input from '@components/common/input/Input';
import Overlay from '@components/common/overlay/Overlay';
import styled from '@emotion/styled';
import useIntersection from '@hooks/useIntersection';
import useWindowClick from '@hooks/useWindowClick';
import { CC } from '@styles/commonComponentStyle';
import { delaySearch } from '@utils/function/delaySearch';
import Link from 'next/link';
import { useRef, useState } from 'react';
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
  const [, setIsInputChange] = useState(true);
  const inputRef = useRef<HTMLInputElement>();
  useWindowClick(() => setIsOpenBlogItemList(false));

  const {
    data: blogListResData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = BlogAPI.getSearchBlogList(
    inputRef.current?.value,
    isOpenBlogItemList,
    () => {
      setIsInputChange(false);
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

  return (
    <CC.RelativeBox w={'100%'} h={'3rem'} outline={1} brR={"0.5rem"}>
      <CC.RelativeBox w={'100%'} h={'100%'}>
        <CC.RowLeftCenterBox
          w={'100%'}
          h={'100%'}
          pd={'0.125rem 0.5rem'}
        >
          <Input
            type="search"
            placeholder="검색어를 입력해주세요"
            w={'calc(100vw - 3.5rem)'}
            h={'1.75rem'}
            ref={inputRef}
            leftIconImage={Icons.SearchIcon.src}
            onChange={delaySearch(SearchHandler, 300)}
            onClick={(e: MouseEvent) => {
              setIsOpenBlogItemList((prev) => !prev);
              e.stopPropagation();
            }}
          />
          <BlogRecentListContainer />
        </CC.RowLeftCenterBox>
      </CC.RelativeBox>
      {/* 아래 코드는 검색창을 클릭했을 경우 보이는 블로그 검색 결과 리스트 */}
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
    </CC.RelativeBox>
  );
};
export default BlogHeadContainer;

const BlogSearchItemContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  position: absolute;
  width: calc(100% - 0.8rem);
  z-index: 11;
  transform: translate(0rem, 0.8rem);
  height: calc(100vh - 9.6rem);
  overscroll-behavior: contain;
  border-radius: 0.4rem;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: scroll;
  }
`;
