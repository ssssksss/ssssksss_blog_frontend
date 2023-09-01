import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { Editor } from '@toast-ui/react-editor';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { AWSS3Prefix } from '@/components/common/variables/url';
import { store } from '@/redux/store';
import Button from '@/components/common/button/Button';
import theme from '@/styles/theme';
import chart from '@toast-ui/editor-plugin-chart';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import { Document } from 'next/document';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogItemEditor.tsx
 * @version 0.0.1 "2023-06-20 08:43:52"
 * @description 설명
 */

const blogContentForm = [
  "# <span style='color: #f91600'>[] 제목</span> \n" +
    "## <span style='color: #f99700'>{1} 설명</span> \n" +
    "## <span style='color: #f99700'>{2} 예시</span> \n" +
    "### <span style='color: #1200ff'>ex1)</span> \n" +
    "#### <span style='color: #cb00ff'>결과</span> \n" +
    "### <span style='color: #1200ff'>ex2)</span> \n" +
    "#### <span style='color: #cb00ff'>결과</span> \n" +
    '---',
  "# <span style='color: #f91600'>[] 제목</span> \n" +
    "## <span style='color: #f99700'>{1} 설명</span> \n" +
    "## <span style='color: #f99700'>{2} 문법</span> \n" +
    "## <span style='color: #f99700'>{3} 예시</span> \n" +
    "### <span style='color: #1200ff'>ex1)</span> \n" +
    "#### <span style='color: #cb00ff'>결과</span> \n" +
    "### <span style='color: #1200ff'>ex2)</span> \n" +
    "#### <span style='color: #cb00ff'>결과</span> \n" +
    '---',
  '| 속성 | 설명 |  \n' +
    '| --- | --- | \n' +
    '|  |  | \n' +
    '|  |  | \n' +
    '|  |  | \n' +
    '|  |  | \n',
  '| 속성 | 사용 | 설명  | \n' +
    '| --- | --- | --- | \n' +
    '|  |  |  | \n' +
    '|  |  |  | \n' +
    '|  |  |  | \n' +
    '|  |  |  | ',
];

