import { store } from '@/redux/store';
import { SET_SCHEDULE_CATEGORY_LIST } from '@/redux/store/schedule';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { useRef } from 'react';
import { ScheduleAPI } from '@/api/ScheduleAPI';
import { Input } from '@/components/common/input/Input';
import Dropdown from '@/components/common/dropdown/Dropdown';
import { Button } from '@/components/common/button/Button';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file AddScheduleBox.tsx
 * @version 0.0.1 "2023-12-17 16:56:30"
 * @description 설명
 */
const AddScheduleCategoryBox = props => {
  let addScheduleCategoryBackgroundColor = '';
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

  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const addInputCategoryRef = useRef<null>();
  const addScheduleCategoryHandler = () => {
    if (addInputCategoryRef.current.value === '') return;
    if (addScheduleCategoryBackgroundColor === '') return;
    ScheduleAPI.addScheduleCategory({
      name: addInputCategoryRef.current.value,
      backgroundColor: addScheduleCategoryBackgroundColor,
    }).then((res: any) => {
      store.dispatch(
        SET_SCHEDULE_CATEGORY_LIST([
          ...scheduleStore.scheduleCategoryList,
          res.jsonObject.scheduleCategory,
        ])
      );
      props.closeModal();
    });
  };

  const changeAddScheduleCategoryBackgroundColor = i => {
    console.log('AddScheduleCategoryBox.tsx 파일 : ', i);
    return;
    addScheduleCategoryBackgroundColor = i;
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>일정 카테고리 추가</CC.RowStartDiv>
      <Input
        placeholder={'일정 카테고리를 작성해주세요'}
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
            func: () => changeAddScheduleCategoryBackgroundColor(i),
            bg: i,
          };
        })}
      />
      <CC.RowDiv pd={'16px 0px'}>
        <Button
          w={'100%'}
          onClick={() => addScheduleCategoryHandler()}
          bg={'primary80'}
        >
          일정 추가
        </Button>
      </CC.RowDiv>
    </Container>
  );
};
export default AddScheduleCategoryBox;

const Container = styled(CC.ColumnStartDiv)`
  gap: 8px;
  padding: 4px;
`;
