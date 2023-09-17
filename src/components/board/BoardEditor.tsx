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
import { store } from '../../../redux/store/index';
import theme from '@/styles/theme';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Input from '@/components/common/input/Input';
import { Button } from '@/components/common/button/Button';

interface IBoardEditorProps {
  edit?: boolean;
}

const BoardEditor = (props: IBoardEditorProps) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [areaTextContent, setAreaTextContent] = useState('');
  const editorRef = useRef<Editor>(null);
  const locationHref = window.location.pathname;
  const authStore = useSelector((state: RootState) => state.authStore);
  const [imgUrl, SetImgUrl] = useState('');

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
      .then(response => {
        router.push('/board');
      })
      .catch(error => {
        alert('에러가 발생하였습니다.');
      });
  };

  const updateHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const MarkdownContent = editorInstance?.getMarkdown();
    AxiosInstance({
      url: '/api/board',
      method: 'PUT',
      data: {
        id: Number(router.query?.id),
        title: title,
        content: MarkdownContent,
      },
    })
      .then(response => {
        // 그냥 글 리스트로 이동하는 것이 편해서 수정
        // router.push(boardUrlHref + "/" + router.query?.id);
      })
      .catch(error => {
        alert('에러가 발생하였습니다.');
      });
  };

  const uploadHandler = async (file: any) => {
    let formData = new FormData();
    formData.append('files', file);
    formData.append('directory', '/' + locationHref.split('/')[1]);
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
          setAreaTextContent(res.content);
          setTitle(res.title);
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
      {authStore.role && (
        <Container>
          <Title> 게시판 글 작성 </Title>
          <BoardTitle
            placeholder="게시판 제목을 입력해주세요."
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <Writer> 작성자 : {store.getState().authStore.nickname} </Writer>
          <EditorContainer>
            <Editor
              initialValue={areaTextContent}
              previewStyle="vertical"
              height="800px"
              initialEditType="markdown"
              useCommandShortcut={true}
              ref={editorRef}
              plugins={[codeSyntaxHighlight, colorSyntax]}
              // plugins={[[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax]}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const imageURL: any = await uploadHandler(blob);
                  callback(`${AWSS3Prefix}${imageURL[0]}`, '');
                  // "blog"+directory+"/"+fileName
                },
              }}
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
              onClick={() => (props.edit ? updateHandler() : submitHandler())}
            >
              {props.edit ? '수정' : '제출'}
            </Button>
            <Button width="100%" onClick={() => router.back()}>
              취소
            </Button>
          </EditorFooter>
        </Container>
      )}
    </>
  );
};

export default BoardEditor;
const Container = styled.section`
  position: relative;
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;

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
const Title = styled.h1`
  width: 100%;
  ${theme.flex.row.center.center};
  margin-bottom: 20px;
  border-radius: 8px;
`;
const BoardTitle = styled(Input)`
  width: 100%;
  height: 40px;
  font-size: 20px;
  border-radius: 10px 10px 0px 0px;
  font-family: ${theme.fontFamily.cookieRunRegular};
  font-size: ${theme.fontSizes.lg};
  padding: 0px 10px;
  border: none;
  background: white;
  outline: solid black 2px;
  z-index: 3;
`;
const Writer = styled.div`
  padding: 8px 0px 8px 10px;
  background: white;
  outline: solid black 2px;
`;
const EditorFooter = styled.div`
  margin-top: 5px;
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  position: sticky;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.5);
`;
const EditorContainer = styled.div`
  background-color: white;
  outline: solid black 2px;
  z-index: 2;
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
