import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import React from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateUpdateBlogTemplateContainer.tsx
 * @version 0.0.1 "2024-03-20 00:34:13"
 * @description 설명
 */
const CreateUpdateBlogTemplateContainer = () => {
  return (
    <Container>
      <ContentTemplateItem
        onClick={() => {
          navigator.clipboard.writeText(
            `| 속성 | 사용 | \n | --- | --- | \n |  |  | \n |  |  | \n |  |  | \n |  |  |`,
          );
        }}
      >
        테1
      </ContentTemplateItem>
      <ContentTemplateItem
        onClick={() => {
          navigator.clipboard.writeText(
            `| 속성 | 사용 | 설명  | \n | --- | --- | --- | \n |  |  |  | \n |  |  |  | \n |  |  |  | \n |  |  |  |`,
          );
        }}
      >
        테2
      </ContentTemplateItem>
      <ContentTemplateItem
        onClick={() => {
          const dragText = window.getSelection();
          navigator.clipboard.readText().then((res) => {
            navigator.clipboard.writeText(
              '<a href="' +
                res +
                '" target="_blank"> ' +
                (dragText?.isCollapsed ? res : dragText) +
                ' </a>',
            );
            dragText.getRangeAt(0).deleteContents();
          });
          store.dispatch(
            rootActions.toastifyStore.SET_TOASTIFY_MESSAGE({
              type: 'success',
              message: '링크로 복사되었습니다.',
            }),
          );
        }}
      >
        링크
      </ContentTemplateItem>
    </Container>
  );
};
export default React.memo(CreateUpdateBlogTemplateContainer);

const Container = styled.section`
  ${(props) => props.theme.scroll.hidden}
  position: sticky;
  width: max-content;
  left: 100%;
  top: 7.6rem;
  display: flex;
  flex-flow: nowrap column;
  background: #eaeaea;
  gap: 0.2rem;
  z-index: 8;
`;

const ContentTemplateItem = styled.button`
  width: 2rem;
  aspect-ratio: 1;
  background: ${(props) => props.theme.main.primary40};
  border-radius: 50%;
`;
