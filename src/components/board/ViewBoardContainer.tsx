import styled from '@emotion/styled';
import { CC } from '@/styles/commonComponentStyle';
import Image from 'next/image';
import { LikeIcon } from '/public/img/ui-icon/ic-like.svg';
import { Icons } from '@/components/common/icons/Icons';
import { useEffect, useRef, useState } from 'react';
import { BoardAPI } from '@/api/BoardAPI';
import { useRouter } from 'next/router';
import { dateFormat4y2m2d } from '@/utils/function/dateFormat';
import { Viewer } from '@toast-ui/react-editor';
import { LoadingComponent } from '@/components/common/loading/LoadingComponent';
import useLoading from '@/src/hooks/useLoading';
import Link from 'next/link';
import UrlQueryStringToObject from '@/utils/function/UrlQueryStringToObject';
import { RootState } from '@/redux/store/reducers';
import { useSelector } from 'react-redux';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import { store } from '@/redux/store';
import AxiosInstance from '@/utils/axios/AxiosInstance';

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
  const urlQueryObject = UrlQueryStringToObject(window.location.href);
  let urlPage = urlQueryObject.page
    ? 'page=' + urlQueryObject.page + '&'
    : 'page=1&';
  let urlSize = urlQueryObject.size
    ? 'size=' + urlQueryObject.size + '&'
    : 'size=10&';
  let urlKeyword = urlQueryObject.keyword
    ? 'keyword=' + urlQueryObject.keyword + '&'
    : '';
  let urlSort = urlQueryObject.sort
    ? 'sort=' + urlQueryObject.sort
    : 'sort=latest';

  const removeHandler = () => {
    loadingFunction(
      BoardAPI.removeBoard({
        id: router.query.id,
      })
    ).then(res => {
      router.back();
    });
  };

  useEffect(() => {
    let urlSplit = window.location.pathname.split('/');
    loadingFunction(
      BoardAPI.getBoard({
        id: urlSplit[urlSplit.length - 1],
      })
    ).then(res => {
      setBoardElements(res.data.board);
      const viewerInstance = editorRef.current?.getInstance();
      viewerInstance?.setMarkdown(res.data.board.content);
    });
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingComponent mode={'board'}> 로딩중 </LoadingComponent>
      ) : (
        <Container gap={4}>
          <CC.ColumnDiv pd={'0px 8px'} w={'100%'}>
            <CC.RowDiv pd={'16px 0px 0px 0px'} overflow={'hidden'}>
              <h1> {boardElements?.title} </h1>
            </CC.RowDiv>
            <CC.RowRightDiv gap={4}>
              <Image src={Icons.LikeIcon} alt="" width={16} height={16} />
              {boardElements?.views}
            </CC.RowRightDiv>
            <CC.RowBetweenDiv>
              <CC.RowDiv>
                작성자 : {boardElements?.writer || 'undefined'}
              </CC.RowDiv>
              <CC.RowDiv>
                {dateFormat4y2m2d(boardElements?.modifiedAt)}
              </CC.RowDiv>
            </CC.RowBetweenDiv>
          </CC.ColumnDiv>
          <ViewerContainer>
            <Viewer
              initialValue={boardElements?.content}
              theme="black"
              ref={editorRef}
            />
          </ViewerContainer>
          <FixContainer>
            {authStore.role === 'ROLE_ADMIN' && (
              <Link href={`/board/update?id=${router.query.id}`}>
                <Image src={Icons.EditIcon} alt="" width={20} height={20} />
              </Link>
            )}
            {authStore.role === 'ROLE_ADMIN' && (
              <Image
                src={Icons.DeleteIcon}
                alt=""
                width={24}
                height={24}
                onClick={() => removeHandler()}
              />
            )}
            <Link href={`/board?${urlPage}${urlSize}${urlKeyword}${urlSort}`}>
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
  overflow: scroll;
  position: relative;
  & > div {
    border-radius: 10px;
  }
  & > div:nth-of-type(1) {
    height: 120px;
    background: ${props => props.theme.main.contrast};

    & > div:nth-of-type(1) {
      font-family: ${props => props.theme.fontFamily.gmarketSansBold};
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
