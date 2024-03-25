import { BlogAPI } from '@api/BlogAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import LoadingComponent from '@components/common/loading/LoadingComponent';
import Select from '@components/common/select/Select';
import { useLoading } from '@components/useHook/useLoading';
import { BlogFirstCategoryDeleteYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@react-three/fiber';
import { store } from '@redux/store';
import { CC } from '@styles/commonComponentStyle';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryDeleteBox.tsx
 * @version 0.0.1 "2024-01-06 04:06:36"
 * @description 설명
 */

interface IBlogFirstCategoryDeleteBoxProps {
  closeModal: () => void;
}

const BlogFirstCategoryDeleteBox = (
  props: IBlogFirstCategoryDeleteBoxProps,
) => {
  const [isLoading] = useLoading();
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  const deleteBLogFirstCategoryMutation = BlogAPI.deleteBlogFirstCategory({
    onSuccessHandler: () => {
      props.closeModal();
    },
  });
  const methods = useForm({
    resolver: yupResolver(BlogFirstCategoryDeleteYup),
    mode: 'onClick',
    defaultValues: {
      deleteFirstCategoryId: '',
    },
  });

  const deleteFirstCategoryHandler = async (data: unknown) => {
    if (!store.getState().authStore.id) return;
    deleteBLogFirstCategoryMutation({
      id: data.deleteFirstCategoryId,
    });
  };
  return (
    <FormProvider {...methods}>
      <Container gap={28} pd={'0.8rem'} color={'contrast'} brR={'1rem'}>
        {isLoading ? (
          <LoadingComponent> 로딩중 </LoadingComponent>
        ) : (
          <>
            <Header>
              <span>블로그 1번째 카테고리 삭제</span>
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
                onChange={(i) => {
                  methods.setValue('deleteFirstCategoryId', i.value, {
                    shouldValidate: true,
                  });
                }}
              ></Select>
            </CC.ColumnDiv>
            <CC.ColumnDiv gap={8}>
              <ConfirmButton
                w={'100%'}
                outline={true}
                disabled={!methods.formState.isValid}
                onClick={methods.handleSubmit(deleteFirstCategoryHandler)}
              >
                삭제
              </ConfirmButton>
            </CC.ColumnDiv>
          </>
        )}
      </Container>
    </FormProvider>
  );
};
export default BlogFirstCategoryDeleteBox;

const Container = styled(CC.ColumnDiv)`
  outline: solid ${(props) => props.theme.main.contrast} 0.4rem;
  position: relative;

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
