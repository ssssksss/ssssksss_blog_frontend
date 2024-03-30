import styled from "@emotion/styled";
import { ReactElement, useEffect } from "react";
import Layout3 from "@components/layout/Layout3";
/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file loginSuccess.tsx
 * @version 0.0.1 "2024-03-28 23:10:27"
 * @description 설명 
 */
const LoginSuccess = () => {

    useEffect(()=>{
        const oauthLoginEvent = new CustomEvent("oauthLogin");
        window.opener.document.dispatchEvent(oauthLoginEvent);
        window.close();
    },[])

  return (
    <Container>
    </Container>
  );
};
export default LoginSuccess;
LoginSuccess.getLayout = function getLayout(page: ReactElement) {
    return <Layout3>{page}</Layout3>;
  };
const Container = styled.div`
  width: 100%;
`;