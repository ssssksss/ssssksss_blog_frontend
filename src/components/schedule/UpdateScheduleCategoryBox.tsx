import styled from '@emotion/styled';
import { store } from '@/redux/store';
import { SET_SCHEDULE_CATEGORY_LIST } from '@/redux/store/schedule';
import { CC } from '@/styles/commonComponentStyle';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { useRef, useState } from 'react';
import { ScheduleAPI } from '@/api/ScheduleAPI';
import { Input } from '@/components/common/input/Input';
import Dropdown from '@/components/common/dropdown/Dropdown';
import { Button } from '@/components/common/button/Button';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file UpdateScheduleBox.tsx
 * @version 0.0.1 "2023-12-18 01:02:26"
 * @description 설명
 */
const UpdateScheduleCategoryBox = props => {
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
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  let updateScheduleCategoryName = '';
  let updateScheduleCategoryBackgroundColor = '';
  const [updateChoiceCategory, setUpdateChoiceCategory] = useState({
    id: '',
    name: '',
    bg: '',
  });

  const choiceUpdateScheduleCategory = i => {
    updateInputCategoryRef.current.value = i.name;
    updateScheduleCategoryBackgroundColor = i.backgroundColor;
    setUpdateChoiceCategory({
      id: i.id,
      name: i.name,
      bg: i.backgroundColor,
    });
  };

  const changeUpdateScheduleCategoryBackgroundColor = i => {
    updateScheduleCategoryBackgroundColor = i;
  };

  const updateScheduleCategoryHandler = () => {
    if (
      ((!updateInputCategoryRef.current.value ||
        updateInputCategoryRef.current.value === updateChoiceCategory.name) &&
        (!updateScheduleCategoryBackgroundColor ||
          updateScheduleCategoryBackgroundColor ===
            updateChoiceCategory.backgroundColor)) ||
      !updateChoiceCategory.id
    )
      return;
    ScheduleAPI.updateScheduleCategory({
      id: updateChoiceCategory.id,
      name: updateInputCategoryRef.current.value,
      backgroundColor: updateScheduleCategoryBackgroundColor,
    }).then((res: any) => {
      let temp = scheduleStore.scheduleCategoryList.map(i => {
        if (i.id == res.jsonObject.scheduleCategory.id) {
          i.name = updateInputCategoryRef.current.value;
          i.backgroundColor = updateScheduleCategoryBackgroundColor;
        }
        return i;
      });
      store.dispatch(SET_SCHEDULE_CATEGORY_LIST(temp));
      props.closeModal();
    });
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>일정 카테고리 수정 </CC.RowStartDiv>
      <CC.ColumnDiv gap={32}>
        <Dropdown
          key={'update1'}
          brR={'0px'}
          bg={'white100'}
          w={'100%'}
          defaultPlaceHolder={'변경할 카테고리를 선택해주세요'}
          menuList={scheduleStore.scheduleCategoryList?.map(i => {
            return {
              name: i.name,
              func: () => choiceUpdateScheduleCategory(i),
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
                func: () => changeUpdateScheduleCategoryBackgroundColor(i),
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
          onClick={() => updateScheduleCategoryHandler()}
        >
          일정 수정
        </Button>
      </CC.RowDiv>
    </Container>
  );
};
export default UpdateScheduleCategoryBox;

const Container = styled(CC.ColumnDiv)`
  gap: 8px;
  padding: 4px;
`;
