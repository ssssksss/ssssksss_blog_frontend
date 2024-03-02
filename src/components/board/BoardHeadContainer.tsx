import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BoardHeadContainer.tsx
 * @version 0.0.1 "2024-01-28 10:14:38"
 * @description 설명
 */
const BoardHeadContainer = () => {
  const router = useRouter();
  const keywordRef = useRef<null>();
  const boardStore = useSelector((state: RootState) => state.boardStore);

  const searchHandler = (keyword: string) => {
    let _url = `/board?page=${boardStore.page}&size=${boardStore.size}&sort=${
      boardStore.sort
    }&keyword=${keyword.current?.value || ''}`;
    store.dispatch(
      rootActions.boardStore.SET_BOARD_LIST_OPTION({
        keyword: keyword.current?.value || '',
        page: 0,
        size: Number(boardStore.size),
        sort: String(boardStore.sort),
      }),
    );
    router.replace(_url, '', { shallow: true });
  };

  const orderListHandler = (props) => {
    let _url = `/board?page=${boardStore.page}&size=${boardStore.size}&sort=${
      boardStore.sort
    }&keyword=${boardStore.keyword || ''}`;
    store.dispatch(
      rootActions.boardStore.SET_BOARD_LIST_OPTION({
        keyword: boardStore.keyword || '',
        page: Number(boardStore.page),
        size: Number(boardStore.size),
        sort: String(props.value),
      }),
    );
    router.replace(_url, '', { shallow: true });
    // return {
    //   ...props,

    // };
  };

  const reset = () => {
    let _url = `/board`;
    store.dispatch(
      rootActions.boardStore.SET_BOARD_LIST_OPTION({
        keyword: '',
        page: 0,
        size: 10,
        sort: '',
      }),
    );
    keywordRef.current.value = '';
    router.replace(_url, '', { shallow: true });
  };

  return (
    <Container>
      <CC.RowCenterDiv bg={'transparent'}>
        <h1 onClick={() => reset()}> 게시판 </h1>
      </CC.RowCenterDiv>
      <CC.GridColumn2Adjust second={'160px'} gap={10}>
        <Input
          type="search"
          placeholder="검색어를 입력해주세요"
          color={'black80'}
          outline={true}
          brR={'6px'}
          leftIconImage={Icons.SearchIcon.src}
          ref={keywordRef}
          defaultValue={boardStore.keyword ?? router.query.keyword}
          onKeyPressAction={() => searchHandler(keywordRef)}
        />
        <CC.RowBetweenDiv gap={8}>
          <Button
            w={'40px'}
            h={'28px'}
            size="md"
            bg={'primary80'}
            pd={'0px 0px'}
            color={'contrast'}
            onClick={() => searchHandler(keywordRef)}
          >
            검색
          </Button>
          <Select
            w={'110px'}
            defaultValue={{
              value: `${boardStore.sort}`,
              name: `${boardStore.sort}` == 'views' ? '조회수 순' : '최신순',
            }}
            data={[
              {
                value: 'latest',
                name: '최신순',
              },
              {
                value: 'views',
                name: '조회수 순',
              },
              // {
              //   value: 'likes',
              //   name: '좋아요 순',
              // },
            ]}
            onChange={orderListHandler}
          />
        </CC.RowBetweenDiv>
      </CC.GridColumn2Adjust>
    </Container>
  );
};
export default BoardHeadContainer;

const Container = styled.div`
  border-radius: 8px;
  h1 {
    padding: 8px 0px;
    font-size: 36px;
    color: ${(props) => props.theme.main.primary100};
    ${(props) => props.theme.flex.row.center.center};
    font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
    :hover {
      cursor: pointer;
    }
  }
`;
