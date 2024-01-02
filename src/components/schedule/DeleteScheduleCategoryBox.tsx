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
 * @file DeleteScheduleBox.tsx
 * @version 0.0.1 "2023-12-18 03:31:50"
 * @description 설명
 */
const DeleteScheduleCategoryBox = props => {
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  let deleteScheduleCategory = '';
  const choiceDeleteScheduleCategory = i => {
    deleteScheduleCategory = i;
  };

  const deleteScheduleCategoryHandler = () => {
    ScheduleAPI.deleteScheduleCategory({
      id: deleteScheduleCategory.id,
    }).then((res: any) => {
      let temp = scheduleStore.scheduleCategoryList.filter(
        i => i.id != deleteScheduleCategory.id
      );
      store.dispatch(SET_SCHEDULE_CATEGORY_LIST(temp));
      props.closeModal();
    });
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>일정 카테고리 삭제</CC.RowStartDiv>
      <CC.ColumnDiv gap={32}>
        <Dropdown
          key={'delete'}
          brR={'0px'}
          bg={'white100'}
          w={'100%'}
          menuList={scheduleStore.scheduleCategoryList?.map(i => {
            return {
              name: i.name,
              func: () => choiceDeleteScheduleCategory(i),
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
          onClick={() => deleteScheduleCategoryHandler()}
        >
          일정 삭제
        </Button>
      </CC.RowDiv>
    </Container>
  );
};
export default DeleteScheduleCategoryBox;

const Container = styled(CC.ColumnDiv)`
  gap: 8px;
  padding: 4px;
`;
