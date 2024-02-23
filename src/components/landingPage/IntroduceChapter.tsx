import styled from '@emotion/styled';
import { animationKeyFrames } from '@styles/animationKeyFrames';
import { CC } from '@styles/commonComponentStyle';
import { commonTheme } from '@styles/theme';
import MyRoom from '../threejs/glTF/room/MyRoom';
/**
 * Author : Sukyung Lee
 * FileName: IntroduceChapter.tsx
 * Date: 2022-10-03 03:06:04
 * Description :
 */
const IntroduceChapter = () => {
  return (
    <Container>
      <ObjectModel>
        <MyRoom />
      </ObjectModel>
    </Container>
  );
};
export default IntroduceChapter;
const Container = styled(CC.RowBetweenDiv)`
  @media (max-width: ${commonTheme.customScreen.sm}) {
    flex-flow: nowrap column-reverse;
  }
`;

const TextDiv = styled(CC.ColumnLeftDiv)`
  width: 360px;
  justify-content: center;
  padding: 20px 0px 20px 50px;
  @media (max-width: ${commonTheme.customScreen.sm}) {
    padding: 10px;
  }
`;

const Title = styled.span`
  font-family: ${commonTheme.fontFamily.gmarketSansBold};
  font-size: ${commonTheme.fontSize.xl};
  line-height: 48px;
`;

const SubTitle = styled.span`
  padding: 8px 0px;
  font-size: 16px;
  animation: ${animationKeyFrames.ChangeGrayColor} 3s infinite linear alternate;
`;

const ObjectModel = styled(CC.RowDiv)`
  height: 100%;
  align-items: center;

  @media (max-width: ${commonTheme.customScreen.sm}) {
    justify-content: center;
    width: 100%;
    transform: scale(80%);
  }
`;
