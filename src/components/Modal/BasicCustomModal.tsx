import { ReactNode } from "react";
import styled from "styled-components";

/**
 * Author : Sukyung Lee
 * FileName: BasicCustomModal.tsx
 * Date: 2022-07-22 00:16:59
 * Description : 커스텀 모달
 */

interface IBasicCustomModalProps {
  toggleModal: () => void;
  title?: string;
  children: ReactNode;
  height?: string;
}

const BasicCustomModal = (props: IBasicCustomModalProps) => {
  return (
    <>
      <Overlay onClick={props.toggleModal}></Overlay>
      <Container height={props.height}>
        <BodyContainer>{props.children}</BodyContainer>
      </Container>
    </>
  );
};
export default BasicCustomModal;

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(174, 174, 174, 0.8);
  cursor: pointer;
  border: 0px;
  z-index: 90;
`;
const Container = styled.div<{ height?: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 400px;
  max-width: 640px;
  width: 50%;
  height: 50%;
  overflow-y: auto;
  height: ${(props) => (props.height ? props.height : "80%")};
  transform: translate(-50%, -50%);
  border: 0px;
  z-index: 100;
`;
const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: nowrap column;
  align-items: center;
`;
