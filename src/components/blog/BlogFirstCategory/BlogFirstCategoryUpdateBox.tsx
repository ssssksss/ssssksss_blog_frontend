import { Input } from '@/components/common/input/Input';
import { BlogFirstCategoryUpdateYup } from '@/components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLoading } from '@/src/hooks/useLoading';
import { BlogAPI } from '@/api/BlogAPI';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { SET_FIRST_CATEGORY_LIST } from '@/redux/store/blog';
import { CC } from '@/styles/commonComponentStyle';
import { Button } from '@/components/common/button/Button';
import Select from '@/components/common/select/Select';
import { useRef } from 'react';
import { store } from '@/redux/store';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryUpdateBox.tsx
 * @version 0.0.1 "2024-01-06 04:00:16"
 * @description 설명
 */
const BlogFirstCategoryUpdateBox = () => {
  const [isLoading, loadingFunction] = useLoading();
  const selectUpdateRef = useRef<HTMLSelectElement>(null);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const { register, handleSubmit, formState, setValue, trigger } = useForm({
    resolver: yupResolver(BlogFirstCategoryUpdateYup),
    mode: 'onChange',
    defaultValues: {
      updateFirstCategoryId: '',
      updateFirstCategoryName: '',
    },
  });
  const { errors } = formState;

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  const updateFirstCategoryHandler = async (data: any) => {
    const { ...params } = data;
    if (params.updateFirstCategoryName == '') {
      return;
    }
    loadingFunction(
      BlogAPI.updateFirstCategory({
        id: selectUpdateRef.current.value,
        name: params.updateFirstCategoryName,
      })
    )
      .then(res => {
        let temp = blogStore.firstCategoryList.map(i => {
          if (i.id == selectUpdateRef.current.value) {
            return {
              id: i.id,
              name: params.updateFirstCategoryName,
              userId: i.userId,
            };
          }
          return i;
        });
        store.dispatch(SET_FIRST_CATEGORY_LIST(temp));
      })
      .catch(err => {
        console.log('BlogFirstCategoryUpdateBox.tsx 파일 : ', err);
      });
  };

  return (
    <Container gap={28} pd={'8px'} color={'contrast'} brR={'10px'}>
      <Header>
        <span>블로그 1번째 카테고리 수정</span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Select
          w={'100%'}
          ref={selectUpdateRef}
          setValue={{
            registerName: 'updateFirstCategoryId',
            function: setValue,
          }}
          trigger={trigger}
          placeholder={'1번째 카테고리'}
          bg={'transparent'}
          outline={true}
          data={blogStore.firstCategoryList.map(i => {
            return { value: i.id, name: i.name, bg: '' };
          })}
        ></Select>
        <Input
          placeholder="변경할 이름"
          styleTypes={1}
          register={register('updateFirstCategoryName')}
          onKeyPressAction={handleSubmit(
            updateFirstCategoryHandler,
            onClickErrorSubmit
          )}
          errorMessage={errors.updateFirstCategoryName?.message}
        />
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        <Button
          w={'100%'}
          h={'40px'}
          outline={true}
          onClickCapture={handleSubmit(
            updateFirstCategoryHandler,
            onClickErrorSubmit
          )}
          disabled={!formState.isValid}
          bg={'white80'}
        >
          수정
        </Button>
      </CC.ColumnDiv>
    </Container>
  );
};
export default BlogFirstCategoryUpdateBox;

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
