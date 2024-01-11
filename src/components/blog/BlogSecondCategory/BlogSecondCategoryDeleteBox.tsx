import { Input } from '@/components/common/input/Input';
import { BlogSecondCategoryDeleteYup } from '@/components/yup/BlogCategoryYup';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLoading } from '@/src/hooks/useLoading';
import { BlogAPI } from '@/api/BlogAPI';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import {
  SET_BLOG_POST_LIST,
  SET_FIRST_CATEGORY_LIST,
  SET_SECOND_CATEGORY_LIST,
} from '@/redux/store/blog';
import { CC } from '@/styles/commonComponentStyle';
import { Button } from '@/components/common/button/Button';
import Select from '@/components/common/select/Select';
import { useRef } from 'react';
import { store } from '@/redux/store';
import { useRouter } from 'next/router';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSecondCategoryDeleteBox.tsx
 * @version 0.0.1 "2024-01-08 17:52:51"
 * @description 설명
 */
const BlogSecondCategoryDeleteBox = () => {
  const [isLoading, loadingFunction] = useLoading();
  const selectDeleteRef = useRef<HTMLSelectElement>(null);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const router = useRouter();
  const { register, handleSubmit, formState, trigger, setValue } = useForm({
    resolver: yupResolver(BlogSecondCategoryDeleteYup),
    mode: 'onClick',
    defaultValues: {
      deleteSecondCategoryId: '',
    },
  });
  const { errors } = formState;

  const onClickErrorSubmit = props => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  const deleteSecondCategoryHandler = async (data: any) => {
    loadingFunction(
      BlogAPI.deleteSecondCategory({
        id: data.deleteSecondCategoryId,
      })
    )
      .then(res => {
        let temp = blogStore.secondCategoryList.filter(
          i => i.id != data.deleteSecondCategoryId
        );
        store.dispatch(SET_BLOG_POST_LIST([]));
        store.dispatch(SET_SECOND_CATEGORY_LIST(temp));
        router.replace(
          `/blog?first-category=${blogStore.firstCategoryId}&second-category=${temp[0]?.id}`,
          undefined,
          {
            shallow: true,
          }
        );
        props.closeModal();
      })
      .catch(err => {
        console.log('BlogSecondCategoryDeleteBox.tsx 파일 : ', err);
      });
  };

  return (
    <Container gap={28} pd={'8px'} color={'contrast'} brR={'10px'}>
      <Header>
        <span>블로그 2번째 카테고리 삭제</span>
      </Header>
      <CC.ColumnDiv gap={28}>
        <Select
          w={'100%'}
          register={register('deleteSecondCategoryId')}
          trigger={trigger}
          setValue={setValue}
          placeholder={'1번째 카테고리'}
          bg={'transparent'}
          outline={true}
          data={blogStore.secondCategoryList.map(i => {
            return { value: i.id, name: i.name, bg: '' };
          })}
        ></Select>
      </CC.ColumnDiv>
      <CC.ColumnDiv gap={8}>
        <Button
          w={'100%'}
          h={'40px'}
          outline={true}
          disabled={!formState.isValid}
          onClickCapture={handleSubmit(
            deleteSecondCategoryHandler,
            onClickErrorSubmit
          )}
          bg={'white80'}
        >
          삭제
        </Button>
      </CC.ColumnDiv>
    </Container>
  );
};
export default BlogSecondCategoryDeleteBox;

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
