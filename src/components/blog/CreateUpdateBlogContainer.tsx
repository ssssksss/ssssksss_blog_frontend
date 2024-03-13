import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import { Icons } from '@components/common/icons/Icons';
import Input from '@components/common/input/Input';
import LoadingComponent from '@components/common/loading/LoadingComponent';
import Select from '@components/common/select/Select';
import { Editor } from '@components/editor/MDEditor';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import { CC } from '@styles/commonComponentStyle';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import { AWSS3Prefix } from '@utils/variables/url';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BlogCreateYup, BlogUpdateYup } from '../yup/BlogCategoryYup';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateUpdateBlogContainer.tsx
 * @version 0.0.1 "2023-10-14 00:59:02"
 * @description 설명
 */

interface IEditCreateUpdateBlogContainerProps {
  edit?: boolean;
  commentNumber: number;
  blogFirstCategoryName: string;
  blogSecondCategoryName: string;
  description: string;
  viewNumber: number;
  title: string;
  blogContentId: number;
  firstCategoryId: number;
  userId: number;
  content: string;
  createdAt: string;
  thumbnailImageUrl: string;
  id: number;
  secondCategoryId: number;
  likeNumber: number;
}

const CreateUpdateBlogContainer = (
  props: IEditCreateUpdateBlogContainerProps,
) => {
  const [isLoading, setIsLoading] = useReducer((prev) => !prev, false);
  const [isHideContainer, hideContainerToggle] = useReducer(
    (v) => !v,
    props.edit ? true : false,
  );
  const router = useRouter();
  const createBlogMutation = BlogAPI.createBlog({
    onSuccessHandler: async () => {
      await setIsLoading(false);
    },
  });
  const updateBlogMutation = BlogAPI.updateBlog({
    onSuccessHandler: async () => {
      await setIsLoading(false);
    },
  });
  const [defaultImageUrl, setDefaultImageUrl] = useState();
  const [blogContentImageList, setBlogContentImageList] = useState([]);
  // const [tempBlogImage, setTempBlogImage] = useState([]);
  const [value, setValue] = useState(props.content);
  const [categoryList, setCategoryList] = useState({
    firstCategoryList: {},
    secondCategoryList: {},
  });
  const editorChangeHandler = useCallback((value) => {
    setValue(value);
    methods.setValue('content', value, { shouldValidate: true });
  }, []);
  const methods = useForm({
    resolver: yupResolver(props.edit ? BlogUpdateYup : BlogCreateYup),
    mode: 'onChange',
    defaultValues: {
      selectFirstCategoryId: undefined,
      selectFirstCategoryName: undefined,
      selectSecondCategoryId: undefined,
      selectSecondCategoryName: undefined,
      title: '',
      description: '',
      thumbnailImageFile: '',
      content: props.content,
    },
  });

  BlogAPI.getBlogCategoryList({
    onSuccessHandler: (data) => {
      setCategoryList({
        firstCategoryList: data.json.firstCategoryList,
        secondCategoryList: data.json.secondCategoryList,
      });
      methods.setValue('selectFirstCategoryId', props.firstCategoryId);
      methods.setValue('selectSecondCategoryId', props.secondCategoryId);
      methods.setValue('selectFirstCategoryName', props.blogFirstCategoryName);
      methods.setValue(
        'selectSecondCategoryName',
        props.blogSecondCategoryName,
        { shouldValidate: true },
      );
      methods.setValue('title', props.title);
      methods.setValue('description', props.description);
      methods.setValue('content', props.content);
      setDefaultImageUrl(props.thumbnailImageUrl);

      setTimeout(() => {
        // ? 나중에 이미지들을 삭제하기위해 현재 블로그에 있는 이미지들의 경로를 수집
        let _blogContentImageList = [];
        let index2 = 0;
        const _TRUE = true;
        if (!props.edit) return;
        while (_TRUE) {
          let index1 = props.content.indexOf(AWSS3Prefix, index2);
          if (index1 === -1) break;
          index2 = props.content.indexOf('.', index1 + AWSS3Prefix.length);
          _blogContentImageList.push(
            props.content.substring(index1 + AWSS3Prefix.length, index2 + 4),
          );
        }
        setBlogContentImageList(_blogContentImageList);
      }, 1000);
    },
  });
  const submitHandler = async () => {
    setIsLoading(true);
    // store.dispatch(setIsLoading(true));
    let imageUrlList = [];
    let imageFileList = [];
    let deleteImageBucketDirectory = []; // edit에서 삭제에 필요한 이미지 s3 버킷 경로 수집

    // ObjectURL로 작업을 해서 실제 이미지로 저장하기 위해서 이미지들의 경로를 모으는 중이다.
    // TODO 똑같은 경로의 이미지들은 어떻게 처리를 해야할지 고민.... (나중에 테스트 해보기)
    // tempBlogImage.map((i) => {
    //   if (methods.getValues('content').search(i.url) != -1) {
    //     imageUrlList.push(i.url);
    //     imageFileList.push(i.file);
    //   }
    // });

    if (props.edit) {
      blogContentImageList?.map((i) => {
        if (methods.getValues('content').search(i) === -1) {
          deleteImageBucketDirectory.push(i);
        }
      });
    }

    if (props.edit) {
      updateBlogMutation({
        id: router.query.id,
        title: methods.getValues('title'),
        description: methods.getValues('description'),
        content: methods.getValues('content'),
        firstCategoryId: methods.getValues('selectFirstCategoryId'),
        secondCategoryId: methods.getValues('selectSecondCategoryId'),
        thumbnailImageFile: methods.getValues('thumbnailImageFile'),
        directory: `/blog-category/${methods.getValues(
          'selectFirstCategoryId',
        )}/${methods.getValues('selectSecondCategoryId')}`,
        imageUrlList: imageUrlList,
        imageFileList: imageFileList,
        deleteImageBucketDirectory: deleteImageBucketDirectory,
      });
    }

    if (!props.edit) {
      createBlogMutation({
        title: methods.getValues('title'),
        description: methods.getValues('description'),
        content: methods.getValues('content'),
        firstCategoryId: methods.getValues('selectFirstCategoryId'),
        secondCategoryId: methods.getValues('selectSecondCategoryId'),
        thumbnailImageFile: methods.getValues('thumbnailImageFile'),
        directory: `/blog-category/${methods.getValues(
          'selectFirstCategoryId',
        )}/${methods.getValues('selectSecondCategoryId')}`,
        imageUrlList: imageUrlList,
        imageFileList: imageFileList,
      });
    }
  };

  // const uploadHandler = async (file: any) => {
  //   const url = URL.createObjectURL(file).substring(5);
  //   setTempBlogImage((prev) => [...prev, { url, file }]);
  //   return url;
  // };

  const onChangeFirstCategoryHandler = async (props: {
    value: string;
    name: string;
    bg: string;
  }) => {
    methods.setValue('selectFirstCategoryId', props.value);
    methods.setValue('selectFirstCategoryName', props.name);
    methods.setValue(
      'selectSecondCategoryName',
      Object.values(categoryList.secondCategoryList[props.value])[0].name,
      { shouldValidate: true },
    );
    methods.setValue(
      'selectSecondCategoryId',
      Object.keys(categoryList.secondCategoryList[props.value])[0],
    );
    setDefaultImageUrl(
      Object.values(categoryList.secondCategoryList[props.value])[0]
        ?.thumbnailImageUrl,
    );
  };

  const onChangeSecondCategoryHandler = async (props: {
    value: string;
    name: string;
    bg: string;
  }) => {
    categoryList.secondCategoryList[props.value];

    methods.setValue('selectSecondCategoryId', props.value);
    methods.setValue('selectSecondCategoryName', props.name, {
      shouldValidate: true,
    });
    setDefaultImageUrl(
      categoryList.secondCategoryList[
        methods.getValues('selectFirstCategoryId')
      ][props.value].thumbnailImageUrl,
    );
  };

  useEffect(() => {
    // ctrl + space를 누르면 bing이 나온다. 사용하기전에 브라우저에 가서 설정을 해주어야 한다.
    let keyDownEventFunc = (e: Event) => {
      if (e.key === 'Escape') {
        hideContainerToggle();
      }
    };

    setTimeout(() => {
      document.querySelectorAll('pre')?.forEach((i) => {
        let test = document.createElement('button');
        test.style.position = 'absolute';
        test.style.right = '4px';
        test.style.top = '4px';
        test.style.width = '24px';
        test.style.height = '24px';
        test.addEventListener('click', () => {
          navigator.clipboard.writeText(i.childNodes[0].textContent);
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: 'success',
              message: `복사되었습니다.`,
            }),
          );
        });
        i.appendChild(test);
      });
    }, 1000);

    window.addEventListener('keydown', keyDownEventFunc);

    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        {(store.getState().authStore.role === 'ROLE_ADMIN' ||
          store.getState().authStore.id ===
            store.getState().blogStore.activeBlogUserId) && (
          <React.Fragment>
            <Container isLoading={isLoading} icon={Icons.PlayIcon} h={'100%'}>
              {isLoading && <LoadingComponent />}
              <HeaderContainer>
                <Button
                  id={'hideBlogHeaderButton'}
                  w={'100%'}
                  h={'100%'}
                  bg={'primary40'}
                  brR={'0px'}
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
                        value: methods.getValues('selectFirstCategoryId'),
                        name: methods.getValues('selectFirstCategoryName'),
                      }}
                      data={Object.entries(categoryList.firstCategoryList)?.map(
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
                        value: methods.getValues('selectSecondCategoryId'),
                        name: methods.getValues('selectSecondCategoryName'),
                      }}
                      data={
                        (categoryList.secondCategoryList[
                          methods.getValues('selectFirstCategoryId') ||
                            props.secondCategoryId
                        ] &&
                          Object.entries(
                            categoryList.secondCategoryList[
                              methods.getValues('selectFirstCategoryId') ||
                                props.secondCategoryId
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
                    initialValue={methods.getValues('title')}
                    register={methods.register('title')}
                  />
                  <Description
                    placeholder="간단한 설명을 입력해주세요"
                    initialValue={methods.getValues('description')}
                    register={methods.register('description')}
                  />
                  <CC.ColumnCenterDiv gap={4} pd={'4px 0px'}>
                    <CC.RowCenterDiv>
                      <b> 썸네일 이미지 </b>
                    </CC.RowCenterDiv>
                    <Input
                      type="file"
                      id="imageUpload"
                      h={'200px'}
                      // ref={fileRef}
                      bg={'contrast'}
                      outline={'black80'}
                      register={methods.register('thumbnailImageFile')}
                      setValue={methods.setValue}
                      trigger={methods.trigger}
                      defaultImageUrl={defaultImageUrl}
                    />
                  </CC.ColumnCenterDiv>
                </HideContainer>
              </HeaderContainer>
              <EditorContainer>
                <Editor
                  height={'100%'}
                  // value={methods.getValues('content')}
                  value={value}
                  onChange={editorChangeHandler}
                  highlightEnable={false}
                  visibleDragbar={false}
                  onSubmit={() => false}
                />
              </EditorContainer>
              <EditorFooter>
                <Button
                  w={'100%'}
                  onClick={() => submitHandler()}
                  disabled={!methods.formState.isValid}
                  brR={'0px'}
                >
                  {props.edit ? '수정' : '제출'}
                </Button>
                <ConfirmButton
                  w={'100%'}
                  onClick={() => router.back()}
                  brR={'0px'}
                  bg={'red20'}
                  icon={'warning'}
                  text={'페이지를 나가시면 작성중인 글을 사라집니다.'}
                >
                  취소
                </ConfirmButton>
              </EditorFooter>
              <BlogItemContentFormContainer>
                <BlogItemContentFormButton
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `| 속성 | 사용 | \n | --- | --- | \n |  |  | \n |  |  | \n |  |  | \n |  |  |`,
                    );
                  }}
                >
                  테1
                </BlogItemContentFormButton>
                <BlogItemContentFormButton
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `| 속성 | 사용 | 설명  | \n | --- | --- | --- | \n |  |  |  | \n |  |  |  | \n |  |  |  | \n |  |  |  |`,
                    );
                  }}
                >
                  테2
                </BlogItemContentFormButton>
                <BlogItemContentFormButton
                  onClick={() => {
                    const dragText = window.getSelection();
                    navigator.clipboard.readText().then((res) => {
                      navigator.clipboard.writeText(
                        '<a href="' +
                          res +
                          '" target="_blank"> ' +
                          (dragText?.isCollapsed ? res : dragText) +
                          ' </a>',
                      );
                      dragText.getRangeAt(0).deleteContents();
                    });
                    store.dispatch(
                      rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
                        type: 'success',
                        message: '링크로 복사되었습니다.',
                      }),
                    );
                  }}
                >
                  링크
                </BlogItemContentFormButton>
              </BlogItemContentFormContainer>
            </Container>
          </React.Fragment>
        )}
      </FormProvider>
    </>
  );
};
export default CreateUpdateBlogContainer;

