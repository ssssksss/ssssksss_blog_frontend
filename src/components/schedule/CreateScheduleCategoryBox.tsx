import { ScheduleAPI } from '@api/ScheduleAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file AddScheduleBox.tsx
 * @version 0.0.1 "2023-12-17 16:56:30"
 * @description 설명
 */

interface IAddScheduleCategoryBoxProps {
  closeModal: () => void;
}

const CreateScheduleCategoryBox = (props: IAddScheduleCategoryBoxProps) => {
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

  const authStore = useSelector((state) => state.authStore);
  const [createCategoryRequestData, setCreateCategoryRequestData] = useState({
    id: '',
    title: '',
  });
  const queryClient = useQueryClient();
  const addScheduleCategoryHandler = () => {
    if (createCategoryRequestData.title === '') return;
    if (createCategoryRequestData.id === '') return;
    ScheduleAPI.addScheduleCategory({
      name: createCategoryRequestData.title,
      backgroundColor: createCategoryRequestData.bg,
    }).then(
      (res: {
        data: {
          scheduleCategory: {
            backgroundColor: string;
            id: number;
            isVisible: boolean;
            name: string;
            userId: number;
          };
        };
      }) => {
        queryClient.setQueryData(
          ['scheduleCategoryList', authStore.id],
          (oldData) => {
            oldData.data?.scheduleCategoryList.push(res.data?.scheduleCategory);
            return oldData;
          },
        );
        props.closeModal();
      },
    );
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>일정 카테고리 추가</CC.RowStartDiv>
      <Input
        placeholder={'일정 카테고리를 작성해주세요'}
        outline={1}
        bg={'white20'}
        pd={"0 0 0 0.5rem"}
        h={"2.25rem"}
        onChange={(e) =>
          setCreateCategoryRequestData((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      <Select
        w={'100%'}
        placeholder={'카테고리 색상을 선택해주세요'}
        outline={true}
        data={categoryColors.map((i) => {
          return { value: i, name: ' ', bg: i };
        })}
        onChange={(i) => 
        {
          setCreateCategoryRequestData((prev) => ({
            ...prev,
            id: i.value,
            name: i.name,
            bg: i.bg,
          }));
          }
        }
      ></Select>
      <CC.RowDiv pd={'1.6rem 0rem'}>
        <Button
          w={'100%'}
          onClick={() => addScheduleCategoryHandler()}
          outline={true}
          disabled={
            !createCategoryRequestData?.id || !createCategoryRequestData?.title
          }
        >
          일정 카테고리 추가
        </Button>
      </CC.RowDiv>
    </Container>
  );
};
export default CreateScheduleCategoryBox;

const Container = styled(CC.ColumnStartDiv)`
  gap: 0.8rem;
  padding: 0.4rem;
`;
