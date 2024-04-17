import CommentContainer from '@components/comment/CommentContainer';
import styled from '@emotion/styled';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Test.tsx
 * @version 0.0.1 "2024-03-18 03:29:11"
 * @description 설명
 */
const Test = () => {
  return (
    <Container>
      <CommentContainer/>
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
