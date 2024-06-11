import { deleteFirstCategoryAPI } from '@api/BlogAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import Select from '@components/common/select/Select';
import { BlogFirstCategoryDeleteYup } from '@components/yup/BlogCategoryYup';
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
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const methods = useForm({
    resolver: yupResolver(BlogFirstCategoryDeleteYup),
    mode: 'onChange',
    defaultValues: {
      deleteFirstCategoryId: null,
    },
  });

  const deleteFirstCategoryHandler = async (data: {
    deleteFirstCategoryId: number
  }) => {
    deleteFirstCategoryAPI(data.deleteFirstCategoryId)
      .then(() => {
        let temp = JSON.parse(
          JSON.stringify(store.getState().blogStore.blogCategoryList),
        );
        temp = temp.filter(
          (i: { id: number }) => i.id != data.deleteFirstCategoryId,
        );
        store.dispatch(rootActions.blogStore.setBlogCategoryList(temp));
        store.dispatch(
          rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
            type: 'success',
            message: '블로그 1번째 카테고리 삭제',
          }),
        );
        props.closeModal();
      }).catch((err) => {
          store.dispatch(
            rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
              type: 'warning',
              message: err.response.data.msg,
            }),
          );
          methods.setError('deleteFirstCategoryId', {
            type: 'custom',
            message: err.response.data.msg,
          });
      });
  };

  return (
    <FormProvider {...methods}>
      <Container outline={1} w={'100%'}>
            <Header>
              <span>블로그 1번째 카테고리 삭제</span>
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
                  onChange={(i) => {
                    methods.setValue('deleteFirstCategoryId', i.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              <ConfirmButton
                disabled={!methods.formState.isValid}
                onClick={methods.handleSubmit(deleteFirstCategoryHandler)}
              >
                삭제
              </ConfirmButton>
      </Container>
    </FormProvider>
  );
};
export default BlogFirstCategoryDeleteBox;

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
  border-radius: 0.5rem;

  span:nth-of-type(1) {
    font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
    font-size: 2rem;
  }
`;
