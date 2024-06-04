import { updateFirstCategoryAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import { BlogFirstCategoryUpdateYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryUpdateBox.tsx
 * @version 0.0.1 "2024-01-06 04:00:16"
 * @description 설명
 */
interface IBlogFirstCategoryUpdateBoxProps {
  closeModal: () => void;
}

const BlogFirstCategoryUpdateBox = (
  props: IBlogFirstCategoryUpdateBoxProps,
) => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const methods = useForm({
    resolver: yupResolver(BlogFirstCategoryUpdateYup),
    mode: 'onChange',
    defaultValues: {
      updateFirstCategoryId: '',
      updateFirstCategoryName: '',
    },
  });
  const { errors } = methods.formState;

  // TODO: select 태그 수정해서 이런 코드 제거해버리기
  const onChangeSelectHandler = (data: {value: string, name: string}) => {
    methods.setValue('updateFirstCategoryId', data.value);
    methods.setValue('updateFirstCategoryName', data.name);
  };

  const updateFirstCategoryHandler = async (data: {
    updateFirstCategoryId : number,
    updateFirstCategoryName: string,
  }) => {
    updateFirstCategoryAPI(
      data.updateFirstCategoryId,
      data.updateFirstCategoryName,
    ).then(() => {
      let temp = JSON.parse(
        JSON.stringify(store.getState().blogStore.blogCategoryList),
      );
        temp = temp.map(
            (i: {
              id: number;
              name: string;
            }) => {
              if (i.id == data.updateFirstCategoryId) {
                i.name = data.updateFirstCategoryName;
              }
              return i;
            },
      );
        store.dispatch(rootActions.blogStore.setBlogCategoryList(temp));
        props.closeModal();
    })
  };

  return (
    <FormProvider {...methods}>
      <Container outline={1} w={'100%'}>
        <Header>
          <span>블로그 1번째 카테고리 수정</span>
        </Header>
        <Select
          w={'100%'}
          placeholder={'1번째 카테고리'}
          bg={'transparent'}
          data={blogStore.blogCategoryList.map(
            (i: {id: string, name: string}) => {
              return { value: i.id, name: i.name, bg: '' };
            },
          )}
          onChange={onChangeSelectHandler}
        />
        <Input
          w={'100%'}
          placeholder="변경할 이름"
          register={methods.register('updateFirstCategoryName')}
          onKeyPressAction={methods.handleSubmit(updateFirstCategoryHandler)}
          errorMessage={errors.updateFirstCategoryName?.message}
          bg={1}
          h={'2.25rem'}
        />
        <Button
          w={'100%'}
          onClickCapture={methods.handleSubmit(updateFirstCategoryHandler)}
          disabled={!methods.formState.isValid}
        >
          수정
        </Button>
      </Container>
    </FormProvider>
  );
};
export default BlogFirstCategoryUpdateBox;

const Container = styled(CC.ColBox)`
  gap: 2rem;
  padding: 0.5rem;
  & > button:nth-of-type(1) {
    align-items: end;
  }
  background: ${(props) => props.theme.main.primary20};
`;

const Header = styled.header`
  ${(props) => props.theme.flex.column};
  align-self: stretch;
  color: black;
  border-radius: ${(props) => props.theme.borderRadius.br8};

  span:nth-of-type(1) {
    font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
    font-size: 2rem;
  }
`;
