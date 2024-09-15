import { ScheduleAPI } from '@api/ScheduleAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import Select from '@components/common/select/Select';
import styled from '@emotion/styled';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file DeleteScheduleBox.tsx
 * @version 0.0.1 "2023-12-18 03:31:50"
 * @description 설명
 */

interface IDeleteScheduleCategoryBoxProps {
  closeModal: () => void;
}

const DeleteScheduleCategoryBox = (props: IDeleteScheduleCategoryBoxProps) => {
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const authStore = useSelector((state) => state.authStore);
  const scheduleCategoryListResData = ScheduleAPI.getScheduleCategoryList();
  const queryClient = useQueryClient();
  const deleteBoardMutate = ScheduleAPI.deleteScheduleCategory({
    onSuccessHandler: () => {
      queryClient.setQueryData(
        ['scheduleCategoryList', authStore.id],
        (oldData) => {
          oldData.data.scheduleCategoryList =
            oldData.data?.scheduleCategoryList.filter(
              (i) => i.id != deleteCategoryRequestData.value,
            );
          return oldData;
        },
      );
      queryClient.setQueryData(
        ['scheduleList', scheduleStore.calendarMonth, authStore.id],
        (oldData) => {
          oldData.data.scheduleList = oldData.data?.scheduleList.filter(
            (i) => deleteCategoryRequestData.value != i.scheduleCategory.id,
          );
          return oldData;
        },
      );
      props.closeModal();
    },
  });
  const [deleteCategoryRequestData, setDeleteCategoryRequestData] = useState<{
    value: number;
    name: string;
    bg: string;
  }>();

  const choiceDeleteScheduleCategory = (i) => {
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
            scheduleCategoryListResData?.data?.data?.scheduleCategoryList.map(
              (i) => {
                return {
                  value: i.id,
                  name: i.name,
                  bg: i.backgroundColor,
                };
              },
            )
          }
          onChange={(i) => choiceDeleteScheduleCategory(i)}
        ></Select>
      </CC.ColumnDiv>
      <CC.RowDiv gap={8} pd={'1.2rem 0rem'}>
        <ConfirmButton
          w={'100%'}
          onClick={() => deleteScheduleCategoryHandler()}
          disabled={!deleteCategoryRequestData?.value}
        >
          일정 카테고리 삭제
        </ConfirmButton>
      </CC.RowDiv>
    </Container>
  );
};
export default DeleteScheduleCategoryBox;

const Container = styled(CC.ColumnDiv)`
  gap: 0.8rem;
  padding: 0.4rem;
`;
