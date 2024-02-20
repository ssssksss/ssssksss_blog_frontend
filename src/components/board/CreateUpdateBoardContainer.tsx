import { BoardAPI } from '@/api/BoardAPI';
import Button from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';
import { LoadingComponent } from '@/components/common/loading/LoadingComponent';
import { useLoading } from '@/hooks/useLoading';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import { commonTheme } from '@/styles/theme';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import 'tui-color-picker/dist/tui-color-picker.css';
import { BoardCreateYup, BoardUpdateYup } from '../yup/BoardYup';

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
  const editorRef = useRef<Editor>(null);
  const locationHref = window.location.pathname;
  const postUrlHref =
    '/blog/' + locationHref.split('/')[2] + '/' + locationHref.split('/')[3];
  const authStore = useSelector((state: RootState) => state.authStore);
  const [isLoading, loadingFunction] = useLoading();
  const createBoardMutation = BoardAPI.createBoard();
  const updateBoardMutation = BoardAPI.updateBoard();
  const boardResData = BoardAPI.getBoard({
    id: router.query.id,
    onSuccessHandler: res => {
      methods.setValue('title', res.data.json?.board.title);
      methods.setValue('content', res.data.json?.board.content, {
        shouldValidate: true,
      });
      methods.trigger('title');
    },
    enabled: props.edit,
  });
  const methods = useForm({
    resolver: yupResolver(props.edit ? BoardUpdateYup : BoardCreateYup),
    mode: 'onChange',
    defaultValues: {
      title: '',
      content: '# \n ##  \n',
    },
  });

  const submitHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();

    createBoardMutation({
      title: methods.getValues('title'),
      content: getContent_md,
      writer: authStore.nickname,
    });
  };

  const updateHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();
    updateBoardMutation({
      id: router.query.id,
      title: methods.getValues('title'),
      content: getContent_md,
    });
  };

  return (
    <>
      {(authStore.role === 'ROLE_ADMIN' || authStore.role === 'ROLE_USER') && (
        <>
          {isLoading ? (
            <LoadingComponent mode={'board'}> 로딩중 </LoadingComponent>
          ) : (
            <Container gap={4}>
              {(!props.edit || boardResData?.status == 'success') && (
                <Title
                  placeholder="제목을 입력해주세요"
                  defaultValue={methods.getValues('title')}
                  register={methods.register('title')}
                  onChange={e => {
                    setTitle(e.target.value);
                  }}
                />
              )}
              <EditorContainer>
                {(!props.edit || boardResData?.status == 'success') && (
                  <Editor
                    initialValue={boardResData?.data?.json?.board.content}
                    previewStyle={'tab'}
                    height={'calc(100vh - 182px)'}
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    ref={editorRef}
                    plugins={[
                      colorSyntax,
                      [codeSyntaxHighlight, { highlighter: Prism }],
                    ]}
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
                )}
              </EditorContainer>
              <EditorFooter>
                <Button
                  w={'100%'}
                  outline={true}
                  onClick={() =>
                    props.edit ? updateHandler() : submitHandler()
                  }
                >
                  {props.edit ? '수정' : '제출'}
                </Button>
                <Button w={'100%'} outline={true} onClick={() => router.back()}>
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
  height: 48px;
  font-family: ${props => props.theme.fontFamily.cookieRunRegular};
  color: ${props => props.theme.colors.black80};
  padding: 16px;
  z-index: 3;
  border: none;
  font-size: 1.6rem;
  border-radius: 0px;
  border-bottom: 2px solid ${props => props.theme.colors.black40};
  &::placeholder {
    font-size: 1.6rem;
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
      transform: scale(1.2);
      background: ${props => props.theme.main.primary80};
      color: ${props => props.theme.main.contrast};
    }
  }
`;
