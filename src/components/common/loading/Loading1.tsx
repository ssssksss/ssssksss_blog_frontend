import { CC } from "@/styles/commonComponentStyle";
import styled from "@emotion/styled";
import { Spinner4 } from "../spinner/Spinners";

/**
 * Author : Sukyung Lee
 * FileName: loading1.tsx
 * Date: 2022-09-18 04:30:52
 * Description :
 */
const Loading1 = () => {
  return (
    <Overlay>
      <Container>
        <Spinner4 />
      </Container>
    </Overlay>
  );
};
export default Loading1;
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(174, 174, 174, 0.8);
  cursor: pointer;
  border: 0px;
  z-index: 2;
`;
const Container = styled(CC.RowCenterDiv)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 0px;
  z-index: 3;
`;
