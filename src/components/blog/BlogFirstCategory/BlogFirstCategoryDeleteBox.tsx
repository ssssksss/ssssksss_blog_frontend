import { Input } from '@/components/common/input/Input';
import { BlogFirstCategoryDeleteYup } from '@/components/yup/BlogCategoryYup';
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
import { LoadingComponent } from '@/components/common/loading/LoadingComponent';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryDeleteBox.tsx
 * @version 0.0.1 "2024-01-06 04:06:36"
 * @description 설명
 */
const BlogFirstCategoryDeleteBox = () => {
  const [isLoading, loadingFunction] = useLoading();
  const selectDeleteRef = useRef<HTMLSelectElement>(null);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const { register, handleSubmit, formState, trigger, setValue } = useForm({
    resolver: yupResolver(BlogFirstCategoryDeleteYup),
    mode: 'onClick',
    defaultValues: {
      deleteFirstCategoryId: '',
    },
  });
  const { errors } = formState;

  const onClickErrorSubmit = () => {
    alert('잘못 입력된 값이 존재합니다.');
  };

  const deleteFirstCategoryHandler = async (data: any) => {
    loadingFunction(
      BlogAPI.deleteFirstCategory({
        id: data.deleteFirstCategoryId,
      })
    )
      .then(res => {
        let temp = blogStore.firstCategoryList.filter(
          i => i.id != data.deleteFirstCategoryId
        );
        store.dispatch(SET_BLOG_POST_LIST([]));
        store.dispatch(SET_FIRST_CATEGORY_LIST(temp));
        console.log('BlogFirstCategoryDeleteBox.tsx 파일 : ', temp);
        store.dispatch(
          SET_SECOND_CATEGORY_LIST([...temp[0]?.secondCategoryList])
        );
        router.replace(
          `/blog?first-category=${temp[0]?.id}&second-category=${temp[0]?.secondCategoryList[0]?.id}`,
          undefined,
          {
            shallow: true,
          }
        );
        props.closeModal();
      })
      .catch(err => {
        console.log('BlogFirstCategoryDeleteBox.tsx 파일 : ', err);
      });
  };

  return (
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
              register={register('deleteFirstCategoryId')}
              trigger={trigger}
              placeholder={'1번째 카테고리'}
              setValue={setValue}
              bg={'transparent'}
              outline={true}
              data={blogStore.firstCategoryList.map(i => {
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
