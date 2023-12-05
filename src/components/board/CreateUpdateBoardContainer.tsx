import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { Editor } from '@toast-ui/react-editor';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { store } from '@/redux/store';
import Button from '@/components/common/button/Button';
import { commonTheme } from '@/styles/theme';
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
import { AWSS3Prefix } from '@/utils/variables/url';
import { Input } from '@/components/common/input/Input';
import { CC } from '@/styles/commonComponentStyle';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import useLoading from '@/src/hooks/useLoading';
import { LoadingComponent } from '@/components/common/loading/LoadingComponent';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateUpdateBoardContainer.tsx
 * @version 0.0.1 "2023-10-14 00:59:02"
 * @description 설명
 */

interface IEditCreateUpdateBoardContainerProps {
  edit?: boolean;
}

const CreateUpdateBoardContainer = (
  props: IEditCreateUpdateBoardContainerProps
) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [areaTextContent, setAreaTextContent] = useState(
    '# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n'
  );
  const editorRef = useRef<Editor>(null);
  const locationHref = window.location.pathname;
  const postUrlHref =
    '/blog/' + locationHref.split('/')[2] + '/' + locationHref.split('/')[3];
  const authStore = useSelector((state: RootState) => state.authStore);
  const [isLoading, loadingFunction] = useLoading();

  const submitHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    AxiosInstance({
      url: '/api/board',
      method: 'POST',
      data: {
        title: title,
        content: getContent_md,
        writer: authStore.nickname,
      },
    })
      .then(res => {
        router.replace(`/board/${res.data.data.id}`);
      })
      .catch(error => {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: 'error',
            message: '에러 발생',
          })
        );
      });
  };

  const updateHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    let message = '';
    let type = 'success';
    AxiosInstance({
      url: '/api/board',
      method: 'PUT',
      data: {
        id: Number(router.query?.id),
        title: title,
        content: getContent_md,
      },
    })
      .then(response => {
        message = '게시글이 수정되었습니다.';
        router.back();
      })
      .catch(error => {
        message = '수정 중 에러발생';
        type = 'error';
      })
      .finally(() => {
        store.dispatch(
          SET_TOASTIFY_MESSAGE({
            type: type,
            message: message,
          })
        );
      });
  };

  const uploadHandler = async (file: any) => {
    // let formData = new FormData();
    // formData.append('files', file);
    // formData.append('directory', '/' + locationHref.split('/')[2]);
    // let temp;
    // await AxiosInstance({
    //   url: '/s3/image',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   data: formData,
    //   withCredentials: true,
    // })
    //   .then(response => {
    //     temp = response.data;
    //   })
    //   .catch(error => {
    //     console.log('index.tsx : ', error.response);
    //   });
    // return temp;
  };

  useEffect(() => {
    if (props.edit) {
      const temp = AxiosInstance({
        url: '/api/board',
        method: 'GET',
        params: {
          id: router.query.id,
        },
      })
        .then(res => {
          const viewerInstance = editorRef.current?.getInstance();
          viewerInstance?.setMarkdown(res.data.data.board.content);
          setTitle(res.data.data.board.title);
        })
        .catch(error => {
          store.dispatch(
            SET_TOASTIFY_MESSAGE({
              type: 'error',
              message: '정보들 받아오지 못했습니다.',
            })
          );
          router.back();
        });
      loadingFunction(temp);
    }
  }, []);

  return (
    <>
      {authStore.role === 'ROLE_ADMIN' && (
        <>
          {isLoading ? (
            <LoadingComponent mode={'board'}> 로딩중 </LoadingComponent>
          ) : (
            <Container gap={4}>
              <Title
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
              <EditorContainer>
                <Editor
                  initialValue={areaTextContent}
                  previewStyle="tab"
                  height="calc(100vh - 182px)"
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
                      callback(`${AWSS3Prefix}${imageURL[0]}`, '');
                      // "blog"+directory+"/"+fileName
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
                  width="100%"
                  outline={true}
                  onClick={() =>
                    props.edit ? updateHandler() : submitHandler()
                  }
                >
                  {props.edit ? '수정' : '제출'}
                </Button>
                <Button
                  width="100%"
                  outline={true}
                  onClick={() => router.back()}
                >
                  취소
                </Button>
              </EditorFooter>
            </Container>
          )}
        </>
      )}
    </>
  );
};
export default CreateUpdateBoardContainer;

const Container = styled.section`
  position: relative;
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;
  background-color: white;
  border-radius: 0px 0px 10px 10px;
  /* background: ${commonTheme.backgroundColors.background2}; */
  .toastui-editor-toolbar {
    position: sticky;
    top: 80px;
    z-index: 1;
  }
  .toastui-editor-main {
    border-top: solid transparent 4px;
    padding-top: 4px;
  }
`;

const Title = styled(Input)`
  width: 100%;
  height: 60px;
  font-family: ${props => props.theme.fontFamily.cookieRunRegular};
  color: ${props => props.theme.colors.black80};
  padding: 0px 10px;
  z-index: 3;
  border: none;
  font-size: 2rem;
  border-radius: 0px;
  border-bottom: 2px solid ${props => props.theme.colors.black40};

  &::placeholder {
    font-size: 2rem;
    color: ${props => props.theme.colors.black40};
  }
`;
const Description = styled(Input)`
  width: 100%;
  height: 40px;
  font-family: ${props => props.theme.fontFamily.cookieRunRegular};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.black80};
  padding: 0px 10px;
  border: none;
  border-radius: 0px;
  z-index: 2;

  &::placeholder {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.black40};
  }
`;
const EditorContainer = styled.div`
  padding-bottom: 8px;
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
    bottom: 80px;
  }
`;
const EditorFooter = styled(CC.GridColumn2)`
  height: 40px;
  gap: 10px;
  position: sticky;
  padding: 0px 4px;
  bottom: 8px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.5);
  button {
    color: ${props => props.theme.main.primary80};
    &:hover {
      transform: scale(1.02);
      background: ${props => props.theme.main.primary80};
      color: ${props => props.theme.main.contrast};
    }
  }
`;
