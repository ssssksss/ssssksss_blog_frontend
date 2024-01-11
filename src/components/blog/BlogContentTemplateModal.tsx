import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
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
import { Editor, Viewer } from '@toast-ui/react-editor';
import { useReducer, useRef, useState } from 'react';
import { Button } from './../common/button/Button';
import { useSelector } from 'react-redux';
import { SET_BLOG_CONTENT_TEMPLATE_LIST } from '@/redux/store/blogContentTemplate';
import { useLoading } from '@/src/hooks/useLoading';
import { BlogAPI } from '@/api/BlogAPI';
import { store } from '@/redux/store';
import Select from '../common/select/Select';
import { SwapIcon } from '/public/img/ui-icon/ic-swap.svg';
import Image from 'next/image';
import { Icons } from '@/components/common/icons/Icons';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogContentTemplateModal.tsx
 * @version 0.0.1 "2023-10-30 15:22:50"
 * @description 설명
 */

interface IBlogContentTemplateModalProps {
  firstCategoryId: string;
  secondCategoryId: string;
  closeModal: () => void;
}

const BlogContentTemplateModal = (props: any) => {
  const selectRemoveRef = useRef<HTMLSelectElement>(null);
  const [isLoading, loadingFunction] = useLoading();
  const [mode, setMode] = useState(true);
  const [toggle, toggleHandler] = useReducer(prev => !prev, true);
  const [selectRemoveBlogContentTemplate, setSelectRemoveBlogContentTemplate] =
    useState('');
  const [areaTextContent, setAreaTextContent] = useState(
    '# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n# 📌 [] \n## 🔸 () \n'
  );
  const editorRef = useRef<Editor>(null);
  const blogContentTemplateStore = useSelector(
    (state: RootState) => state.blogContentTemplateStore
  );

  const changeRemoveBlogContentTemplate = () => {
    setSelectRemoveBlogContentTemplate(
      blogContentTemplateStore.blogContentTemplateList?.filter(
        i => i.id == selectRemoveRef.current?.value
      )[0]
    );
    toggleHandler();
  };

  const changeModeHandler = () => {
    setMode(prev => !prev);
    setSelectRemoveBlogContentTemplate(
      blogContentTemplateStore.blogContentTemplateList[0]
    );
    toggleHandler();
  };

  const removeBlogContentTemplateHandler = () => {
    BlogAPI.removeBlogContentTemplate({
      id: selectRemoveRef.current?.value,
    }).then(() => {
      let temp = blogContentTemplateStore.blogContentTemplateList.filter(
        i => i.id != selectRemoveRef.current?.value
      );
      store.dispatch(SET_BLOG_CONTENT_TEMPLATE_LIST(temp));
      setSelectRemoveBlogContentTemplate(temp[0]);
      toggleHandler();
    });
  };

  const addTemplateHandler = () => {
    const editorInstance = editorRef.current?.getInstance();
    const getContent_md = editorInstance?.getMarkdown();

    if (!props.firstCategoryId || !props.secondCategoryId) {
      alert('카테고리를 선택하고 오세요');
      return;
    }

    loadingFunction(
      BlogAPI.addBlogContentTemplate({
        secondCategoryId: props.secondCategoryId,
        content: getContent_md,
      })
    )
      .then(res => {
        store.dispatch(
          SET_BLOG_CONTENT_TEMPLATE_LIST([
            ...blogContentTemplateStore.blogContentTemplateList,
            res.data.blogContentTemplate,
          ])
        );
        props.closeModal();
      })
      .catch(err => {
        console.log('BlogContentTemplateModal.tsx 파일 : ', err);
      });
  };

  return (
    <Container>
      <Button onClickCapture={() => changeModeHandler()} w={'36px'} h={'36px'}>
        <Image src={Icons.SwapIcon} alt="" width={24} height={24} />
      </Button>
      {!mode && (
        <RemoveBlogContentTemplateContainer>
          <Title> 템플릿 삭제 화면 </Title>
          <BlogContentTemplateBox
            gap={28}
            pd={'8px'}
            outline={true}
            color={'primary80'}
            brR={'10px'}
          >
            <CC.ColumnDiv gap={28}>
              <Select
                ref={selectRemoveRef}
                outline={true}
                h={'40px'}
                color={'primary80'}
                onChange={() => changeRemoveBlogContentTemplate()}
              >
                {blogContentTemplateStore.blogContentTemplateList?.map(
                  (i, index) => (
                    <option key={index} value={i.id}>
                      {index}
                    </option>
                  )
                )}
              </Select>
              <Button
                w={'100%'}
                h={'40px'}
                outline={true}
                color={'primary80'}
                onClickCapture={() => removeBlogContentTemplateHandler()}
              >
                삭제
              </Button>
            </CC.ColumnDiv>
            <ViewerContainer>
              {toggle && (
                <Viewer
                  initialValue={selectRemoveBlogContentTemplate?.content}
                  theme="black"
                  ref={editorRef}
                />
              )}
              {!toggle && (
                <Viewer
                  initialValue={selectRemoveBlogContentTemplate?.content}
                  theme="black"
                  ref={editorRef}
                />
              )}
            </ViewerContainer>
          </BlogContentTemplateBox>
        </RemoveBlogContentTemplateContainer>
      )}
      {mode && (
        <>
          <EditorContainer>
            <Title> 템플릿 생성 화면 </Title>
            <Editor
              initialValue={areaTextContent}
              previewStyle="vertical"
              height="calc(100vh - 120px)"
              initialEditType="markdown"
              useCommandShortcut={true}
              ref={editorRef}
              plugins={[
                colorSyntax,
                [codeSyntaxHighlight, { highlighter: Prism }],
              ]}
              // onChange={() => {
              //   // ! TOAST UI에서 Preview 이미지가 사라지는 문제 떄문에 작성한 코드...
              //   let toastUIPreviewBlobImages = window.document.querySelectorAll(
              //     "img[src^='" + window.location.origin + "']"
              //   );
              //   toastUIPreviewBlobImages.forEach(i => {
              //     i.setAttribute('src', 'blob:' + i.src);
              //   });
              // }}
              hooks={
                {
                  // addImageBlobHook: async (blob, callback) => {
                  //   const imageURL: any = await uploadHandler(blob);
                  //   await callback(imageURL, '');
                  //   // "blog"+directory+"/"+fileName
                  // },
                }
              }
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
              h={'32px'}
              width="100%"
              outline={true}
              onClick={() => addTemplateHandler()}
            >
              템플릿 생성
            </Button>
            <Button
              h={'32px'}
              width="100%"
              outline={true}
              onClick={() => props.closeModal()}
            >
              취소
            </Button>
          </EditorFooter>
        </>
      )}
    </Container>
  );
};
export default BlogContentTemplateModal;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  max-height: calc(100vh - 6rem);
  gap: 16px;
  /* color: ${props => props.theme.colors.white80}; */
  font-size: 1.2rem;
  background: ${props => props.theme.main.contrast};
  /* max-width: 600px; */
`;

const RemoveBlogContentTemplateContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 200px;
`;

const Title = styled.h2``;

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.main.contrast};
  /* transform: scaleX(0.5); */

  .toastui-editor-main {
    border-top: solid transparent 4px;
    padding-top: 4px;
    padding-bottom: 8px;
    height: 100%;
  }

  .ProseMirror {
    width: 100%;
    text-align: start;
  }

  .toastui-editor-contents {
    width: 100%;
    text-align: start;
  }
`;

const EditorFooter = styled(CC.GridColumn2)`
  gap: 10px;
  position: sticky;
  padding: 4px 4px;
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
const BlogContentTemplateBox = styled(CC.ColumnDiv)`
  outline: solid ${props => props.theme.main.contrast} 4px;
  width: 300px;
  height: 100%;

  & > button:nth-of-type(1) {
    align-items: end;
  }
`;

const ViewerContainer = styled.div`
  .toastui-editor-black {
  }
  .toastui-editor-contents {
    transform: translate(0%, -25%) scale(0.5);
    text-align: left;
  }
`;
