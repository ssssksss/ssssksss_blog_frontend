import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import Input from '@components/common/input/Input';
import Select from '@components/common/select/Select';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { useEffect, useReducer } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateUpdateHeaderContainer.tsx
 * @version 0.0.1 "2024-03-19 18:36:40"
 * @description 설명
 */
const CreateUpdateHeaderContainer = (props) => {
  const { register, getValues, setValue, trigger } = useFormContext();
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
    props.categoryList.secondCategoryList[value];

    setValue('selectSecondCategoryId', value);
    setValue('selectSecondCategoryName', name, {
      shouldValidate: true,
    });
    setValue(
      'thumbnailImageUrl',
      props.categoryList?.secondCategoryList[
        getValues('selectFirstCategoryId')
      ][value].thumbnailImageUrl,
    );
    // setDefaultImageUrl(
    //   props.categoryList.secondCategoryList[getValues('selectFirstCategoryId')][
    //     value
    //   ].thumbnailImageUrl,
    // );
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
      Object.values(props.categoryList?.secondCategoryList[value])[0].name,
      { shouldValidate: true },
    );
    setValue(
      'selectSecondCategoryId',
      Object.keys(props.categoryList.secondCategoryList[value])[0],
    );
    setValue(
      'thumbnailImageUrl',
      Object.values(props.categoryList.secondCategoryList[value])[0]
        ?.thumbnailImageUrl,
      { shouldValidate: true },
    );
  };

  useEffect(() => {
    let keyDownEventFunc = (e: Event) => {
      if (e.key === 'Escape') {
        hideContainerToggle();
      }
    };

    window.addEventListener('keydown', keyDownEventFunc);

    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

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
            data={Object.entries(props.categoryList.firstCategoryList)?.map(
              ([key, value]) => ({
                value: key,
                name: value,
              }),
            )}
          ></Select>
          <Select
            w={'100%'}
            placeholder={'2번째 카테고리'}
            onChange={onChangeSecondCategoryHandler}
            defaultValue={{
              value: getValues('selectSecondCategoryId'),
              name: getValues('selectSecondCategoryName'),
            }}
            enable={
              props.categoryList.secondCategoryList[
                getValues('selectFirstCategoryId') || props.secondCategoryId
              ] !== undefined
            }
            data={
              (props.categoryList.secondCategoryList[
                getValues('selectFirstCategoryId') || props.secondCategoryId
              ] &&
                Object.entries(
                  props.categoryList.secondCategoryList[
                    getValues('selectFirstCategoryId') || props.secondCategoryId
                  ],
                )?.map(([key, value]) => ({
                  value: key,
                  name: value.name,
                }))) || { value: '', name: '' }
            }
          ></Select>
        </CC.RowBetweenDiv>
        <Title
          placeholder="제목을 입력해주세요"
          initialValue={getValues('title')}
          register={register('title')}
        />
        <Description
          placeholder="간단한 설명을 입력해주세요"
          initialValue={getValues('description')}
          register={register('description')}
        />
        <CC.ColumnCenterDiv gap={4} pd={'0.4rem 0rem'}>
          <Input
            type="file"
            id="imageUpload"
            h={'20rem'}
            // ref={fileRef}
            bg={'contrast'}
            outline={'black80'}
            register={register('thumbnailImageFile')}
            setValue={setValue}
            trigger={trigger}
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
    props.isHide ? '0rem' : `min(34rem, calc(100vh - 7.6rem))`};
  gap: 0.4rem;
  background: ${(props) => props.theme.colors.gray60};
  padding: 0.4rem;
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
  --font-size: 1.2rem;
  width: 100%;
  height: 2.4rem;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  color: ${(props) => props.theme.colors.black80};
  z-index: 3;
  border: none;
  font-size: var(--font-size);
  outline: solid black 0.1rem;

  &::placeholder {
    font-size: var(--font-size);
    color: ${(props) => props.theme.colors.black40};
  }
`;

const Description = styled(Input)`
  --font-size: 1.2rem;
  width: 100%;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  font-size: var(--font-size);
  color: ${(props) => props.theme.colors.black60};
  border: none;
  z-index: 2;
  border-radius: 0.8rem;
  outline: solid black 0.1rem;

  &::placeholder {
    font-size: var(--font-size);
    color: ${(props) => props.theme.colors.black40};
  }

  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 1rem;
    &::placeholder {
      font-size: 1rem;
    }
  }
`;
