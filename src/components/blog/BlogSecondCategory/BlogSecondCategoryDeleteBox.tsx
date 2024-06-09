import { deleteSecondCategoryAPI } from '@api/BlogAPI';
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
      .then((res) => {
        console.log('BlogSecondCategoryDeleteBox.tsx 파일 : ', res);
        console.log(
          'BlogSecondCategoryDeleteBox.tsx 파일 : ',
          blogStore.blogCategoryList,
        );
        console.log(
          'BlogSecondCategoryDeleteBox.tsx 파일 : ',
          blogStore.activeSecondCategoryList,
        );
      })
      .catch(() => {
        alert('삭제에 실패 했습니다.');
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
