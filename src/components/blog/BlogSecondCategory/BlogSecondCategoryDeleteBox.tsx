import { BlogAPI } from '@api/BlogAPI';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import Select from '@components/common/select/Select';
import { BlogSecondCategoryDeleteYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
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
const BlogSecondCategoryDeleteBox = () => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const deleteSecondCategoryMutation = BlogAPI.deleteSecondCategory();
  const methods = useForm({
    resolver: yupResolver(BlogSecondCategoryDeleteYup),
    mode: 'onClick',
    defaultValues: {
      deleteSecondCategoryId: '',
    },
  });

  const deleteSecondCategoryHandler = async (data: any) => {
    deleteSecondCategoryMutation({
      id: data.deleteSecondCategoryId,
    });
  };

  return (
    <FormProvider {...methods}>
      <Container gap={28} pd={'8px'} color={'contrast'} brR={'10px'}>
        <Header>
          <span>블로그 2번째 카테고리 삭제</span>
        </Header>
        <CC.ColumnDiv gap={28}>
          <Select
            w={'100%'}
            placeholder={'2번째 카테고리'}
            bg={'transparent'}
            outline={true}
            data={blogStore.blogCategoryList
              .filter((i) => i.id == blogStore.activeBlogFirstCategoryId)[0]
              .secondCategoryList.map((i) => {
                return { value: i.id, name: i.name, bg: '' };
              })}
            onChange={(data) => {
              methods.setValue('deleteSecondCategoryId', data.value);
              methods.trigger('deleteSecondCategoryId');
            }}
          ></Select>
        </CC.ColumnDiv>
        <CC.ColumnDiv gap={8}>
          <ConfirmButton
            w={'100%'}
            h={'40px'}
            outline={true}
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
