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

interface IMemoCategoryModalProps {
  closeModal?: () => void;
}

const MemoCategoryModal = (props: IMemoCategoryModalProps) => {
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
  gap: 1rem;
  color: ${(props) => props.theme.colors.black80};
  overflow: scroll;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  font-size: ${(props) => props.theme.fontSize.xl};
  min-height: 26rem;
  font-size: 1.2rem;
  padding: 0.5rem;

  & > * {
    outline: solid black 1px;
    outline-offset: -1px;
    border-radius: 0.5rem;
    gap: 0.5rem;
    padding: 0.5rem;
    background: ${props=>props.theme.main.primary20};
  }
`;
