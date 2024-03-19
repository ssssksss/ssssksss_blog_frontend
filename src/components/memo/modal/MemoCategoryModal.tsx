import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import CreateMemoCategoryBox from '../CreateMemoCategoryBox';
import DeleteMemoCategoryBox from '../DeleteMemoCategoryBox';
import UpdateMemoCategoryBox from '../UpdateMemoCategoryBox';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MemoCategoryModal.tsx
 * @version 0.0.1 "2023-12-13 15:34:42"
 * @description 설명
 */
const MemoCategoryModal = (props) => {
  return (
    <Container>
      <CreateMemoCategoryBox closeModal={props.closeModal} />
      <UpdateMemoCategoryBox closeModal={props.closeModal} />
      <DeleteMemoCategoryBox closeModal={props.closeModal} />
    </Container>
  );
};
export default MemoCategoryModal;

const Container = styled(CC.ColumnDiv)`
  gap: 3.2rem;
  color: ${(props) => props.theme.colors.black80};
  overflow: scroll;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  font-size: ${(props) => props.theme.fontSize.xl};
  min-height: 26rem;
  font-size: 1.2rem;
`;