const Container = styled(CC.ColumnDiv.withComponent('section'))<{
  isLoading: boolean;
  icon: string;
}>`
  position: relative;
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;
  background-color: white;
  padding: 2px;
  height: calc(100% - 32px);

  visibility: ${(props) => props.isLoading && 'hidden'};
  select {
    z-index: 5;
  }
`;

const HeaderContainer = styled(CC.ColumnDiv)`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100%);
  height: 40px;
  z-index: 6;
`;

const HideContainer = styled(CC.ColumnDiv)<{ isHide: boolean }>`
  position: absolute;
  width: 100%;
  top: 40px;
  border-radius: 8px;
  padding: 8px;
  visibility: ${(props) => (props.isHide ? 'hidden' : 'visible')};
  height: ${(props) => (props.isHide ? '0px' : 'max-content')};
  gap: 8px;
  background: ${(props) => props.theme.colors.gray60};

  & > div {
  }

  select {
    outline: solid black 1px;
  }

  input::placeholder {
    transition: all 0s ease-in-out;
  }
`;

const Title = styled(Input)`
  --font-size: 1.6rem;
  width: 100%;
  height: 40px;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  color: ${(props) => props.theme.colors.black80};
  padding: 0px 10px;
  z-index: 3;
  border: none;
  font-size: var(--font-size);
  border-bottom: 2px solid ${(props) => props.theme.colors.black40};
  border-radius: 10px;
  outline: solid black 1px;

  &::placeholder {
    font-size: var(--font-size);
    color: ${(props) => props.theme.colors.black40};
  }

  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
    }
  }
`;

