import { ScheduleAPI } from '@/api/ScheduleAPI';
import { Button } from '@/components/common/button/Button';
import Select from '@/components/common/select/Select';
import { store } from '@/redux/store';
import { RootState } from '@/redux/store/reducers';
import { SET_SCHEDULE_CATEGORY_LIST } from '@/redux/store/schedule';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
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

  const deleteScheduleCategoryHandler = (props: {
    value: number;
    name: string;
    bg: string;
  }) => {
    ScheduleAPI.deleteScheduleCategory({
      id: props.id,
    }).then((res: any) => {
      let temp = scheduleStore.scheduleCategoryList.filter(
        i => i.id != props.id
      );
      store.dispatch(SET_SCHEDULE_CATEGORY_LIST(temp));
      props.closeModal();
    });
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>일정 카테고리 삭제</CC.RowStartDiv>
      <CC.ColumnDiv gap={32}>
        <Select
          key={'delete'}
          w={'100%'}
          placeholder={'변경할 카테고리를 선택해주세요'}
          outline={true}
          data={scheduleStore.scheduleCategoryList?.map(i => {
            return {
              value: i.id,
              name: i.name,
              bg: i.backgroundColor,
            };
          })}
          onChange={i => choiceDeleteScheduleCategory(i)}
        ></Select>
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
