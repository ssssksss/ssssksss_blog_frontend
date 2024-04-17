import Button from "@components/common/button/Button";
import styled from "@emotion/styled";
import { CC } from "@styles/commonComponentStyle";
/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file CommentBox.tsx
 * @version 0.0.1 "2024-04-10 02:24:13"
 * @description 설명 
 */
const CommentBox = (props) => {
  return (
    <Container>
        <CC.RowLeftStartBox gap={8}> 
            <div> {props.data.nickName} </div>
            <div> {props.data.createdAt} </div>
        </CC.RowLeftStartBox>
        <CC.RowLeftStartBox h={'100%'}> {props.children} </CC.RowLeftStartBox>
        <CC.RowLeftEndBox gap={8}> 
            <Button outline={true} pd={"0.2rem"}> 수정 </Button>
            <Button outline={true} pd={"0.2rem"}> 삭제 </Button>
            <Button outline={true} pd={"0.2rem"}> 댓글 </Button>
        </CC.RowLeftEndBox>
    </Container>
  );
};
export default CommentBox

const Container = styled(CC.ColLeftStartBox)`
  width: 100%;
  height: 180px;
  outline: solid black 0.1rem;
  outline-offset: -0.1rem;
  border-radius: 0.4rem;
  padding: 0.5rem;
  gap: 0.5rem;
`;