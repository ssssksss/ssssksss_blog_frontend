import { MemoAPI } from '@api/MemoAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { SET_MEMO_LIST } from '@redux/store/memo';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import Textarea from '../common/textarea/Textarea';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MemoItem.tsx
 * @version 0.0.1 "2023-10-02 16:50:32"
 * @description 설명
 */

interface IMemoItemProps {
  data?: {
    id: number;
    content: string;
    memoCategory: {
      id: number;
      name: string;
      backgroundColor: string;
      userId: number;
    };
  };
  edit?: boolean;
  deleteMemoHandler?: () => void;
  category?: {
    type: string;
    categoryId: number;
  };
  key?: string;
}

const MemoItem = (props: IMemoItemProps) => {
  const memoStore = useSelector((state: RootState) => state.memoStore);
  const memoContentRef = useRef<null>();

  const addMemoHandler = () => {
    MemoAPI.addMemo({
      content: memoContentRef.current.value,
      memoCategoryId: Number(props.category.categoryId),
    }).then((res: unknown) => {
      const temp = [...memoStore.memoList];
      temp.unshift({
        id: res.data?.id,
        content: res.data?.content,
        memoCategory: {
          id: Number(res.data?.memoCategory.id),
          name: res.data?.memoCategory.name,
          backgroundColor: res.data?.memoCategory.backgroundColor,
        },
      });
      store.dispatch(SET_MEMO_LIST(temp));
      memoContentRef.current.value = '';
    });
  };

  const updateMemoHandler = () => {
    MemoAPI.updateMemo({
      id: props.data.id,
      content: memoContentRef.current.value,
    }).then((res: unknown) => {
      const temp = memoStore.memoList.map((i) => {
        if (i.id == props.data.id) {
          return {
            id: res.data?.id,
            content: res.data?.content,
            memoCategory: {
              id: Number(res.data?.memoCategory.id),
              name: res.data?.memoCategory.name,
              backgroundColor: res.data?.memoCategory.backgroundColor,
              userId: res.data?.memoCategory.userId,
            },
          };
        }
        return i;
      });
      store.dispatch(SET_MEMO_LIST(temp));
    });
  };

  const deleteMemoHandler = () => {
    MemoAPI.deleteMemo({
      id: props.data.id,
    })
      .then(() => {
        const temp = memoStore.memoList.filter((i) => props.data.id != i.id);
        store.dispatch(SET_MEMO_LIST([...temp]));
      })
      .catch(() => {});
  };

  return (
    <Container bg={props.data?.memoCategory.backgroundColor} key={props.key}>
      <Header>
        <CC.RowCenterCenterBox w={'100%'}>
          {props.data?.memoCategory.name || '메모 작성'}{' '}
        </CC.RowCenterCenterBox>
        {props.data && (
          <ConfirmButton
            onClick={deleteMemoHandler}
            bg={'transparent'}
            hover={false}
          >
            <Image src={Icons.ExitIcon} weight={20} height={20} alt="" />
          </ConfirmButton>
        )}
      </Header>
      <Textarea
        ref={memoContentRef}
        defaultValue={props.data?.content}
        submit={() => (props.edit ? updateMemoHandler() : addMemoHandler())}
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
    max-height: calc(100% - 0.5rem);
    background: ${(props) => props.theme.colors.white80};
    border: none;
  }
`;
const Header = styled(CC.RowRightDiv)`
  width: 100%;
  position: relative;
  height: 2.4rem;
`;
