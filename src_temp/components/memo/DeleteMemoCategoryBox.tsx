import { MemoAPI } from '@api/MemoAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import Select from '@components/common/select/Select';
import { MemoDeleteYup } from '@components/yup/MemoYup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CC } from '@styles/commonComponentStyle';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

interface IAddScheduleCategoryBoxProps {
  closeModal: () => void;
}

const DeleteMemoCategoryBox = (props: IAddScheduleCategoryBoxProps) => {
    const queryClient = useQueryClient();
    const memoCategoryResData: { data: { memoCategoryList: [] } } =
      queryClient.getQueryData(['memoCategory']);
    const deleteMemoCategoryMutation = MemoAPI.deleteMemoCategory({
      onSuccessHandler: () => {
        props.closeModal();
      },
    });
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
      deleteMemoCategoryMutation({
        id: data.pickDeleteMemoCategoryId,
      });
  };

  return (
    <CC.ColumnDiv>
      <CC.RowCenterCenterBox w={'100%'}>
        메모 카테고리 삭제
      </CC.RowCenterCenterBox>
      <CC.ColumnDiv gap={32}>
        <Select
          w={'100%'}
          placeholder={'변경할 카테고리를 선택해주세요'}
          bg={'transparent'}
          outline={true}
          data={memoCategoryResData?.data?.memoCategoryList?.map(
            (i: { id: string; name: string; backgroundColor: string }) => {
              return { value: i.id, name: i.name, bg: i.backgroundColor };
            },
          )}
          onChange={(i: { value: string }) =>
            selectChangeMemoCategoryHandler(i)
          }
        ></Select>
      </CC.ColumnDiv>
      <CC.RowDiv gap={8} pd={'1.2rem 0rem'}>
        <ConfirmButton
          w={'100%'}
          outline={true}
          onClick={handleSubmit(deleteMemoCategoryHandler, onClickErrorSubmit)}
          disabled={!formState.isValid}
        >
          메모 삭제
        </ConfirmButton>
      </CC.RowDiv>
    </CC.ColumnDiv>
  );
};
export default DeleteMemoCategoryBox;
