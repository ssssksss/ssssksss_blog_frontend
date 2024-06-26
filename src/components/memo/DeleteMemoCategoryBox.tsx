import { MemoAPI } from '@api/MemoAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import Select from '@components/common/select/Select';
import { MemoDeleteYup } from '@components/yup/MemoYup';
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

interface IAddScheduleCategoryBoxProps {
  closeModal: () => void;
}

const DeleteMemoCategoryBox = (props: IAddScheduleCategoryBoxProps) => {
  const memoStore = useSelector((state: RootState) => state.memoStore);
  const { handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(MemoDeleteYup),
    mode: 'onChange',
    defaultValues: {
      pickDeleteMemoCategoryId: '',
    },
  });

  const selectChangeMemoCategoryHandler = (props: { value: string }) => {
    setValue('pickDeleteMemoCategoryId', props.value, {shouldValidate: true});
  };

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };
  const deleteMemoCategoryHandler = (data: {
    pickDeleteMemoCategoryId: string;
  }) => {
    MemoAPI.deleteMemoCategory({
      id: data.pickDeleteMemoCategoryId,
    }).then(() => {
      const temp = memoStore.memoCategoryList.filter(
        (i) => i.id != data.pickDeleteMemoCategoryId,
      );
      store.dispatch(SET_MEMO_CATEGORY_LIST(temp));
      props.closeModal();
    });
  };

  return (
    <CC.ColumnDiv>
      <CC.RowCenterCenterBox w={'100%'}>메모 카테고리 삭제</CC.RowCenterCenterBox>
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
        <ConfirmButton
          w={'100%'}
          outline={true}
          onClick={handleSubmit(
            deleteMemoCategoryHandler,
            onClickErrorSubmit,
          )}
          disabled={!formState.isValid}
        >
          메모 삭제
        </ConfirmButton>
      </CC.RowDiv>
    </CC.ColumnDiv>
  );
};
export default DeleteMemoCategoryBox;
