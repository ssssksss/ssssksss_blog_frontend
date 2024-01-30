import { store } from '@/redux/store';
import { SET_MEMO_CATEGORY_LIST } from '@/redux/store/memo';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { useRef } from 'react';
import { MemoAPI } from '@/api/MemoAPI';
import { Input } from '@/components/common/input/Input';
import Dropdown from '@/components/common/dropdown/Dropdown';
import { Button } from '@/components/common/button/Button';
import Select from '@/components/common/select/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MemoCreateYup } from '@/components/yup/MemoYup';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file AddMemoBox.tsx
 * @version 0.0.1 "2023-12-17 16:56:30"
 * @description 설명
 */
const AddMemoCategoryBox = props => {
  let addMemoCategoryBackgroundColor = '';
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
  const addInputCategoryRef = useRef<null>();
  const { register, handleSubmit, formState, setValue, trigger } = useForm({
    resolver: yupResolver(MemoCreateYup),
    mode: 'onChange',
    defaultValues: {
      createMemoCategoryName: '',
      createMemoCategoryColor: '',
    },
  });
  const { errors } = formState;
  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };
  const addMemoCategoryHandler = (data: {
    createMemoCategoryColor: string;
    createMemoCategoryName: string;
  }) => {
    if (!data.createMemoCategoryColor || !data.createMemoCategoryName) return;
    MemoAPI.addMemoCategory({
      name: data.createMemoCategoryName,
      backgroundColor: data.createMemoCategoryColor,
    }).then((res: any) => {
      store.dispatch(
        SET_MEMO_CATEGORY_LIST([
          ...memoStore.memoCategoryList,
          res.json.memoCategory,
        ])
      );
      props.closeModal();
    });
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>메모 카테고리 추가</CC.RowStartDiv>
      <Input
        placeholder={'메모 카테고리를 작성해주세요'}
        register={register('createMemoCategoryName')}
        errorMessage={errors.createMemoCategoryName?.message}
      />
      <Select
        w={'100%'}
        register={register('createMemoCategoryColor')}
        trigger={trigger}
        placeholder={'1번째 카테고리'}
        setValue={setValue}
        bg={'transparent'}
        outline={true}
        data={categoryColors.map(i => {
          return { value: i, name: ' ', bg: i };
        })}
      ></Select>
      <CC.RowDiv pd={'16px 0px'}>
        <Button
          w={'100%'}
          h={'40px'}
          outline={true}
          onClickCapture={handleSubmit(
            addMemoCategoryHandler,
            onClickErrorSubmit
          )}
          disabled={!formState.isValid}
          bg={'contrast'}
        >
          메모 추가
        </Button>
      </CC.RowDiv>
    </Container>
  );
};
export default AddMemoCategoryBox;

const Container = styled(CC.ColumnStartDiv)`
  gap: 8px;
  padding: 4px;
`;
