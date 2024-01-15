import styled from '@emotion/styled';
import { CC } from '@/styles/commonComponentStyle';
import Image from 'next/image';
import { LikeIcon } from '/public/img/ui-icon/ic-like.svg';
import { Icons } from '@/components/common/icons/Icons';
import { useEffect, useReducer, useRef, useState } from 'react';
import { BlogAPI } from '@/api/BlogAPI';
import { useRouter } from 'next/router';
import { dateFormat4y2m2d } from '@/utils/function/dateFormat';
import { Viewer } from '@toast-ui/react-editor';
import { LoadingComponent } from '@/components/common/loading/LoadingComponent';
import { useLoading } from '@/src/hooks/useLoading';
import Link from 'next/link';
import UrlQueryStringToObject from '@/utils/function/UrlQueryStringToObject';
import { RootState } from '@/redux/store/reducers';
import { useSelector } from 'react-redux';
import { SET_TOASTIFY_MESSAGE } from '@/redux/store/toastify';
import { store } from '@/redux/store';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { AWSS3Prefix } from '@/utils/variables/url';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ViewBlogContainer.tsx
 * @version 0.0.1 "2023-10-10 02:35:13"
 * @description 설명
 */
const ViewBlogContainer = () => {
  const router = useRouter();
  const [blogElements, setBlogElements] = useState();
  const editorRef = useRef<Viewer>(null);
  const [isLoading, loadingFunction] = useLoading();
  const authStore = useSelector((state: RootState) => state.authStore);
  const [isOpenModal, IsOpenModalToggle] = useReducer(v => !v, false);
  const [createBlogIndexFlag, setCreateBlogIndexFlag] = useState(false);
  const [blogIndexList, setBlogIndexList] = useState<{
    content: String;
    top: Number;
    tagName: String;
  }>([]);
  {
    /* /blog?first-category=29&second-category=78 */
  }
  let backUrl = `/blog`;

  const deleteHandler = () => {
    loadingFunction(
      BlogAPI.deleteBlogPost({
        id: router.query.id,
      })
    ).then(res => {
      router.back();
    });
  };

  useEffect(() => {
    loadingFunction(
      BlogAPI.getBlogPost({
        id: router.query.id,
      })
    )
      .then(res => {
        backUrl = `/blog?first-category=${res.data.blogItem.blogDao?.firstCategoryId}&second-category=${res.data.blogItem.blogDao?.secondCategoryId}`;
        setBlogElements(res.data.blogItem.blogDao);
        const viewerInstance = editorRef.current?.getInstance();
        viewerInstance?.setMarkdown(res.data.blogItem.content);

        document.querySelectorAll('pre').forEach(i => {
          let test = document.createElement('button');
          test.style.position = 'absolute';
          test.style.right = '4px';
          test.style.top = '4px';
          test.style.width = '24px';
          test.style.height = '24px';
          test.addEventListener('click', e => {
            navigator.clipboard.writeText(
              // i.childNodes[0].childNodes[0].nodeValue
              i.childNodes[0].textContent
            );
            store.dispatch(
              SET_TOASTIFY_MESSAGE({
                type: 'success',
                message: `복사되었습니다.`,
              })
            );
          });
          i.appendChild(test);
        });
      })
      .catch(err => {});

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
    if (createBlogIndexFlag) return;
    setCreateBlogIndexFlag(true);
    let temp = document
      .getElementsByClassName('toastui-editor-contents')[0]
      .querySelectorAll('h1,h2,h3,h4,h5,h6');
    let htmlTagIndexTempArray = [];
    temp.forEach(i => {
      htmlTagIndexTempArray.push({
        content: i.textContent,
        top: i.getBoundingClientRect().top,
        tagName: i.tagName,
      });
    });
    setBlogIndexList(htmlTagIndexTempArray);
  };

  return (
    <>
      {isLoading ? (
        <LoadingComponent mode={'blog'}> 로딩중 </LoadingComponent>
      ) : (
        <Container gap={4} id="viewBlogContainer">
          <HeaderContainer
            pd={'0px 8px'}
            w={'100%'}
            h={'200px'}
            imageUrl={`${AWSS3Prefix}${blogElements?.thumbnailImageUrl}`}
          >
            <Title pd={'16px 0px 8px 0px'}>
              <h1> {blogElements?.title} </h1>
              <h3> {blogElements?.description} </h3>
            </Title>
            <CC.RowRightDiv>
              <CC.ColumnDiv>
                <CC.RowRightDiv gap={4}>
                  <Image src={Icons.LikeIcon} alt="" width={16} height={16} />
                  {blogElements?.likeNumber}
                </CC.RowRightDiv>
                <CC.RowDiv>
                  {dateFormat4y2m2d(blogElements?.baseTimeEntity.createdAt)}
                </CC.RowDiv>
              </CC.ColumnDiv>
            </CC.RowRightDiv>
          </HeaderContainer>
          <ViewerContainer bg={'contrast'} icon={Icons.PlayIcon}>
            <Viewer
              initialValue={blogElements?.content}
              theme="black"
              ref={editorRef}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
            <FixContainer>
              {isOpenModal ? (
                <BlogTopicInlineLinkListContainer>
                  <BlogTopicInlineLinkListHeaderContainer>
                    <Title1 onClick={() => IsOpenModalToggle()}>목차</Title1>
                    <Exit onClick={() => IsOpenModalToggle()}>
                      <div> </div>
                      <div> </div>
                      <div> </div>
                    </Exit>
                  </BlogTopicInlineLinkListHeaderContainer>
                  <BlogTopicInlineLinkListBodyContainer>
                    {blogIndexList.map((i, index) => (
                      <button
                        key={index}
                        onClickCapture={() => {
                          // window.scrollTo(0, 2000);
                          document
                            .getElementById('viewBlogContainer')
                            .scrollTo(0, i.top - 60);
                          // toastui-editor-contents
                          // window.scrollTo(0, i.top - 40);
                        }}
                        className={i.tagName}
                      >
                        {i.content}
                      </button>
                    ))}
                  </BlogTopicInlineLinkListBodyContainer>
                </BlogTopicInlineLinkListContainer>
              ) : (
                <BlogTopicInlineLinksButton
                  onClick={() => {
                    createBlogIndex();
                    IsOpenModalToggle();
                  }}
                >
                  <Image
                    width={24}
                    height={24}
                    alt="blog_index"
                    src={Icons.MenuIcon}
                  />
                </BlogTopicInlineLinksButton>
              )}
              {authStore.role === 'ROLE_ADMIN' && (
                <Link href={`/blog/update?id=${router.query.id}`}>
                  <Image src={Icons.EditIcon} alt="" width={24} height={24} />
                </Link>
              )}
              {authStore.role === 'ROLE_ADMIN' && (
                <Image
                  src={Icons.DeleteIcon}
                  alt=""
                  width={24}
                  height={24}
                  onClick={() => deleteHandler()}
                />
              )}
              <Link href={backUrl}>
                <Image src={Icons.MenuIcon} alt="" width={24} height={24} />
              </Link>
            </FixContainer>
          </ViewerContainer>
        </Container>
      )}
    </>
  );
};
export default ViewBlogContainer;

const Container = styled(CC.ColumnDiv)`
  height: calc(100vh - 52px);
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
  & > div {
    border-radius: 10px;
  }

  h3 {
    color: ${props => props.theme.colors.black80};
  }

  @media (min-width: ${props => props.theme.deviceSizes.pc}) {
  }
`;

// padding: 0px 0px 0px calc(${props.height ? props.height : '24px'} + 4px);
const HeaderContainer = styled(CC.ColumnBetweenDiv)<{ props: any }>`
  background-image: url(${props => props?.imageUrl});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  /* background-size: cover; */
  /* 추가 */
  position: relative;
  isolation: isolate;

  &::after {
    content: '';
    position: absolute;
    background: white;
    z-index: -1;
    inset: 0;
    opacity: 0.7;
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    -ms-filter: blur(3px);
    filter: blur(2px);
  }
`;

const Title = styled(CC.ColumnCenterDiv)`
  height: 160px;
  width: 100%;
  gap: 8px;
  h1 {
    padding-top: 2px;
    font-weight: 800;
    font-size: 1.4rem;
    font-family: ${props => props.theme.fontFamily.gmarketSansBold};
    text-align: center;
  }
  h3 {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.black40};
    font-family: ${props => props.theme.fontFamily.cookieRunRegular};
    text-align: center;
  }
`;

const ViewerContainer = styled.div<{ icon: any }>`
  border-radius: 0px 0px 10px 10px;
  position: relative;
  margin-bottom: 10px;

  .toastui-editor-contents {
    background: ${props => props.theme.colors.white80};
    padding: 4px 16px;
    ${props => props.theme.flex.column};
    gap: 20px;
    font-size: ${props => props.theme.calcRem(16)};
    min-height: calc(100vh - 268px);

    h1[data-nodeid] {
      border: none;
      width: 100%;
      background: ${props => props.theme.colors.red20 + '33'};
      font-size: ${props => props.theme.calcRem(28)};
      border-radius: 8px;
      padding: 4px 0px;
    }
    h1[data-nodeid]::before {
      content: '📌 ';
    }
    h2[data-nodeid] {
      border: none;
      width: 100%;
      background: ${props => props.theme.colors.orange20 + '33'};
      font-size: ${props => props.theme.calcRem(24)};
      border-radius: 8px;
      padding: 2px 0px;
    }
    h2[data-nodeid]::before {
      content: '🚩 ';
    }
    h3[data-nodeid] {
      border: none;
      width: 100%;
      background: ${props => props.theme.colors.orange20 + '33'};
      font-size: ${props => props.theme.calcRem(20)};
      border-radius: 8px;
    }
    h3[data-nodeid]::before {
      content: '🔶 ';
    }
    h4[data-nodeid]::before {
      content: '🔸 ';
    }

    pre {
      outline: solid ${props => props.theme.main.primary80} 1px;
      border-radius: 10px;
      position: relative;
      box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.25);
      font-size: ${props => props.theme.calcRem(12)};
      background: ${props => props.theme.colors.white80};

      & > button {
        display: none;
        content: '';
        background-image: ${props =>
          props.icon && `url('/img/ui-icon/ic-board.svg')`};
        background-size: 20px;
        background-repeat: no-repeat;
        background-position-x: 50%;
        background-position-y: 50%;
        aspect-ratio: 1;
        position: absolute;
        width: max-content;
        top: 0px;

        aspect-ratio: 1;
        padding: 0px;
        border: none;
      }
      &:hover > button {
        display: flex;
      }
    }

    th {
      outline: solid black 1px;
      background: ${props => props.theme.main.primary60};
    }
    td {
      outline: solid black 1px;
      padding: 2px 4px;
    }
    hr {
      height: 12px;
      background: ${props => props.theme.main.secondary80};
    }

    p > img {
      margin: auto;
      display: block;
    }
  }
`;

const FixContainer = styled(CC.ColumnDiv)`
  position: fixed;
  right: 10px;
  bottom: ${props => props.theme.calcRem(60)};
  gap: 8px;
  opacity: 0.8;
  background: ${props => props.theme.main.primary80};
  color: ${props => props.theme.main.contrast};
  outline: solid black 1px;
  padding: 8px;
  border-radius: 10px;
  /* width: ${props => props.theme.calcRem(32)}; */
  width: 2rem;

  img {
    cursor: pointer;
  }
  img:hover {
    transform: scale(1.2);
  }
`;

const BlogTopicInlineLinkListContainer = styled.nav`
  right: 0px;
  top: 180px;
  width: ${props => props.theme.calcRem(200)};
  overflow: scroll;
  position: fixed;
  z-index: 20;
  background: ${props => props.theme.colors.white80};
  outline: solid ${props => props.theme.main.primary80} 2px;
  /* IE and Edge , Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* Chrome, Safari, Opera*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BlogTopicInlineLinkListHeaderContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: ${(props: any) => props.theme.menuBackground};
  z-index: 20;
  transform: translateZ(0);
`;
const Title1 = styled.div`
  padding-left: 10px;
  font-size: ${props => props.theme.calcRem(10)};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-bottom: solid black 1px;
  color: ${props => props.theme.main.primary80};

  &:hover {
    cursor: pointer;
  }
`;
const Exit = styled.button`
  cursor: pointer;
  width: 20px;
  height: 20px;
  top: 1px;
  right: 1px;
  display: flex;
  justify-content: center;
  transform: translateZ(0);
  position: absolute;

  & > div {
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: #000;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
    transform: translateZ(0);
  }

  & > div:nth-of-type(1) {
    top: 50%;
    transform: translate(0px, -50%) rotate(405deg);
  }

  & > div:nth-of-type(2) {
    opacity: 0;
    transform: translate(0px, -50%) rotate(360deg);
  }

  & > div:nth-of-type(3) {
    top: 50%;
    transform: translate(0px, -50%) rotate(-405deg);
  }
`;
const BlogTopicInlineLinkListBodyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: nowrap column;
  padding: 2px;
  justify-content: start;
  height: 300px;
  overflow: scroll;

  button {
    display: flex;
    justify-content: start;
    align-items: start;
    text-align: start;
    :hover {
      background: ${props => props.theme.main.primary80};
      color: ${props => props.theme.main.contrast};
    }
  }

  .H1 {
    color: #f91600;
    padding: 4px 0px;
  }
  .H2 {
    padding-left: 2px;
    color: #f99700;
  }
  .H3 {
    padding-left: 6px;
    color: #1200ff;
  }
  .H4 {
    padding-left: 8px;
    color: #cb00ff;
  }
  .H5 {
    padding-left: 10px;
  }
  .H6 {
    padding-left: 12px;
  }
`;

const BlogTopicInlineLinksButton = styled.button`
  width: 30px;
  aspect-ratio: 1;
  right: 0px;
  top: 180px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
  background: ${props => props.theme.main.primary80};
  position: fixed;
  z-index: 30;
  border: solid black 1px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 0px;
  &:hover {
    opacity: 0.8;
    box-shadow: black 1px 1px 0px 0px;
  }
`;
