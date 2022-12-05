import { CC } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import Totoro from "../threejs/glTF/Totoro";
/**
 * Author : Sukyung Lee
 * FileName: IntroduceChapter.tsx
 * Date: 2022-10-03 03:06:04
 * Description :
 */
const IntroduceChapter = () => {
  return (
    <Container>
      <TextDiv>
        <Title> 가출한 토토로의 공간에 오신것을 환영합니다. </Title>
        <SubTitle> 공부 기록과 토이 프로젝트의 공간 </SubTitle>
        <SubTitle> 블로그 글 정리 중(오래 걸릴 예정)~ </SubTitle>
        <SubTitle> 공부하면서 만들었던 것들을 합치는 중~ </SubTitle>
      </TextDiv>
      <ObjectModel>
        <Totoro />
      </ObjectModel>
    </Container>
  );
};
export default IntroduceChapter;
const Container = styled(CC.RowBetweenDiv)`
  @media (max-width: ${theme.customScreen.sm}) {
    flex-flow: nowrap column-reverse;
  }
`;

const TextDiv = styled(CC.ColumnLeftDiv)`
  width: 360px;
  justify-content: center;
  padding: 20px 0px 20px 50px;
  @media (max-width: ${theme.customScreen.sm}) {
    padding: 10px;
  }
`;

const Title = styled.span`
  font-family: ${theme.fontFamily.gmarketSansBold};
  font-size: ${theme.fontSizes.xl};
  line-height: 48px;
`;

const SubTitle = styled.span`
  padding: 8px 0px;
  font-size: 16px;
  animation: ${animationKeyFrames.ChangeGrayColor} 3s infinite linear alternate;
`;

const ObjectModel = styled(CC.RowDiv)`
  width: 360px;
  height: 100%;
  align-items: center;

  @media (max-width: ${theme.customScreen.sm}) {
    justify-content: center;
    width: 100%;
    height: 400px;
    transform: scale(80%);
  }
`;
