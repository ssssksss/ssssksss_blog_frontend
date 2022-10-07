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
      url: "/api/post",
      method: "DELETE",
      data: {
        id: boardData?.id,
      },
    })
      .then((response) => {
        router.push(
          window.location.pathname.substring(
            0,
            window.location.pathname.lastIndexOf("/")
          )
        );
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
          // id: router.query.boardNumber,
          id: router.query.boardNumber,
        },
      })
        .then((response) => {
          setLoading(false);
          setBoardData(response.data.data.board);
          const viewerInstance = editorRef.current?.getInstance();
          console.log("ViewBoardContainer.tsx : ", response.data.data.board);
          viewerInstance?.setMarkdown(response.data.data.board.content);
        })
        .catch((error) => {
          setLoading(false);
          alert("문제가 발생했습니다.");
          router.back();
        });
    }
  }, [boardNumber]);

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
                  alt="calendar_icon"
                  src="/img/ui-icon/calendar_icon.png"
                  width="20px"
                  height="20px"
                  noCursor={true}
                />
                : {dateFormat4y2m2d(boardData?.baseTimeEntity.modifiedAt)}
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
              <LikeNumber>
                <CF.Img
                  alt="post_thumb_up"
                  src="/img/ui-icon/thumb_up_icon.png"
                  width="30px"
                  height="30px"
                />
                {boardData?.views}
              </LikeNumber>
              {authStore.role === "ROLE_ADMIN" && (
                <>
                  <CF.Img
                    alt="post_edit"
                    src="/img/ui-icon/edit_icon.png"
                    width="30px"
                    height="30px"
                    onClick={() =>
                      router.push(
                        router.asPath.substring(
                          0,
                          router.asPath.lastIndexOf("/")
                        ) +
                          "/post/update?id=" +
                          boardData?.id
                      )
                    }
                  />
                  <CF.Img
                    alt="post_delete"
                    src="/img/ui-icon/delete_icon.png"
                    width="30px"
                    height="30px"
                    onClick={() => removeBoardHandler()}
                  />
                </>
              )}
              <CF.Img
                alt="post_list"
                src="/img/ui-icon/list_icon.png"
                width="30px"
                height="30px"
                onClick={() =>
                  router.push(
                    "/blog/" +
                      router.asPath.split("/")[2] +
                      "/" +
                      router.asPath.split("/")[3]
                  )
                }
              />
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
  background: ${({ theme }) => theme.customColors.third};
  border-radius: 10px;
  padding: 10px;
  font-size: 12px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  margin: 0px auto;
`;
const SubSpace = styled.div`
  width: 100%;
  height: 60px;
  font-size: 20px;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  background: white;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
`;
const BoardContainer1 = styled.div`
  height: 60px;
  display: flex;
  flex-flow: wrap column;
  justify-content: space-evenly;
  padding: 0px 10px;

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
`;
const Button = css`
  width: 60px;
  height: 30px;
  background: #aeaeae;
  border-radius: 10px;
  border: none;
  font-size: 1.1rem;
  font-family: ${({ theme }) => theme.customFonts.cookieRunOTFRegular};
  ${({ theme }) => theme.flex.flexCenter};
  cursor: pointer;
  &:hover {
    background: white;
  }
  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    width: 40px;
    font-size: 0.8rem;
  }
`;
const LikeNumber = styled.button`
  border-radius: 10px;
  border: none;
`;
const Title = styled.h2`
  width: 100%;
  min-height: 40px;
  font-size: 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
  background: ${({ theme }) => theme.customColors.thirdTitle};
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
