import { ScheduleAPI } from '@/api/ScheduleAPI';
import { Button } from '@/components/common/button/Button';
import Select from '@/components/common/select/Select';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file DeleteScheduleBox.tsx
 * @version 0.0.1 "2023-12-18 03:31:50"
 * @description 설명
 */
const DeleteScheduleCategoryBox = props => {
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const authStore = useSelector(state => state.authStore);
  const scheduleCategoryListResData = ScheduleAPI.getScheduleCategoryList();
  const queryClient = useQueryClient();
  const deleteBoardMutate = ScheduleAPI.deleteScheduleCategory({
    onSuccessHandler: data => {
      queryClient.setQueryData(
        ['scheduleCategoryList', authStore.id],
        oldData => {
          oldData.json.scheduleCategoryList =
            oldData.json.scheduleCategoryList.filter(
              i => i.id != deleteCategoryRequestData.value
            );
          return oldData;
        }
      );
      queryClient.setQueryData(
        ['scheduleList', scheduleStore.calendarMonth, authStore.id],
        oldData => {
          oldData.json.scheduleList = oldData.json.scheduleList.filter(
            i => deleteCategoryRequestData.value != i.scheduleCategory.id
          );
          return oldData;
        }
      );
      props.closeModal();
    },
  });
  const [deleteCategoryRequestData, setDeleteCategoryRequestData] = useState<{
    value: number;
    name: string;
    bg: string;
  }>();

  const choiceDeleteScheduleCategory = i => {
    setDeleteCategoryRequestData(i);
  };

  const deleteScheduleCategoryHandler = () => {
    deleteBoardMutate({
      id: deleteCategoryRequestData.value,
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
          data={
            scheduleCategoryListResData?.isLoading ||
            scheduleCategoryListResData?.data?.json?.scheduleCategoryList.map(
              i => {
                return {
                  value: i.id,
                  name: i.name,
                  bg: i.backgroundColor,
                };
              }
            )
          }
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
