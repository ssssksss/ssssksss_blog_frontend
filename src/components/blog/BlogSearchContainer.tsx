import styled from '@emotion/styled';
import { Input } from '@/components/common/input/Input';
import { Icons } from '@/components/common/icons/Icons';
import { useEffect, useRef, useState } from 'react';
import { delaySearch } from '@/utils/fucntion/delaySearch';
import { CC } from '@/styles/commonComponentStyle';
import Link from 'next/link';
import BlogItem from './BlogItem';
import useLoading from '@/src/hooks/useLoading';
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
      console.log('BlogSearchContainer.tsx 파일 : ', res);
      setSearchBlogPostList(res.data.blogList);
    });
  };

  useEffect(() => {
    const temp = () => {
      console.log('BlogSearchContainer.tsx 파일 : ', inputRef);
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
        h={'40px'}
        ref={inputRef}
        leftIconImage={Icons.SearchIcon.src}
        onChange={delaySearch(SearchHandler, 1000)}
        onFocus={() => setIsOpenBlogItemList(true)}
        onBlur={() => setIsOpenBlogItemList(false)}
      />

      {isOpenBlogItemList && (
        <BlogSearchItemContainer>
          <CC.ColumnDiv>
            {searchBlogPostList.map((i, index) => (
              <BlogSearchItem>
                <Link href={`/blog/${i.id}`} key={`${i.id}${index}`}>
                  <a>
                    <BlogItem element={i}></BlogItem>
                  </a>
                </Link>
              </BlogSearchItem>
            ))}
          </CC.ColumnDiv>
        </BlogSearchItemContainer>
      )}
    </Container>
  );
};
export default BlogSearchContainer;

const Container = styled.section`
  position: relative;
`;

const BlogSearchItemContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  width: 100%;
  position: absolute;
  background: ${props => props.theme.main.primary80};
  outline: solid ${props => props.theme.main.primary80} 1px;
  transform: translate(0px, -1px);
  gap: 8px;
  padding: 4px;
  z-index: 20;
`;
const BlogSearchItem = styled.li`
  cursor: pointer;
  background: ${props => props.theme.main.contrast};
`;
