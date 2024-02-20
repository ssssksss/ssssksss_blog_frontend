import { BlogFirstCategoryModal } from '@/components/blog/BlogFirstCategory/BlogFirstCategoryModal';
import BlogSecondCategoryModal from '@/components/blog/BlogSecondCategory/BlogSecondCategoryModal';
import { Button } from '@/components/common/button/Button';
import ModalButton from '@/components/common/button/ModalButton';
import { Icons } from '@/components/common/icons/Icons';
import { Spinner1 } from '@/components/spinner/Spinners';
import { store } from '@/redux/store';
import { rootActions } from '@/redux/store/actions';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
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
    }
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
        })
      );
      if (props.secondCategoryList.length > 0) {
        store.dispatch(
          rootActions.blogStore.SET_ACTIVE_BLOG_SECOND_CATEGORY({
            activeBlogSecondCategoryId: props.secondCategoryList[0]?.id,
            activeBlogSecondCategoryName: props.secondCategoryList[0]?.name,
          })
        );
      } else {
        store.dispatch(
          rootActions.blogStore.SET_ACTIVE_BLOG_SECOND_CATEGORY({
            activeBlogSecondCategoryId: null,
            activeBlogSecondCategoryName: null,
          })
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
      })
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
              <ButtonBox key={i.id}>
                <Button
                  active={
                    i.id == store.getState().blogStore.activeBlogFirstCategoryId
                  }
                  index={index}
                  onClick={e => {
                    blogFirstCategoryHandler(i);
                    blogFirstCategoryVerticalScrollRef.current.scrollLeft =
                      e.target.offsetLeft +
                      e.target.offsetWidth / 2 -
                      e.target.offsetParent.offsetWidth / 2;
                  }}
                >
                  {i.name}
                </Button>
                <Badge>
                  {i.secondCategoryList
                    .map(i => i.count)
                    .reduce((i, j) => i + j)}
                </Badge>
              </ButtonBox>
            ))}
            {blogStore?.activeBlogUserId == authStore.id && (
              <ModalButton
                color={'primary80'}
                modal={<BlogFirstCategoryModal />}
                modalOverlayVisible={true}
                modalW={'300px'}
              >
                <Image src={Icons.SettingIcon} alt="" />
              </ModalButton>
            )}
          </BlogFirstCategoryContainer>
          <BlogSecondCategoryContainer
            ref={blogSecondCategoryVerticalScrollRef}
          >
            {blogStore.blogCategoryList
              ?.filter(k => {
                return (
                  k.id == store.getState().blogStore.activeBlogFirstCategoryId
                );
              })[0]
              ?.secondCategoryList?.map((i, index) => (
                <ButtonBox key={i.id}>
                  <Button
                    active={
                      i.id ==
                      store.getState().blogStore.activeBlogSecondCategoryId
                    }
                    key={i.id}
                    onClick={e => {
                      blogSecondCategoryHandler(i);
                      blogSecondCategoryVerticalScrollRef.current.scrollLeft =
                        e.target.offsetLeft +
                        e.target.offsetWidth / 2 -
                        e.target.offsetParent.offsetWidth / 2;
                    }}
                  >
                    {i.name}
                  </Button>
                  <Badge>{i.count || '0'}</Badge>
                </ButtonBox>
              ))}
            {blogStore?.activeBlogUserId == authStore.id && (
              <ModalButton
                color={'primary80'}
                modal={<BlogSecondCategoryModal />}
                modalOverlayVisible={true}
                modalW={'300px'}
              >
                <Image src={Icons.SettingIcon} alt="" />
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
  background: ${props => props.theme.main.primary20};
  border-radius: 10px;
  padding: 4px;
  position: relative;

  & > div {
    border-radius: 8px;
  }
`;

const ButtonBox = styled.div`
  position: relative;
`;

const Badge = styled.div`
  position: absolute;
  border-radius: 50%;
  right: 4px;
  top: 4px;
  transform: translate(50%, -50%);
  background: ${props => props.theme.main.primary40};
  font-weight: 800;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  aspect-ratio: 1;
`;

const SpinnerBox = styled.div`
  width: 80px;
  aspect-ratio: 1;
  ${props => props.theme.positionStyle.absolute};
`;

const BlogFirstCategoryContainer = styled(CC.RowDiv)`
  gap: 8px;
  display: flex;
  overflow-y: hidden;
  padding: 10px 4px;
  height: 60px;
  background: ${props => props.theme.main.contrast};
  @media screen (max-height: 600px) {
    flex-wrap: nowrap;
    overflow-x: scroll;
  }

  ::-webkit-scrollbar {
    width: auto;
    height: 8px;
    display: contents;
    position: fixed;
  }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.main.secondary20};
    border-radius: 16px;
  }

  & > button {
    flex: 0 0 auto;
    min-width: 90px;
    height: 36px;
    border-radius: ${props => props.theme.borderRadius.br10};
    font-size: 1.2rem;
    font-family: ${props => props.theme.fontFamily.yanoljaYacheBold};
  }

  & > div > button {
    flex: 0 0 auto;
    min-width: 90px;
    height: 36px;
    border-radius: ${props => props.theme.borderRadius.br10};
    font-size: 1.2rem;
    font-family: ${props => props.theme.fontFamily.yanoljaYacheBold};
  }
`;

const BlogSecondCategoryContainer = styled(CC.RowDiv)`
  gap: 6px;
  padding: 10px 4px;
  flex-wrap: wrap;
  background: ${props => props.theme.main.contrast};

  @media (max-height: ${props => props.theme.deviceSizes.tablet}) {
    flex-wrap: nowrap;
    overflow-x: scroll;
    /* ${props => props.theme.scroll.hidden}; */
    ::-webkit-scrollbar {
      width: auto;
      height: 8px;
      display: contents;
      position: fixed;
    }
    ::-webkit-scrollbar-thumb {
      background: ${props => props.theme.main.secondary20};
      border-radius: 16px;
    }
  }

  & > button {
    padding: 0px 10px;
    height: 28px;
    border-radius: ${props => props.theme.borderRadius.br10};
    font-family: ${props => props.theme.fontFamily.yanoljaYacheBold};
    flex-shrink: 0;
  }

  & > div > button {
    padding: 0px 10px;
    height: 28px;
    border-radius: ${props => props.theme.borderRadius.br10};
    font-family: ${props => props.theme.fontFamily.yanoljaYacheBold};
    flex-shrink: 0;
  }
`;