const BlogItemEditor = props => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tempBlogImage, setTempBlogImage] = useState([]);
  const [areaTextContent, setAreaTextContent] = useState(blogContentForm[0]);
  const [blogImages, setBlogImages] = useState([]);
  const editorRef = useRef<Editor>(null);
  const locationHref = window.location.pathname;
  const blogUrl =
    '/blog/' + locationHref.split('/')[2] + '/' + locationHref.split('/')[3];
  const authStore = useSelector((state: RootState) => state.authStore);
  const themeStore = useSelector((state: RootState) => state.themeStore);
  const categoryStore = useSelector((state: RootState) => state.categoryStore);

  const submitHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    let getContent_md = editorInstance?.getMarkdown();
    let tempUrls = [];
    let tempFiles = [];
    // 1. 저장되는 내용에 이미지 url이 있는지 확인
    let formData = new FormData();

    // 최종적으로 서버에 올리는 이미지들이 블로그 글에 있는지 확인해서 남아있는 이미지들만 저장
    tempBlogImage.map(i => {
      if (getContent_md.search(i.url) !== -1) {
        tempUrls.push(i.url);
        tempFiles.push(i.file);
        // 이 배열을 서버에 보내서 이미지로 저장을 하고 저장한 후에 이미지 url들을 받아서
        // 기존 url과 바꾸어준다.
        formData.append('imageFiles', i.file);
        formData.append('imageUrls', i.url);
      }
    });

    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', getContent_md);
    formData.append('firstCategory', categoryStore.firstCategory);
    formData.append('secondCategory', categoryStore.secondCategory);

    AxiosInstance({
      url: '/api/blog-item',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      data: formData,
      withCredentials: true,
    })
      .then(async response => {
        router.push(blogUrl);
      })
      .catch(error => {
        console.log('BlogItemEditor.tsx 파일 : 실패');
        console.log('BlogItemEditor.tsx 파일 : ', error.data);
        // store.dispatch(
        //   SET_TOASTIFY_MESSAGE({
        //     type: "error",
        //     message: error..data.msg,
        //   })
        // );
      });
  };

  const updateHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    let getContent_md = editorInstance?.getMarkdown();
    // 1. 저장되는 내용에 이미지 url이 있는지 확인
    let formData = new FormData();

    // 최종적으로 서버에 올리는 이미지들이 블로그 글에 있는지 확인해서 남아있는 이미지들만 저장
    tempBlogImage.map(i => {
      if (getContent_md.search(i.url) !== -1) {
        // 이 배열을 서버에 보내서 이미지로 저장을 하고 저장한 후에 이미지 url들을 받아서
        // 기존 url과 바꾸어준다.
        // getContent_md = getContent_md.replace(i.url, "여기는 바꿔야할 문자열");
        formData.append('imageFiles', i.file);
        formData.append('imageUrls', i.url);
      }
    });

    // 기존 이미지들 중에서 삭제할 이미지 경로들을 모아서 서버에 전송하여 서버에서 제거
    blogImages.map(i => {
      if (getContent_md.search(i) === -1) {
        formData.append('removeImageBucketDirectory', i);
      }
    });

    formData.append('id', router.query?.id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', getContent_md);
    formData.append('firstCategory', categoryStore.firstCategory);
    formData.append('secondCategory', categoryStore.secondCategory);

    AxiosInstance({
      url: '/api/blog-item',
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      data: formData,
      withCredentials: true,
    })
      .then(async response => {
        router.push(blogUrl);
      })
      .catch(error => {
        console.log('BlogItemEditor.tsx 파일 : 실패');
        console.log('BlogItemEditor.tsx 파일 : ', error.response);
        // store.dispatch(
        //   SET_TOASTIFY_MESSAGE({
        //     type: "error",
        //     message: error.data.msg,
        //   })
        // );
      });
  };

  const uploadHandler = async (file: any) => {
    const url = URL.createObjectURL(file).substring(5);
    setTempBlogImage(prev => [...prev, { url, file }]);
    return url;
  };

  useEffect(() => {
    if (props.edit) {
      AxiosInstance({
        url: '/api/blog-item',
        method: 'GET',
        params: {
          id: router.query?.id,
        },
      })
        .then(response => {
          let res = response.data.data.blogItem;
          setAreaTextContent(res.content);
          setTitle(res.title);
          setDescription(res.description);
          const editorInstance = editorRef.current?.getInstance();
          editorInstance?.setMarkdown(res.content);

          // 불러오는 블로그 글에 있는 이미지들의 s3 버킷 디렉토리와 파일명을 저장
          // 이후에 글을 수정하여 api를 전송하면 이 이미지들을 참고하여 필요없어진 이미지들을 삭제하는 명령도 같이 보냄
          let temp = [];
          let index2 = 0;
          while (1) {
            let index1 = res.content.indexOf(AWSS3Prefix, index2);
            if (index1 === -1) break;
            index2 = res.content.indexOf('.', index1 + AWSS3Prefix.length);
            temp.push(
              res.content.substring(index1 + AWSS3Prefix.length, index2 + 4)
            );
          }
          setBlogImages(temp);
        })
        .catch(error => {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: 'error',
              message: error.response.data.msg,
            })
          );
        });
    }

    // toast UI 에서 blob 형태로 이미지를 넣게 되면 preview에서 경로를 인식하지 못해 이미지가 나타나지 않는다.
    // 그래서 preview를 볼 경우 blog 객체 이미지들의 경로 앞에 blob:를 붙여서 보게한다.
    document
      .querySelector('div[aria-label=Preview]')
      .addEventListener('click', () => {
        let toastUIPreviewBlobImages = window.document.querySelectorAll(
          "img[src^='" + window.location.origin + "']"
        );
        toastUIPreviewBlobImages.forEach(i => {
          i.setAttribute('src', 'blob:' + i.src);
        });
      });
  }, []);

  return (
    <>
      {authStore.role === 'ROLE_ADMIN' && (
        <Container>
          <Title
            themeStore={themeStore}
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <Description
            placeholder="간략한 설명을 입력해주세요"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
          <EditorContainer>
            <Editor
              initialValue={areaTextContent}
              previewStyle="tab"
              height={`calc(100vh - 180px)`}
              initialEditType="markdown"
              useCommandShortcut={true}
              ref={editorRef}
              plugins={[
                colorSyntax,
                [codeSyntaxHighlight, { highlighter: Prism }],
              ]}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const imageURL: any = await uploadHandler(blob);
                  await callback(imageURL, ''); // 우측에는 이미지 이름인데 비워두면 된다.
                },
              }}
              viewer={true}
              // language="ko-KR"
              toolbarItems={[
                // 툴바 옵션 설정
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'image', 'link'],
                ['code', 'codeblock'],
              ]}
            />
          </EditorContainer>
          <EditorFooter>
            <Button
              color="green"
              onClick={() => (props.edit ? updateHandler() : submitHandler())}
            >
              {props.edit ? '수정' : '제출'}
            </Button>
            <Button color="red" onClick={() => router.back()}>
              취소
            </Button>
          </EditorFooter>
          <BlogItemContentFormContainer>
            <BlogItemContentFormButton
              theme={themeStore}
              onClick={() => {
                navigator.clipboard.writeText(blogContentForm[0]);
                store.dispatch(
                  SET_TOASTIFY_MESSAGE({
                    type: 'success',
                    message: '폼1이 복사되었습니다.',
                  })
                );
              }}
            >
              폼1
            </BlogItemContentFormButton>
            <BlogItemContentFormButton
              theme={themeStore}
              onClick={() => {
                navigator.clipboard.writeText(blogContentForm[1]);
                store.dispatch(
                  SET_TOASTIFY_MESSAGE({
                    type: 'success',
                    message: '폼2이 복사되었습니다.',
                  })
                );
              }}
            >
              폼2
            </BlogItemContentFormButton>
            <BlogItemContentFormButton
              theme={themeStore}
              onClick={() => {
                navigator.clipboard.writeText(blogContentForm[2]);
                store.dispatch(
                  SET_TOASTIFY_MESSAGE({
                    type: 'success',
                    message: '테이블1 이 복사되었습니다.',
                  })
                );
              }}
            >
              테1
            </BlogItemContentFormButton>
            <BlogItemContentFormButton
              theme={themeStore}
              onClick={() => {
                navigator.clipboard.writeText(blogContentForm[3]);
                store.dispatch(
                  SET_TOASTIFY_MESSAGE({
                    type: 'success',
                    message: '테이블2 이 복사되었습니다.',
                  })
                );
              }}
            >
              테2
            </BlogItemContentFormButton>
          </BlogItemContentFormContainer>
        </Container>
      )}
    </>
  );
};
export default BlogItemEditor;

