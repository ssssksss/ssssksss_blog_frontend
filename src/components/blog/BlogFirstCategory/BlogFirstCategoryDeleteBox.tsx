import { BlogAPI } from '@api/BlogAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import LoadingComponent from '@components/common/loading/LoadingComponent';
import Select from '@components/common/select/Select';
import { BlogFirstCategoryDeleteYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoading } from '@hooks/useLoading';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
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
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const deleteBLogFirstCategoryMutation = BlogAPI.deleteBlogFirstCategory({
    onSuccessHandler: () => {
      let temp = blogStore.blogCategoryList;
      if (temp.length > 0) {
        store.dispatch(
          rootActions.blogStore.SET_ACTIVE_BLOG_FIRST_CATEGORY({
            activeBlogFirstCategoryId: temp[0]?.id,
            activeBlogFirstCategoryName: temp[0]?.name,
          }),
        );
        if (temp[0].secondCategoryList.length > 0) {
          store.dispatch(
            rootActions.blogStore.SET_ACTIVE_BLOG_SECOND_CATEGORY({
              activeBlogSecondCategoryId: temp[0].secondCategoryList[0]?.id,
              activeBlogSecondCategoryName: temp[0].secondCategoryList[0]?.name,
            }),
          );
        } else {
          store.dispatch(
            rootActions.blogStore.SET_ACTIVE_BLOG_SECOND_CATEGORY({
              activeBlogSecondCategoryId: null,
              activeBlogSecondCategoryName: null,
            }),
          );
        }
      } else {
        store.dispatch(
          rootActions.blogStore.SET_ACTIVE_BLOG_FIRST_CATEGORY({
            activeBlogFirstCategoryId: null,
            activeBlogFirstCategoryName: null,
          }),
        );
      }
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

  const deleteFirstCategoryHandler = async (data: any) => {
    if (!store.getState().authStore.id) return;
    deleteBLogFirstCategoryMutation({
      id: data.deleteFirstCategoryId,
    });
  };
  return (
    <FormProvider {...methods}>
      <Container gap={28} pd={'8px'} color={'contrast'} brR={'10px'}>
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
                data={blogStore.blogCategoryList.map((i) => {
                  return { value: i.id, name: i.name, bg: '' };
                })}
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
                h={'40px'}
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
  outline: solid ${(props) => props.theme.main.contrast} 4px;
  position: relative;

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
