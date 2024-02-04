import { BlogAPI } from '@/api/BlogAPI';
import { Icons } from '@/components/common/icons/Icons';
import { Input } from '@/components/common/input/Input';
import { useLoading } from '@/src/hooks/useLoading';
import { CC } from '@/styles/commonComponentStyle';
import { delaySearch } from '@/utils/function/delaySearch';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import BlogItem from './BlogItem';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogHeaderContainer.tsx
 * @version 0.0.1 "2023-10-15 14:09:13"
 * @description 설명
 */
const BlogHeaderContainer = () => {
  const [isOpenBlogItemList, setIsOpenBlogItemList] = useState(false);
  const [searchBlogList, setSearchBlogList] = useState([]);
  const inputRef = useRef<null>();
  const [isLoading, loadingFunction] = useLoading();

  const SearchHandler = () => {
    loadingFunction(
      BlogAPI.getSearchBlogList({
        keyword: inputRef.current.value,
      })
    ).then(res => {
      // ! API쪽 코드 응답 형식이 달라서 나중에 수정 필요
      setSearchBlogList(res?.data?.blogList);
      res.data?.blogList?.length > 0
        ? setIsOpenBlogItemList(true)
        : setIsOpenBlogItemList(false);
    });
  };

  useEffect(() => {
    const temp = () => {
      setIsOpenBlogItemList(false);
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
        onClick={() =>
          setIsOpenBlogItemList(prev =>
            searchBlogList?.length > 0 ? !prev : false
          )
        }
      />

      {isOpenBlogItemList && (
        <BlogSearchItemContainer
          onBlur={() => {
            setIsOpenBlogItemList(false);
          }}
          isEmpty={isOpenBlogItemList.length >= 1}
        >
          {searchBlogList?.map((i, index) => (
            <li key={index}>
              <Link href={`/blog/${i.id}`} key={`${i.id}${index}`}>
                <a>
                  <BlogItem element={i}></BlogItem>
                </a>
              </Link>
            </li>
          ))}
        </BlogSearchItemContainer>
      )}
    </Container>
  );
};
export default BlogHeaderContainer;

const Container = styled.div`
  gap: 4px;
  width: 100%;
  background: ${props => props.theme.main.primary20};
  border-radius: 10px;
  padding: 4px;
  position: relative;
`;

const BlogSearchItemContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  width: 100%;
  position: absolute;
  background: ${props => props.theme.main.contrast};
  outline: solid 4px ${props => props.theme.main.secondary80};
  padding: 16px;
  {
    props.isEmpty && 
    outline: inset ${props => props.theme.main.primary80} 4px;
  }
  transform: translate(-4px, 6px);
  border-radius: 10px;
  gap: 8px;
  z-index: 40;
  @media (max-height: 624px) {
    ${props => props.theme.scroll.hidden};
    height: calc(100vh - 104px);
  }

  a {
    z-index: 50;
  }
`;
