import styled from "@emotion/styled";
import { timeFunction } from "@utils/function/timeFunction";
import CommentBox from "./CommentBox";
/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file CommentContainer.tsx
 * @version 0.0.1 "2024-04-10 02:21:28"
 * @description 설명 
 */
const CommentContainer = () => {
  const data = {
    nickName: '홍길동',
    createdAt: timeFunction.timeFromToday(new Date()),
    content: "댓글",
  }
    const test = [data];

    return (
    <Container>
        {
            test.map(i=>(<CommentBox data={data}> {data.content} </CommentBox>))
        }
    </Container>
  );
};
export default CommentContainer

const Container = styled.div`
  width: 100%;
  padding: 0.5rem;
`;