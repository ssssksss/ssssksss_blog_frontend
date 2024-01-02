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
 * @file UpdateMemoBox.tsx
 * @version 0.0.1 "2023-12-18 01:02:26"
 * @description 설명
 */
const UpdateMemoCategoryBox = props => {
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
  const updateInputCategoryRef = useRef<null>();
  const memoStore = useSelector((state: RootState) => state.memoStore);
  let updateMemoCategoryName = '';
  let updateMemoCategoryBackgroundColor = '';
  const [updateChoiceCategory, setUpdateChoiceCategory] = useState({
    id: '',
    name: '',
    bg: '',
  });

  const choiceUpdateMemoCategory = i => {
    updateInputCategoryRef.current.value = i.name;
    updateMemoCategoryBackgroundColor = i.backgroundColor;
    setUpdateChoiceCategory({
      id: i.id,
      name: i.name,
      bg: i.backgroundColor,
    });
  };

  const changeUpdateMemoCategoryBackgroundColor = i => {
    updateMemoCategoryBackgroundColor = i;
  };

  const updateMemoCategoryHandler = () => {
    if (
      ((!updateInputCategoryRef.current.value ||
        updateInputCategoryRef.current.value === updateChoiceCategory.name) &&
        (!updateMemoCategoryBackgroundColor ||
          updateMemoCategoryBackgroundColor ===
            updateChoiceCategory.backgroundColor)) ||
      !updateChoiceCategory.id
    )
      return;
    MemoAPI.updateMemoCategory({
      id: updateChoiceCategory.id,
      name: updateInputCategoryRef.current.value,
      backgroundColor: updateMemoCategoryBackgroundColor,
    }).then((res: any) => {
      let temp = memoStore.memoCategoryList.map(i => {
        if (i.id == res.jsonObject.memoCategory.id) {
          i.name = updateInputCategoryRef.current.value;
          i.backgroundColor = updateMemoCategoryBackgroundColor;
        }
        return i;
      });
      store.dispatch(SET_MEMO_CATEGORY_LIST(temp));
      props.closeModal();
    });
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>메모 카테고리 수정 </CC.RowStartDiv>
      <CC.ColumnDiv gap={32}>
        <Dropdown
          key={'update1'}
          brR={'0px'}
          bg={'white100'}
          w={'100%'}
          defaultPlaceHolder={'변경할 카테고리를 선택해주세요'}
          menuList={memoStore.memoCategoryList?.map(i => {
            return {
              name: i.name,
              func: () => choiceUpdateMemoCategory(i),
              bg: i.backgroundColor,
            };
          })}
        />
        <CC.ColumnDiv gap={8}>
          <Input
            placeholder={''}
            ref={updateInputCategoryRef}
            outline={true}
            defaultValue={updateChoiceCategory.name}
            placeholder={'변경할 카테고리명을 작성해주세요'}
          />
          <Dropdown
            key={'update2'}
            brR={'0px'}
            bg={'white100'}
            w={'100%'}
            hoverOff={true}
            defaultPlaceHolder={'변경하려는 색상을 선택해주세요'}
            value={{
              id: updateChoiceCategory.id,
              name: '',
              bg: updateChoiceCategory.bg,
            }}
            menuList={categoryColors.map(i => {
              return {
                name: '',
                func: () => changeUpdateMemoCategoryBackgroundColor(i),
                bg: i,
              };
            })}
          />
        </CC.ColumnDiv>
      </CC.ColumnDiv>
      <CC.RowDiv gap={8} pd={'16px 0px'}>
        <Button
          w={'100%'}
          onClick={() => ''}
          bg={'primary80'}
          onClick={() => updateMemoCategoryHandler()}
        >
          메모 수정
        </Button>
      </CC.RowDiv>
    </Container>
  );
};
export default UpdateMemoCategoryBox;

const Container = styled(CC.ColumnDiv)`
  gap: 8px;
  padding: 4px;
`;
