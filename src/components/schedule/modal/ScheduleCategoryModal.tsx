import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import CreateScheduleCategoryBox from '../CreateScheduleCategoryBox';
import DeleteScheduleCategoryBox from '../DeleteScheduleCategoryBox';
import UpdateScheduleCategoryBox from '../UpdateScheduleCategoryBox';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleCategoryModal.tsx
 * @version 0.0.1 "2023-12-13 15:34:42"
 * @description 설명
 */

interface IScheduleCategoryModalProps {
  closeModal?: () => void;
}

const ScheduleCategoryModal = (props: IScheduleCategoryModalProps) => {
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <CreateScheduleCategoryBox closeModal={props.closeModal} />
      <UpdateScheduleCategoryBox closeModal={props.closeModal} />
      <DeleteScheduleCategoryBox closeModal={props.closeModal} />
    </Container>
  );
};
export default ScheduleCategoryModal;

const Container = styled(CC.ColumnDiv)`
  gap: 2rem;
  color: ${(props) => props.theme.colors.black80};
  overflow: scroll;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  padding: 0.5rem;

  & > * {
    outline: solid black 1px;
    outline-offset: -1px;
    border-radius: 0.5rem;
    background: ${props=>props.theme.main.primary20};
  }
`;
