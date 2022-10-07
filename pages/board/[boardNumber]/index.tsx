import ViewBoardContainer from "@/components/board/ViewBoardContainer";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout2 from "@/components/layout/Layout2";
import Loading1 from "@/components/common/loading/Loading1";
import dynamic from "next/dynamic";
/**
 * Author : Sukyung Lee
 * FileName: ViewBoardPage.tsx
 * Date: 2022-09-23 23:37:34
 * Description :
 */

const DynamicComponent = dynamic(
  () => import("src/components/board/ViewBoardContainer"),
  {
    ssr: false,
    loading: () => <Loading1 />,
  }
) as any;

const ViewBoardPage = () => {
  return (
    <Container>
      <DynamicComponent />
    </Container>
  );
};
export default ViewBoardPage;
ViewBoardPage.layout = Layout2;
const Container = styled.div`
  width: 100%;
`;
