import { MemoAPI } from '@api/MemoAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { useRef } from 'react';
import { IMemoItemProps } from 'src/@types/memo/memoItem';
import Textarea from '../common/textarea/Textarea';

const MemoItem = (props: IMemoItemProps) => {
  const memoContentRef = useRef<HTMLTextAreaElement>();
  const createMemoMutation = MemoAPI.createMemo();
  const updateMemoMutation = MemoAPI.updateMemo();
  const deleteMemoMutation = MemoAPI.deleteMemo(props.data?.id);
  const createMemoHandler = () => {
    createMemoMutation({
      content: memoContentRef.current?.value,
      memoCategoryId: props.category.categoryId,
    });
    memoContentRef.current.value = "";
  };

  const updateMemoHandler = () => {
    updateMemoMutation({
      id: props.data.id,
      content: memoContentRef.current.value,
      memoCategoryId: props.data.memoCategory.id,
    });
  };

  const deleteMemoHandler = () => {
    deleteMemoMutation({});
  };

  return (
    <Container bg={props.data?.memoCategory?.backgroundColor} key={props.key}>
      <Header>
        <CC.RowCenterCenterBox w={'100%'}>
          {props.data?.memoCategory?.name || '메모 작성'}{' '}
        </CC.RowCenterCenterBox>
        {props.data && (
          <ConfirmButton
            onClick={deleteMemoHandler}
            bg={'transparent'}
            hover={false}
          >
            <Image src={Icons.ExitIcon} width={20} height={20} alt="" />
          </ConfirmButton>
        )}
      </Header>
        <Textarea
          key={props.data?.content}
          ref={memoContentRef}
          defaultValue={props.data?.content}
          submit={() => (props.edit ? updateMemoHandler() : createMemoHandler())}
          resizeMode={true}
          placeholder="메모를 작성해주세요"
        />
    </Container>
  );
};
export default MemoItem;

const Container = styled.div<{ bg: string }>`
  word-wrap: break-word;
  word-break: break-all;
  background: ${(props) => props.theme.colors?.[props.bg]};
  border-radius: 0.5rem;
  padding: 0.5rem;
  outline: solid black 1px;
  outline-offset: 1px;
  height: 20rem;
  max-height: 20rem;

  textarea {
    max-height: calc(100% - 5.5rem);
    background: ${(props) => props.theme.colors.white80};
    border: none;
  }
`;
const Header = styled(CC.RowRightDiv)`
  width: 100%;
  position: relative;
  height: 2.4rem;
`;
