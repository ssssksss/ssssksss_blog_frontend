import { BoardAPI } from '@api/BoardAPI';
import Pagination from '@components/common/pagination/Pagination';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { dateFormat4y2m2d } from '@utils/function/dateFormat';
import { timeFunction } from '@utils/function/timeFunction';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { IBoardListProps } from '../../@types/api/board/BoardMainContainer';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BoardMainContainer.tsx
 * @version 0.0.1 "2024-01-28 16:43:44"
 * @description 설명
 */
const BoardMainContainer = () => {
  const boardStore = useSelector((state: RootState) => state.boardStore);
  const router = useRouter();
  const boardListResData = BoardAPI.getBoardListData({
    keyword: String(router.query.keyword || ''),
    page: Number(router.query.page) || 1,
    size: Number(router.query.size || 10),
    sort: String(router.query.sort || 'latest'),
  });

  if (boardListResData?.status != 'success') return;
  const boardListData = boardListResData?.data?.data;
  const changePage = (page: number) => {
    store.dispatch(
      rootActions.boardStore.setBoardListOption({
        // 페이지는 0부터 시작이므로 0부터 보냄
        page: page,
        size: Number(boardStore.size || 10),
        sort: String(boardStore.sort || 'latest'),
        keyword: boardStore.keyword || '',
      }),
    );
    const _url = `/board?page=${page}&size=${boardStore.size}&sort=${boardStore.sort}&keyword=${boardStore.keyword}`;
    router.push(_url,"");
  };

  return (
    <Container>
      <SearchContainer>
        <SearchResultContainer gap={4}>
          <span> 검색결과 </span>
          <span> {boardStore.keyword} </span>
        </SearchResultContainer>
        <CC.RowDiv>
          총 {boardListData.boardCount} 건의 게시물
        </CC.RowDiv>
      </SearchContainer>
      <BoardListContainer>
        <BoardListTitle>
          <span> 번호 </span>
          <span> 제목 </span>
          <span> 작성자 </span>
          <span> 날짜 </span>
          <span> 조회수 </span>
        </BoardListTitle>
        {boardListData.boardList?.map((el: IBoardListProps) => (
          <Link
            key={el.id}
            href={`/board/${el.id}?page=${store.getState().boardStore.page}&size=${store.getState().boardStore.size}&keyword=${store.getState().boardStore.keyword}&sort=${store.getState().boardStore.sort}`}
            // as={`/board/${el.id}?
            //   page=${store.getState().boardStore.page}
            //         &size=${store.getState().boardStore.size}
            //         &keyword=${store.getState().boardStore.keyword}
            //         &sort=${store.getState().boardStore.sort}`}
          >
            <BoardItem>
              <span> {el.id} </span>
              <span> {el.title} </span>
              <span> {el.writer} </span>
              <span>
                {timeFunction.timeFromToday(
                  dateFormat4y2m2d(el.baseTimeEntity.createdAt),
                )}
              </span>
              <span>{el.views}</span>
            </BoardItem>
          </Link>
        ))}
        {Array.from(
          { length: 10 - boardListData.boardList?.length || 0 },
          () => 0,
        )?.map((_, index) => <BoardItem key={index} />)}
      </BoardListContainer>
      <BoardListBottomContainer>
        <Pagination
          refetch={(page: number) => changePage(page)}
          endPage={Math.ceil(boardListData.boardCount / 10)}
          currentPage={boardStore.page}
        />
      </BoardListBottomContainer>
    </Container>
  );
};
export default BoardMainContainer;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  gap: 0.4rem;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 12rem;
  outline: solid black 0.2rem;
  outline-offset: -0.2rem;
  border-radius: 0.4rem;
  padding: 0.8rem 0.5rem;
  font-size: 1.2rem;
`;

const SearchResultContainer = styled(CC.RowDiv)`
  width: 100%;
  span:nth-last-of-type(1) {
    font-weight: 800;
    color: red;
    align-items: center;
  }
`;

const BoardListTitle = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  font-size: 1.2rem;
  font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
  outline: solid black 0.2rem;
  outline-offset: -0.2rem;
  border-radius: 0.4rem;
  color: ${(props) => props.theme.main.primary80};

  & > span {
    display: inline-block;
    text-align: center;
  }

  grid-template-columns: 3rem auto 6rem 6rem 4rem;
  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    grid-template-columns: 3rem auto 4rem 6rem 4rem;
  }
  @media (max-width: 52rem) {
    grid-template-columns: 3rem auto 4rem 4rem 4rem;
  }
`;
const BoardListContainer = styled.div`
  gap: 0.4rem;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  width: 100%;
  height: 100%;

  & > div {
    gap: 0.4rem;
  }
`;

const BoardItem = styled.div`
  width: 100%;
  height: 3.2rem;
  display: grid;
  align-items: center;
  outline: solid black 0.2rem;
  outline-offset: -0.2rem;
  border-radius: 0.2rem;
  overflow: hidden;
  border-radius: 0.4rem;
  gap: 0.4rem;
  font-size: 1rem;

  & > span:nth-of-type(1) {
    color: ${(props) => props.theme.main.primary80};
    text-align: center;
  }

  & > span:nth-of-type(2) {
    text-align: start;
    font-weight: 800;
  }

  & > span:nth-of-type(4) {
    text-align: center;
  }
  & > span:nth-of-type(5) {
    text-align: center;
  }

  grid-template-columns: 3rem auto 6rem 6rem 4rem;
  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    grid-template-columns: 3rem auto 4rem 6rem 4rem;
  }
  @media (max-width: 52rem) {
    grid-template-columns: 3rem auto 4rem 4rem 4rem;
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
  width: 100%;
  padding: 0.4rem 0rem;
  outline: solid black 0.2rem;
  outline-offset: -0.2rem;
  border-radius: 0.4rem;
`;
