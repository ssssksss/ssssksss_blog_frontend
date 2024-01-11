import styled from '@emotion/styled';
import { Input } from '@/components/common/input/Input';
import { Icons } from '@/components/common/icons/Icons';
import { useEffect, useRef, useState } from 'react';
import { delaySearch } from '@/utils/function/delaySearch';
import { CC } from '@/styles/commonComponentStyle';
import Link from 'next/link';
import BlogItem from './BlogItem';
import { useLoading } from '@/src/hooks/useLoading';
import { BlogAPI } from '@/api/BlogAPI';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSearchContainer.tsx
 * @version 0.0.1 "2023-10-15 14:09:13"
 * @description 설명
 */
const BlogSearchContainer = () => {
  const [isOpenBlogItemList, setIsOpenBlogItemList] = useState(false);
  const [searchBlogPostList, setSearchBlogPostList] = useState([]);
  const inputRef = useRef<null>();
  const [isLoading, loadingFunction] = useLoading();

  const SearchHandler = () => {
    setIsOpenBlogItemList(true);
    loadingFunction(
      BlogAPI.getSearchBlogPostList({
        keyword: inputRef.current.value,
      })
    ).then(res => {
      setSearchBlogPostList(res.data.blogList);
    });
  };

  useEffect(() => {
    const temp = () => {
      setIsOpenBlogItemList(false);
    };
    // if (isOpenBlogItemList) {
    // }
    // window.addEventListener('click', temp);

    // return () => {
    // window.removeEventListener('click', temp);
    // };
    // }, [isOpenBlogItemList]);
  }, []);

  return (
    <Container>
      <Input
        type="search"
        placeholder="검색어를 입력해주세요"
        color={'black80'}
        outline={true}
        brR={'6px'}
        h={'32px'}
        ref={inputRef}
        leftIconImage={Icons.SearchIcon.src}
        onChange={delaySearch(SearchHandler, 600)}
        onClick={() => setIsOpenBlogItemList(prev => !prev)}
      />

      {isOpenBlogItemList && (
        <BlogSearchItemContainer
          onBlur={() => {
            setIsOpenBlogItemList(false);
          }}
          isEmpty={isOpenBlogItemList.length >= 1}
        >
          {searchBlogPostList?.map((i, index) => (
            <li key={index}>
              <Link
                href={`/blog/${i.id}`}
                key={`${i.id}${index}`}
                onClick={() => console.log('test')}
              >
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
export default BlogSearchContainer;

const Container = styled.div`
  position: relative;
`;

const BlogSearchItemContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  width: 100%;
  position: absolute;
  background: ${props => props.theme.colors.gray80};
  padding: 16px;
  {
    props.isEmpty && 
    outline: inset ${props => props.theme.main.primary80} 4px;
  }
  transform: translate(0px, 6px);
  border-radius: 10px;
  gap: 8px;
  z-index: 40;

  a {
    z-index: 50;
  }
`;
