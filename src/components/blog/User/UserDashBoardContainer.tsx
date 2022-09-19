import Button from "@/components/common/button/Button";
import { CF } from "@/styles/commonComponentStyle";
import { useState } from "react";
import styled from "styled-components";
import PostDeleteListContainer from "../Post/PostDeleteListContainer";

/**
 * Author : Sukyung Lee
 * FileName: UserDashBoardContainer.tsx
 * Date: 2022-09-18 00:33:34
 * Description :
 */
const UserDashBoardContainer = () => {
  const [menu, setMenu] = useState("home");

  return (
    <Container>
      <CF.ColumnDiv gap={10} padding={"0px 10px"}>
        <Button onClick={() => setMenu("home")}> 홈 </Button>
        <Button onClick={() => setMenu("postRemoveList")}>
          게시글 삭제 목록
        </Button>
      </CF.ColumnDiv>
      <CF.RowDiv>
        {menu === "home" && <></>}
        {menu === "postRemoveList" && <PostDeleteListContainer />}
        {menu === "home" && <></>}
      </CF.RowDiv>
    </Container>
  );
};
export default UserDashBoardContainer;

const Container = styled(CF.RowDiv)`
  background: #e2e3f5;
  border-radius: 10px;
  margin-bottom: 10px;
  gap: 10px;
  padding: 10px;

  & > div:nth-child(1) {
    width: 300px;
    padding: 10px;
    background-color: #aeaeae;
    border-radius: 10px;
  }
  & > div:nth-child(2) {
    width: calc(100% - 300px);
    padding: 10px;
    background-color: #aeaeae;
    border-radius: 10px;
  }
`;
