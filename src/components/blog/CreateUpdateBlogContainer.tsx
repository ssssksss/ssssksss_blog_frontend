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
import { AWSS3Prefix } from '@utils/variables/url';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BlogCreateYup, BlogUpdateYup } from '../yup/BlogCategoryYup';
import StringFunction from './../../utils/function/stringFunction';

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
  const [isDragging, setIsDragging] = useState(false);
  const [cursor, setCursor] = useState(0);
  const textareaRef = useRef(null);
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
  const [tempBlogImage, setTempBlogImage] = useState([]);
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
    tempBlogImage.map((i) => {
      if (methods.getValues('content').search(i.url) != -1) {
        imageUrlList.push(i.url);
        imageFileList.push(i.file);
      }
    });

    if (props.edit) {
      blogContentImageList?.map((i) => {
        if (methods.getValues('content').search(i) === -1) {
          deleteImageBucketDirectory.push(i);
        }
      });
    }

    methods.setValue(
      'content',
      StringFunction.replaceAll(
        methods.getValues('content'),
        '](blob:http',
        '](http',
      ),
    );

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

  const uploadHandler = async (file: any) => {
    const url = URL.createObjectURL(file).substring(5);
    setTempBlogImage((prev) => [...prev, { url, file }]);
    return url;
  };

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

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files[0]) {
      let _url = await uploadHandler(e.dataTransfer.files[0]);
      let _text = '![image](blob:' + _url + ')';
      editorChangeHandler(
        value.substring(0, textareaRef.current.selectionStart) +
          _text +
          value.substring(textareaRef.current.selectionStart, value.length),
      );
      setCursor(textareaRef.current.selectionStart + _text.length);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    textareaRef.current?.setSelectionRange(cursor, cursor);
  }, [cursor]);

  useEffect(() => {
    // ctrl + space를 누르면 bing이 나온다. 사용하기전에 브라우저에 가서 설정을 해주어야 한다.
    let keyDownEventFunc = (e: Event) => {
      if (e.key === 'Escape') {
        hideContainerToggle();
      }
    };

    textareaRef.current = window.document.querySelector(
      '.w-md-editor-text-input',
    );

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

  useEffect(() => {}, []);

  return (
    <FormProvider {...methods}>
      {(store.getState().authStore.role === 'ROLE_ADMIN' ||
        store.getState().authStore.id ===
          store.getState().blogStore.activeBlogUserId) && (
        <Container
          isLoading={isLoading}
          icon={Icons.PlayIcon}
          h={'100%'}
          isDragging={isDragging}
        >
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
          <EditorContainer id={'editor-container'} isDragging={isDragging}>
            <Editor
              ref={textareaRef}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              height={'100%'}
              value={value}
              onChange={editorChangeHandler}
              highlightEnable={false}
              visibleDragbar={false}
            />
          </EditorContainer>
          <ContentTemplateContainer>
            <ContentTemplateItem
              onClick={() => {
                navigator.clipboard.writeText(
                  `| 속성 | 사용 | \n | --- | --- | \n |  |  | \n |  |  | \n |  |  | \n |  |  |`,
                );
              }}
            >
              테1
            </ContentTemplateItem>
            <ContentTemplateItem
              onClick={() => {
                navigator.clipboard.writeText(
                  `| 속성 | 사용 | 설명  | \n | --- | --- | --- | \n |  |  |  | \n |  |  |  | \n |  |  |  | \n |  |  |  |`,
                );
              }}
            >
              테2
            </ContentTemplateItem>
            <ContentTemplateItem
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
            </ContentTemplateItem>
          </ContentTemplateContainer>
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
        </Container>
      )}
    </FormProvider>
  );
};
export default CreateUpdateBlogContainer;

const Container = styled.section<{
  isLoading: boolean;
  icon: string;
}>`
  height: 100%;
  visibility: ${(props) => props.isLoading && 'hidden'};
  position: relative;
  select {
    z-index: 5;
  }
`;

const HeaderContainer = styled(CC.ColumnDiv)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: ${(props) => props.theme.calcRem(32)};
  z-index: 100000;
  & > button {
    flex-shrink: 0;
  }
`;

const HideContainer = styled(CC.ColumnDiv)<{ isHide: boolean }>`
  width: 100%;
  top: ${(props) => props.theme.calcRem(32)};
  visibility: ${(props) => (props.isHide ? 'hidden' : 'visible')};
  height: ${(props) =>
    props.isHide
      ? '0px'
      : `min(${props.theme.calcRem(340)}, calc(100vh - ${props.theme.calcRem(76)}))`};
  gap: 4px;
  background: ${(props) => props.theme.colors.gray60};
  padding: ${(props) => props.theme.calcRem(4)};
  z-index: 100002;
  position: absolute;
  overflow: scroll;

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
  height: ${(props) => props.theme.calcRem(40)};
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  color: ${(props) => props.theme.colors.black80};
  z-index: 3;
  border: none;
  font-size: var(--font-size);
  outline: solid black ${(props) => props.theme.calcRem(1)};

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

const EditorContainer = styled(CC.ColumnDiv)<{ isDragging: boolean }>`
  overflow: scroll;
  -ms-over-flow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }

  .w-md-editor {
    margin-top: ${(props) => props.theme.calcRem(32)};
  }

  .w-md-editor-content {
    height: ${(props) => `calc(100% - ${props.theme.calcRem(32)})`};
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
  .w-md-editor-area {
    opacity: ${(props) => props.isDragging && 0.5};
    margin-bottom: ${(props) => props.theme.calcRem(20)};
    padding-bottom: ${(props) => props.theme.calcRem(40)};
    height: 100%;
  }
  .w-md-editor-text-input {
    height: 100%;
  }
  .w-md-editor-preview {
    margin-bottom: ${(props) => props.theme.calcRem(20)};
    padding-bottom: 40px;

    pre {
      outline: solid ${(props) => props.theme.main.primary80} 1px;
      border-radius: 10px;
      position: relative;
      box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.25);
      font-size: ${(props) => props.theme.calcRem(12)};

      button {
        display: none;
        content: '';
        background-image: ${(props) =>
          props.icon && `url('/img/ui-icon/ic-board.svg')`};
        background-size: 20px;
        background-repeat: no-repeat;
        background-position-x: 50%;
        background-position-y: 50%;
        aspect-ratio: 1;
        position: absolute;
        width: max-content;
        top: 0px;

        aspect-ratio: 1;
        padding: 0px;
        border: none;
      }
      &:hover > button {
        display: flex;
      }
    }
  }
  .w-md-editor-input {
  }
  .w-md-editor-text {
    height: 100%;
  }
  .w-md-editor-show-live {
  }
`;
const EditorFooter = styled(CC.GridColumn2)`
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  z-index: 100001;
  position: sticky;
  top: 100vh;
  /* top: ${(props) => `calc(100vh - ${props.theme.calcRem(20)})`}; */
`;

const ContentTemplateContainer = styled.section`
  ${(props) => props.theme.scroll.hidden}
  position: sticky;
  width: max-content;
  left: 100%;
  top: ${(props) => props.theme.calcRem(76)};
  display: flex;
  flex-flow: nowrap column;
  background: #eaeaea;
  gap: 2px;
  z-index: 100001;
`;

const ContentTemplateItem = styled.button`
  width: 2rem;
  aspect-ratio: 1;
  background: ${(props) => props.theme.main.primary40};
  border-radius: 50%;
`;

const Description = styled(Input)`
  --font-size: 1.4rem;
  width: 100%;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  font-size: var(--font-size);
  color: ${(props) => props.theme.colors.black60};
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
