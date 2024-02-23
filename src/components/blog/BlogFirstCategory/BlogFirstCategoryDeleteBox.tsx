import { BlogAPI } from '@/api/BlogAPI';
import Button from '@/components/common/button/Button';
import LoadingComponent from '@/components/common/loading/LoadingComponent';
import Select from '@/components/common/select/Select';
import { BlogFirstCategoryDeleteYup } from '@/components/yup/BlogCategoryYup';
import { useLoading } from '@/hooks/useLoading';
import { store } from '@/redux/store';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryDeleteBox.tsx
 * @version 0.0.1 "2024-01-06 04:06:36"
 * @description 설명
 */
const BlogFirstCategoryDeleteBox = (props: {
  blogCategoryListResData: any;
}) => {
  const [isLoading, loadingFunction] = useLoading();
  const selectDeleteRef = useRef<HTMLSelectElement>(null);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const deleteBLogFirstCategoryMutation = BlogAPI.deleteBlogFirstCategory();
  const methods = useForm({
    resolver: yupResolver(BlogFirstCategoryDeleteYup),
    mode: 'onClick',
    defaultValues: {
      deleteFirstCategoryId: '',
    },
  });
  const { errors } = methods.formState;
  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

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
                data={blogStore.blogCategoryList.map(i => {
                  return { value: i.id, name: i.name, bg: '' };
                })}
                onChange={i => {
                  methods.setValue('deleteFirstCategoryId', i.value, {
                    shouldValidate: true,
                  });
                }}
              ></Select>
            </CC.ColumnDiv>
            <CC.ColumnDiv gap={8}>
              <Button
                w={'100%'}
                h={'40px'}
                outline={true}
                disabled={!methods.formState.isValid}
                onClickCapture={methods.handleSubmit(
                  deleteFirstCategoryHandler,
                  onClickErrorSubmit
                )}
                bg={'white80'}
              >
                삭제
              </Button>
            </CC.ColumnDiv>
          </>
        )}
      </Container>
    </FormProvider>
  );
};
export default BlogFirstCategoryDeleteBox;

const Container = styled(CC.ColumnDiv)`
  outline: solid ${props => props.theme.main.contrast} 4px;
  position: relative;

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
