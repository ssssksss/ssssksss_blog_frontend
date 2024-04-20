import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import { BlogSecondCategoryUpdateYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { memo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSecondCategoryUpdateBox.tsx
 * @version 0.0.1 "2024-01-08 17:51:28"
 * @description 설명
 */

interface IBlogSecondCategoryUpdateBoxProps {
  closeModal: () => void;
}

const BlogSecondCategoryUpdateBox = (
  props: IBlogSecondCategoryUpdateBoxProps,
) => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const updateSecondCategoryMutation = BlogAPI.updateSecondCategory({
    onSuccessHandler: () => props.closeModal(),
  });
  const [updateImageUrl, setUpdateImageUrl] = useState();
  const methods = useForm({
    resolver: yupResolver(BlogSecondCategoryUpdateYup),
    mode: 'onChange',
    defaultValues: {
      updateSecondCategoryId: '',
      updateSecondCategoryName: '',
      updateSecondCategoryImageFile: '',
    },
  });
  const { errors } = methods.formState;

  const updateSecondCategoryHandler = async (data: unknown) => {
    updateSecondCategoryMutation({
      id: data.updateSecondCategoryId,
      name: data.updateSecondCategoryName,
      files: data.updateSecondCategoryImageFile,
      directory: `/blog-category/${blogStore.activeFirstCategory}`,
    });
  };

  const changeUpdateCategoryImage = (data) => {
    methods.setValue('updateSecondCategoryId', data.value, { shouldValidate: true});
    setUpdateImageUrl(
      blogStore.secondCategoryList[blogStore.activeFirstCategory][data.value]
        .thumbnailImageUrl,
    );
  };

  return (
    <FormProvider {...methods}>
      <Container outline={1} w={'100%'}>
        <Header>
          <span>블로그 2번째 카테고리 수정 </span>
        </Header>
        <Input
          value={blogStore.firstCategoryList[blogStore.activeFirstCategory]}
          disabled={true}
          center={true}
          color={"black100"}
        />
        <Select
          w={'100%'}
          placeholder={'2번째 카테고리 목록'}
          bg={'transparent'}
          outline={true}
          data={Object.entries(
            blogStore.secondCategoryList[blogStore.activeFirstCategory],
          ).map(([key, value]) => {
            return { value: key, name: value.name, bg: '' };
          })}
          onChange={changeUpdateCategoryImage}
        ></Select>
        <Input
          placeholder="2번째 카테고리 수정할 이름"
          register={methods.register('updateSecondCategoryName')}
          onKeyPressAction={methods.handleSubmit(updateSecondCategoryHandler)}
          errorMessage={errors.updateSecondCategoryName?.message}
          bg={1}
          h={'2.25rem'}
                    pd={"0 0 0 0.5rem"}
        />
        <Input
          type={'file'}
          register={methods.register('updateSecondCategoryImageFile')}
          setValue={methods.setValue}
          h={'20rem'}
          defaultImageUrl={updateImageUrl}
        />
        <Button
          w={'100%'}
          onClickCapture={methods.handleSubmit(updateSecondCategoryHandler)}
          disabled={!methods.formState.isValid}
        >
          수정
        </Button>
      </Container>
    </FormProvider>
  );
};
export default memo(BlogSecondCategoryUpdateBox);

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
