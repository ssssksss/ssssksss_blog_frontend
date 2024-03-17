import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import AddScheduleCategoryBox from '../AddScheduleCategoryBox';
import DeleteScheduleCategoryBox from '../DeleteScheduleCategoryBox';
import UpdateScheduleCategoryBox from '../UpdateScheduleCategoryBox';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleCategoryModal.tsx
 * @version 0.0.1 "2023-12-13 15:34:42"
 * @description 설명
 */
const ScheduleCategoryModal = (props) => {
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <AddScheduleCategoryBox closeModal={props.closeModal} />
      <UpdateScheduleCategoryBox closeModal={props.closeModal} />
      <DeleteScheduleCategoryBox closeModal={props.closeModal} />
    </Container>
  );
};
export default ScheduleCategoryModal;

const Container = styled(CC.ColumnDiv)`
  height: 100%;
  gap: 32px;
  color: ${(props) => props.theme.colors.black80};
  overflow: scroll;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  font-size: ${(props) => props.theme.fontSize.xl};
`;
