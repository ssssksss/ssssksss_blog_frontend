import { store } from '@/redux/store';
import { SET_SCHEDULE_CATEGORY_LIST } from '@/redux/store/schedule';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { useRef, useState } from 'react';
import { ScheduleAPI } from '@/api/ScheduleAPI';
import { Input } from '@/components/common/input/Input';
import { Button } from '@/components/common/button/Button';
import Select from '@/components/common/select/Select';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file AddScheduleBox.tsx
 * @version 0.0.1 "2023-12-17 16:56:30"
 * @description 설명
 */
const AddScheduleCategoryBox = props => {
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
  const [addCategoryRequestData, setAddCategoryRequestData] = useState();
  const addScheduleCategoryHandler = () => {
    if (addCategoryRequestData.title === '') return;
    if (addCategoryRequestData.id === '') return;
    ScheduleAPI.addScheduleCategory({
      name: addCategoryRequestData.title,
      backgroundColor: addCategoryRequestData.bg,
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

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>일정 카테고리 추가</CC.RowStartDiv>
      <Input
        placeholder={'일정 카테고리를 작성해주세요'}
        outline={true}
        onChange={e =>
          setAddCategoryRequestData(prev => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      <Select
        w={'100%'}
        placeholder={'카테고리 색상을 선택해주세요'}
        outline={true}
        data={categoryColors.map(i => {
          return { value: i, name: ' ', bg: i };
        })}
        onChange={i =>
          setAddCategoryRequestData(prev => ({
            ...prev,
            id: i.value,
            name: i.name,
            bg: i.bg,
          }))
        }
      ></Select>
      <CC.RowDiv pd={'16px 0px'}>
        <Button
          w={'100%'}
          bg={'white80'}
          onClick={() => addScheduleCategoryHandler()}
          outline={true}
          disabled={
            !addCategoryRequestData?.id || !addCategoryRequestData?.title
          }
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
