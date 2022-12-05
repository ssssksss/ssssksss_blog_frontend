import UserDashBoardContainer from "@/components/blog/User/UserDashBoardContainer";
import Layout3 from "@/components/layout/Layout3";
import styled from "@emotion/styled";
/**
 * Author : Sukyung Lee
 * FileName: UserProfilePage.tsx
 * Date: 2022-09-18 00:36:11
 * Description :
 */
const UserProfilePage = () => {
  return (
    <Container>
      <UserDashBoardContainer />
    </Container>
  );
};
export default UserProfilePage;
UserProfilePage.layout = Layout3;
const Container = styled.div`
  width: 100%;
  padding-top: 20px;
`;
