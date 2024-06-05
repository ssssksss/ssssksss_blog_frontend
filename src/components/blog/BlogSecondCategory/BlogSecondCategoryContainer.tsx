import Animations from "@components/common/animations/Animations";
import Button from "@components/common/button/Button";
import ModalButton from "@components/common/button/ModalButton";
import styled from "@emotion/styled";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { store } from "@redux/store";
import { rootActions } from "@redux/store/actions";
import { RootState } from "@redux/store/reducers";
import AxiosInstance from "@utils/axios/AxiosInstance";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { changeBlogUrlString } from "../function/changeUrl";
import BlogSecondCategoryModal from "./BlogSecondCategoryModal";

const BlogSecondCategoryContainer = () => {
const blogStore = useSelector((state: RootState) => state.blogStore);
const authStore = useSelector((state: RootState) => state.authStore);
const blogSecondCategoryVerticalScrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
    
  const onClickAdjustHorizontalScroll = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    handler: () => void,
    ref: React.MutableRefObject<HTMLDivElement>,
  ) => {
    handler();
    if (ref.current) {
      ref.current.scrollLeft =
        e.currentTarget.offsetLeft +
        e.currentTarget.offsetWidth / 2 -
        (e.currentTarget.offsetParent as HTMLElement).offsetWidth / 2;
    }
  };
  
  const blogSecondCategoryHandler = (id: number) => { 
    if (id == null) return;
    AxiosInstance({
      url: '/api/blog/list',
      method: 'GET',
      params: {
        sort: blogStore.blogListOrderOption || 'baseTimeEntity.modifiedAt',
        secondCategoryId: id,
      },
    }).then((res) => {
      const _blogList = res.data.data;
      store.dispatch(
        rootActions.blogStore.setBlogList({
          ...blogStore.blogList,
          [id]: _blogList,
        }),
      );
      store.dispatch(
        rootActions.blogStore.setActiveSecondCategoryId(id),
      );
        router.push(
          changeBlogUrlString(blogStore.activeFirstCategoryId, id),
          '',
          {
            shallow: true,
          },
        );
    });
  }

  useEffect(() => {
      blogSecondCategoryHandler(blogStore.activeSecondCategoryId);
  }, [authStore.id]);
  
  return (
    <div
      className={
        'flex gap-[.5rem] overflow-x-scroll pt-[.5rem] overflow-hidden whitespace-nowrap scrollbar-hide'
      }
      ref={blogSecondCategoryVerticalScrollRef}
    >
      {blogStore.activeSecondCategoryId == null &&
        Array.from({ length: 10 }, (index) => index).map((_, index) => (
          <Skeleton key={index} />
        ))}
      {blogStore.activeSecondCategoryList?.map(
        (j: { id: number; blogCount: number; name: string }) => (
          <Button
            className={'flex-shrink-0'}
            key={j.id}
            minW={'8rem'}
            w={'min-content'}
            mg={'0.5rem 0rem'}
            h={'2rem'}
            pd={'0rem 0.25rem'}
            active={j.id == blogStore.activeSecondCategoryId}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              onClickAdjustHorizontalScroll(
                e,
                () => blogSecondCategoryHandler(j.id),
                blogSecondCategoryVerticalScrollRef,
              )
            }
            outline={true}
            outlineColor={'secondary80'}
            badgeValue={j.blogCount || '0'}
          >
            {j.name}
          </Button>
        ),
      )}
      {authStore.role == 'ROLE_ADMIN' && (
        <ModalButton
          modal={<BlogSecondCategoryModal />}
          modalOverlayVisible={true}
          modalW={'30rem'}
          h={'2rem'}
          mg={'0.5rem 0rem'}
          outline={true}
          modalBg={'white'}
        >
          <div className={'w-[2.4rem] aspect-square'}>
            <FontAwesomeIcon icon={faGear} />
          </div>
        </ModalButton>
      )}
    </div>
  );
};
export default BlogSecondCategoryContainer

const Skeleton = styled.div`
  min-width: 8rem;
  height: 2rem;
  margin: 0.5rem 0rem;
  outline: solid black 1px;
  outline-offset: -1px;
  flex-shrink: 0;
  border-radius: 0.5rem;
  animation: ${Animations.skeletonColors} 1s infinite;
`;