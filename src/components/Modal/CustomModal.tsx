import { ReactNode } from "react";
import styled from "@emotion/styled";

/**
 * Author : Sukyung Lee
 * FileName: CustomModal.tsx
 * Date: 2022-07-22 00:16:59
 * Description : 커스텀 모달
 */

interface ICustomModalProps {
  toggleModal: () => void;
  title?: string;
  children: ReactNode;
  height?: string;
}

const CustomModal = (props: ICustomModalProps) => {
  return (
    <>
      <Overlay onClick={props.toggleModal}></Overlay>
      <Container height={props.height}>
        <HeaderContainer>
          <Title> {props.title} </Title>
          <Exit onClick={props.toggleModal}>X</Exit>
        </HeaderContainer>
        <BodyContainer>{props.children}</BodyContainer>
      </Container>
    </>
  );
};
export default CustomModal;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(174, 174, 174, 0.4);
  cursor: pointer;
  border: 0px;
  z-index: 90;
`;
const Container = styled.div<{ height?: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  background: white;
  width: 80%;
  max-width: 600px;
  min-height: 300px;
  overflow-y: auto;
  height: ${(props) => (props.height ? props.height : "80%")};
  transform: translate(-50%, -50%);
  border: 0px;
  z-index: 100;
`;
const Title = styled.div`
  padding-left: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #32c2b9;
`;
const Exit = styled.button`
  width: 40px;
  height: 40px;
  background: #eaeaea;
  cursor: pointer;
`;
const HeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BodyContainer = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  padding: 0px 10px;
  display: flex;
  flex-flow: nowrap column;
  align-items: center;
`;
