import { BlogAPI } from '@/api/BlogAPI';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import Select from '@/components/common/select/Select';
import { BlogFirstCategoryUpdateYup } from '@/components/yup/BlogCategoryYup';
import { useLoading } from '@/hooks/useLoading';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryUpdateBox.tsx
 * @version 0.0.1 "2024-01-06 04:00:16"
 * @description 설명
 */
const BlogFirstCategoryUpdateBox = () => {
  const [isLoading, loadingFunction] = useLoading();
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const updateBlogFirstCategoryMutation = BlogAPI.updateBlogFirstCategory();
  const methods = useForm({
    resolver: yupResolver(BlogFirstCategoryUpdateYup),
    mode: 'onChange',
    defaultValues: {
      updateFirstCategoryId: '',
      updateFirstCategoryName: '',
    },
  });
  const { errors } = methods.formState;

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  const onChangeSelectHandler = data => {
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
      <Container gap={28} pd={'8px'} color={'contrast'} brR={'10px'}>
        <Header>
          <span>블로그 1번째 카테고리 수정</span>
        </Header>
        <CC.ColumnDiv gap={28}>
          <Select
            w={'100%'}
            placeholder={'1번째 카테고리'}
            bg={'transparent'}
            outline={true}
            data={blogStore.blogCategoryList.map(i => {
              return { value: i.id, name: i.name, bg: '' };
            })}
            onChange={onChangeSelectHandler}
          ></Select>
          <Input
            placeholder="변경할 이름"
            state={1}
            register={methods.register('updateFirstCategoryName')}
            onKeyPressAction={methods.handleSubmit(
              updateFirstCategoryHandler,
              onClickErrorSubmit
            )}
            errorMessage={errors.updateFirstCategoryName?.message}
          />
        </CC.ColumnDiv>
        <CC.ColumnDiv gap={8}>
          <Button
            w={'100%'}
            h={'40px'}
            outline={true}
            onClickCapture={methods.handleSubmit(
              updateFirstCategoryHandler,
              onClickErrorSubmit
            )}
            disabled={!methods.formState.isValid}
            bg={'white80'}
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
  outline: solid ${props => props.theme.main.contrast} 4px;

  & > button:nth-of-type(1) {
    align-items: end;
  }
`;

const Header = styled.header`
  ${props => props.theme.flex.column};
  padding: 16px;
  gap: 0.25rem;
  align-self: stretch;
  border-radius: ${props => props.theme.borderRadius.br10};

  span:nth-of-type(1) {
    font-family: ${props => props.theme.fontFamily.cookieRunRegular};
    font-size: 20px;
  }
`;
