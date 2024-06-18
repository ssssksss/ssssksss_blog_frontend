import { createBlogAPI, updateBlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import { Icons } from '@components/common/icons/Icons';
import { Editor } from '@components/editor/MDEditor';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import { CC } from '@styles/commonComponentStyle';
import StringFunction from '@utils/function/stringFunction';
import axios from 'axios';
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
  const [blogContentImageList, setBlogContentImageList] = useState([]);
  const [tempBlogImage, setTempBlogImage] = useState([]);
  const [value, setValue] = useState(props.content ?? "");
  const methods = useForm({
    resolver: yupResolver(props.edit ? BlogUpdateYup : BlogCreateYup),
    mode: 'onChange',
    defaultValues: {
      id: null,
      firstCategoryId: props.firstCategoryId,
      selectFirstCategoryName: props.blogFirstCategoryName,
      secondCategoryId: props.secondCategoryId,
      selectSecondCategoryName: props.blogSecondCategoryName,
      title: props.title || '',
      description: props.description || '',
      thumbnailImageFile: '',
      thumbnailImageUrl: props.thumbnailImageUrl,
      content: props.content,
      status: props.status,
      imageFileList: [],
      imageUrlList: [],
      deleteImageBucketDirectory: [],
    },
  });

    const editorChangeHandler = useCallback((value) => {
    setValue(value);
    methods.setValue('content', value, { shouldValidate: true });
  }, []);

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
    // setIsLoading(true);
    // store.dispatch(setIsLoading(true));
    const imageUrlList: string[] = [];
    const imageFileList: File[] = [];
    const deleteImageBucketDirectory: string[] = []; // edit에서 삭제에 필요한 이미지 s3 버킷 경로 수집

    // 미리보기 이미지에서 실제 이미지로 저장하기 위해서 이미지들의 경로를 탐색
    tempBlogImage.map((i) => {
      if (methods.getValues('content').search(i.url) != -1) {
        imageUrlList.push(i.url);
        imageFileList.push(i.file);
      }
      methods.setValue("imageFileList", imageFileList);
      methods.setValue('imageUrlList', imageUrlList, {shouldValidate: true});
    });

    // 이전 이미지에서 삭제할 이미지가 있나 탐색
    if (props.edit) {
      blogContentImageList?.map((i) => {
        if (methods.getValues('content').search(i) === -1) {
          deleteImageBucketDirectory.push(i);
        }
      });
      methods.setValue('deleteImageBucketDirectory', deleteImageBucketDirectory, {shouldValidate: true});
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

    // 블로그 수정 API
    if (props.edit) {
      methods.setValue('id', router.query.id);
      const temp = store
        .getState()
        .blogStore.blogCategoryList?.filter(
          (i: { id: number }) => i.id == methods.getValues('firstCategoryId'),
        )[0]
        .blogSecondCategoryList.filter(
          (j: { id: number }) => j.id == methods.getValues('secondCategoryId'),
      )[0]?.thumbnailImageUrl;
      let _temp_image_url = "";
      // ? 대표 이미지 URL이 현재 선택한 2번째 카테고리 이미지 URL과 같다면 null로 변경
      if (methods.getValues('thumbnailImageUrl') == temp) {
        _temp_image_url = temp;
        methods.setValue('thumbnailImageUrl', null, { shouldValidate: true });
      }

      updateBlogAPI(
        Object.entries(methods.getValues()).map((i) => {
          return {
            key: i[0],
            value: i[1],
          };
        }),
      )
        .then(async () => {
          store.dispatch(
            rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
              type: 'success',
              message: '블로그가 수정되었습니다.',
            }),
          );
          const getData = async () => {
            await axios
              .get(
                process.env.NODE_ENV === 'development'
                  ? 'http://localhost:3000'
                  : 'https://blog.ssssksss.xyz' +
                      `/api/revalidate?id=${router.query.id}`,
              )
              .then(() => {})
              .catch(() => {});
          };
          getData();
          router.back();
        })
        .catch((err) => {
        methods.setValue('thumbnailImageUrl', _temp_image_url, {
          shouldValidate: true,
        });
          store.dispatch(
            rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
              type: 'error',
              message: err.response?.message,
            }),
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // 블로그 생성 API
    if (!props.edit) {
      createBlogAPI(
        Object.entries(methods.getValues()).map((i) => {
          return {
            key: i[0],
            value: i[1],
          };
        }),
      )
        .then((res) => {
          store.dispatch(
            rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
              type: 'success',
              message: '블로그가 생성되었습니다.',
            }),
          );
          router.replace(`/blog/${res.data.data?.id}`);
        })
        .catch((err) => {
          store.dispatch(
            rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
              type: 'error',
              message: err.response?.message,
            }),
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const onPasteHandler = async (event: ClipboardEvent<HTMLDivElement>) => {
    // const target = document.querySelector('.w-md-editor-text-input');
    // if (target == undefined) return;
    const item = event.clipboardData.items[0];
    if (item.type.indexOf('image') === 0) {
      const blob = item.getAsFile();
      const _url = await uploadHandler(blob);
      const _text = '![image](blob:' + _url + ')';
      editorChangeHandler(
        value.substring(0, textareaRef.current?.selectionStart) +
          _text +
          value.substring(textareaRef.current?.selectionStart , value.length),
      );
      setCursor(textareaRef.current?.selectionStart  + _text.length);
    } else {
      // 이미지가 아닐 경우 text로 처리
      const paste = event.clipboardData.getData('text');
      editorChangeHandler(
        value.substring(0, textareaRef.current?.selectionStart ) +
          paste +
          value.substring(textareaRef.current?.selectionStart , value.length),
      );
    }
    event.preventDefault();
  };

  useEffect(() => {
    textareaRef.current?.setSelectionRange(cursor, cursor);
  }, [cursor]);

  useEffect(() => {
    methods.setValue('thumbnailImageUrl', props.thumbnailImageUrl);
    
    if (props.edit) {
    const regex =
      /https:\/\/ssssksssblogbucket\.s3\.ap-northeast-2\.amazonaws\.com\/([^\s]+?\.(webp|svg|jpg|gif|png|jpeg))/g;
    let matches;
    const parts = [];
    while ((matches = regex.exec(props.content)) !== null) {
      parts.push(matches[1]);
      }
      setBlogContentImageList(parts);
    }

  }, []);

  useEffect(() => {
    setTimeout(() => {
      textareaRef.current = window.document.querySelector(
        '.w-md-editor-text-input',
      );
    }, 500);
  },[])

  useEffect(() => {
    if (!props.edit) return;
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
      {/* {isLoading && <LoadingComponent />} */}
      {store.getState().authStore.role === 'ROLE_ADMIN' && (
        <Container
          isLoading={isLoading}
          icon={Icons.PlayIcon}
          h={'100%'}
          isDragging={isDragging}
        >
          <CreateUpdateHeaderContainer edit={props.edit} {...props} />
          {/* <CreateUpdateBlogTemplateContainer /> */}
          <EditorContainer id={'editor-container'} isDragging={isDragging}>
            <Editor
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
              height={'100%'}
              value={value}
              onChange={editorChangeHandler}
              highlightEnable={false}
              visibleDragbar={false}
              onPaste={onPasteHandler}
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
              onClick={() => {
                router.back();
              }}
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

    ol, li {
      padding-inline-start: 0.5rem;
    }
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
