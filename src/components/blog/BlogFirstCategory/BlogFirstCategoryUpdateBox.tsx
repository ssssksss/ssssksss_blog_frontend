import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import { BlogFirstCategoryUpdateYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
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
  const updateBlogFirstCategoryMutation = BlogAPI.updateBlogFirstCategory({
    onSuccessHandler: () => props.closeModal(),
  });
  const methods = useForm({
    resolver: yupResolver(BlogFirstCategoryUpdateYup),
    mode: 'onChange',
    defaultValues: {
      updateFirstCategoryId: '',
      updateFirstCategoryName: '',
    },
  });
  const { errors } = methods.formState;

  const onChangeSelectHandler = (data) => {
    methods.setValue('updateFirstCategoryId', data.value);
    methods.setValue('updateFirstCategoryName', data.name);
  };

  const updateFirstCategoryHandler = async (data: unknown) => {
    const { ...params } = data;
    if (params.updateFirstCategoryName == '') {
      return;
    }

    updateBlogFirstCategoryMutation({
      id: methods.getValues('updateFirstCategoryId'),
      name: methods.getValues('updateFirstCategoryName'),
    });
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
          data={Object.entries(blogStore.firstCategoryList).map(
            ([key, value]) => {
              return { value: key, name: value, bg: '' };
            },
          )}
          onChange={onChangeSelectHandler}
        ></Select>
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
