import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Test.tsx
 * @version 0.0.1 "2024-03-18 03:29:11"
 * @description 설명
 */
const Test = () => {
  return (
    <Container>
      <div> 123 </div>
      <CC.RowLeftCenterBox outline={true} w={'100px'} h={'100px'}>
        123
      </CC.RowLeftCenterBox>
    </Container>
  );
};
export default Test;

const Container = styled.div`
  ${(props) => props.theme.flexBox.col.center.start};
  width: 100%;
  height: 30rem;
  outline: solid red 0.1rem;
`;
