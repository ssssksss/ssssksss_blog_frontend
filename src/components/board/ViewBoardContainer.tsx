import { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { Viewer } from "@toast-ui/react-editor";
import { CF } from "../../../styles/commonComponentStyle";
import { css } from "styled-components";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { dateFormat4y2m2d } from "../../../utils/fucntion/dateFormat";
import theme from "@/styles/theme";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
/**
 * Author : Sukyung Lee
 * FileName: ViewBoardContainer.tsx
 * Date: 2022-09-23 23:39:04
 * Description :
 */

type boardDataTypes = {
  id: number;
  title: string;
  views: number;
  writer: string;
  content: string;
  modifiedAt: string;
  baseTimeEntity: {
    accessYn: boolean;
    createdAt: string;
    modifiedAt: string;
    deleteAtAt: string;
  };
};

const ViewBoardContainer = () => {
  const router = useRouter();
  const [boardData, setBoardData] = useState<boardDataTypes>();
  const { boardNumber } = router.query;
  const editorRef = useRef<Viewer>(null);
  const [loading, setLoading] = useState(true);
  const authStore = useSelector((state: RootState) => state.authStore);

  const removeBoardHandler = () => {
    AxiosInstance({
      url: "/api/board",
      method: "DELETE",
      data: {
        id: boardData?.id,
      },
    })
      .then((response) => {
        alert("게시글이 삭제되었습니다.");
        router.back();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      AxiosInstance({
        url: "/api/board",
        method: "GET",
        params: {
          id: router.query.boardNumber,
        },
      })
        .then((response) => {
          setLoading(false);
          setBoardData(response.data.data.board);
          const viewerInstance = editorRef.current?.getInstance();
          viewerInstance?.setMarkdown(response.data.data.board.content);
        })
        .catch((error) => {
          setLoading(false);
          alert("존재하지 않는 게시물입니다.");
          router.back();
        });
    }
  }, []);

  return (
    <>
      {loading ? (
        <Container> 로딩중 ... </Container>
      ) : (
        <Container>
          <Head>
            <title> {boardData?.title} </title>
          </Head>
          <Title> {boardData?.title} </Title>
          <SubSpace>
            <BoardContainer1>
              <CF.RowDiv>
                <CF.Img
                  alt="plan_icon"
                  src="/img/ui-icon/plan_icon.png"
                  width="20px"
                  height="20px"
                  noCursor={true}
                />
                : {dateFormat4y2m2d(boardData?.modifiedAt)}
              </CF.RowDiv>
              <CF.RowDiv>
                <CF.Img
                  alt="userInfo_icon"
                  src="/img/ui-icon/userInfo_icon.png"
                  width="20px"
                  height="20px"
                  noCursor={true}
                />
                : {boardData?.writer}
              </CF.RowDiv>
            </BoardContainer1>
            <BoardContainer2>
              {(authStore.role === "ROLE_ADMIN" ||
                authStore.nickname === boardData?.writer) && (
                <>
                  <Button
                    actionType="edit"
                    onClick={() =>
                      router.push(
                        router.asPath.substring(
                          0,
                          router.asPath.lastIndexOf("/")
                        ) +
                          "/board/update?id=" +
                          boardData?.id
                      )
                    }
                  >
                    수정
                  </Button>
                  <Button
                    actionType="remove"
                    onClick={() => removeBoardHandler()}
                  >
                    삭제
                  </Button>
                </>
              )}
              <Button actionType="list" onClick={() => router.push("/board")}>
                목록
              </Button>
            </BoardContainer2>
          </SubSpace>
          <ViewerContainer>
            <Viewer
              initialValue={boardData?.content}
              theme="black"
              ref={editorRef}
            />
          </ViewerContainer>
        </Container>
      )}
    </>
  );
};
export default ViewBoardContainer;

const Container = styled.div`
  border-radius: 10px;
  font-size: 12px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  margin: 0px auto;
  padding: 10px 10px;
`;
const SubSpace = styled.div`
  width: 100%;
  height: 60px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  background: white;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
`;
const BoardContainer1 = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  gap: 4px;
  padding: 0px 4px;
  font-family: ${theme.customFonts.CookieRunRegular};

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.8rem;
  }
`;

const BoardContainer2 = styled.div`
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
  padding: 0px 10px;
  gap: 5px;

  & > img:hover {
    cursor: pointer;
  }
`;
const Button = styled.button<{ actionType?: string }>`
  width: 100px;
  height: 40px;
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  align-items: center;
  padding: 0px 4px;
  font-family: ${theme.customFonts.CookieRunRegular};
  font-size: 16px;
  border-radius: 10px;

  ${(props) =>
    props.actionType === "edit" &&
    css`
      background-color: ${theme.backgroundColors.fifth};
    `}

  ${(props) =>
    props.actionType === "remove" &&
    css`
      background-color: ${theme.backgroundColors.fourth};
    `}

  ${(props) =>
    props.actionType === "list" &&
    css`
      background-color: ${theme.backgroundColors.secondary};
    `}

    &:hover {
    color: white;
    animation: ${animationKeyFrames.UpToDownRepeat} 1s infinite;
    height: 48px;
  }
`;
const Title = styled.h2`
  width: 100%;
  min-height: 40px;
  font-size: 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
  background: ${theme.backgroundColors.primary};
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  padding: 0px 10px;
  ${({ theme }) => theme.flex.flexCenter};
`;

const ViewerContainer = styled.div`
  min-height: 600px;
  margin-top: 10px;
  background: white;
  padding: 10px;
  border-radius: 0px 0px 10px 10px;
`;
