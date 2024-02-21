import { BlogAPI } from '@/api/BlogAPI';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import Select from '@/components/common/select/Select';
import { BlogSecondCategoryUpdateYup } from '@/components/yup/BlogCategoryYup';
import { useLoading } from '@/hooks/useLoading';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSecondCategoryUpdateBox.tsx
 * @version 0.0.1 "2024-01-08 17:51:28"
 * @description 설명
 */
const BlogSecondCategoryUpdateBox = (props: any) => {
  const [isLoading, loadingFunction] = useLoading();
  const selectUpdateRef = useRef<HTMLSelectElement>(null);
  const blogStore = useSelector((state: RootState) => state.blogStore);
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

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  const updateSecondCategoryHandler = async (data: any) => {
    loadingFunction(
      BlogAPI.updateSecondCategory({
        id: data.updateSecondCategoryId,
        name: data.updateSecondCategoryName,
        files: data.updateSecondCategoryImageFile,
        directory: `/blog-category/${blogStore.secondCategoryId}/${data.updateSecondCategoryName}`,
      })
    )
      .then(res => {
        let temp = blogStore.blogCategoryList
          .filter(i => i.id == blogStore.activeBlogFirstCategoryId)[0]
          .secondCategoryList.map(i => {
            if (i.id == data.updateSecondCategory) {
              return {
                ...id,
                name: data.updateSecondCategoryName,
              };
            }
            return i;
          });
        // store.dispatch(
        //   rootActions.blogStore.SET_BLOG_CATEGORY_LIST(
        //     blogStore.blogCategoryList.map(i => {
        //       if (i.id == blogStore.activeBlogFirstCategoryId) {
        //         i.secondCategoryList = temp;
        //         return i;
        //       } else {
        //         return i;
        //       }
        //     })
        //   )
        // );
        props.closeModal();
      })
      .catch(err => {});
  };

  const changeUpdateCategoryImage = data => {
    methods.setValue('updateSecondCategoryId', data.value);
    setUpdateImageUrl(
      blogStore.blogCategoryList
        .filter(i => i.id == blogStore.activeBlogFirstCategoryId)[0]
        .secondCategoryList.filter(i => i.id == data.value)[0].thumbnailImageUrl
    );
  };

  return (
    <FormProvider {...methods}>
      <Container gap={28} pd={'8px'} color={'contrast'} brR={'10px'}>
        <Header>
          <span>블로그 2번째 카테고리 수정 </span>
        </Header>
        <CC.ColumnDiv gap={28}>
          <Input
            value={blogStore.activeBlogFirstCategoryName}
            disabled={true}
            center={true}
          />
          <Select
            w={'100%'}
            placeholder={'2번째 카테고리 목록'}
            bg={'transparent'}
            outline={true}
            data={blogStore.blogCategoryList
              .filter(i => i.id == blogStore.activeBlogFirstCategoryId)[0]
              .secondCategoryList.map(i => {
                return { value: i.id, name: i.name, bg: '' };
              })}
            onChange={changeUpdateCategoryImage}
          ></Select>
          <Input
            placeholder="2번째 카테고리 수정할 이름"
            state={1}
            register={methods.register('updateSecondCategoryName')}
            onKeyPressAction={methods.handleSubmit(
              updateSecondCategoryHandler,
              onClickErrorSubmit
            )}
            errorMessage={errors.updateSecondCategoryName?.message}
          />
          <Input
            type={'file'}
            state={1}
            register={methods.register('updateSecondCategoryImageFile')}
            setValue={methods.setValue}
            trigger={methods.trigger}
            h={'200px'}
            defaultImageUrl={updateImageUrl}
          />
        </CC.ColumnDiv>
        <CC.ColumnDiv gap={8}>
          <Button
            w={'100%'}
            h={'40px'}
            outline={true}
            onClickCapture={methods.handleSubmit(
              updateSecondCategoryHandler,
              onClickErrorSubmit
            )}
            disabled={!methods.formState.isValid}
            bg={'contrast'}
          >
            수정
          </Button>
        </CC.ColumnDiv>
      </Container>
    </FormProvider>
  );
};
export default BlogSecondCategoryUpdateBox;

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
