import { Input } from '@/components/common/input/Input';
import { BlogSecondCategoryUpdateYup } from '@/components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLoading } from '@/src/hooks/useLoading';
import { BlogAPI } from '@/api/BlogAPI';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { SET_SECOND_CATEGORY_LIST } from '@/redux/store/blog';
import { CC } from '@/styles/commonComponentStyle';
import { Button } from '@/components/common/button/Button';
import Select from '@/components/common/select/Select';
import { useRef } from 'react';
import { store } from '@/redux/store';
import { useState } from 'react';
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
  const { register, handleSubmit, formState, setValue, trigger } = useForm({
    resolver: yupResolver(BlogSecondCategoryUpdateYup),
    mode: 'onChange',
    defaultValues: {
      updateSecondCategory: '',
      updateSecondCategoryName: '',
      updateSecondCategoryImageFile: '',
    },
  });
  const { errors } = formState;

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  const updateSecondCategoryHandler = async (data: any) => {
    loadingFunction(
      BlogAPI.updateSecondCategory({
        id: data.updateSecondCategory,
        name: data.updateSecondCategoryName,
        files: data.updateSecondCategoryImageFile,
        directory: `/blog-category/${blogStore.secondCategoryId}/${data.updateSecondCategoryName}`,
      })
    )
      .then(res => {
        let temp = blogStore.secondCategoryList.map(i => {
          if (i.id == data.updateSecondCategory) {
            return {
              id: i.id,
              name: data.updateSecondCategoryName,
              userId: i.userId,
            };
          }
          return i;
        });
        store.dispatch(SET_SECOND_CATEGORY_LIST(temp));
        props.closeModal();
      })
      .catch(err => {
        console.log('BlogSecondCategoryUpdateBox.tsx 파일 : ', err);
      });
  };

  const changeUpdateCategoryImage = data => {
    setUpdateImageUrl(
      blogStore.secondCategoryList.filter(i => i.id == data.value)[0]
        .thumbnailImageUrl
    );
  };

  return (
    <Container gap={28} pd={'8px'} color={'contrast'} brR={'10px'}>
      <Header>
        <span>블로그 2번째 카테고리 수정 </span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Input
          value={blogStore.firstCategoryName}
          disabled={true}
          center={true}
        />
        <Select
          w={'100%'}
          placeholder={'2번째 카테고리 목록'}
          bg={'transparent'}
          outline={true}
          register={register('updateSecondCategory')}
          data={blogStore.secondCategoryList.map(i => {
            return { value: i.id, name: i.name, bg: '' };
          })}
          setValue={setValue}
          trigger={trigger}
          onChange={changeUpdateCategoryImage}
        ></Select>
        <Input
          placeholder="2번째 카테고리 수정할 이름"
          styleTypes={1}
          register={register('updateSecondCategoryName')}
          onKeyPressAction={handleSubmit(
            updateSecondCategoryHandler,
            onClickErrorSubmit
          )}
          errorMessage={errors.updateSecondCategoryName?.message}
        />
        <Input
          type={'file'}
          styleTypes={1}
          register={register('updateSecondCategoryImageFile')}
          h={'200px'}
          setValue={setValue}
          trigger={trigger}
          defaultImageUrl={updateImageUrl}
        />
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        <Button
          w={'100%'}
          h={'40px'}
          outline={true}
          onClickCapture={handleSubmit(
            updateSecondCategoryHandler,
            onClickErrorSubmit
          )}
          disabled={!formState.isValid}
          bg={'contrast'}
        >
          수정
        </Button>
      </CC.ColumnDiv>
    </Container>
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
