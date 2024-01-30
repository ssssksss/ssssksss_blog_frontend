import styled from '@emotion/styled';
import { store } from '@/redux/store';
import { SET_MEMO_CATEGORY_LIST } from '@/redux/store/memo';
import { CC } from '@/styles/commonComponentStyle';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { useRef, useState } from 'react';
import { MemoAPI } from '@/api/MemoAPI';
import { Input } from '@/components/common/input/Input';
import { Button } from '@/components/common/button/Button';
import Select from '@/components/common/select/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MemoUpdateYup } from '@/components/yup/MemoYup';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file UpdateMemoBox.tsx
 * @version 0.0.1 "2023-12-18 01:02:26"
 * @description 설명
 */
const UpdateMemoCategoryBox = props => {
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
  const memoStore = useSelector((state: RootState) => state.memoStore);
  const { register, handleSubmit, formState, setValue, trigger } = useForm({
    resolver: yupResolver(MemoUpdateYup),
    mode: 'onChange',
    defaultValues: {
      pickUpdateMemoCategory: '',
      updateMemoCategoryName: '',
      updateMemoCategoryColor: '',
    },
  });
  const { errors } = formState;
  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  const updateMemoCategoryHandler = (data: {
    pickUpdateMemoCategory: string;
    updateMemoCategoryName: string;
    updateMemoCategoryColor: string;
  }) => {
    if (
      !data.updateMemoCategoryColor ||
      !data.updateMemoCategoryName ||
      !data.pickUpdateMemoCategory
    )
      return;
    MemoAPI.updateMemoCategory({
      id: data.pickUpdateMemoCategory,
      name: data.updateMemoCategoryName,
      backgroundColor: data.updateMemoCategoryColor,
    }).then((res: any) => {
      let temp = memoStore.memoCategoryList.map(i => {
        if (i.id == res.json.memoCategory.id) {
          i.name = data.updateMemoCategoryName;
          i.backgroundColor = data.updateMemoCategoryColor;
        }
        return i;
      });
      store.dispatch(SET_MEMO_CATEGORY_LIST(temp));
      props.closeModal();
    });
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>메모 카테고리 수정 </CC.RowStartDiv>
      <CC.ColumnDiv gap={32}>
        <Select
          w={'100%'}
          register={register('pickUpdateMemoCategory')}
          trigger={trigger}
          placeholder={'변경할 카테고리를 선택해주세요'}
          setValue={setValue}
          bg={'transparent'}
          outline={true}
          data={memoStore.memoCategoryList?.map(i => {
            return { value: i.id, name: i.name, bg: i.backgroundColor };
          })}
        ></Select>
        <CC.ColumnDiv gap={8}>
          <Input
            placeholder={'변경할 카테고리명을 작성해주세요'}
            register={register('updateMemoCategoryName')}
            errorMessage={errors.updateMemoCategoryName?.message}
          />
          <Select
            w={'100%'}
            register={register('updateMemoCategoryColor')}
            trigger={trigger}
            placeholder={'변경하려는 색상을 선택해주세요'}
            setValue={setValue}
            bg={'transparent'}
            outline={true}
            data={categoryColors?.map(i => {
              return { value: i, name: ' ', bg: i };
            })}
          ></Select>
        </CC.ColumnDiv>
      </CC.ColumnDiv>
      <CC.RowDiv gap={8} pd={'16px 0px'}>
        <Button
          w={'100%'}
          h={'40px'}
          outline={true}
          onClickCapture={handleSubmit(
            updateMemoCategoryHandler,
            onClickErrorSubmit
          )}
          disabled={!formState.isValid}
          bg={'contrast'}
        >
          메모 수정
        </Button>
      </CC.RowDiv>
    </Container>
  );
};
export default UpdateMemoCategoryBox;

const Container = styled(CC.ColumnDiv)`
  gap: 8px;
  padding: 4px;
`;
