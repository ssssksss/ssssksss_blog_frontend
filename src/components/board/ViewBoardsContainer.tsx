import { animationKeyFrames } from "@/styles/commonAnimationKeyFrames";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../common/button/Button";
import InputSearch from "../common/input/InputSearch";
import Pagination from "../common/pagination/Pagination";
import { useEffect } from "react";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { useState } from "react";
/**
 * Author : Sukyung Lee
 * FileName: BoardContainer.tsx
 * Date: 2022-09-20 18:28:51
 * Description :
 */
const ViewBoardsContainer = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword || "");
  const [page, setPage] = useState(router.query.page || 1);
  const [option, setOption] = useState(router.query.option || "");
  const [boardList, setBoardList] = useState([]);

  const searchHandler = () => {
    AxiosInstance({
      url: "/api/boards",
      method: "GET",
      params: {
        keyword: String(keyword),
        page: Number(page),
        option: String(option),
      },
    })
      .then((response) => {
        console.log("BoardEditor.tsx : ", response);
      })
      .catch((error) => {
        alert("에러가 발생하였습니다.");
      });
  };

  const changeOptionHandler = (e: any) => {
    console.log("ViewBoardsContainer.tsx : ", e.target.value);
  };

  useEffect(() => {
    const urlQueryStringInstance = new URLSearchParams(location.search);
    AxiosInstance({
      url: "/api/boards",
      method: "GET",
      params: {
        keyword: String(urlQueryStringInstance.get("keyword")),
        page: Number(urlQueryStringInstance.get("page")),
        option: String(urlQueryStringInstance.get("option")),
      },
    })
      .then((response) => {
        console.log("BoardEditor.tsx : ", response);
      })
      .catch((error) => {
        alert("에러가 발생하였습니다.");
      });
  }, []);

  return (
    <Container>
      <Header>
        <h1> 게시판 </h1>
      </Header>
      <CF.RowCenterDiv>
        <CF.ColumnDiv width={"100%"}>
          <MainHeader>
            <InputSearch
              width={"300px"}
              height={"30px"}
              img={"/img/ui-icon/search_icon.png"}
            />
            <select name="area" onChange={changeOptionHandler}>
              <option value=""> 최신순 </option>
              <option value="popularity"> 인기순 </option>
              <option value="view"> 조회순 </option>
            </select>
          </MainHeader>
          <Main>
            <BoardItem>
              <CF.RowCenterDiv> 번호 </CF.RowCenterDiv>
              <CF.RowCenterDiv> 제목 </CF.RowCenterDiv>
              <CF.RowCenterDiv> 작성자 </CF.RowCenterDiv>
              <CF.RowCenterDiv> 날짜 </CF.RowCenterDiv>
            </BoardItem>
            {boardList.map((el: any, index: number) => (
              <BoardItem
                key={index}
                // onClick={() => router.push(`/board/${el.id}`)}
                onClick={() => router.push("/board/1")}
              >
                <CF.RowCenterDiv> {index} </CF.RowCenterDiv>
                <CF.RowCenterDiv> 제목 </CF.RowCenterDiv>
                <CF.RowCenterDiv> 작성자 </CF.RowCenterDiv>
                <CF.RowCenterDiv> 날짜 </CF.RowCenterDiv>
              </BoardItem>
            ))}
          </Main>
        </CF.ColumnDiv>
      </CF.RowCenterDiv>
      <MainFooter>
        <Pagination refetch={() => ""} endPage={21} />
        <CF.RowRightDiv padding={"0px 10px 0px 0px"}>
          <Button width="100px" onClick={() => router.push("/board/add")}>
            글작성하기
          </Button>
        </CF.RowRightDiv>
      </MainFooter>
    </Container>
  );
};
export default ViewBoardsContainer;
const Container = styled.div`
  width: 100%;
  background: #aeaeae;
  margin: 20px 0px 10px 0px;
  display: flex;
  flex-flow: nowrap column;
`;
const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
`;
const MainHeader = styled(CF.RowDiv)`
  max-width: 1180px;
  margin: auto;
  align-items: center;
  gap: 10px;
  padding: 0px 20px;
  justify-content: space-between;
  height: 60px;

  & > select {
    height: 30px;
    width: 100px;
  }
`;
const Main = styled.main`
  padding: 20px 10px;
  gap: 10px;
  display: flex;
  flex-flow: nowrap column;
`;
const BoardItem = styled.button`
  width: 100%;
  height: 40px;
  background: white;
  display: grid;
  grid-template-columns: 40px auto 60px 100px;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const MainFooter = styled(CF.ColumnDiv)`
  position: sticky;
  display: flex;
  align-items: center;
  padding: 20px 0px;
  gap: 10px;
  bottom: 0px;
  background-color: rgba(255, 255, 255, 0.5);
`;
