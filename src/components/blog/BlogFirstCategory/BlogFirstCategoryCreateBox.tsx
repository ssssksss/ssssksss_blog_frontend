import { createFirstCategoryAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import { BlogFirstCategoryCreateYup } from '@components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { CC } from '@styles/commonComponentStyle';
import { useForm } from 'react-hook-form';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryCreateBox.tsx
 * @version 0.0.1 "2024-01-06 03:41:05"
 * @description 설명
 */

interface IBlogFirstCategoryCreateBoxProps {
  closeModal: () => void;
}

const BlogFirstCategoryCreateBox = (
  props: IBlogFirstCategoryCreateBoxProps,
) => {
  const { register, handleSubmit, formState, setError } = useForm({
    resolver: yupResolver(BlogFirstCategoryCreateYup),
    mode: 'onChange',
    defaultValues: {
      createFirstCategoryName: '',
    },
  });
  const { errors } = formState;

  const createFirstCategoryHandler = (data: { createFirstCategoryName: string }) => {
    createFirstCategoryAPI(data.createFirstCategoryName)
      .then((res) => {
        const temp = JSON.parse(
          JSON.stringify(store.getState().blogStore.blogCategoryList),
        );
        temp.push({
          ...res.data.data,
          blogSecondCategoryList: [],
        }),
          store.dispatch(rootActions.blogStore.setBlogCategoryList(temp));
        store.dispatch(
          rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
            type: 'success',
            message: '블로그 1번째 카테고리 생성',
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
          setError('createFirstCategoryName', {
            type: 'custom',
            message: err.response.data.msg,
          });
      });
  };
  
  return (
    <Container outline={1} w={"100%"}>
      <Header>
        <span>블로그 1번째 카테고리 추가 </span>
      </Header>
        <Input
        w={"100%"}
          placeholder="이름"
          register={register('createFirstCategoryName')}
          onKeyPressAction={handleSubmit(createFirstCategoryHandler)}
          errorMessage={errors.createFirstCategoryName?.message}
          bg={1}
          h={"2.25rem"}
        />
        <Button
          w={'100%'}
          onClickCapture={handleSubmit(createFirstCategoryHandler)}
          disabled={!formState.isValid}
        >
          추가
        </Button>
    </Container>
  );
};
export default BlogFirstCategoryCreateBox;

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
