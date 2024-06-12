import { updateSecondCategoryAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import { BlogSecondCategoryUpdateYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  // const updateSecondCategoryMutation = BlogAPI.updateSecondCategory({
  //   onSuccessHandler: () => props.closeModal(),
  // });
  const [updateImageUrl, setUpdateImageUrl] = useState();
  const { register, handleSubmit, formState, setValue, setError } = useForm({
    resolver: yupResolver(BlogSecondCategoryUpdateYup),
    mode: 'onChange',
    defaultValues: {
      updateSecondCategoryId: 0,
      updateSecondCategoryName: '',
      updateSecondCategoryImageFile: null,
    },
  });
  const { errors } = formState;

  const updateSecondCategoryHandler = async (data: {
      updateSecondCategoryId: number,
      updateSecondCategoryName: string,
      updateSecondCategoryImageFile: File | null,
  }) => {
    updateSecondCategoryAPI(
      data.updateSecondCategoryId,
      data.updateSecondCategoryName,
      data.updateSecondCategoryImageFile,
      blogStore.activeFirstCategoryId,
    )
      .then((res) => {
        const _data = res.data.data.updateBlogSecondCategory;
        let temp = JSON.parse(JSON.stringify(blogStore.blogCategoryList));
        temp = temp.map((i: {id: number, blogSecondCategoryList: [{id:number}]}) => {
          if (i.id == blogStore.activeFirstCategoryId) {
            const temp2 = i.blogSecondCategoryList.map((j: { id: number }) => {
              if (j.id == _data.id) {
                return _data;
              }
              return j;
            })
            return {
              ...i,
              blogSecondCategoryList: temp2,
            }
          }
          return i;
        })
        store.dispatch(rootActions.blogStore.setBlogCategoryList(temp));
        store.dispatch(
          rootActions.blogStore.setActiveSecondCategoryList(
            temp.filter(
              (i: { id: number }) =>
                i.id == blogStore.activeFirstCategoryId,
            )[0]?.blogSecondCategoryList ?? [],
          ),
        );

      store.dispatch(
        rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
          type: 'success',
          message: '블로그 2번째 카테고리 생성',
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
        setError('updateSecondCategoryName', {
          type: 'custom',
          message: err.response.data.msg,
        });
      });
  };

  const changeUpdateCategoryImage = (data: {value: number, name: string}) => {
    setValue('updateSecondCategoryId', data.value, { shouldValidate: true });
    setUpdateImageUrl(
      blogStore.activeSecondCategoryList.filter((i:{id: number})=> i.id == data.value)[0].thumbnailImageUrl
    );
  };

  return (
      <Container outline={1} w={'100%'}>
        <Header>
          <span>블로그 2번째 카테고리 수정 </span>
        </Header>
        <Input
          value={blogStore.blogCategoryList.filter((i: {id: number})=>i.id == blogStore.activeFirstCategoryId)[0].name}
          disabled={true}
          center={true}
          color={'black100'}
        />
        <Select
          w={'100%'}
          placeholder={'2번째 카테고리 목록'}
          bg={'transparent'}
          outline={true}
          data={
            blogStore.activeSecondCategoryList.map(
              (i: { id: string; name: string }) => {
                return { value: i.id, name: i.name, bg: '' };
              },
            )
          }
          onChange={changeUpdateCategoryImage}
        ></Select>
        <Input
          placeholder="2번째 카테고리 수정할 이름"
          register={register('updateSecondCategoryName')}
          onKeyPressAction={handleSubmit(updateSecondCategoryHandler)}
          errorMessage={errors.updateSecondCategoryName?.message}
          bg={1}
          h={'2.25rem'}
          pd={'0 0 0 0.5rem'}
        />
        <Input
          type={'file'}
          register={register('updateSecondCategoryImageFile')}
          setValue={setValue}
          h={'20rem'}
          defaultImageUrl={updateImageUrl}
        />
        <Button
          w={'100%'}
          onClickCapture={handleSubmit(updateSecondCategoryHandler)}
          disabled={!formState.isValid}
        >
          수정
        </Button>
      </Container>
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