const Container = styled.section`
  position: relative;
  display: flex;
  flex-flow: nowrap column;
  background: white;
  .toastui-editor-toolbar {
    position: sticky;
    top: 40px;
    z-index: 1;
  }
  .toastui-editor-main {
    border-top: solid transparent 4px;
    padding-top: 4px;
  }
`;

const Title = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  /* ${themeStore.menuBackground} 이렇게 하면 무한로딩이 된다 왜 그런지 이유를
  나중에 알아보기 */
  background: ${props => props.themeStore.menuBackground};
  font-family: ${theme.fontFamily.cookieRunRegular};
  font-size: ${theme.fontSizes.lg};
  padding: 0px 10px;
  border: none;
  z-index: 2;

  &::placeholder {
    color: white;
  }
`;
const Description = styled.input`
  width: 100%;
  height: 30px;
  text-align: center;
  color: black;
  font-family: ${theme.fontFamily.cookieRunRegular};
  font-size: ${theme.fontSizes.md};
  z-index: 2;
  padding: 0px 10px;
  border: none;
  background-color: rgba(200, 200, 200, 0.5);

  &::placeholder {
    color: black;
  }
`;
const EditorContainer = styled.div`
  height: calc(100vh - 200px);
  background: #fefefe;
  &::before {
    content: '';
    background-size: 100%;
    background-image: url('/img/backgroundImage/원피스.jpg');
    /* background-repeat: repeat-x; */
    background-position: right bottom;
    opacity: 0.1;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
`;
const EditorFooter = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  bottom: 10px;
  background: rgba(255, 255, 255, 0.5);
  margin-top: 20px;
  z-index: 2;
`;

const BlogItemContentFormContainer = styled.section`
  right: 0px;
  top: 200px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
  position: fixed;
  display: flex;
  flex-flow: nowrap column;
  padding: 4px;
  background: #eaeaea;
  gap: 2px;
`;

const BlogItemContentFormButton = styled.button`
  padding: 2px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px,
    rgba(0, 0, 0, 0.3) 0px 7px 6px -3px;
  border-radius: 4px;
`;