const EditorContainer = styled(CC.ColumnDiv)`
  gap: 4px;
  overflow: scroll;
  -ms-over-flow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
  height: 100%;
  padding-top: 40px;
  &::-webkit-scrollbar {
    display: none;
  }

  p:has(img) {
    width: 100%;
    display: flex;
    img {
      outline: solid black 4px;
      margin: auto;
      max-width: 800px;
      max-height: 600px;
    }
  }
  .w-md-editor-area .w-md-editor-input {
    height: 100%;
  }
  .w-md-editor-text {
    height: 100%;
  }
  .w-md-editor-content {
    &::before {
      content: '';
      background-size: 50%;
      background-image: url('/img/backgroundImage/원피스.jpg');
      background-repeat: repeat-x;
      background-position: right bottom;
      opacity: 0.2;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
    }
  }
`;
const EditorFooter = styled(CC.GridColumn2)`
  position: absolute;
  bottom: -32px;
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
`;

const BlogItemContentFormContainer = styled.section`
  right: 0px;
  top: 300px;
  ${(props) => props.theme.scroll.hidden}
  position: fixed;
  display: flex;
  flex-flow: nowrap column;
  padding: 4px;
  background: #eaeaea;
  gap: 2px;
  z-index: 4;
`;

const BlogItemContentFormButton = styled.button`
  padding: 2px;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 2px,
    rgba(0, 0, 0, 0.3) 0px 7px 6px -3px;
`;

const Description = styled(Input)`
  --font-size: 1.4rem;
  width: 100%;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  font-size: var(--font-size);
  color: ${(props) => props.theme.colors.black60};
  padding: 0px 10px;
  border: none;
  z-index: 2;
  border-radius: 8px;
  outline: solid black 1px;

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

<a href="www.naver.com"> test </a>;
