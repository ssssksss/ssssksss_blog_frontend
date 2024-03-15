import { BlogAPI } from '@api/BlogAPI';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { RootState } from '@redux/store/reducers';
import { SET_TOASTIFY_MESSAGE } from '@redux/store/toastify';
import { CC } from '@styles/commonComponentStyle';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
// import 'tui-color-picker/dist/tui-color-picker.css';
import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import { dateFormat4y2m2d } from '@utils/function/dateFormat';
import { AWSS3Prefix } from '@utils/variables/url';

// import { ConfirmButton } from '@components/common/button/ConfirmButton';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import { Editor } from '@components/editor/MDEditor';
import Image from 'next/image';
import Link from 'next/link';

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
  const BACK_URL = `/blog?first-category=${props.firstCategoryId}&second-category=${props.secondCategoryId}`;
  const router = useRouter();
  const authStore = useSelector((state: RootState) => state.authStore);
  const [isOpenModal, IsOpenModalToggle] = useReducer((v) => !v, false);
  const blogStore1 = useSelector((state: RootState) => state.blogStore1);
  const [blogCategory] = useState({
    firstCategoryName: props.blogFirstCategoryName,
    secondCategoryName: props.blogSecondCategoryName,
  });
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
        test.style.right = '4px';
        test.style.top = '4px';
        test.style.width = '24px';
        test.style.height = '24px';
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
    }, 1000);

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

  const deleteHandler = () => {
    BlogAPI.deleteBlog({
      id: router.query.id,
    }).then(() => {
      router.replace(
        `/blog?first-category=${blogStore1.activeFirstCategory}&second-category=${blogStore1.activeSecondCategory}`,
      );
    });
  };

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
    <Container gap={4} id="viewBlogContainer" className={'viewBlogContainer'}>
      <HeaderContainer
        className={'header-container'}
        pd={'32px 8px 8px 8px'}
        imageUrl={`${AWSS3Prefix}${props.thumbnailImageUrl}`}
      >
        <CC.AbsoluteRowBox gap={4} pd={'4px'} left={0} top={0}>
          <Button
            bg={'primary20'}
            w={'max-content'}
            onClick={() =>
              router.push('/blog?first-category=' + props.firstCategoryId)
            }
          >
            {blogCategory.firstCategoryName}
          </Button>
          <Button
            bg={'secondary20'}
            w={'max-content'}
            onClick={() =>
              router.push(
                '/blog?first-category=' +
                  props.firstCategoryId +
                  '&second-category=' +
                  props.secondCategoryId,
              )
            }
          >
            {props.blogSecondCategoryName}
          </Button>
          <CC.RowDiv gap={8}>
            <CC.RowDiv
              w={'max-content'}
              bg={'primary20'}
              h={'100%'}
              brR={'8px'}
              pd={'2px'}
            >
              {dateFormat4y2m2d(props.createdAt)}
            </CC.RowDiv>
            <CC.RowDiv
              gap={4}
              bg={'secondary20'}
              h={'100%'}
              brR={'8px'}
              pd={'2px'}
            >
              <Image src={Icons.LikeIcon} alt="" width={16} height={16} />
              {props.likeNumber}
            </CC.RowDiv>
          </CC.RowDiv>
        </CC.AbsoluteRowBox>
        <Title pd={'16px 0px 8px 0px'}>
          <h1> {props.title} </h1>
          <h3> {props.description} </h3>
        </Title>
      </HeaderContainer>
      <ViewerContainer bg={'contrast'} icon={Icons.PlayIcon}>
        <Editor
          className={'preview-editor'}
          height={'100%'}
          highlightEnable={false}
          value={props.content}
          preview={'preview'}
          hideToolbar={true}
          visibleDragbar={false}
          enableScroll={false}
          overflow={false}
        />
        <FixContainer className={'fix-container'}>
          {isOpenModal ? (
            <BlogTopicInlineLinkListContainer>
              <BlogTopicInlineLinkListHeaderContainer>
                <Title1
                  onClick={() => IsOpenModalToggle()}
                  className={'title-trigger'}
                >
                  목차
                </Title1>
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
                      document
                        .getElementsByClassName('w-md-editor-preview')[0]
                        .scrollTo(0, i.top - 200);
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
            <Link href={`/blog/update?id=${router.query.id}`} prefetch={false}>
              <Image src={Icons.EditIcon} alt="" width={24} height={24} />
            </Link>
          )}
          {authStore.role === 'ROLE_ADMIN' && (
            <ConfirmButton
              onClick={() => deleteHandler()}
              w={'max-content'}
              h={'max-content'}
              bg={'transparent'}
              pd={'0'}
            >
              <Image src={Icons.DeleteIcon} alt="" width={24} height={24} />
            </ConfirmButton>
          )}
          <Link href={BACK_URL}>
            <Image src={Icons.MenuIcon} alt="" width={24} height={24} />
          </Link>
        </FixContainer>
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
  height: 100%;
  ${(props) => props.theme.scroll.hiddenY};
  position: relative;
  .preview-editor {
    max-height: auto;
  }
  .w-md-editor {
  }
  .w-md-editor-content {
    height: calc(100vh);
  }
  .w-md-editor-preview {
  }
  .wmde-markdown .wmde-markdown-color {
  }
  .wmde-markdown-var {
  }
  .w-md-editor {
  }
  .w-md-editor-show-preview {
  }
  .preview-editor {
  }
  .w-md-editor-fullscreen {
  }
