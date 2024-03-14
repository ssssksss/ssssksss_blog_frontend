import { BoardAPI } from '@api/BoardAPI';
import Pagination from '@components/common/pagination/Pagination';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { CC } from '@styles/commonComponentStyle';
import { dateFormat4y2m2d } from '@utils/function/dateFormat';
import { timeFromToday } from '@utils/function/timeFromToday';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BoardMainContainer.tsx
 * @version 0.0.1 "2024-01-28 16:43:44"
 * @description 설명
 */
const BoardMainContainer = () => {
  const boardStore = useSelector((state) => state.boardStore);
  const router = useRouter();
  const boardListResData = BoardAPI.getBoardListData({
    keyword: String(boardStore.keyword ?? (router.query.keyword || '')),
    page: Number(boardStore.page ?? (Number(router.query.page - 1) || 0)),
    size: Number(boardStore.size ?? (router.query.size || 10)),
    sort: String(boardStore.sort ?? (router.query.sort || '')),
    enabled: router.isReady,
    onSuccessHandler: () => {
      store.dispatch(
        rootActions.boardStore.SET_BOARD_LIST_OPTION({
          keyword: String(boardStore.keyword ?? (router.query.keyword || '')),
          page: Number(boardStore.page ?? (Number(router.query.page - 1) || 0)),
          size: Number(boardStore.size ?? (router.query.size || 10)),
          sort: String(boardStore.sort ?? (router.query.sort || '')),
        }),
      );
    },
  });

  const changePage = (props: { page: number }) => {
    store.dispatch(
      rootActions.boardStore.SET_BOARD_LIST_OPTION({
        page: props.page - 1,
        size: Number(boardStore.size),
        sort: String(boardStore.sort),
        keyword: boardStore.keyword,
      }),
    );
    let _url = `/board?page=${props.page}&size=${boardStore.size}&sort=${boardStore.sort}&keyword=${boardStore.keyword}`;
    router.replace(_url, '', { shallow: true });
  };

  return (
    <Container>
      <SearchNavContainer>
        <SearchResultContainer gap={4}>
          <div> 검색결과 </div>
          <SearchResult> {boardStore.keyword} </SearchResult>
        </SearchResultContainer>
        <CC.RowRightDiv w={'150px'}>
          총 {boardListResData?.data?.json?.boardCount} 건의 게시물
        </CC.RowRightDiv>
      </SearchNavContainer>
      <BoardListContainer>
        <BoardListTitle>
          <span> 번호 </span>
          <span> 제목 </span>
          <span> 작성자 </span>
          <span> 날짜 </span>
          <span> 조회수 </span>
        </BoardListTitle>
        {boardListResData?.data?.json?.boardList?.map(
          (el: any, index: number) => (
            <Link
              href={`/board/${el.id}`}
              as={`/board/${el.id}?
                    page=${store.getState().boardStore.page}
                    &size=${store.getState().boardStore.size}
                    &keyword=${store.getState().boardStore.keyword}
                    &sort=${store.getState().boardStore.sort}`}
              key={index}
            >
              <BoardItem>
                <span> {el.id} </span>
                <span> {el.title} </span>
                <span> {el.writer} </span>
                <span>
                  {timeFromToday(dateFormat4y2m2d(el.baseTimeEntity.createdAt))}
                </span>
                <span>{el.views}</span>
              </BoardItem>
            </Link>
          ),
        )}
      </BoardListContainer>
      <BoardListBottomContainer>
        <Pagination
          refetch={(props) => changePage(props)}
          endPage={Math.ceil(boardListResData?.data?.json?.boardCount / 10)}
          currentPage={Number(boardStore.page + 1)}
        />
      </BoardListBottomContainer>
    </Container>
  );
};
export default BoardMainContainer;

const Container = styled(CC.ColumnDiv)`
  gap: 4px;
  height: 100%;

  & > div:nth-last-child(1) {
    margin-top: auto;
  }
`;

const SearchNavContainer = styled.div`
  display: grid;
  grid-template-columns: calc(100% - 150px) 150px;
  align-items: center;
`;

const SearchResultContainer = styled.div`
  display: grid;
  grid-template-columns: 70px calc(100% - 70px);
`;

const SearchResult = styled.div`
  color: ${(props) => props.theme.colors.red80};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BoardListTitle = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  font-size: 0.8rem;
  font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
  background: ${(props) => props.theme.main.primary20};

  & > span {
    text-align: center;
  }

  grid-template-columns: 30px auto 60px 60px 40px;
  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    grid-template-columns: 30px auto 40px 60px 40px;
  }
  @media (max-width: 520px) {
    grid-template-columns: 30px auto 40px 40px 40px;
  }
`;
const BoardListContainer = styled(CC.ColumnDiv)`
  padding: 4px;
  gap: 4px;

  & > div {
    gap: 8px;
    padding: 4px 0px;
  }
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
    color: ${(props) => props.theme.main.primary80};
  }

  & > span:nth-of-type(2) {
    text-align: start;
    font-weight: 800;
  }

  & > span:nth-of-type(4) {
    font-size: 0.8rem;
  }

  grid-template-columns: 30px auto 60px 60px 40px;
  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
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
  }
`;

const BoardListBottomContainer = styled.div`
  padding: 0px 4px;
`;
