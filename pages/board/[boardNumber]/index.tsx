import ViewBoardContainer from "@/components/board/ViewBoardContainer";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Layout2 from "@/components/layout/Layout2";
import Loading1 from "@/components/common/loading/Loading1";
import dynamic from "next/dynamic";
import { CC } from "@/styles/commonComponentStyle";
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
    <CC.Container>
      <DynamicComponent />
    </CC.Container>
  );
};
export default ViewBoardPage;
ViewBoardPage.layout = Layout2;
