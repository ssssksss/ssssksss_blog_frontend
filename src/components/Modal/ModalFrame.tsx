import styled from "@emotion/styled";

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
const Container = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  background: white;
  width: 60%;
  height: calc(100% - 100px);
  transform: translate(-50%, -50%);
  border: 0px;
  z-index: 3;
`;

const ModalFirstCategory = (modalHandler: any) => {
  return (
    <Overlay onClick={() => modalHandler.modalHandler()}>
      <Container>추가 취소</Container>
    </Overlay>
  );
};
export default ModalFirstCategory;
