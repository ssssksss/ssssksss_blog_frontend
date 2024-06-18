import { Icons } from '@components/common/icons/Icons';
import { Editor } from '@components/editor/MDEditor';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ViewBlogFixContainer from './ViewBlogFixContainer';
import ViewBlogHeaderContainer from './ViewBlogHeaderContainer';
import ViewBlogIndexContainer from './ViewBlogIndexContainer';

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
    content: string;
    top: number;
    tagName: string;
  }[]>([]);

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    setTimeout(() => {
      createBlogIndex();
      document.querySelectorAll('pre')?.forEach((i) => {
        const test = document.createElement('button');
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
      });
    }, 1000);

    const keyDownEventFunc = (e: Event) => {
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
    const temp = document
      ?.getElementsByClassName('wmde-markdown')[0]
      ?.querySelectorAll('h1,h2');
    const htmlTagIndexTempArray: {
    content: string;
    top: number;
    tagName: string;
  }[] = [];
    temp?.forEach((i) => {
      htmlTagIndexTempArray.push({
        content: i.textContent,
        top: i.getBoundingClientRect().top - 40,
        tagName: i.tagName,
      });
    });
    setBlogIndexList(htmlTagIndexTempArray);
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  };

  return (
    <Container id="view-blog-container" className={'view-blog-container'}>
      <ViewBlogFixContainer />
      <ViewBlogIndexContainer {...props} blogIndexList={blogIndexList} />
      <ViewBlogHeaderContainer {...props} />
      <ViewerContainer icon={Icons.PlayIcon}>
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
  padding: 1rem 0rem;
`;

const ViewerContainer = styled.div<{ icon: unknown }>`
  width: 100%;
  .wmde-markdown-var,
  .w-md-editor,
  .w-md-editor-show-preview,
  .w-md-editor-fullscreen,
  .w-md-editor-content,
  .w-md-editor-preview {
    display: block;
    position: static;
    height: 100% !important;
  }

  .wmde-markdown {
    padding: 2rem 0.2rem;
    ${(props) => props.theme.scroll.hiddenX};
    display: flex;
    flex-flow: nowrap column;

    h1 {
      font-weight: 800;
      outline: solid ${(props) => props.theme.main.primary80} 0.25rem;
      outline-offset: -0.25rem;
      border-radius: 0.5rem;
      padding: 0.5rem;
      max-width: max-content;
      font-size: 2rem;
      font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
    }

    h2 {
      border: none;
      outline: solid ${(props) => props.theme.main.secondary80} 0.25rem;
      outline-offset: -0.25rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      max-width: max-content;
      font-weight: 800;
      font-size: 1.8rem;
      font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
    }

    h3 {
      border: none;
      outline: solid #dedede 0.25rem;
      outline-offset: -0.25rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      max-width: max-content;
      font-size: 1.6rem;
      font-family: ${(props) => props.theme.fontFamily.yanoljaYacheBold};
    }

    blockquote {
      font-size: 1.2rem;
      padding: 0 0 0 0.5rem;
      border: none;
      font-weight: 800;
      font-size: 1.2rem;
      box-shadow: -1px -1px 0px 0px rgba(0, 0, 0, 0.075);
      border-radius: 0.5rem;
      font-style: italic;
    }

    p:has(img) {
      display: flex;
      justify-content: center;
    }

    img {
      max-width: 40rem;
      max-height: 30rem;
      outline: solid black 1px;
    }

    code:not(:has(&, pre)) {
      font-size: 1rem;
      font-weight: 800;
      background: #1488cc; /* fallback for old browsers */
      background: ${(props) => `-webkit-linear-gradient(
        to right,
        ${props.theme.main.primary100},
        ${props.theme.main.secondary100}
      )`}; /* Chrome 10-25, Safari 5.1-6 */
      background: ${(props) => `linear-gradient(
        to right,
        ${props.theme.main.primary100},
        ${props.theme.main.secondary100}
      )`}; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      padding: 0.25rem;
      color: white;
    }

    ul,
    ol {
      padding-inline-start: 0.5rem;
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
        background-size: 1rem;
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
    pre {
      code {
        font-size: 1rem;
        padding: 0.5rem;
        ${(props) => props.theme.scroll.hiddenX};
        background: none;
        color: #333;
        
      }
    }
  }
`;
