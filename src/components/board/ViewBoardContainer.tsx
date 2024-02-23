import { BoardAPI } from '@/api/BoardAPI';
import { Icons } from '@/components/common/icons/Icons';
import LoadingComponent from '@/components/common/loading/LoadingComponent';
import { useLoading } from '@/hooks/useLoading';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import { dateFormat4y2m2d } from '@/utils/function/dateFormat';
import styled from '@emotion/styled';
import { Viewer } from '@toast-ui/react-editor';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ViewBoardContainer.tsx
 * @version 0.0.1 "2023-10-10 02:35:13"
 * @description 설명
 */
const ViewBoardContainer = () => {
  const router = useRouter();
  const [boardElements, setBoardElements] = useState();
  const editorRef = useRef<Viewer>(null);
  const [isLoading, loadingFunction] = useLoading();
  const authStore = useSelector((state: RootState) => state.authStore);
  const boardStore = useSelector((state: RootState) => state.boardStore);
  const boardResData = BoardAPI.getBoard({
    id: router.query.id,
  });
  const deleteBoardMutate = BoardAPI.deleteBoard();

  const deleteHandler = () => {
    deleteBoardMutate({
      id: router.query.id,
    });
  };

  return (
    <>
      <Head>
        <title> {boardResData.data.json?.board.title} </title>
      </Head>
      {isLoading ? (
        <LoadingComponent mode={'board'}> 로딩중 </LoadingComponent>
      ) : (
        <Container gap={4}>
          <CC.ColumnDiv pd={'0px 8px'} w={'100%'}>
            <CC.RowDiv
              pd={'16px 0px 0px 0px'}
              h={'max-content'}
              overflow={'hidden'}
            >
              <h1> {boardResData.data.json?.board.title} </h1>
            </CC.RowDiv>
            <CC.RowRightDiv gap={4}>
              <Image src={Icons.LikeIcon} alt="" width={16} height={16} />
              {boardResData.data.json?.board.views}
            </CC.RowRightDiv>
            <CC.RowBetweenDiv>
              <CC.RowDiv>
                작성자 : {boardResData.data.json?.board.writer || 'undefined'}
              </CC.RowDiv>
              <CC.RowDiv>
                {dateFormat4y2m2d(boardResData.data.json?.board.modifiedAt)}
              </CC.RowDiv>
            </CC.RowBetweenDiv>
          </CC.ColumnDiv>
          <ViewerContainer>
            {boardResData.status == 'success' && (
              <Viewer
                initialValue={boardResData.data.json?.board.content}
                theme="black"
                ref={editorRef}
              />
            )}
          </ViewerContainer>
          <FixContainer>
            {authStore.id == boardResData.data.json?.board.userId && (
              <Link href={`/board/update?id=${router.query.id}`}>
                <Image src={Icons.EditIcon} alt="" width={20} height={20} />
              </Link>
            )}
            {authStore.id == boardResData.data.json?.board.userId && (
              <Image
                src={Icons.DeleteIcon}
                alt=""
                width={24}
                height={24}
                onClick={() => deleteHandler()}
              />
            )}
            <Link
              href={`/board?keyword=${boardStore.keyword}&page=${
                boardStore.page + 1
              }&size=${boardStore.size}&sor=${boardStore.sort}`}
            >
              <Image src={Icons.MenuIcon} alt="" width={24} height={24} />
            </Link>
          </FixContainer>
        </Container>
      )}
    </>
  );
};
export default ViewBoardContainer;

const Container = styled(CC.ColumnDiv)`
  height: calc(100vh - 80px);
  position: relative;
  & > div {
    border-radius: 10px;
  }
  & > div:nth-of-type(1) {
    background: ${props => props.theme.main.contrast};
    padding: 4px;

    & > div:nth-of-type(1) {
      font-family: ${props => props.theme.fontFamily.gmarketSansBold};
      h1 {
        padding-top: 2px;
      }
    }

    & > div:nth-of-type(2) {
      color: ${props => props.theme.colors.black40};
    }

    & > div:nth-of-type(3) {
      color: ${props => props.theme.colors.black40};
    }
  }
  & > div:nth-of-type(2) {
    height: 100%;
    background: ${props => props.theme.main.contrast};
  }
`;

const ViewerContainer = styled.div`
  min-height: 600px;
  margin-top: 2px;
  padding: 8px;
  border-radius: 0px 0px 10px 10px;
  position: relative;
`;

const FixContainer = styled(CC.ColumnDiv)`
  position: absolute;
  right: 10px;
  bottom: 60px;
  gap: 8px;
  opacity: 0.8;
  background: ${props => props.theme.main.primary80};
  color: ${props => props.theme.main.contrast};
  outline: solid black 1px;
  padding: 8px;
  border-radius: 10px;

  img {
    cursor: pointer;
  }
  img:hover {
    transform: scale(1.2);
  }
`;
