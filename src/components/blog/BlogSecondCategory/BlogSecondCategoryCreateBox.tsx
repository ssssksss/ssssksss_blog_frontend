import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import { BlogSecondCategoryCreateYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSecondCategoryCreateBox.tsx
 * @version 0.0.1 "2024-01-08 17:34:45"
 * @description 설명
 */

interface IBlogSecondCategoryCreateBoxProps {
  closeModal: () => void;
}

const BlogSecondCategoryCreateBox = (
  props: IBlogSecondCategoryCreateBoxProps,
) => {
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  const createSecondCategoryMutation = BlogAPI.createSecondCategory({
    onSuccessHandler: () => props.closeModal(),
  });
  const { register, handleSubmit, formState, setValue, trigger } = useForm({
    resolver: yupResolver(BlogSecondCategoryCreateYup),
    mode: 'onChange',
    defaultValues: {
      createSecondCategoryName: '',
      createSecondCategoryImageFile: '',
    },
  });
  const { errors } = formState;

  const createSecondCategoryHandler = async (data: unknown) => {
    const file = data.createSecondCategoryImageFile;
    createSecondCategoryMutation({
      name: data.createSecondCategoryName,
      blogFirstCategoryId: blogStore1.activeFirstCategory,
      files: file,
      // 백엔드에서 이후에 2번째 카테고리 Id를 추가하여 이미지 경로를 설정
      directory: `/blog-category/${blogStore1.activeFirstCategory}`,
    });
  };

  return (
    <Container gap={28} pd={'0.8rem'} color={'contrast'} brR={'1rem'}>
      <Header>
        <span>블로그 2번째 카테고리 추가 </span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Input
          value={blogStore1.firstCategoryList[blogStore1.activeFirstCategory]}
          disabled={true}
          center={true}
        />
        <Input
          placeholder="2번째 카테고리 이름"
          register={register('createSecondCategoryName')}
          onKeyPressAction={handleSubmit(createSecondCategoryHandler)}
          errorMessage={errors.createSecondCategoryName?.message}
        />
        <Input
          type={'file'}
          register={register('createSecondCategoryImageFile')}
          setValue={setValue}
          trigger={trigger}
          h={'20rem'}
        />
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        <Button
          outline={true}
          onClickCapture={handleSubmit(createSecondCategoryHandler)}
          disabled={!formState.isValid}
        >
          추가
        </Button>
      </CC.ColumnDiv>
    </Container>
  );
};
export default memo(BlogSecondCategoryCreateBox);

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
