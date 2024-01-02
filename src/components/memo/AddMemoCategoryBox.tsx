import { store } from '@/redux/store';
import { SET_MEMO_CATEGORY_LIST } from '@/redux/store/memo';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { useRef } from 'react';
import { MemoAPI } from '@/api/MemoAPI';
import { Input } from '@/components/common/input/Input';
import Dropdown from '@/components/common/dropdown/Dropdown';
import { Button } from '@/components/common/button/Button';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file AddMemoBox.tsx
 * @version 0.0.1 "2023-12-17 16:56:30"
 * @description 설명
 */
const AddMemoCategoryBox = props => {
  let addMemoCategoryBackgroundColor = '';
  const categoryColors = [
    '',
    'red40',
    'orange40',
    'yellow40',
    'green40',
    'skyblue40',
    'blue40',
    'purple40',
    'pink40',
    'gray40',
  ];

  const memoStore = useSelector((state: RootState) => state.memoStore);
  const addInputCategoryRef = useRef<null>();
  const addMemoCategoryHandler = () => {
    if (addInputCategoryRef.current.value === '') return;
    if (addMemoCategoryBackgroundColor === '') return;
    MemoAPI.addMemoCategory({
      name: addInputCategoryRef.current.value,
      backgroundColor: addMemoCategoryBackgroundColor,
    }).then((res: any) => {
      store.dispatch(
        SET_MEMO_CATEGORY_LIST([
          ...memoStore.memoCategoryList,
          res.jsonObject.memoCategory,
        ])
      );
      props.closeModal();
    });
  };

  const changeAddMemoCategoryBackgroundColor = i => {
    addMemoCategoryBackgroundColor = i;
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>메모 카테고리 추가</CC.RowStartDiv>
      <Input
        placeholder={'메모 카테고리를 작성해주세요'}
        ref={addInputCategoryRef}
        outline={true}
      />
      <Dropdown
        key={'add'}
        brR={'0px'}
        bg={'white100'}
        w={'100%'}
        hoverOff={true}
        defaultPlaceHolder={'카테고리를 색상을 선택해주세요'}
        menuList={categoryColors.map(i => {
          return {
            name: '',
            func: () => changeAddMemoCategoryBackgroundColor(i),
            bg: i,
          };
        })}
      />
      <CC.RowDiv pd={'16px 0px'}>
        <Button
          w={'100%'}
          onClick={() => addMemoCategoryHandler()}
          bg={'primary80'}
        >
          메모 추가
        </Button>
      </CC.RowDiv>
    </Container>
  );
};
export default AddMemoCategoryBox;

const Container = styled(CC.ColumnStartDiv)`
  gap: 8px;
  padding: 4px;
`;
