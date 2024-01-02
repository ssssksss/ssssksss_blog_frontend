import styled from '@emotion/styled';
import { store } from '@/redux/store';
import { SET_MEMO_CATEGORY_LIST } from '@/redux/store/memo';
import { CC } from '@/styles/commonComponentStyle';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { useRef, useState } from 'react';
import { MemoAPI } from '@/api/MemoAPI';
import { Input } from '@/components/common/input/Input';
import Dropdown from '@/components/common/dropdown/Dropdown';
import { Button } from '@/components/common/button/Button';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file DeleteMemoBox.tsx
 * @version 0.0.1 "2023-12-18 03:31:50"
 * @description 설명
 */
const DeleteMemoCategoryBox = props => {
  const memoStore = useSelector((state: RootState) => state.memoStore);
  let deleteMemoCategory = '';
  const choiceDeleteMemoCategory = i => {
    deleteMemoCategory = i;
  };

  const deleteMemoCategoryHandler = () => {
    MemoAPI.deleteMemoCategory({
      id: deleteMemoCategory.id,
    }).then((res: any) => {
      let temp = memoStore.memoCategoryList.filter(
        i => i.id != deleteMemoCategory.id
      );
      store.dispatch(SET_MEMO_CATEGORY_LIST(temp));
      props.closeModal();
    });
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>메모 카테고리 삭제</CC.RowStartDiv>
      <CC.ColumnDiv gap={32}>
        <Dropdown
          key={'delete'}
          brR={'0px'}
          bg={'white100'}
          w={'100%'}
          menuList={memoStore.memoCategoryList?.map(i => {
            return {
              name: i.name,
              func: () => choiceDeleteMemoCategory(i),
              bg: i.backgroundColor,
            };
          })}
        />
      </CC.ColumnDiv>
      <CC.RowDiv gap={8} pd={'12px 0px'}>
        <Button
          w={'100%'}
          onClick={() => ''}
          bg={'primary80'}
          onClick={() => deleteMemoCategoryHandler()}
        >
          메모 삭제
        </Button>
      </CC.RowDiv>
    </Container>
  );
};
export default DeleteMemoCategoryBox;

const Container = styled(CC.ColumnDiv)`
  gap: 8px;
  padding: 4px;
`;
