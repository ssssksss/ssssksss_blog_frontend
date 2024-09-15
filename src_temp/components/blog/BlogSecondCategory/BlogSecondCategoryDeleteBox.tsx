import { deleteSecondCategoryAPI } from '@api/BlogAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import Select from '@components/common/select/Select';
import { BlogSecondCategoryDeleteYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { memo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSecondCategoryDeleteBox.tsx
 * @version 0.0.1 "2024-01-08 17:52:51"
 * @description 설명
 */

interface IBlogSecondCategoryDeleteBoxProps {
  closeModal: () => void;
}

const BlogSecondCategoryDeleteBox = (props: IBlogSecondCategoryDeleteBoxProps) => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const methods = useForm({
    resolver: yupResolver(BlogSecondCategoryDeleteYup),
    mode: 'onChange',
    defaultValues: {
      deleteSecondCategoryId: null,
    },
  });

  const deleteSecondCategoryHandler = async (data: {
    deleteSecondCategoryId
   : number}) => {
    deleteSecondCategoryAPI(data.deleteSecondCategoryId)
      .then(() => {
        let temp = JSON.parse(JSON.stringify(blogStore.blogCategoryList));
        temp = temp.map(
          (i: { id: number; blogSecondCategoryList: [{ id: number }] }) => {
            if (i.id == blogStore.activeFirstCategoryId) {
              const temp2 = i.blogSecondCategoryList.filter(
                (j: { id: number }) => j.id != data.deleteSecondCategoryId,
              );
              return {
                ...i,
                blogSecondCategoryList: temp2,
              };
            }
            return i;
          },
        );
        store.dispatch(rootActions.blogStore.setBlogCategoryList(temp));
        store.dispatch(
          rootActions.blogStore.setActiveSecondCategoryList(
            temp.filter(
              (i: { id: number }) => i.id == blogStore.activeFirstCategoryId,
            )[0]?.blogSecondCategoryList ?? [],
          ),
        );
        if (blogStore.activeSecondCategoryId == data.deleteSecondCategoryId) {
          store.dispatch(rootActions.blogStore.setActiveSecondCategoryId(0));
          store.dispatch(rootActions.blogStore.setBlogList([]));
        // TODO : 나중에 확인 필요 계속 스켈레톤 리스트 나옴 나중에 수정 필요
        }
        props.closeModal();
      }).catch((err) => {
        store.dispatch(
          rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
            type: 'warning',
            message: err.response.data.msg,
          }),
        );
        methods.setError('deleteSecondCategoryId', {
          type: 'custom',
          message: err.response.data.msg,
        });
      });
  };

  return (
    <FormProvider {...methods}>
      <Container outline={1} w={'100%'}>
        <Header>
          <span>블로그 2번째 카테고리 삭제</span>
        </Header>
        <CC.ColumnDiv gap={28}>
          <Select
            w={'100%'}
            placeholder={'2번째 카테고리'}
            bg={'transparent'}
            outline={true}
            data={
              blogStore.activeSecondCategoryList.map(
                (i: { id: string; name: string }) => {
                  return { value: i.id, name: i.name, bg: '' };
                },
            )}
            onChange={(data) => {
              methods.setValue('deleteSecondCategoryId', data.value);
              methods.trigger('deleteSecondCategoryId');
            }}
          ></Select>
        </CC.ColumnDiv>
        <CC.ColumnDiv gap={8}>
          <ConfirmButton
            w={'100%'}
            disabled={!methods.formState.isValid}
            onClick={methods.handleSubmit(deleteSecondCategoryHandler)}
          >
            삭제
          </ConfirmButton>
        </CC.ColumnDiv>
      </Container>
    </FormProvider>
  );
};
export default memo(BlogSecondCategoryDeleteBox);

const Container = styled(CC.ColBox)`
  gap: 2rem;
  padding: 0.5rem;
  & > button:nth-of-type(1) {
    align-items: end;
  }
    background: ${props=>props.theme.main.primary20};
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
