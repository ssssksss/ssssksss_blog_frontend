import { BoardAPI } from '@api/BoardAPI';
import { Icons } from '@components/common/icons/Icons';
import { Editor } from '@components/editor/MDEditor';
import styled from '@emotion/styled';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { dateFormat4y2m2d } from '@utils/function/dateFormat';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ViewBoardContainer.tsx
 * @version 0.0.1 "2023-10-10 02:35:13"
 * @description 설명
 */
const ViewBoardContainer = () => {
  const router = useRouter();
  const authStore = useSelector((state: RootState) => state.authStore);
  const boardStore = useSelector((state: RootState) => state.boardStore);
  const boardResData: {
    data: {
      board: {
        title: string,
        views: number,
        writer: string,
        modifiedAt: string,
        content: string,
        userId: number,
        status: string,
      }
    }
  } = BoardAPI.getBoard({
    enabled: router.query.id != undefined,
  })?.data;
  const deleteBoardMutate = BoardAPI.deleteBoard();
  const deleteHandler = () => {
    deleteBoardMutate({
      id: router.query.id,
    });
  };

  return (
    <>
      <Head>
        <title>{boardResData?.data?.board?.title}</title>
      </Head>
      <Container gap={4}>
        <CC.ColumnDiv pd={'0rem 0.8rem'} w={'100%'}>
          <CC.RowDiv
            pd={'1.6rem 0rem 0rem 0rem'}
            h={'max-content'}
            overflow={'hidden'}
          >
            <h1> {boardResData?.data?.board?.title} </h1>
          </CC.RowDiv>
          <CC.RowRightDiv gap={4}>
            <Image src={Icons.ViewIcon} alt="" width={16} height={16} />
            {boardResData?.data?.board?.views}
          </CC.RowRightDiv>
          <CC.RowBetweenDiv>
            <CC.RowDiv>
              작성자 : {boardResData?.data?.board?.writer || 'undefined'}
            </CC.RowDiv>
            <CC.RowDiv>
              {dateFormat4y2m2d(boardResData?.data?.board?.modifiedAt)}
            </CC.RowDiv>
          </CC.RowBetweenDiv>
        </CC.ColumnDiv>
        <ViewerContainer bg={'contrast'} icon={Icons.PlayIcon}>
          <Editor
            highlightEnable={false}
            value={boardResData?.data?.board?.content}
            preview={'preview'}
            hideToolbar={true}
            visibleDragbar={false}
            enableScroll={false}
            overflow={false}
          />
        </ViewerContainer>
        <FixContainer>
          {authStore.id == boardResData?.data?.board?.userId && (
            <Link href={`/board/update?id=${router.query.id}`}>
              <Image src={Icons.EditIcon} alt="" width={20} height={20} />
            </Link>
          )}
          {authStore.id == boardResData?.data?.board?.userId && (
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
            }&size=${boardStore.size}&sort=${boardStore.sort}`}
          >
            <Image src={Icons.MenuIcon} alt="" width={24} height={24} />
          </Link>
        </FixContainer>
      </Container>
    </>
  );
};
export default ViewBoardContainer;

const Container = styled(CC.ColumnDiv)`
  background: ${props=>props.theme.main.primary20};
  padding: 0.5rem;
  height: calc(100vh - 8rem);
  position: relative;
  & > div {
    border-radius: 1rem;
  }
  & > div:nth-of-type(1) {
    background: ${(props) => props.theme.main.contrast};
    padding: 0.4rem;

    & > div:nth-of-type(1) {
      font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
      h1 {
        padding-top: 0.2rem;
      }
    }

    & > div:nth-of-type(2) {
      color: ${(props) => props.theme.colors.black40};
    }

    & > div:nth-of-type(3) {
      color: ${(props) => props.theme.colors.black40};
    }
  }
  & > div:nth-of-type(2) {
    height: 100%;
    background: ${(props) => props.theme.main.contrast};
  }
`;

const ViewerContainer = styled.div<{ icon: unknown, bg: string }>`
  width: 100%;
  .wmde-markdown-var,
  .w-md-editor,
  .w-md-editor-show-preview,
  .w-md-editor-fullscreen,
  .w-md-editor-content,
  .w-md-editor-preview {
    display: block;
    position: static;
    height: 100% !important;
  }
  padding: 0rem 0.2rem;
  ${(props) => props.theme.scroll .hiddenX};

  p:has(img) {
    display: flex;
    justify-content: center;
  }

  img {
    max-width: 80rem;
    max-height: 60rem;
    outline: solid black 0.1rem;
  }

  ul,
  ol {
    padding-inline-start: 8px;
  }

  pre {
    outline: solid ${(props) => props.theme.main.primary80} 0.1rem;
    border-radius: 1rem;
    position: relative;
    box-shadow: 0.1rem 0.1rem 0.2rem 0rem rgba(0, 0, 0, 0.25);
    font-size: 1.2rem;

    & > button {
      display: none;
      content: '';
      background-image: ${(props) =>
        props.icon && `url('/img/ui-icon/ic-board.svg')`};
      background-size: 1rem;
      background-repeat: no-repeat;
      background-position-x: 50%;
      background-position-y: 50%;
      aspect-ratio: 1;
      position: absolute;
      width: max-content;
      top: 0rem;

      aspect-ratio: 1;
      padding: 0rem;
      border: none;
    }
    &:hover > button {
      display: flex;
    }
  }
  pre {
    code {
      font-size: 0.8rem;
      padding: 8px 4px;
      ${(props) => props.theme.scroll.hiddenX};
    }
  }
`;

const FixContainer = styled(CC.ColumnDiv)`
  position: absolute;
  right: 1rem;
  bottom: 6rem;
  gap: 0.8rem;
  opacity: 0.8;
  background: ${(props) => props.theme.main.primary80};
  color: ${(props) => props.theme.main.contrast};
  outline: solid black 0.1rem;
  padding: 0.8rem;
  border-radius: 1rem;

  img {
    cursor: pointer;
  }
  img:hover {
    transform: scale(1.2);
  }
`;
