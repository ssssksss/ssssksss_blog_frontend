import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BoardHeadContainer.tsx
 * @version 0.0.1 "2024-01-28 10:14:38"
 * @description 설명
 */
const BoardHeadContainer = () => {
  const router = useRouter();
  const keywordRef = useRef<HTMLInputElement>(null);
  const boardStore = useSelector((state: RootState) => state.boardStore);
  const authStore = useSelector((state: RootState) => state.authStore);

  const searchHandler = () => {
    const _url = `/board?page=${1}&size=${boardStore.size}&sort=${
      boardStore.sort
      }&keyword=${keywordRef.current?.value || ''}`;
    store.dispatch(
      rootActions.boardStore.setBoardListOption({
        keyword: keywordRef.current?.value || '',
        page: 1,
        size: Number(boardStore.size),
        sort: String(boardStore.sort),
      }),
    );
    router.push(_url, '');
  };

  const orderListHandler = (props: {value: string}) => {
    const _url = `/board?page=${boardStore.page}&size=${boardStore.size}&sort=${
      props.value
    }&keyword=${boardStore.keyword || ''}`;
    store.dispatch(
      rootActions.boardStore.setBoardListOption({
        keyword: boardStore.keyword || '',
        page: Number(boardStore.page),
        size: Number(boardStore.size),
        sort: props.value,
      }),
    );
    router.replace(_url, '', { shallow: true });
  };

  const reset = () => {
    const _url = `/board`;
    store.dispatch(
      rootActions.boardStore.setBoardListOption({
        keyword: '',
        page: 1,
        size: 10,
        sort: '',
      }),
    );
    keywordRef.current.value = '';
    router.push(_url);
  };

    useEffect(() => {
      store.dispatch(
        rootActions.boardStore.setBoardListOption({
          page:
            Number(router.query.page) > 0
              ? Number(router.query.page)
              : 1 || 1,
          size: Number(boardStore.size || 10),
          sort: String(boardStore.sort || 'latest'),
          keyword: router.query.keyword || '',
        }),
      );
      keywordRef.current.value = router.query.keyword || "";
    }, [router.query.page, router.query.size, router.query.sort, router.query.keyword]);

  return (
    <Container>
      <TitleContainer>
        <h1 onClick={() => reset()}> 게시판 </h1>
        {!!authStore.id && (
          <WriteButtonContainer>
            <Link href={'/board/create'}>
              <CC.RowDiv>
                <Image src={Icons.EditIcon} alt="" width={16} height={16} />
              </CC.RowDiv>
            </Link>
          </WriteButtonContainer>
        )}
      </TitleContainer>
      <div className={"grid grid-cols-[auto_3.5rem_6rem] gap-2 h-[2rem] "}>
        <Input
          type="search"
          placeholder="검색어를 입력해주세요"
          outline={1}
          w={'100%'}
          h={'2rem'}
          ref={keywordRef}
          defaultValue={boardStore.keyword ?? (router.query.keyword as string)}
          onKeyPressAction={searchHandler}
        />
        <Button
          w={'3.5rem'}
          h={'2rem'}
          pd={'0.25rem'}
          outline={1}
          onClick={searchHandler}
          hoverBg={"blue40"}
          hover={true}
        >
          검색
        </Button>
        <Select
          w={'6rem'}
          h={'2rem'}
          defaultValue={{
            value: `${boardStore.sort}`,
            name: `${boardStore.sort}` == 'views' ? '조회순' : '최신순',
          }}
          data={[
            {
              value: 'latest',
              name: '최신순',
            },
            {
              value: 'views',
              name: '조회순',
            },
            // {
            //   value: 'likes',
            //   name: '좋아요 순',
            // },
          ]}
          onChange={orderListHandler}
        />
      </div>
    </Container>
  );
};
export default BoardHeadContainer;

const Container = styled.div`
  border-radius: 0.5rem;
  width: 100%;
  h1 {
    font-size: 2rem;
    color: ${(props) => props.theme.main.primary100};
    ${(props) => props.theme.flex.row.center.center};
    font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
    :hover {
      cursor: pointer;
    }
  }
`;
const TitleContainer = styled(CC.RowCenterDiv)`
  background: transparent;
  position: relative;
  height: 4rem;
`;

const WriteButtonContainer = styled(CC.RowRightDiv)`
  position: absolute;
  right: 0.4rem;

  div {
    cursor: pointer;
    background: ${(props) => props.theme.main.primary80};
    color: ${(props) => props.theme.main.contrast};
    border-radius: 0.25rem;
    padding: 0.5rem;
  }
`;
