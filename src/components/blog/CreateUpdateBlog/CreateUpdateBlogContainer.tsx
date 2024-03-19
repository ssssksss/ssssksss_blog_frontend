import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import { Icons } from '@components/common/icons/Icons';
import LoadingComponent from '@components/common/loading/LoadingComponent';
import { Editor } from '@components/editor/MDEditor';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import { CC } from '@styles/commonComponentStyle';
import StringFunction from '@utils/function/stringFunction';
import { AWSS3Prefix } from '@utils/variables/url';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BlogCreateYup, BlogUpdateYup } from '../../yup/BlogCategoryYup';
import CreateUpdateBlogTemplateContainer from './CreateUpdateBlogTemplateContainer';
import CreateUpdateHeaderContainer from './CreateUpdateHeaderContainer';

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
  const [blogContentImageList, setBlogContentImageList] = useState([]);
  const [tempBlogImage, setTempBlogImage] = useState([]);
  const [value, setValue] = useState(props.content);
  // const [defaultImageUrl, setDefaultImageUrl] = useState();
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
      thumbnailImageUrl: '',
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
      methods.setValue('thumbnailImageUrl', props.thumbnailImageUrl);
      // setDefaultImageUrl(props.thumbnailImageUrl);

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

  const uploadHandler = async (file: any) => {
    const url = URL.createObjectURL(file).substring(5);
    setTempBlogImage((prev) => [...prev, { url, file }]);
    return url;
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

  useEffect(() => {
    textareaRef.current?.setSelectionRange(cursor, cursor);
  }, [cursor]);

  useEffect(() => {
    // ctrl + space를 누르면 bing이 나온다. 사용하기전에 브라우저에 가서 설정을 해주어야 한다.

    textareaRef.current = window.document.querySelector(
      '.w-md-editor-text-input',
    );

    setTimeout(() => {
      document.querySelectorAll('pre')?.forEach((i) => {
        let test = document.createElement('button');
        test.style.position = 'absolute';
        test.style.right = '0.4rem';
        test.style.top = '0.4rem';
        test.style.width = '2.4rem';
        test.style.height = '2.4rem';
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
  }, []);

  return (
    <FormProvider {...methods}>
      {isLoading && <LoadingComponent />}
      {(store.getState().authStore.role === 'ROLE_ADMIN' ||
        store.getState().authStore.id ===
          store.getState().blogStore.activeBlogUserId) && (
        <Container
          isLoading={isLoading}
          icon={Icons.PlayIcon}
          h={'100%'}
          isDragging={isDragging}
        >
          <CreateUpdateHeaderContainer
            edit={props.edit}
            categoryList={categoryList}
            {...props}
          />
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
          <CreateUpdateBlogTemplateContainer />
          <EditorFooter>
            <Button
              w={'100%'}
              onClick={() => submitHandler()}
              disabled={!methods.formState.isValid}
              brR={'0rem'}
            >
              {props.edit ? '수정' : '제출'}
            </Button>
            <ConfirmButton
              w={'100%'}
              onClick={() => router.back()}
              brR={'0rem'}
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

const EditorContainer = styled(CC.ColumnDiv)<{ isDragging: boolean }>`
  overflow: scroll;
  -ms-over-flow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }

  .w-md-editor {
    padding-top: 5.6rem;
    z-index: 0;
  }

  .w-md-editor-content {
    height: calc(100% - 3.2rem);
    &::before {
      content: '';
      background-size: 50%;
      background-image: url('/img/backgroundImage/원피스.jpg');
      background-repeat: repeat-x;
      background-position: right bottom;
      opacity: 0.2;
      position: absolute;
      top: 0rem;
      left: 0rem;
      right: 0rem;
      bottom: 0rem;
    }
  }
  .w-md-editor-area {
    opacity: ${(props) => props.isDragging && 0.5};
    padding-bottom: 0.6rem;
    height: 100%;
  }
  .w-md-editor-text-input {
    height: 100%;
  }
  .w-md-editor-preview {
    margin-bottom: 2rem;
    padding-bottom: 4rem;

    pre {
      outline: solid ${(props) => props.theme.main.primary80} 0.1rem;
      border-radius: 1rem;
      position: relative;
      box-shadow: 0.1rem 0.1rem 0.2rem 0rem rgba(0, 0, 0, 0.25);
      font-size: 1.2rem;

      button {
        display: none;
        content: '';
        background-image: ${(props) =>
          props.icon && `url('/img/ui-icon/ic-board.svg')`};
        background-size: 2rem;
        background-repeat: no-repeat;
        background-position-x: 50%;
        background-position-y: 50%;
        aspect-ratio: 1;
        position: absolute;
        width: max-content;
        top: 0rem;

        aspect-ratio: 1;
        padding: 0rem;
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
  z-index: 1;
  position: sticky;
  top: 100vh;
`;
