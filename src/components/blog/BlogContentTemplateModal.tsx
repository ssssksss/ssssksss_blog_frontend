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

const BlogContentTemplateModal = (props: unknown) => {
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
      const temp = blogContentTemplateStore.blogContentTemplateList.filter(
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
      <Button
        onClickCapture={() => changeModeHandler()}
        w={'3.6rem'}
        h={'3.6rem'}
      >
        <Image src={Icons.SwapIcon} alt="" width={24} height={24} />
      </Button>
      {!mode && (
        <RemoveBlogContentTemplateContainer>
          <Title> 템플릿 삭제 화면 </Title>
          <BlogContentTemplateBox
            gap={28}
            pd={'0.8rem'}
            outline={true}
            color={'primary80'}
            brR={'1rem'}
          >
            <CC.ColumnDiv gap={28}>
              <Select
                ref={selectRemoveRef}
                outline={true}
                h={'4rem'}
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
                h={'4rem'}
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
              h={'3.2rem'}
              width="100%"
              outline={true}
              onClick={() => addTemplateHandler()}
            >
              템플릿 생성
            </Button>
            <Button
              h={'3.2rem'}
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
  gap: 1.6rem;
  background: ${(props) => props.theme.main.contrast};
`;

const RemoveBlogContentTemplateContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 20rem;
  min-height: 20rem;
`;

const Title = styled.h2``;

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.main.contrast};
  /* transform: scaleX(0.5); */
`;

const EditorFooter = styled(CC.GridColumn2)`
  gap: 1rem;
  position: sticky;
  padding: 0.4rem 0.4rem;
  bottom: 0.8rem;
  margin-bottom: 0.8rem;
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
  outline: solid ${(props) => props.theme.main.contrast} 0.4rem;
  width: 30rem;
  height: 100%;

  & > button:nth-of-type(1) {
    align-items: end;
  }
`;

const ViewerContainer = styled.div``;
