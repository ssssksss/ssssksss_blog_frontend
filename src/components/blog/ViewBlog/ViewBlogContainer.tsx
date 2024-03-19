import { Icons } from '@components/common/icons/Icons';
import { Editor } from '@components/editor/MDEditor';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ViewFixContainer from './ViewFixContainer';
import ViewHeaderContainer from './ViewHeaderContainer';
import ViewIndexContainer from './ViewIndexContainer';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ViewBlogContainer.tsx
 * @version 0.0.1 "2023-10-10 02:35:13"
 * @description 설명
 */

interface IProps {
  id: number;
  title: string;
  description: string;
  userId: number;
  likeNumber: number;
  commentNumber: number;
  viewNumber: number;
  firstCategoryId: number;
  secondCategoryId: number;
  thumbnailImageUrl: string;
  createdAt: string;
  blogContentId: string;
  blogFirstCategoryName: string;
  blogSecondCategoryName: string;
  content: string;
}

const ViewBlogContainer = (props: IProps) => {
  const router = useRouter();
  const [blogIndexList, setBlogIndexList] = useState<{
    content: String;
    top: Number;
    tagName: String;
  }>([]);

  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('pre')?.forEach((i) => {
        let test = document.createElement('button');
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
        createBlogIndex();
      });
    }, 2000);

    let keyDownEventFunc = (e: Event) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };
    window.addEventListener('keydown', keyDownEventFunc);

    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

  /**
   *
   * @description 블로그 글 인덱스 목록을 만들어주는 함수
   */
  const createBlogIndex = () => {
    let temp = document
      ?.getElementsByClassName('wmde-markdown')[0]
      ?.querySelectorAll('h1,h2');
    let htmlTagIndexTempArray = [];
    temp?.forEach((i) => {
      htmlTagIndexTempArray.push({
        content: i.textContent,
        top: i.getBoundingClientRect().top - 40,
        tagName: i.tagName,
      });
    });
    setBlogIndexList(htmlTagIndexTempArray);
  };

  return (
    <Container id="viewBlogContainer" className={'viewBlogContainer'}>
      <ViewFixContainer {...props} />
      <ViewIndexContainer {...props} blogIndexList={blogIndexList} />
      <ViewHeaderContainer {...props} />
      <ViewerContainer bg={'contrast'} icon={Icons.PlayIcon}>
        <Editor
          highlightEnable={false}
          value={props.content}
          preview={'preview'}
          hideToolbar={true}
          visibleDragbar={false}
          enableScroll={false}
          overflow={false}
        />
      </ViewerContainer>
    </Container>
  );
};
export default ViewBlogContainer;

const Container = styled.div`
  -ms-over-flow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ViewerContainer = styled.div<{ icon: any }>`
  width: 100%;
  .wmde-markdown-var,
  .w-md-editor,
  .w-md-editor-show-preview,
  .w-md-editor-fullscreen,
  .w-md-editor-content,
  .w-md-editor-preview {
    display: block;
    position: static;
  }
  .wmde-markdown {
    padding: 0rem 0.2rem;
    ${(props) => props.theme.scroll.hiddenX};

    img {
      max-width: 80rem;
      max-height: 60rem;
      outline: solid black 0.1rem;
    }

    pre {
      outline: solid ${(props) => props.theme.main.primary80} 0.1rem;
      border-radius: 1rem;
      position: relative;
      box-shadow: 0.1rem 0.1rem 0.2rem 0rem rgba(0, 0, 0, 0.25);
      font-size: 1.2rem;

      & > button {
        display: none;
        content: '';
        background-image: ${(props) =>
          props.icon && `url('/img/ui-icon/ic-board.svg')`};
        background-size: 2rem;
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
  }
`;
