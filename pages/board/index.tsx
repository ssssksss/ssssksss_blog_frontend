import styled from '@emotion/styled';
import Layout1 from '@/components/layout/Layout1';
import { CC } from '@/styles/commonComponentStyle';
import { Input } from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import Dropdown from '@/components/common/dropdown/Dropdown';
import { Icons } from '@/components/common/icons/Icons';
import Pagination from '@/components/common/pagination/Pagination';
import { useEffect, useRef, useState } from 'react';
import { BoardAPI } from '@/api/BoardAPI';
import { useRouter } from 'next/router';
import { dateFormat4y2m2d } from '@/utils/function/dateFormat';
import { useLoading } from '@/src/hooks/useLoading';
import { Viewer } from '@toast-ui/react-editor';
import { LoadingComponent } from '@/components/common/loading/LoadingComponent';
import Link from 'next/link';
import Image from 'next/image';
import { RootState } from '@/redux/store/reducers';
import { useSelector } from 'react-redux';
import timeFromToday from '@/utils/function/timeFromToday';
import UrlQueryStringToObject from '@/utils/function/UrlQueryStringToObject';
import Select from '@/components/common/select/Select';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */
const Index = () => {
  const router = useRouter();
  const authStore = useSelector((state: RootState) => state.authStore);
  const [boardList, setBoardList] = useState([]);
  const [boardCount, setBoardCount] = useState([]);
  const [isLoading, loadingFunction] = useLoading();
  const keywordRef = useRef();
  let urlPage = router.query.page
    ? 'page=' + router.query.page + '&'
    : 'page=1&';
  let urlSize = router.query.size
    ? 'size=' + router.query.size + '&'
    : 'size=10&';
  let urlKeyword = router.query.keyword
    ? 'keyword=' + router.query.keyword + '&'
    : '';
  let urlSort = router.query.sort ? 'sort=' + router.query.sort : 'sort=latest';

  useEffect(() => {
    if (!router.isReady) return;
    urlPage = router.query.page ? 'page=' + router.query.page + '&' : 'page=1&';
    urlSize = router.query.size
      ? 'size=' + router.query.size + '&'
      : 'size=10&';
    urlKeyword = router.query.keyword
      ? 'keyword=' + router.query.keyword + '&'
      : '';
    urlSort = router.query.sort ? 'sort=' + router.query.sort : 'sort=latest';
    keywordRef.current.value =
      router.query.keyword === undefined ? '' : router.query.keyword;
    BoardAPI.getBoardListData({
      keyword: router.query.keyword,
      page: router.query.page - 1,
      size: router.query.size,
      sort: router.query.sort,
    })
      .then(res => {
        setBoardList(res.data?.boardList);
        setBoardCount(res.data?.boardCount);
        const url = `/board?${urlPage}${urlSize}${urlKeyword}${urlSort}`;
        router.replace(url, '', { shallow: true });
      })
      .catch(err => {});
  }, [router.isReady]);

  const orderListHandler = props => {
    if (props.value == 'viewNumber') {
      loadingFunction(
        BoardAPI.getBoardListData({
          keyword: router.query.keyword,
          page: router.query.page - 1,
          size: router.query.size,
          sort: 'views',
        })
      ).then(res => {
        setBoardList(res.data.boardList);
        setBoardCount(res.data.boardCount);
        const url = `/board?${urlPage}${urlSize}${urlKeyword}sort=views`;
        router.replace(url, '', { shallow: true });
        urlSort = 'views';
      });
    } else if (props.value == 'likeViewNumber') {
      loadingFunction(
        BoardAPI.getBoardListData({
          keyword: router.query.keyword,
          page: router.query.page - 1,
          size: router.query.size,
          sort: 'likes',
        })
      ).then(res => {
        setBoardList(res.data.boardList);
        setBoardCount(res.data.boardCount);
        const url = `/board?${urlPage}${urlSize}${urlKeyword}sort=likes`;
        router.replace(url, '', { shallow: true });
        urlSort = 'likes';
      });
    } else {
      loadingFunction(
        BoardAPI.getBoardListData({
          keyword: router.query.keyword,
          page: router.query.page - 1,
          size: router.query.size,
          sort: 'latest',
        })
      ).then(res => {
        setBoardList(res.data.boardList);
        setBoardCount(res.data.boardCount);
        const url = `/board?${urlPage}${urlSize}${urlKeyword}${urlSort}`;
        router.replace(url, '', { shallow: true });
        urlSort = 'latest';
      });
    }
  };

  const changePage = (props: { page: number }) => {
    loadingFunction(
      BoardAPI.getBoardListData({
        keyword: router.query.keyword,
        page: props.page - 1,
        size: router.query.size,
        sort: router.query.sort,
      })
    ).then(res => {
      setBoardList(res.data.boardList);
      setBoardCount(res.data.boardCount);
      const url = `/board?page=${props.page}&${urlSize}${urlKeyword}${urlSort}`;
      router.replace(url, '', { shallow: true });
      urlPage = props.page;
    });
  };

  const searchKeyword = async (keyword: string) => {
    loadingFunction(
      BoardAPI.getBoardListData({
        keyword: keyword.current.value,
        page: 0,
        size: router.query.size,
        sort: router.query.sort,
      })
    ).then(res => {
      urlPage = 'page=1&';
      setBoardList(res.data.boardList);
      setBoardCount(res.data.boardCount);
      const url = `/board?${urlPage}${urlSize}keyword=${keyword.current.value}&${urlSort}`;
      router.replace(url, '', { shallow: true });
      urlKeyword = keyword.current.value;
    });
  };

  return (
    <Container>
      <h1> 게시판 </h1>
      <CC.GridColumn2Adjust second={'160px'} gap={10}>
        <Input
          type="search"
          placeholder="검색어를 입력해주세요"
          color={'black80'}
          outline={true}
          brR={'6px'}
          leftIconImage={Icons.SearchIcon.src}
          ref={keywordRef}
          defaultValue={router.query.keyword}
          onKeyPressAction={() => searchKeyword(keywordRef)}
          // onKeyPress={() => console.log('test')}
        />
        <CC.RowBetweenDiv gap={8}>
          <Button
            w={'40px'}
            h={'28px'}
            size="md"
            bg={'primary80'}
            pd={'0px 0px'}
            color={'contrast'}
            onClick={() => searchKeyword(keywordRef)}
          >
            검색
          </Button>
          <Select
            w={'110px'}
            defaultValue={{
              value: '',
              name: '최신순',
            }}
            data={[
              {
                value: '',
                name: '최신순',
              },
              {
                value: 'viewNumber',
                name: '조회수 순',
              },
              {
                value: 'likeNumber',
                name: '좋아요 순',
              },
            ]}
            onChange={orderListHandler}
          ></Select>
        </CC.RowBetweenDiv>
      </CC.GridColumn2Adjust>
      <SearchNavContainer>
        <SearchResultContainer gap={4}>
          <div> 검색결과 </div>
          <SearchResult> {router.query.keyword} </SearchResult>
        </SearchResultContainer>
        <CC.RowRightDiv w={'150px'}>총 {boardCount} 건의 게시물</CC.RowRightDiv>
      </SearchNavContainer>
      <CC.ColumnBetweenDiv
        outline={true}
        brR={'10px'}
        pd={'8px'}
        overflow={true}
      >
        <BoardListContainer>
          <CC.ColumnDiv gap={8} height={'420px'}>
            <BoardListTitle>
              <span> 번호 </span>
              <span> 제목 </span>
              <span> 작성자 </span>
              <span> 날짜 </span>
              <span> 조회수 </span>
            </BoardListTitle>
            {isLoading ? (
              <LoadingComponent mode={'board'}> 로딩중 </LoadingComponent>
            ) : (
              boardList?.map((el: any, index: number) => (
                <Link
                  href={`/board/${el.id}`}
                  as={`/board/${el.id}?${urlPage}${urlSize}${urlKeyword}${urlSort}`}
                  key={index}
                >
                  <BoardItem>
                    <span> {el.id} </span>
                    <span> {el.title} </span>
                    <span> {el.writer} </span>
                    <span>
                      {timeFromToday(
                        dateFormat4y2m2d(el.baseTimeEntity.createdAt)
                      )}
                    </span>
                    <span>{el.views}</span>
                  </BoardItem>
                </Link>
              ))
            )}
            {isLoading ||
              (boardList?.length === 0 && <div> 내용이 없습니다. </div>)}
          </CC.ColumnDiv>
          <BoardListBottomContainer>
            {authStore.nickname && (
              <WriteButtonContainer>
                <Link href={'/board/create'}>
                  <CC.RowDiv>
                    <Image src={Icons.EditIcon} alt="" width={20} height={20} />
                    <span> 글쓰기 </span>
                  </CC.RowDiv>
                </Link>
              </WriteButtonContainer>
            )}
            <Pagination
              refetch={props => changePage(props)}
              endPage={boardCount / 10 + 1}
              currentPage={Number(router.query.page)}
            />
          </BoardListBottomContainer>
        </BoardListContainer>
      </CC.ColumnBetweenDiv>
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  height: calc(100vh - 68px);
  gap: 10px;
  background: ${props => props.theme.main.contrast};
  border-radius: 10px;
  padding: 4px;
  h1 {
    padding: 8px 0px;
    font-size: 36px;
    color: ${props => props.theme.main.primary100};
    ${props => props.theme.flex.row.center.center};
    font-family: ${props => props.theme.fontFamily.gmarketSansBold};
  }
`;

const SearchNavContainer = styled.div`
  display: grid;
  grid-template-columns: calc(100% - 150px) 150px;
`;

const SearchResultContainer = styled.div`
  display: grid;
  grid-template-columns: 70px calc(100% - 70px);
  padding-right: 2px;
`;

const SearchResult = styled.div`
  color: ${props => props.theme.colors.red80};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BoardListTitle = styled.div`
  width: 100%;
  padding: 8px 0px;
  display: grid;
  align-items: center;
  font-size: 0.8rem;
  font-family: ${props => props.theme.fontFamily.gmarketSansBold};
  border-radius: 4px 4px 0px 0px;
  outline: solid black 2px;
  background: ${props => props.theme.main.primary20};
  gap: 4px;
  line-height: 100%;

  & > span {
    text-align: center;
  }

  /* & > span:nth-of-type(1) {
    font-size: 0.8rem;
  }

  & > span:nth-of-type(2) {
    text-align: start;
    font-weight: 800;
  }

  & > span:nth-of-type(4) {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.black60};
  } */

  grid-template-columns: 30px auto 60px 60px 40px;
  @media (max-width: ${props => props.theme.deviceSizes.tablet}) {
    grid-template-columns: 30px auto 40px 60px 40px;
  }
  @media (max-width: 520px) {
    grid-template-columns: 30px auto 40px 40px 40px;
  }
`;
const BoardListContainer = styled(CC.ColumnBetweenDiv)`
  gap: 8px;
  min-height: max-content;
  padding: 4px;
  ${props => props.theme.scroll.hidden};
`;

const BoardItem = styled.div`
  width: 100%;
  padding: 2px 0px;
  min-height: 32px;
  display: grid;
  align-items: center;
  outline: solid black 2px;
  border-radius: 2px;
  overflow: hidden;
  border-radius: 4px;
  gap: 4px;

  & > span {
    text-align: center;
  }

  & > span:nth-of-type(1) {
    font-size: 0.8rem;
    color: ${props => props.theme.main.primary80};
  }

  & > span:nth-of-type(2) {
    text-align: start;
    font-weight: 800;
  }

  & > span:nth-of-type(4) {
    font-size: 0.8rem;
  }

  grid-template-columns: 30px auto 60px 60px 40px;
  @media (max-width: ${props => props.theme.deviceSizes.tablet}) {
    grid-template-columns: 30px auto 40px 60px 40px;
  }
  @media (max-width: 520px) {
    grid-template-columns: 30px auto 40px 40px 40px;
  }
  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    cursor: pointer;
    /* background: ${commonTheme.backgroundColors.purpleLight}; */
  }
`;

const BoardListBottomContainer = styled.div`
  padding-bottom: 8px;
`;

const WriteButtonContainer = styled(CC.RowRightDiv)`
  height: 32px;
  margin: 4px 0px;

  div {
    cursor: pointer;
    background: ${props => props.theme.main.primary80};
    color: ${props => props.theme.main.contrast};
    outline: solid black 1px;
    padding: 4px;
    border-radius: 10px;
    gap: 4px;
  }
`;
