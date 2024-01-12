import { CC } from '@/styles/commonComponentStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import ModalButton from '@/components/common/button/ModalButton';
import { useEffect, useRef, useState } from 'react';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { useForm } from 'react-hook-form';
import { AnyAction } from 'redux';
import { store } from '@/redux/store';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from '../common/select/Select';
import { BlogAPI } from '@/api/BlogAPI';
import { useLoading } from '@/src/hooks/useLoading';
import { ImageAPI } from '@/api/ImageAPI';
import { useSelector } from 'react-redux';
import { SET_SECOND_CATEGORY_LIST } from '@/redux/store/blog';
import { AWSS3Prefix } from '@/utils/variables/url';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogSecondaryCategoryModal.tsx
 * @version 0.0.1 "2023-10-03 02:58:49"
 * @description 설명
 */

const BlogSecondaryCategoryModal = (props: { closeModal: () => void }) => {
  const selectUpdateRef = useRef<HTMLSelectElement>(null);
  const selectRemoveRef = useRef<HTMLSelectElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const [isLoading, loadingFunction] = useLoading();
  const [menu, setMenu] = useState('add');
  const [removeImageUrl, setRemoveImageUrl] = useState();
  const [updateImageUrl, setUpdateImageUrl] = useState();
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      createSecondCategoryName: '',
    },
  });

  const createSecondCategoryHandler = (data: any) => {
    const { ...params } = data;
    loadingFunction(
      BlogAPI.addSecondCategory({
        name: params.createSecondCategoryName,
        secondCategoryId: blogStore.secondCategoryId,
        files: fileRef.current.files[0],
        directory: `/blog-category/${blogStore.secondCategoryId}/${params.createSecondCategoryName}`,
      })
    ).then(async res => {
      // 부모에있는 state 값 변경
      let temp = res.data.createBlogSecondCategory;
      store.dispatch(
        SET_SECOND_CATEGORY_LIST([...blogStore.secondCategoryList, temp])
      );
    });
  };

  const updateSecondCategoryHandler = async (data: any) => {
    const { ...params } = data;
    let _secondCategoryName;
    if (!params.updateSecondCategoryName) {
      blogStore.secondCategoryList.map(i => {
        if (i.id == selectUpdateRef.current.value) {
          _secondCategoryName = i.name;
        }
      });
    }

    loadingFunction(
      BlogAPI.updateSecondCategory({
        id: selectUpdateRef.current.value,
        name: params.updateSecondCategoryName || _secondCategoryName,
        files: fileRef.current.files[0],
        directory: `/blog-category/${blogStore.secondCategoryId}/${
          params.createSecondCategoryName || _secondCategoryName
        }`,
      })
    )
      .then(res => {
        let temp = blogStore.secondCategoryList.map((i, index) => {
          if (res.data.data.id == i.id) {
            return res.data.data;
          }
          return i;
        });
        store.dispatch(SET_SECOND_CATEGORY_LIST(temp));
      })
      .catch(err => {});
  };

  // * 카테고리 삭제(이미지도 같이 삭제 된다.)
  const removeSecondCategoryHandler = async () => {
    loadingFunction(
      BlogAPI.removeSecondCategory({ id: selectRemoveRef.current.value })
    )
      .then(res => {
        let temp = blogStore.secondCategoryList.filter(
          i => i.id != selectRemoveRef.current.value
        );
        store.dispatch(SET_SECOND_CATEGORY_LIST(temp));
        console.log(temp);
        if (temp.length > 0) {
          setRemoveImageUrl(temp[0].thumbnailImageUrl);
        } else {
          setRemoveImageUrl(null);
        }
      })
      .catch(err => {});
  };
  const changeUpdateCategoryImage = () => {
    setUpdateImageUrl(
      blogStore.secondCategoryList.filter(
        i => i.id == selectUpdateRef.current.value
      )[0].thumbnailImageUrl
    );
  };

  const changeRemoveCategoryImage = () => {
    setRemoveImageUrl(
      blogStore.secondCategoryList.filter(
        i => i.id == selectRemoveRef.current.value
      )[0].thumbnailImageUrl
    );
  };

  const changeUpdateUI = () => {
    setMenu('update');
    setUpdateImageUrl(blogStore.secondCategoryList[0]?.thumbnailImageUrl);
  };

  const changeRemoveUI = () => {
    setMenu('remove');
    setRemoveImageUrl(blogStore.secondCategoryList[0]?.thumbnailImageUrl);
  };

  return (
    <>
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
            onClick={() => changeUpdateUI()}
          >
            수정
          </Button>
          <Button
            w={'100%'}
            active={menu === 'remove'}
            onClick={() => changeRemoveUI()}
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
              <span>블로그 2번째 카테고리 추가 </span>
            </Header>
            <CC.ColumnDiv gap={28}>
              <Input
                styleTypes={1}
                value={blogStore.secondCategoryName}
                disabled={true}
              />
              <Input
                placeholder="이름"
                styleTypes={1}
                register={register('createSecondCategoryName')}
              />
              <Input
                type="file"
                styleTypes={1}
                id="imageUpload"
                h={'200px'}
                ref={fileRef}
              />
            </CC.ColumnDiv>
            <CC.ColumnDiv gap={8}>
              <Button
                w={'100%'}
                h={'40px'}
                outline={true}
                styleTypes={1}
                onClickCapture={handleSubmit(createSecondCategoryHandler)}
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
            <CC.ColumnDiv gap={28}>
              <Header>
                <span>블로그 2번째 카테고리 수정</span>
              </Header>
              <CC.ColumnDiv gap={28}>
                <Input
                  styleTypes={1}
                  value={blogStore.secondCategoryName}
                  disabled={true}
                />
                <Select
                  ref={selectUpdateRef}
                  onChange={() => changeUpdateCategoryImage()}
                  bg={'transparent'}
                  outline={true}
                  h={'40px'}
                >
                  {blogStore.secondCategoryList?.map((i, index) => (
                    <option key={index} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </Select>
                <Input
                  placeholder="변경할 이름"
                  styleTypes={1}
                  register={register('updateSecondCategoryName')}
                />
                <CC.ColumnCenterDiv gap={4} pd={'4px 0px'}>
                  <CC.RowCenterDiv>
                    <b> 썸네일 이미지 </b>
                  </CC.RowCenterDiv>
                  <Input
                    type="file"
                    id="imageUpload1"
                    h={'200px'}
                    ref={fileRef}
                    bg={'contrast'}
                    outline={'black80'}
                    styleTypes={1}
                    defaultImageUrl={
                      updateImageUrl !== 'undefined' && updateImageUrl
                    }
                  />
                </CC.ColumnCenterDiv>
              </CC.ColumnDiv>
            </CC.ColumnDiv>
            <CC.ColumnDiv gap={8}>
              <Button
                w={'100%'}
                h={'40px'}
                outline={true}
                styleTypes={1}
                onClickCapture={handleSubmit(updateSecondCategoryHandler)}
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
            <CC.ColumnDiv gap={28}>
              <Header>
                <span>블로그 2번째 카테고리 삭제</span>
              </Header>
              <CC.ColumnDiv gap={28}>
                <Select
                  ref={selectRemoveRef}
                  onChange={() => changeRemoveCategoryImage()}
                  bg={'transparent'}
                  color={'white80'}
                  outline={true}
                  h={'40px'}
                >
                  {blogStore.secondCategoryList?.map((i, index) => (
                    <option key={index} value={i.id}>
                      {i.name}
                    </option>
                  ))}
                </Select>
                <CC.ColumnCenterDiv gap={4} pd={'4px 0px'}>
                  <CC.RowCenterDiv>
                    <b> 썸네일 이미지 </b>
                  </CC.RowCenterDiv>
                  <Input
                    type="file"
                    id="imageUpload1"
                    h={'200px'}
                    ref={fileRef}
                    bg={'contrast'}
                    styleTypes={1}
                    outline={'black80'}
                    defaultImageUrl={
                      removeImageUrl != undefined && removeImageUrl
                    }
                  />
                </CC.ColumnCenterDiv>
              </CC.ColumnDiv>
            </CC.ColumnDiv>
            <CC.ColumnDiv gap={8}>
              <Button
                w={'100%'}
                h={'40px'}
                outline={true}
                styleTypes={1}
                onClickCapture={() => removeSecondCategoryHandler()}
              >
                삭제
              </Button>
            </CC.ColumnDiv>
          </BlogCategoryBox>
        )}
      </Container>
    </>
  );
};
export default BlogSecondaryCategoryModal;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  padding: 40px 10px 10px 10px;
  gap: 16px;
  color: ${props => props.theme.colors.white80};
  font-size: 1.2rem;
  max-width: 600px;
  margin: auto;
`;

const BlogCategoryBox = styled(CC.ColumnBetweenDiv)`
  outline: solid ${props => props.theme.main.contrast} 4px;
  height: auto;
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
  width: max-content;
  max-width: 90rem;
  ${commonStyle};

  span:nth-of-type(1) {
    font-family: ${props => props.theme.fontFamily.cookieRunRegular};
    font-size: 20px;
  }
`;
