import { ScheduleAPI } from '@/api/ScheduleAPI';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import Select from '@/components/common/select/Select';
import { store } from '@/redux/store';
import { RootState } from '@/redux/store/reducers';
import { SET_SCHEDULE_CATEGORY_LIST } from '@/redux/store/schedule';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const updateCategoryInputRef = useRef<null>();
  const updateCategorySelectRef = useRef<null>();
  const [updateCategoryRequestData, setUpdateCategoryRequestData] = useState<{
    value: number;
    name: string;
    bg: string;
  }>();

  const choiceUpdateScheduleCategory = (i: {
    value: number;
    name: string;
    bg: string;
  }) => {
    setUpdateCategoryRequestData(prev => ({
      id: i.value,
      name: i.name,
      bg: i.bg,
    }));
    updateCategorySelectRef.current = {
      value: i.value,
      name: i.name,
      bg: i.bg,
    };
  };

  const updateScheduleCategoryHandler = () => {
    if (
      updateCategoryRequestData.name === '' ||
      updateCategoryRequestData.id === ''
    )
      return;

    ScheduleAPI.updateScheduleCategory({
      id: updateCategoryRequestData.id,
      name: updateCategoryRequestData.name,
      backgroundColor: updateCategoryRequestData.bg,
    }).then((res: any) => {
      let temp = scheduleStore.scheduleCategoryList.map(i => {
        if (i.id == res.json.scheduleCategory.id) {
          i.name = updateCategoryRequestData.name;
          i.backgroundColor = updateCategoryRequestData.bg;
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
        <Select
          w={'100%'}
          placeholder={'변경할 카테고리를 선택해주세요'}
          outline={true}
          data={scheduleStore.scheduleCategoryList.map(i => {
            return {
              value: i.id,
              name: i.name,
              bg: i.backgroundColor,
            };
          })}
          onChange={choiceUpdateScheduleCategory}
        ></Select>
        <CC.ColumnDiv gap={8}>
          <Input
            placeholder={'변경할 카테고리명을 작성해주세요'}
            outline={true}
            defaultValue={updateCategoryRequestData?.name}
            onChange={e =>
              setUpdateCategoryRequestData(prev => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <Select
            w={'100%'}
            placeholder={'카테고리 색상을 선택해주세요'}
            outline={true}
            ref={updateCategorySelectRef}
            data={categoryColors.map(i => {
              return { value: ' ', name: ' ', bg: i };
            })}
            defaultValue={{
              value: updateCategoryRequestData?.id,
              name: ' ',
              bg: updateCategoryRequestData?.bg,
            }}
            onChange={i =>
              setUpdateCategoryRequestData(prev => ({
                ...prev,
                bg: i.bg,
              }))
            }
          ></Select>
        </CC.ColumnDiv>
      </CC.ColumnDiv>
      <CC.RowDiv gap={8} pd={'16px 0px'}>
        <Button
          w={'100%'}
          bg={'white80'}
          onClick={() => updateScheduleCategoryHandler()}
          outline={true}
          disabled={
            !updateCategoryRequestData?.id || !updateCategoryRequestData?.name
          }
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
  pupdateing: 4px;
`;
