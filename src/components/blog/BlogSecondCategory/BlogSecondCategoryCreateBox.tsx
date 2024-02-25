import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import { BlogSecondCategoryCreateYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSecondCategoryCreateBox.tsx
 * @version 0.0.1 "2024-01-08 17:34:45"
 * @description 설명
 */
const BlogSecondCategoryCreateBox = () => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const createSecondCategoryMutation = BlogAPI.createSecondCategory();
  const { register, handleSubmit, formState, setValue, trigger } = useForm({
    resolver: yupResolver(BlogSecondCategoryCreateYup),
    mode: 'onChange',
    defaultValues: {
      createSecondCategoryName: '',
      createSecondCategoryImageFile: '',
    },
  });
  const { errors } = formState;

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  const createSecondCategoryHandler = async (data: any) => {
    const file = data.createSecondCategoryImageFile;
    createSecondCategoryMutation({
      name: data.createSecondCategoryName,
      blogFirstCategoryId: blogStore.activeBlogFirstCategoryId,
      files: file,
      directory: `/blog-category/${blogStore.activeBlogSecondCategoryId}/${data.createSecondCategoryName}`,
    });
  };

  return (
    <Container gap={28} pd={'8px'} color={'contrast'} brR={'10px'}>
      <Header>
        <span>블로그 2번째 카테고리 추가 </span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Input
          value={blogStore.activeBlogFirstCategoryName}
          disabled={true}
          center={true}
        />
        <Input
          placeholder="2번째 카테고리 이름"
          state={1}
          register={register('createSecondCategoryName')}
          onKeyPressAction={handleSubmit(
            createSecondCategoryHandler,
            onClickErrorSubmit,
          )}
          errorMessage={errors.createSecondCategoryName?.message}
        />
        <Input
          type={'file'}
          state={1}
          register={register('createSecondCategoryImageFile')}
          h={'200px'}
          setValue={setValue}
          trigger={trigger}
        />
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        <Button
          w={'100%'}
          h={'40px'}
          outline={true}
          onClickCapture={handleSubmit(
            createSecondCategoryHandler,
            onClickErrorSubmit,
          )}
          disabled={!formState.isValid}
          bg={'contrast'}
        >
          추가
        </Button>
      </CC.ColumnDiv>
    </Container>
  );
};
export default BlogSecondCategoryCreateBox;

const Container = styled(CC.ColumnDiv)`
  outline: solid ${(props) => props.theme.main.contrast} 4px;
  & > button:nth-of-type(1) {
    align-items: end;
  }
`;

const Header = styled.header`
  ${(props) => props.theme.flex.column};
  padding: 16px;
  gap: 0.25rem;
  align-self: stretch;
  border-radius: ${(props) => props.theme.borderRadius.br10};

  span:nth-of-type(1) {
    font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
    font-size: 20px;
  }
`;
