import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
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
const Container = styled(CC.RowBetweenDiv)``;

const ObjectModel = styled(CC.RowDiv)`
  height: 100%;
  align-items: center;
`;
