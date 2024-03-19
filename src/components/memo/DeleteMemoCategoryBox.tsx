import { MemoAPI } from '@api/MemoAPI';
import Button from '@components/common/button/Button';
import Select from '@components/common/select/Select';
import { MemoDeleteYup } from '@components/yup/MemoYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { SET_MEMO_CATEGORY_LIST } from '@redux/store/memo';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file DeleteMemoBox.tsx
 * @version 0.0.1 "2023-12-18 03:31:50"
 * @description 설명
 */
const DeleteMemoCategoryBox = (props) => {
  const memoStore = useSelector((state: RootState) => state.memoStore);
  const { handleSubmit, formState, setValue, trigger } = useForm({
    resolver: yupResolver(MemoDeleteYup),
    mode: 'onChange',
    defaultValues: {
      pickDeleteMemoCategoryId: '',
    },
  });

  const selectChangeMemoCategoryHandler = (props: {
    value: string;
    name: string;
    bg: string;
  }) => {
    setValue('pickDeleteMemoCategoryId', props.value);
    trigger('pickDeleteMemoCategoryId');
  };

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };
  const deleteMemoCategoryHandler = (data: {
    pickDeleteMemoCategoryId: string;
  }) => {
    MemoAPI.deleteMemoCategory({
      id: data.pickDeleteMemoCategoryId,
    }).then((_) => {
      let temp = memoStore.memoCategoryList.filter(
        (i) => i.id != data.pickDeleteMemoCategoryId,
      );
      store.dispatch(SET_MEMO_CATEGORY_LIST(temp));
      props.closeModal();
    });
  };

  return (
    <Container>
      <CC.RowStartDiv w={'100%'}>메모 카테고리 삭제</CC.RowStartDiv>
      <CC.ColumnDiv gap={32}>
        <Select
          w={'100%'}
          placeholder={'변경할 카테고리를 선택해주세요'}
          bg={'transparent'}
          outline={true}
          data={memoStore.memoCategoryList?.map((i) => {
            return { value: i.id, name: i.name, bg: i.backgroundColor };
          })}
          onChange={(i) => selectChangeMemoCategoryHandler(i)}
        ></Select>
      </CC.ColumnDiv>
      <CC.RowDiv gap={8} pd={'1.2rem 0rem'}>
        <Button
          w={'100%'}
          outline={true}
          onClickCapture={handleSubmit(
            deleteMemoCategoryHandler,
            onClickErrorSubmit,
          )}
          disabled={!formState.isValid}
        >
          메모 삭제
        </Button>
      </CC.RowDiv>
    </Container>
  );
};
export default DeleteMemoCategoryBox;

const Container = styled(CC.ColumnDiv)`
  gap: 0.8rem;
  padding: 0.4rem;
`;
