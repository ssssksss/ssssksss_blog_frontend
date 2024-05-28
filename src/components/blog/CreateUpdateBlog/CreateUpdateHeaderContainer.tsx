import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import AxiosInstance from '@utils/axios/AxiosInstance';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useReducer } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { CreateUpdateHeaderProps } from 'src/@types/blog/CreateUpdateHeaderContainer';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateUpdateHeaderContainer.tsx
 * @version 0.0.1 "2024-03-19 18:36:40"
 * @description 설명
 */
const CreateUpdateHeaderContainer = (props: CreateUpdateHeaderProps) => {
  const { register, getValues, setValue } = useFormContext();
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const [isHideContainer, hideContainerToggle] = useReducer(
    (v) => !v,
    props.edit ? true : false,
  );
  const onChangeSecondCategoryHandler = async ({
    value,
    name,
  }: {
    value: string;
    name: string;
    bg: string; 
  }) => {

    setValue('selectSecondCategoryId', value);
    setValue('selectSecondCategoryName', name, {
      shouldValidate: true,
    });
    setValue(
      'thumbnailImageUrl',
      blogStore.blogCategoryAndBlogList?.filter((i) => i.id == getValues("selectFirstCategoryId"))[0]
        .blogSecondCategoryList.filter(j=> j.id == value)[0]?.thumbnailImageUrl,
      { shouldValidate: true },
    );
  };

  const onChangeFirstCategoryHandler = async ({
    value,
    name,
  }: {
    value: string;
    name: string;
    bg: string;
  }) => {
    setValue('selectFirstCategoryId', value);
    setValue('selectFirstCategoryName', name);
    setValue(
      'selectSecondCategoryName',
      blogStore.blogCategoryAndBlogList?.filter(
        (i) => i.id == value,
      )[0].blogSecondCategoryList[0]?.name,
      { shouldValidate: true },
    );
    setValue(
      'selectSecondCategoryId',
      blogStore.blogCategoryAndBlogList?.filter(
        (i) => i.id == value,
      )[0].blogSecondCategoryList[0]?.id,
      { shouldValidate: true },
    );
    setValue(
      'thumbnailImageUrl',
      blogStore.blogCategoryAndBlogList?.filter(
        (i) => i.id == value,
      )[0].blogSecondCategoryList[0]?.thumbnailImageUrl,
      { shouldValidate: true },
    );
  };

  const onChangeStatus = async ({
    value,
    name,
  }: {
    value: string;
    name: string;
    bg: string;
    }) => {
    setValue('status', value);
  };

  useEffect(() => {
    const keyDownEventFunc = (e: Event) => {
      if (e.key === 'Escape') {
        hideContainerToggle();
      }
    };
    window.addEventListener('keydown', keyDownEventFunc);
    setValue('status', props.status);
    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

  useLayoutEffect(() => {
    if (!props.edit) return null;
      AxiosInstance.get(
        `/api/blog/category/list`,
      ).then(res => {
        store.dispatch(rootActions.blogStore.setBlogCategoryAndBlogList(res.data.data.blogFirstCategoryList));
      });
  },[])

  return (
    <Container>
      <Button
        id={'hideBlogHeaderButton'}
        w={'100%'}
        h={'100%'}
        bg={'primary40'}
        brR={'0rem'}
        onClick={hideContainerToggle}
      >
        {isHideContainer ? (
          <Image src={Icons.DownArrowIcon} />
        ) : (
          <Image src={Icons.UpArrowIcon} />
        )}
      </Button>
      <HideContainer isHide={isHideContainer}>
        <CC.RowBetweenDiv gap={8}>
          <Select
            w={'100%'}
            placeholder={'1번째 카테고리'}
            onChange={onChangeFirstCategoryHandler}
            defaultValue={{
              value: getValues('selectFirstCategoryId'),
              name: getValues('selectFirstCategoryName'),
            }}
            data={blogStore.blogCategoryAndBlogList?.map((i) => {
              return {
                value: i.id,
                name: i.name,
              };
            })}
          ></Select>
          <Select
            w={'100%'}
            placeholder={'2번째 카테고리'}
            onChange={onChangeSecondCategoryHandler}
            defaultValue={{
              value: getValues('selectSecondCategoryId'),
              name: getValues('selectSecondCategoryName'),
            }}
            enable={getValues('selectFirstCategoryId') !== undefined}
            data={blogStore.blogCategoryAndBlogList
              ?.filter((i) => i.id == getValues('selectFirstCategoryId'))[0]
              ?.blogSecondCategoryList?.map((j) => {
                return {
                  value: j.id,
                  name: j.name,
                };
              })}
          ></Select>
        </CC.RowBetweenDiv>
        {props.edit && (
          <CC.RowBox>
            <Select
              w={'100%'}
              placeholder={'상태'}
              onChange={onChangeStatus}
              defaultValue={{
                value: getValues('status'),
                name: getValues('status'),
              }}
              data={['PUBLIC', 'DEVELOP', 'HIDE'].map((i) => {
                return {
                  value: i,
                  name: i,
                };
              })}
            ></Select>
          </CC.RowBox>
        )}
        <Title
          placeholder="제목을 입력해주세요"
          initialValue={getValues('title')}
          register={register('title')}
          pd={'0 0 0 0.5rem'}
          outline={1}
          h={'2.75rem'}
        />
        <Description
          placeholder="간단한 설명을 입력해주세요"
          initialValue={getValues('description')}
          register={register('description')}
          pd={'0 0 0 0.5rem'}
          outline={1}
          h={'2.75rem'}
        />
        <CC.ColumnCenterDiv gap={8}>
          <Input
            type="file"
            id="imageUpload"
            h={'20rem'}
            outline={1}
            register={register('thumbnailImageFile')}
            setValue={setValue}
            defaultImageUrl={getValues('thumbnailImageUrl')}
          />
        </CC.ColumnCenterDiv>
      </HideContainer>
    </Container>
  );
};
export default CreateUpdateHeaderContainer;

const Container = styled(CC.ColumnDiv)`
  position: relative;
  width: 100%;
  height: 2.4rem;
  z-index: 9;
  & > button {
    flex-shrink: 0;
  }
`;

const HideContainer = styled(CC.ColumnDiv)<{ isHide: boolean }>`
  width: 100%;
  top: 2.4rem;
  visibility: ${(props) => (props.isHide ? 'hidden' : 'visible')};
  height: ${(props) =>
  props.isHide ? '0rem' : `min-content`};
  gap: 0.5rem;
  background: ${(props) => props.theme.main.contrast};
  outline: solid black 1px;
  outline-offset: -1px;
  border-radius: 0.5rem;
  padding: 1rem;
  z-index: 6;
  position: absolute;
  overflow: scroll;

  select {
    outline: solid black 0.1rem;
  }

  input::placeholder {
    transition: all 0s ease-in-out;
  }
`;

const Title = styled(Input)`
  width: 100%;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  color: ${(props) => props.theme.colors.black80};
  z-index: 3;

`;

const Description = styled(Input)`
  width: 100%;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  color: ${(props) => props.theme.colors.black60};

  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 1rem;
    &::placeholder {
      font-size: 1rem;
    }
  }
`;
