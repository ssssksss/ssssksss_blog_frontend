import { ReactNode } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";

/**
 * Author : Sukyung Lee
 * FileName: CustomModal.tsx
 * Date: 2022-07-22 00:16:59
 * Description : 커스텀 모달
 * ex : const [isOpenModal,setIsOpenModal] = useState(false);
 * ex : {isOpenModal && <CustomModal title={"test"} height={"40px"} toggleModal={() => setIsOpenModal(!isOpenModal)} />}
 * ex : onClick={() => setIsOpenModal(true)}
 */

interface ICustomModalProps {
  toggleModal: () => void;
  title?: string;
  children: ReactNode;
  height?: string;
  width?: string;
  overlayDisable?: boolean;
}
/**
 *
 * @param props toggleModal={() => setIsOpenModal(!isOpenModal)}>
 * @param props title : 모달창 헤더 제목
 * @param props width, height(string) : 모달창 크기
 * @param props overlayDisable(boolean, [D]false) : 오버레이를 사용하여 외부를 클릭시 모달창 종료
 * @returns
 */
const CustomModal = (props: ICustomModalProps) => {
  const themeStore = useSelector((state: RootState) => state.themeStore);

  return (
    <>
      {!props.OverlayActive && <Overlay onClick={props.toggleModal}></Overlay>}
      <Container width={props.width} height={props.height} theme={themeStore}>
        <HeaderContainer theme={themeStore}>
          <Title className="title"> {props.title} </Title>
          <Exit onClick={props.toggleModal}>
            <div> </div>
            <div> </div>
            <div> </div>
          </Exit>
        </HeaderContainer>
        <BodyContainer>{props.children}</BodyContainer>
      </Container>
    </>
  );
};
export default CustomModal;

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  border: 0px;
`;

interface IContainerProps {
  height?: string;
  theme: {
    menuBackground: string;
    menuIconBackground: string;
    menuIconFont: string;
    menuIconFontColor: string;
    HoverMenuIconBackground: string;
    HoverMenuIconFontColor: string;
  };
}

const Container = styled.div<IContainerProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  background: ${(props) => props.theme.menuBackground};
  width: ${(props) => (props.width ? props.width : "80%")};
  height: ${(props) => (props.height ? props.height : "80%")};
  max-width: 600px;
  min-height: 300px;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  border: 0px;
  z-index: 100;

  .title {
    border: ${(props) => props.theme.menuBackground};
  }
`;
const HeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: ${(props: any) => props.theme.menuBackground};
  z-index: 20;
  transform: translateZ(0);
`;
const Title = styled.div`
  padding-left: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Exit = styled.button`
  cursor: pointer;
  width: 40px;
  height: 40px;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 10;
  transform: translateZ(0);

  & > div {
    position: absolute;
    width: 32px;
    height: 4px;
    background-color: #000;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
    transform: translateZ(0);
  }

  & > div:nth-of-type(1) {
    top: 50%;
    transform: translate(0px, -50%) rotate(405deg);
  }

  & > div:nth-of-type(2) {
    opacity: 0;
    transform: translate(0px, -50%) rotate(360deg);
  }

  & > div:nth-of-type(3) {
    top: 50%;
    transform: translate(0px, -50%) rotate(-405deg);
  }
`;
const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: nowrap column;
  background-color: rgba(255, 255, 255, 0.5);
`;