`;

// padding: 0px 0px 0px calc(${props.height ? props.height : '24px'} + 4px);
const HeaderContainer = styled(CC.ColumnDiv)<{ props: any }>`
  background-image: url(${(props) => props?.imageUrl});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  /* background-size: cover; */
  /* 추가 */
  isolation: isolate;
  border-bottom: solid ${(props) => props.theme.main.primary80} 1px;
  position: relative;
  z-index: 100000;

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
    font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
    text-align: center;
  }
  h3 {
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.black40};
    font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
    text-align: center;
  }
`;

const ViewerContainer = styled.div<{ icon: any }>`
  border-radius: 0px 0px 10px 10px;
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  background: ${(props) => props.theme.colors.white80};
  min-height: max-content;
  .w-md-editor-content {
  }
  .w-md-editor-preview {
  }
  .wmde-markdown {
    padding: 200px 2px 0px 2px;
    ${(props) => props.theme.scroll.hiddenX};
  }
  .wmde-markdown-color {
  }
  .wmde-markdown-var {
  }
  .w-md-editor {
  }
  .w-md-editor-show-preview {
  }
  .preview-editor {
  }
  .w-md-editor-fullscreen {
  }

  pre {
    outline: solid ${(props) => props.theme.main.primary80} 1px;
    border-radius: 10px;
    position: relative;
    box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.25);
    font-size: ${(props) => props.theme.calcRem(12)};

    & > button {
      display: none;
      content: '';
      background-image: ${(props) =>
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
  img {
    max-width: 800px;
    max-height: 600px;
  }
`;

const FixContainer = styled(CC.ColumnDiv)`
  position: fixed;
  right: 10px;
  bottom: ${(props) => props.theme.calcRem(20)};
  gap: 8px;
  background: ${(props) => props.theme.main.primary80};
  color: ${(props) => props.theme.main.contrast};
  outline: solid black 1px;
  padding: 8px;
  border-radius: 10px;
  z-index: 100000;
  /* width: ${(props) => props.theme.calcRem(32)}; */

  img {
    cursor: pointer;
  }
  img:hover {
    transform: scale(1.2);
  }
`;

const BlogTopicInlineLinkListContainer = styled.nav`
  width: ${(props) => props.theme.calcRem(200)};
  overflow: scroll;
  position: fixed;
  right: 0px;
  top: 20px;
  z-index: 20;
  max-height: calc(100vh - 100px);
  background: ${(props) => props.theme.colors.white80};
  outline: solid ${(props) => props.theme.main.primary80} 2px;
  /* IE and Edge , Firefox */
  msoverflowstyle: none;
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
  font-size: ${(props) => props.theme.calcRem(14)};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-bottom: solid black 1px;
  color: black;
  background: ${(props) => props.theme.main.third20};
  font-weight: 800;
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
  counter-reset: section;

  button {
    display: flex;
    justify-content: start;
    align-items: start;
    text-align: start;
    :hover {
      background: ${(props) => props.theme.main.primary20};
      /* color: ${(props) => props.theme.main.contrast}; */
    }
  }

  .H1 {
    padding: 2px 0px;
    color: ${(props) => props.theme.colors.black100};
    font-weight: 800;
  }
  .H1::before {
    counter-increment: section;
    content: '[' counter(section) '] ';
  }
  .H2 {
    padding: 2px 0px 2px 4px;
    color: ${(props) => props.theme.colors.black80};
    font-weight: 600;
  }
  .H3 {
    padding: 2px 0px 2px 8px;
    color: ${(props) => props.theme.colors.black60};
    font-weight: 400;
  }
  /* .H4 {
    color: #cb00ff;
    font-size: ${(props) => props.theme.calcRem(18)};
    padding-left: 6px;
  }
  .H5 {
    padding-left: 10px;
  }
  .H6 {
    padding-left: 12px;
  } */
`;

const BlogTopicInlineLinksButton = styled.button`
  width: 30px;
  aspect-ratio: 1;
  right: 0px;
  top: 20px;
  overflow: scroll;
  msoverflowstyle: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
  background: ${(props) => props.theme.main.primary80};
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
