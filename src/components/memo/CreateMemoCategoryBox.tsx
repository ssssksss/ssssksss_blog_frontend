import { MemoAPI } from '@/api/MemoAPI';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import Select from '@/components/common/select/Select';
import { MemoCreateYup } from '@/components/yup/MemoYup';
import { store } from '@/redux/store';
import { SET_MEMO_CATEGORY_LIST } from '@/redux/store/memo';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file AddMemoBox.tsx
 * @version 0.0.1 "2023-12-17 16:56:30"
 * @description 설명
 */
const CreateMemoCategoryBox = props => {
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

  const selectChangeMemoCategoryHandler = (props: {
    value: string;
    name: string;
    bg: string;
  }) => {
    setValue('createMemoCategoryName', props.name);
    setValue('createMemoCategoryColor', props.bg);
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
        placeholder={'1번째 카테고리'}
        bg={'transparent'}
        outline={true}
        data={categoryColors.map(i => {
          return { value: i, name: ' ', bg: i };
        })}
        onChange={i => selectChangeMemoCategoryHandler(i)}
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
export default CreateMemoCategoryBox;

const Container = styled(CC.ColumnStartDiv)`
  gap: 8px;
  padding: 4px;
`;
