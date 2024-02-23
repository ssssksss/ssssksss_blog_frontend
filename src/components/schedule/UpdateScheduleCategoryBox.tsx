import { ScheduleAPI } from '@/api/ScheduleAPI';
import Button from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import Select from '@/components/common/select/Select';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { ScheduleCategoryUpdateYup } from '../yup/ScheduleYup';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file UpdateScheduleBox.tsx
 * @version 0.0.1 "2023-12-18 01:02:26"
 * @description 설명
 */
const UpdateScheduleCategoryBox = props => {
  const categoryColors = [
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
  const authStore = useSelector(state => state.authStore);
  const scheduleCategoryListResData = ScheduleAPI.getScheduleCategoryList();
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(ScheduleCategoryUpdateYup),
    mode: 'onChange',
    defaultValues: {
      updatePickScheduleId: '',
      updatePickScheduleBackgroundColor: '',
      updateScheduleTitle: '',
      updateScheduleBackgroundColor: '',
    },
  });
  const updateScheduleMutate = ScheduleAPI.updateScheduleCategory({
    onSuccessHandler: () => {
      queryClient.setQueryData(
        ['scheduleCategoryList', authStore.id],
        oldData => {
          console.log('UpdateScheduleCategoryBox.tsx 파일 : ', oldData);
          oldData.json.scheduleCategoryList =
            oldData.json.scheduleCategoryList.map(i => {
              if (i.id == methods.getValues('updatePickScheduleId')) {
                return {
                  ...i,
                  name: methods.getValues('updateScheduleTitle'),
                  backgroundColor: methods.getValues(
                    'updatePickScheduleBackgroundColor'
                  ),
                };
              } else {
                return i;
              }
            });
          return oldData;
        }
      );
      props.closeModal();
    },
  });

  const updateScheduleCategoryHandler = () => {
    updateScheduleMutate({
      id: methods.getValues('updatePickScheduleId'),
      name: methods.getValues('updateScheduleTitle'),
      backgroundColor: methods.getValues('updatePickScheduleBackgroundColor'),
    });
  };

  return (
    <FormProvider {...methods}>
      <Container>
        <CC.RowStartDiv w={'100%'}>일정 카테고리 수정 </CC.RowStartDiv>
        <CC.ColumnDiv gap={32}>
          <Select
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
            onChange={i => {
              methods.setValue('updatePickScheduleId', i.value);
              methods.setValue('updateScheduleTitle', i.name);
              methods.setValue('updatePickScheduleBackgroundColor', i.bg);
              methods.setValue('updateScheduleBackgroundColor', i.bg);
              methods.trigger();
            }}
          ></Select>
          <CC.ColumnDiv gap={8}>
            <Input
              placeholder={'변경할 카테고리명을 작성해주세요'}
              outline={true}
              // defaultValue={methods.getValues('updatePickScheduleName')}
              register={methods.register('updateScheduleTitle')}
            />
            <Select
              w={'100%'}
              placeholder={'카테고리 색상을 선택해주세요'}
              outline={true}
              data={categoryColors.map(i => {
                return {
                  value: i,
                  name: ' ',
                  bg: i,
                };
              })}
              defaultValue={{
                value: ' ',
                name: ' ',
                bg: methods.getValues('updatePickScheduleBackgroundColor'),
              }}
              onChange={i => {
                methods.setValue('updateScheduleBackgroundColor', i);
                methods.trigger('updateScheduleBackgroundColor');
              }}
            ></Select>
          </CC.ColumnDiv>
        </CC.ColumnDiv>
        <CC.RowDiv gap={8} pd={'16px 0px'}>
          <Button
            w={'100%'}
            bg={'white80'}
            onClick={() => updateScheduleCategoryHandler()}
            outline={true}
            disabled={!methods.formState.isValid}
          >
            일정 수정
          </Button>
        </CC.RowDiv>
      </Container>
    </FormProvider>
  );
};
export default UpdateScheduleCategoryBox;

const Container = styled(CC.ColumnDiv)`
  gap: 8px;
  pupdateing: 4px;
`;
