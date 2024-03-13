import { BlogAPI } from '@api/BlogAPI';
import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { SET_BLOG_CONTENT_TEMPLATE_LIST } from '@redux/store/blogContentTemplate';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { useReducer, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from '../common/select/Select';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogContentTemplateModal.tsx
 * @version 0.0.1 "2023-10-30 15:22:50"
 * @description 설명
 */

const BlogContentTemplateModal = (props: any) => {
  const selectRemoveRef = useRef<HTMLSelectElement>(null);
  const [mode, setMode] = useState(true);
  const [, toggleHandler] = useReducer((prev) => !prev, true);
  const [, setSelectRemoveBlogContentTemplate] = useState('');
  const blogContentTemplateStore = useSelector(
    (state: RootState) => state.blogContentTemplateStore,
  );

  const changeRemoveBlogContentTemplate = () => {
    setSelectRemoveBlogContentTemplate(
      blogContentTemplateStore.blogContentTemplateList?.filter(
        (i) => i.id == selectRemoveRef.current?.value,
      )[0],
    );
    toggleHandler();
  };

  const changeModeHandler = () => {
    setMode((prev) => !prev);
    setSelectRemoveBlogContentTemplate(
      blogContentTemplateStore.blogContentTemplateList[0],
    );
    toggleHandler();
  };

  const removeBlogContentTemplateHandler = () => {
    BlogAPI.removeBlogContentTemplate({
      id: selectRemoveRef.current?.value,
    }).then(() => {
      let temp = blogContentTemplateStore.blogContentTemplateList.filter(
        (i) => i.id != selectRemoveRef.current?.value,
      );
      store.dispatch(SET_BLOG_CONTENT_TEMPLATE_LIST(temp));
      setSelectRemoveBlogContentTemplate(temp[0]);
      toggleHandler();
    });
  };

  const addTemplateHandler = () => {
    if (!props.firstCategoryId || !props.secondCategoryId) {
      alert('카테고리를 선택하고 오세요');
      return;
    }

    BlogAPI.addBlogContentTemplate({
      secondCategoryId: props.secondCategoryId,
      content: '',
    }).then((res) => {
      store.dispatch(
        SET_BLOG_CONTENT_TEMPLATE_LIST([
          ...blogContentTemplateStore.blogContentTemplateList,
          res.data.blogContentTemplate,
        ]),
      );
      props.closeModal();
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
                  ),
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
            <ViewerContainer></ViewerContainer>
          </BlogContentTemplateBox>
        </RemoveBlogContentTemplateContainer>
      )}
      {mode && (
        <>
          <EditorContainer>
            <Title> 템플릿 생성 화면 </Title>
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
  /* color: ${(props) => props.theme.colors.white80}; */
  font-size: 1.2rem;
  background: ${(props) => props.theme.main.contrast};
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
  background: ${(props) => props.theme.main.contrast};
  /* transform: scaleX(0.5); */
`;

const EditorFooter = styled(CC.GridColumn2)`
  gap: 10px;
  position: sticky;
  padding: 4px 4px;
  bottom: 8px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.5);
  button {
    color: ${(props) => props.theme.main.primary80};
    &:hover {
      transform: scale(1.02);
      background: ${(props) => props.theme.main.primary80};
      color: ${(props) => props.theme.main.contrast};
    }
  }
`;
const BlogContentTemplateBox = styled(CC.ColumnDiv)`
  outline: solid ${(props) => props.theme.main.contrast} 4px;
  width: 300px;
  height: 100%;

  & > button:nth-of-type(1) {
    align-items: end;
  }
`;

const ViewerContainer = styled.div``;
