import EditBoardContainer from "@/components/board/EditBoardContainer";
import styled from "@emotion/styled";
import Layout2 from "@/components/layout/Layout2";
import { CC } from "@/styles/commonComponentStyle";
/**
 * Author : Sukyung Lee
 * FileName: update.tsx
 * Date: 2022-09-23 23:36:28
 * Description :
 */
const UpdateBoardPage = () => {
  return (
    <CC.Container>
      <EditBoardContainer edit={true} />
    </CC.Container>
  );
};
export default UpdateBoardPage;
UpdateBoardPage.layout = Layout2;
