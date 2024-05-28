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
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateUpdateBlogProps } from 'src/@types/blog/CreateUpdateBlogContainer';
import { BlogCreateYup, BlogUpdateYup } from '../../yup/BlogCategoryYup';
import CreateUpdateBlogTemplateContainer from './CreateUpdateBlogTemplateContainer';
import CreateUpdateHeaderContainer from './CreateUpdateHeaderContainer';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateUpdateBlogContainer.tsx
 * @version 0.0.1 "2023-10-14 00:59:02"
 * @description 설명
 */


const CreateUpdateBlogContainer = (props: CreateUpdateBlogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cursor, setCursor] = useState(0);
  const textareaRef = useRef(null);
  const router = useRouter();
  const createBlogMutation = BlogAPI.createBlog({
    onSuccessHandler: async () => {
      setIsLoading(false);
    },
  });
  const updateBlogMutation = BlogAPI.updateBlog({
    onSuccessHandler: async () => {
      await setIsLoading(false);
    },
  });
  const [blogContentImageList] = useState([]);
  const [tempBlogImage, setTempBlogImage] = useState([]);
  const [value, setValue] = useState(props.content);
  const editorChangeHandler = useCallback((value) => {
    setValue(value);
    methods.setValue('content', value, { shouldValidate: true });
  }, []);
  const methods = useForm({
    resolver: yupResolver(props.edit ? BlogUpdateYup : BlogCreateYup),
    mode: 'onChange',
    defaultValues: {
      selectFirstCategoryId: props.firstCategoryId,
      selectFirstCategoryName: props.blogFirstCategoryName,
      selectSecondCategoryId: props.secondCategoryId,
      selectSecondCategoryName: props.blogSecondCategoryName,
      title: props.title || '',
      description: props.description || '',
      thumbnailImageFile: '',
      thumbnailImageUrl: props.thumbnailImageUrl || '',
      content: props.content,
      status: props.status,
    },
  });

  const uploadHandler = async (file: unknown) => {
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
      const _url = await uploadHandler(e.dataTransfer.files[0]);
      const _text = '![image](blob:' + _url + ')';
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
    const imageUrlList = [];
    const imageFileList = [];
    const deleteImageBucketDirectory = []; // edit에서 삭제에 필요한 이미지 s3 버킷 경로 수집

    // 미리보기 이미지에서 실제 이미지로 저장하기 위해서 이미지들의 경로를 탐색
    tempBlogImage.map((i) => {
      if (methods.getValues('content').search(i.url) != -1) {
        imageUrlList.push(i.url);
        imageFileList.push(i.file);
      }
    });

    // 이전 이미지에서 삭제할 이미지가 있나 탐색
    if (props.edit) {
      blogContentImageList?.map((i) => {
        if (methods.getValues('content').search(i) === -1) {
          deleteImageBucketDirectory.push(i);
        }
      });
    }

    // 미리보기가 안보여 바꾼 텍스트를 다시 원래대로 전환
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
        status: methods.getValues('status'),
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
        const test = document.createElement('button');
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
      {store.getState().authStore.role === 'ROLE_ADMIN' && (
        <Container
          isLoading={isLoading}
          icon={Icons.PlayIcon}
          h={'100%'}
          isDragging={isDragging}
        >
          <CreateUpdateHeaderContainer edit={props.edit} {...props} />
          <CreateUpdateBlogTemplateContainer />
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
              text={'페이지를 나가시면 작성중인 글은 사라집니다.'}
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
  }

  .w-md-editor-content {
    height: calc(100vh - 9.9rem);

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
    height: 100%;
  }
  .w-md-editor-text-input {
    height: 100%;
  }
  .w-md-editor-preview {
    h1 {
      font-weight: 800;
      outline: solid ${(props) => props.theme.main.primary80} 0.25rem;
      outline-offset: -0.25rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      max-width: max-content;
      font-size: 2rem;
      font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
    }

    h2 {
      border: none;
      outline: solid ${(props) => props.theme.main.secondary80} 0.25rem;
      outline-offset: -0.25rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      max-width: max-content;
      font-weight: 800;
      font-size: 1.8rem;
      font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
    }

    h3 {
      border: none;
      outline: solid #dedede 0.25rem;
      outline-offset: -0.25rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      max-width: max-content;
      font-size: 1.6rem;
      font-family: ${(props) => props.theme.fontFamily.yanoljaYacheBold};
    }

    blockquote {
      font-size: 1.2rem;
      padding: 0 0 0 0.5rem;
      border: none;
      font-weight: 800;
      font-size: 1.2rem;
      box-shadow: -1px -1px 0px 0px rgba(0, 0, 0, 0.075);
      border-radius: 0.5rem;
      font-style: italic;
    }

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
        background-size: 1rem;
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
    code {
      font-size: 1rem;
      font-weight: 800;
      background: #1488cc; /* fallback for old browsers */
      background: ${(props) => `-webkit-linear-gradient(
        to right,
        ${props.theme.main.primary100},
        ${props.theme.main.secondary100}
      )`}; /* Chrome 10-25, Safari 5.1-6 */
      background: ${(props) => `linear-gradient(
        to right,
        ${props.theme.main.primary100},
        ${props.theme.main.secondary100}
      )`}; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      color: white;
      padding: 0.25rem;
    }
    pre {
      code {
        font-size: 1rem;
        padding: 8px 4px;
        ${(props) => props.theme.scroll.hiddenX};
        background: none;
        color: black;
      }
    }
  }
  .wmde-markdown {
    display: flex;
    flex-flow: nowrap column;
    line-height: 2rem;
    background: transparent;
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
  bottom: 0px;
  z-index: 1;
  position: sticky;
`;
