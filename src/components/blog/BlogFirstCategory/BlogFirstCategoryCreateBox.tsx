import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import { BlogFirstCategoryCreateYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { CC } from '@styles/commonComponentStyle';
import { useForm } from 'react-hook-form';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryCreateBox.tsx
 * @version 0.0.1 "2024-01-06 03:41:05"
 * @description 설명
 */

interface IBlogFirstCategoryCreateBoxProps {
  closeModal: () => void;
}

const BlogFirstCategoryCreateBox = (
  props: IBlogFirstCategoryCreateBoxProps,
) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(BlogFirstCategoryCreateYup),
    mode: 'onChange',
    defaultValues: {
      createFirstCategoryName: '',
    },
  });
  const { errors } = formState;
  const createBlogFirstCategoryMutation = BlogAPI.createBlogFirstCategory({
    onSuccessHandler: () => {
      props.closeModal();
    },
  });

  const createFirstCategoryHandler = (data: unknown) => {
    const { ...params } = data;

    createBlogFirstCategoryMutation({
      name: params.createFirstCategoryName,
    });
  };
  return (
    <Container gap={28} pd={'0.8rem'} color={'contrast'} brR={'1rem'}>
      <Header>
        <span>블로그 1번째 카테고리 추가 </span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Input
          placeholder="이름"
          register={register('createFirstCategoryName')}
          onKeyPressAction={handleSubmit(createFirstCategoryHandler)}
          errorMessage={errors.createFirstCategoryName?.message}
        />
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        <Button
          w={'100%'}
          onClickCapture={handleSubmit(createFirstCategoryHandler)}
          disabled={!formState.isValid}
        >
          추가
        </Button>
      </CC.ColumnDiv>
    </Container>
  );
};
export default BlogFirstCategoryCreateBox;

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
