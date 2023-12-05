import { CC } from '@/styles/commonComponentStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { Icons } from '@/components/common/icons/Icons';
import ModalButton from '@/components/common/button/ModalButton';
import { useEffect, useRef, useState } from 'react';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { useForm } from 'react-hook-form';
import { AnyAction } from 'redux';
import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import { BlogFirstCategoryYup } from '@/components/yup/BlogCategoryYup';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from '../select/Select';
import { BlogAPI } from '@/api/BlogAPI';
import useLoading from '@/src/hooks/useLoading';
import { useSelector } from 'react-redux';
import {
  SET_FIRST_CATEGORY_ID_AND_NAME,
  SET_FIRST_CATEGORY_LIST,
  SET_SECOND_CATEGORY_ID_AND_NAME,
} from '@/redux/store/blog';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogFirstCategoryModal.tsx
 * @version 0.0.1 "2023-10-03 02:15:03"
 * @description 설명
 */

const BlogFirstCategoryModal = () => {
  const selectUpdateRef = useRef<HTMLSelectElement>(null);
  const selectRemoveRef = useRef<HTMLSelectElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const [isLoading, loadingFunction] = useLoading();
  const [removeImageUrl, setRemoveImageUrl] = useState();
  const [menu, setMenu] = useState('add');
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      createFirstCategoryName: '',
    },
  });

  const createFirstCategoryHandler = (data: any) => {
    const { ...params } = data;
    loadingFunction(
      BlogAPI.addFirstCategory({
        name: params.createFirstCategoryName,
      })
    ).then(res => {
      // 부모에있는 state 값 변경
      let temp = blogStore.firstCategoryList;
      temp?.push(res.data.createBlogFirstCategory);
      store.dispatch(SET_FIRST_CATEGORY_LIST(temp));
    });
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
      .catch(err => {});
  };

  const removeFirstCategoryHandler = async () => {
    loadingFunction(
      BlogAPI.removeFirstCategory({ id: selectRemoveRef.current.value })
    )
      .then(res => {
        let temp = blogStore.firstCategoryList.filter(
          i => selectRemoveRef.current.value != i.id
        );
        store.dispatch(SET_FIRST_CATEGORY_LIST(temp));
      })
      .catch(err => {});
  };

  return (
    <Container>
      <CC.RowDiv gap={4}>
        <Button
          w={'100%'}
          active={menu === 'add'}
          onClick={() => setMenu('add')}
        >
          추가
        </Button>
        <Button
          w={'100%'}
          active={menu === 'update'}
          onClick={() => setMenu('update')}
        >
          수정
        </Button>
        <Button
          w={'100%'}
          active={menu === 'remove'}
          onClick={() => setMenu('remove')}
        >
          삭제
        </Button>
      </CC.RowDiv>
      {menu === 'add' && (
        <BlogCategoryBox
          gap={28}
          pd={'8px'}
          outline={true}
          color={'contrast'}
          brR={'10px'}
        >
          <Header>
            <span>블로그 1번째 카테고리 추가 </span>
          </Header>
          <CC.ColumnDiv gap={28}>
            <Input
              placeholder="이름"
              styleTypes={1}
              register={register('createFirstCategoryName')}
              onKeyPressAction={handleSubmit(createFirstCategoryHandler)}
            />
          </CC.ColumnDiv>
          <CC.ColumnDiv gap={8}>
            <Button
              w={'100%'}
              h={'40px'}
              outline={true}
              styleTypes={1}
              onClickCapture={handleSubmit(createFirstCategoryHandler)}
            >
              추가
            </Button>
          </CC.ColumnDiv>
        </BlogCategoryBox>
      )}
      {menu === 'update' && (
        <BlogCategoryBox
          gap={28}
          pd={'8px'}
          outline={true}
          color={'contrast'}
          brR={'10px'}
        >
          <Header>
            <span>블로그 1번째 카테고리 수정</span>
          </Header>
          <CC.ColumnDiv gap={28}>
            <Select
              ref={selectUpdateRef}
              bg={'transparent'}
              outline={true}
              h={'40px'}
            >
              {blogStore.firstCategoryList?.map((i, index) => (
                <option key={index} value={i.id}>
                  {i.name}
                </option>
              ))}
            </Select>
            <Input
              placeholder="변경할 이름"
              styleTypes={1}
              register={register('updateFirstCategoryName')}
              onKeyPressAction={handleSubmit(updateFirstCategoryHandler)}
            />
          </CC.ColumnDiv>
          <CC.ColumnDiv gap={8}>
            <Button
              w={'100%'}
              h={'40px'}
              outline={true}
              styleTypes={1}
              onClickCapture={handleSubmit(updateFirstCategoryHandler)}
            >
              수정
            </Button>
          </CC.ColumnDiv>
        </BlogCategoryBox>
      )}
      {menu === 'remove' && (
        <BlogCategoryBox
          gap={28}
          pd={'8px'}
          outline={true}
          color={'contrast'}
          brR={'10px'}
        >
          <Header>
            <span>블로그 1번째 카테고리 삭제</span>
          </Header>
          <CC.ColumnDiv gap={28}>
            <Select
              ref={selectRemoveRef}
              bg={'transparent'}
              outline={true}
              h={'40px'}
            >
              {blogStore.firstCategoryList?.map((i, index) => (
                <option key={index} value={i.id}>
                  {i.name}
                </option>
              ))}
            </Select>
          </CC.ColumnDiv>
          <CC.ColumnDiv gap={8}>
            <Button
              w={'100%'}
              h={'40px'}
              outline={true}
              styleTypes={1}
              onClickCapture={() => removeFirstCategoryHandler()}
            >
              삭제
            </Button>
          </CC.ColumnDiv>
        </BlogCategoryBox>
      )}
    </Container>
  );
};
export default BlogFirstCategoryModal;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  padding: 40px 10px 10px 10px;
  gap: 16px;
  color: ${props => props.theme.colors.white80};
  font-size: 1.2rem;
  max-width: 600px;
  margin: auto;

  /* @media (min-width: ${props => props.theme.deviceSizes.tablet}) {
    ${props => props.theme.flex.row._};
  } */
`;

const BlogCategoryBox = styled(CC.ColumnDiv)`
  outline: solid ${props => props.theme.main.contrast} 4px;
  width: 300px;

  & > button:nth-of-type(1) {
    align-items: end;
  }
`;

const commonStyle = css`
  border: 1px solid #fff;
  background: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(1px);
`;

const Header = styled.header`
  ${props => props.theme.flex.column};
  padding: 16px;
  gap: 0.25rem;
  align-self: stretch;
  border-radius: ${props => props.theme.borderRadius.br10};
  ${commonStyle};

  span:nth-of-type(1) {
    font-family: ${props => props.theme.fontFamily.cookieRunRegular};
    font-size: 20px;
  }
`;
