import { BlogFirstCategoryModal } from '@components/blog/BlogFirstCategory/BlogFirstCategoryModal';
import BlogSecondCategoryModal from '@components/blog/BlogSecondCategory/BlogSecondCategoryModal';
import Button from '@components/common/button/Button';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import { Spinner1 } from '@components/loadingSpinner/Spinners';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { batch, useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogCategoryContainer.tsx
 * @version 0.0.1 "2024-01-25 05:49:05"
 * @description 설명
 */

type blogFirstCategoryHandlerType = {
  id: string;
  name: string;
  secondCategoryList: [
    {
      id: string;
      name: string;
      thumbnailImageUrl: string;
    },
  ];
};

const BlogCategoryContainer = () => {
  const router = useRouter();
  const blogFirstCategoryVerticalScrollRef = useRef();
  const blogSecondCategoryVerticalScrollRef = useRef();
  const authStore = useSelector((state: RootState) => state.authStore);
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const blogFirstCategoryHandler = (props: blogFirstCategoryHandlerType) => {
    batch(() => {
      store.dispatch(
        rootActions.blogStore.SET_ACTIVE_BLOG_FIRST_CATEGORY({
          activeBlogFirstCategoryId: props.id,
          activeBlogFirstCategoryName: props.name,
        }),
      );
      if (props.secondCategoryList.length > 0) {
        store.dispatch(
          rootActions.blogStore.SET_ACTIVE_BLOG_SECOND_CATEGORY({
            activeBlogSecondCategoryId: props.secondCategoryList[0]?.id,
            activeBlogSecondCategoryName: props.secondCategoryList[0]?.name,
          }),
        );
      } else {
        store.dispatch(
          rootActions.blogStore.SET_ACTIVE_BLOG_SECOND_CATEGORY({
            activeBlogSecondCategoryId: null,
            activeBlogSecondCategoryName: null,
          }),
        );
      }
    });
    let temp =
      window.document.location.origin +
      window.document.location.pathname +
      '?first-category=' +
      props.id +
      '&second-category=' +
      props.secondCategoryList[0]?.id;
    router.replace(temp, '', { shallow: true });
  };

  const blogSecondCategoryHandler = (props: { id: string }) => {
    let temp =
      window.document.location.origin +
      window.document.location.pathname +
      '?first-category=' +
      store.getState().blogStore.activeBlogFirstCategoryId +
      '&second-category=' +
      props.id;
    router.replace(temp, '', { shallow: true });
    store.dispatch(
      rootActions.blogStore.SET_ACTIVE_BLOG_SECOND_CATEGORY({
        activeBlogSecondCategoryId: props.id,
        activeBlogSecondCategoryName: props.name,
      }),
    );
  };

  return (
    <Container>
      {blogStore.blogCategoryList?.length == 0 ? (
        <SpinnerBox>
          <Spinner1 />
        </SpinnerBox>
      ) : (
        <>
          <BlogFirstCategoryContainer ref={blogFirstCategoryVerticalScrollRef}>
            {blogStore.blogCategoryList?.map((i, index) => (
              <Button
                key={i.id}
                minW={'80px'}
                active={
                  i.id == store.getState().blogStore.activeBlogFirstCategoryId
                }
                index={index}
                outline={true}
                onClick={(e) => {
                  blogFirstCategoryHandler(i);
                  blogFirstCategoryVerticalScrollRef.current.scrollLeft =
                    e.target.offsetLeft +
                    e.target.offsetWidth / 2 -
                    e.target.offsetParent.offsetWidth / 2;
                }}
                badgeValue={
                  i.secondCategoryList
                    .map((i) => i.count)
                    .reduce((i, j) => i + j, 0) || '0'
                }
              >
                {i.name}
              </Button>
            ))}
            {blogStore?.activeBlogUserId == authStore.id && (
              <ModalButton
                modal={<BlogFirstCategoryModal />}
                modalOverlayVisible={true}
                modalW={'300px'}
                outline={true}
                style={{ flexShrink: 0 }}
              >
                <Image
                  src={Icons.SettingIcon}
                  alt=""
                  width={'24px'}
                  height={'24px'}
                />
              </ModalButton>
            )}
          </BlogFirstCategoryContainer>
          <BlogSecondCategoryContainer
            ref={blogSecondCategoryVerticalScrollRef}
          >
            {blogStore.blogCategoryList
              ?.filter(
                (i) =>
                  i.id == store.getState().blogStore.activeBlogFirstCategoryId,
              )[0]
              ?.secondCategoryList?.filter((j) => j.name)
              .map((k) => (
                <Button
                  key={k.id}
                  minW={'80px'}
                  active={
                    k.id ==
                    store.getState().blogStore.activeBlogSecondCategoryId
                  }
                  onClick={(e) => {
                    blogSecondCategoryHandler(k);
                    blogSecondCategoryVerticalScrollRef.current.scrollLeft =
                      e.currentTarget.offsetLeft +
                      e.currentTarget.offsetWidth / 2 -
                      e.currentTarget.offsetParent.offsetWidth / 2;
                  }}
                  outline={true}
                  badgeValue={k.count || '0'}
                >
                  {k.name}
                </Button>
              ))}
            {blogStore?.activeBlogUserId == authStore.id && (
              <ModalButton
                modal={<BlogSecondCategoryModal />}
                modalOverlayVisible={true}
                modalW={'300px'}
                outline={true}
                style={{ flexShrink: 0 }}
              >
                <Image
                  src={Icons.SettingIcon}
                  alt=""
                  width={'24px'}
                  height={'24px'}
                />
              </ModalButton>
            )}
          </BlogSecondCategoryContainer>
        </>
      )}
    </Container>
  );
};
export default BlogCategoryContainer;

const Container = styled(CC.ColumnDiv)`
  gap: 4px;
  width: 100%;
  background: ${(props) => props.theme.main.primary20};
  border-radius: 10px;
  padding: 4px;
  position: relative;

  & > div {
    border-radius: 8px;
  }
`;

const SpinnerBox = styled.div`
  width: 80px;
  aspect-ratio: 1;
  ${(props) => props.theme.positionStyle.absolute};
`;

const BlogFirstCategoryContainer = styled(CC.RowDiv)`
  gap: 8px;
  display: flex;
  overflow-y: hidden;
  padding: 8px 4px;
  background: ${(props) => props.theme.main.contrast};

  & > button {
    width: max-content;
    flex-shrink: 0;
  }

  @media screen (max-height: 600px) {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }

  ::-webkit-scrollbar {
    width: auto;
    height: 4px;
    display: contents;
    position: fixed;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.main.secondary20};
    border-radius: 16px;
  }
`;

const BlogSecondCategoryContainer = styled(CC.RowDiv)`
  gap: 8px;
  padding: 8px 4px;
  flex-wrap: wrap;
  background: ${(props) => props.theme.main.contrast};
  width: 100%;

  & > button {
    width: max-content;
    flex-shrink: 0;
  }

  @media (max-height: ${(props) => props.theme.deviceSizes.tablet}) {
    flex-wrap: nowrap;
    overflow-x: scroll;
    /* ${(props) => props.theme.scroll.hidden}; */
    ::-webkit-scrollbar {
      width: auto;
      height: 4px;
      display: contents;
      position: fixed;
    }
    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.main.secondary20};
      border-radius: 16px;
    }
  }
`;
