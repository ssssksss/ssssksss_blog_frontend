import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { Editor } from '@toast-ui/react-editor';
import { useSelector } from 'react-redux';
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

interface ICUEditorProps {
  edit?: boolean;
}

const CUEditor = (props: ICUEditorProps) => {
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

  const submitHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    AxiosInstance({
      url: '/api/post',
      method: 'POST',
      data: {
        title: title,
        description: description,
        content: getContent_md,
        secondHref: postUrlHref.split('/blog')[1],
        nickname: store.getState().authStore.nickname,
      },
    })
      .then(response => {
        router.push(postUrlHref);
      })
      .catch(error => {
        alert('에러가 발생하였습니다.');
      });
  };

  const updateHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const MarkdownContent = editorInstance?.getMarkdown();
    AxiosInstance({
      url: '/api/post',
      method: 'PUT',
      data: {
        id: Number(router.query?.id),
        title: title,
        description: description,
        content: MarkdownContent,
        secondHref: postUrlHref.split('/blog')[1],
      },
    })
      .then(response => {
        // 그냥 글 리스트로 이동하는 것이 편해서 수정
        // router.push(postUrlHref + "/" + router.query?.id);
        router.push(postUrlHref);
      })
      .catch(error => {
        alert('에러가 발생하였습니다.');
      });
  };

  const uploadHandler = async (file: any) => {
    let formData = new FormData();
    formData.append('files', file);
    formData.append('directory', '/' + locationHref.split('/')[2]);
    let temp;
    await AxiosInstance({
      url: '/s3/image',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
      data: formData,
      withCredentials: true,
    })
      .then(response => {
        temp = response.data;
      })
      .catch(error => {
        console.log('index.tsx : ', error.response);
      });
    return temp;
  };

  useEffect(() => {
    if (props.edit) {
      AxiosInstance({
        url: '/api/post',
        method: 'GET',
        params: {
          firstHref: router.asPath.split('/')[2],
          secondHref: router.asPath.split('/')[3],
          id: router.query?.id,
        },
      })
        .then(response => {
          let res = response.data.data.post;
          console.log('CUEditor.tsx 파일 : ', res.content);
          setAreaTextContent(res.content);
          setTitle(res.title);
          setDescription(res.description);
          const editorInstance = editorRef.current?.getInstance();
          editorInstance?.setMarkdown(res.content);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      {authStore.role === 'ROLE_ADMIN' && (
        <Container>
          <Title
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
              height="800px"
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
              status="green"
              onClick={() => (props.edit ? updateHandler() : submitHandler())}
            >
              {props.edit ? '수정' : '제출'}
            </Button>
            <Button
              width="100%"
              status="lightred"
              onClick={() => router.back()}
            >
              취소
            </Button>
          </EditorFooter>
        </Container>
      )}
    </>
  );
};

export default CUEditor;
const Container = styled.section`
  position: relative;
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;
  /* background: ${theme.backgroundColors.background2}; */

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

const Title = styled.input`
  width: 100%;
  height: 40px;
  font-size: 20px;
  color: white;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  background: ${theme.backgroundColors.green};
  font-family: ${theme.fontFamily.cookieRunRegular};
  font-size: ${theme.fontSizes.lg};
  padding: 0px 10px;
  z-index: 2;
  border: none;

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

  &::placeholder {
    color: black;
  }
`;
const EditorContainer = styled.div`
  background-color: white;
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
const EditorFooter = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  position: sticky;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.5);
`;
