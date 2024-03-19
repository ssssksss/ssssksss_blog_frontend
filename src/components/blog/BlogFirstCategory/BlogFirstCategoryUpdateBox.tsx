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
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
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

  const updateFirstCategoryHandler = async (data: any) => {
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
      <Container gap={28} pd={'0.8rem'} color={'contrast'} brR={'1rem'}>
        <Header>
          <span>블로그 1번째 카테고리 수정</span>
        </Header>
        <CC.ColumnDiv gap={28}>
          <Select
            w={'100%'}
            placeholder={'1번째 카테고리'}
            bg={'transparent'}
            outline={true}
            data={Object.entries(blogStore1.firstCategoryList).map(
              ([key, value]) => {
                return { value: key, name: value, bg: '' };
              },
            )}
            onChange={onChangeSelectHandler}
          ></Select>
          <Input
            placeholder="변경할 이름"
            register={methods.register('updateFirstCategoryName')}
            onKeyPressAction={methods.handleSubmit(updateFirstCategoryHandler)}
            errorMessage={errors.updateFirstCategoryName?.message}
          />
        </CC.ColumnDiv>
        <CC.ColumnDiv gap={8}>
          <Button
            w={'100%'}
            outline={true}
            onClickCapture={methods.handleSubmit(updateFirstCategoryHandler)}
            disabled={!methods.formState.isValid}
          >
            수정
          </Button>
        </CC.ColumnDiv>
      </Container>
    </FormProvider>
  );
};
export default BlogFirstCategoryUpdateBox;

const Container = styled(CC.ColumnDiv)`
  outline: solid ${(props) => props.theme.main.contrast} 0.4rem;

  & > button:nth-of-type(1) {
    align-items: end;
  }
`;

const Header = styled.header`
  ${(props) => props.theme.flex.column};
  padding: 1.6rem;
  gap: 0.25rem;
  align-self: stretch;
  border-radius: ${(props) => props.theme.borderRadius.br10};

  span:nth-of-type(1) {
    font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
    font-size: 2rem;
  }
`;
