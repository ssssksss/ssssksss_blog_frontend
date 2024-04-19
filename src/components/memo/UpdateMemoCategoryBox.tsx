import { MemoAPI } from '@api/MemoAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import { MemoUpdateYup } from '@components/yup/MemoYup';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { SET_MEMO_CATEGORY_LIST } from '@redux/store/memo';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file UpdateMemoBox.tsx
 * @version 0.0.1 "2023-12-18 01:02:26"
 * @description 설명
 */
interface IUpdateMemoCategoryBoxProps {
  closeModal: () => void;
}

const UpdateMemoCategoryBox = (props: IUpdateMemoCategoryBoxProps) => {
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
      pickUpdateMemoCategoryId: '',
      updateMemoCategoryName: '',
      updateMemoCategoryColor: '',
    },
  });
  const { errors } = formState;
  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  const selectChangeMemoCategoryHandler = (props: { value: string }) => {
    setValue('pickUpdateMemoCategoryId', props.value, { shouldValidate: true });
  };
  const selectChangeMemoCategoryBackgroundColorHandler = (props: {bg: string}) => {
    setValue('updateMemoCategoryColor', props.bg, {shouldValidate: true});
  };

  const updateMemoCategoryHandler = (data: {
    pickUpdateMemoCategoryId: string;
    updateMemoCategoryName: string;
    updateMemoCategoryColor: string;
  }) => {
    if (
      !data.updateMemoCategoryColor ||
      !data.updateMemoCategoryName ||
      !data.pickUpdateMemoCategoryId
    )
      return;
    MemoAPI.updateMemoCategory({
      id: data.pickUpdateMemoCategoryId,
      name: data.updateMemoCategoryName,
      backgroundColor: data.updateMemoCategoryColor,
    }).then((res: unknown) => {
      const temp = memoStore.memoCategoryList.map((i) => {
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
    <CC.ColumnDiv>
      <CC.RowCenterCenterBox w={'100%'}>
        메모 카테고리 수정
      </CC.RowCenterCenterBox>
      <CC.ColumnDiv gap={8}>
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
        <CC.ColumnDiv gap={8}>
          <Select
            w={'100%'}
            placeholder={'변경하려는 색상을 선택해주세요'}
            onChange={(i) => selectChangeMemoCategoryBackgroundColorHandler(i)}
            bg={'transparent'}
            outline={true}
            data={categoryColors?.map((i) => {
              return { value: i, name: ' ', bg: i };
            })}
          />
          <Input
            h={'2.25rem'}
            pd={'0px 0px 0px 0.25rem'}
            outline={1}
            placeholder={'변경할 카테고리명을 작성해주세요'}
            register={register('updateMemoCategoryName')}
            errorMessage={errors.updateMemoCategoryName?.message}
          />
        </CC.ColumnDiv>
      </CC.ColumnDiv>
      <CC.RowDiv gap={8} pd={'1.6rem 0rem'}>
        <Button
          w={'100%'}
          outline={true}
          onClickCapture={handleSubmit(
            updateMemoCategoryHandler,
            onClickErrorSubmit,
          )}
          disabled={!formState.isValid}
        >
          메모 수정
        </Button>
      </CC.RowDiv>
    </CC.ColumnDiv>
  );
};
export default UpdateMemoCategoryBox;
