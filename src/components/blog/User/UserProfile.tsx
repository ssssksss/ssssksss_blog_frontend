import { CF } from "@/styles/commonComponentStyle";
import styled from "styled-components";

/**
 * Author : Sukyung Lee
 * FileName: UserProfile.tsx
 * Date: 2022-09-18 00:33:34
 * Description :
 */
const UserProfile = () => {
  return (
    <Container>
      <CF.ColumnDiv> 사용자 </CF.ColumnDiv>
      <CF.RowDiv> 사용자 </CF.RowDiv>
    </Container>
  );
};
export default UserProfile;

const Container = styled(CF.RowDiv)`
  background: #e2e3f5;
  border-radius: 30px;
  margin-bottom: 10px;
  gap: 10px;

  & > div:nth-child(1) {
    width: 300px;
    padding: 10px;
  }
  & > div:nth-child(2) {
    width: calc(100% - 300px);
    padding: 10px;
  }
`;
