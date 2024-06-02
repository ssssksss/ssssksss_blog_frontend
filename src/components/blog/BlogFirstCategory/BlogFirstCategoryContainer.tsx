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
import { useRef } from "react";
import { useSelector } from "react-redux";
import { BlogFirstCategoryModal } from "./BlogFirstCategoryModal";

/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file BlogFirstCategoryContainer.tsx
 * @version 0.0.1 "2024-06-02 15:59:23"
 * @description 설명 
 */
const BlogFirstCategoryContainer = () => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  const blogFirstCategoryVerticalScrollRef = useRef<HTMLDivElement>(null);
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
    
type BlogCategory = {
  id: number;
  blogSecondCategoryList: { id: number }[];
};

const blogFirstCategoryHandler = (id: string) => {
  let _secondCategoryId: number | undefined = undefined;

  const _firstCategoryList: BlogCategory[] = blogStore.blogCategoryList.filter(
    (i: BlogCategory) => i.id+"" == id
  );

  const firstCategory = _firstCategoryList[0];
  if (_firstCategoryList.length > 0) {
    if (firstCategory.blogSecondCategoryList.length > 0) {
      _secondCategoryId = firstCategory.blogSecondCategoryList[0].id;
    }
  }

    AxiosInstance({
      url: '/api/blog/list',
      method: 'GET',
      params: {
        sort: blogStore.blogListOrderOption || 'baseTimeEntity.modifiedAt',
        secondCategoryId: _secondCategoryId,
      },
    }).then((res) => {
      store.dispatch(rootActions.blogStore.setBlogList({
        ...blogStore.blogList,
          [_secondCategoryId]: res.data.data
      }))
      store.dispatch(
        rootActions.blogStore.setActiveFirstCategory(
          id
        ),
      );
      store.dispatch(
        rootActions.blogStore.setActiveSecondCategory(
          _secondCategoryId
        ),
      );
      store.dispatch(
        rootActions.blogStore.setActiveSecondCategoryList(
          firstCategory.blogSecondCategoryList
        ),
      );
            router.push(
              `blog?firstCategoryId=${id}&secondCategoryId=${_secondCategoryId}`,
              '',
              {
                shallow: true,
              },
            );
    });
  };

    
  return (
    <div
      className={
        'flex gap-[.5rem] overflow-x-scroll pt-[.5rem] overflow-hidden whitespace-nowrap scrollbar-hide'
      }
      ref={blogFirstCategoryVerticalScrollRef}
    >
      {blogStore.blogCategoryList.length == 0 &&
        Array.from({ length: 10 }, (i, index) => index).map((i) => (
          <Skeleton />
        ))}
      {blogStore.blogCategoryList?.map(
        (el: {
          id: string;
          blogSecondCategoryList: [
            {
              blogCount: number;
            },
          ];
          name: string;
        }) => (
          <Button
            className={'flex-shrink-0'}
            key={el.id}
            minW={'8rem'}
            h={'2.75rem'}
            mg={'0.5rem 0rem'}
            active={el.id == blogStore.activeFirstCategory}
            outline={true}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              onClickAdjustHorizontalScroll(
                e,
                () => blogFirstCategoryHandler(el.id),
                blogFirstCategoryVerticalScrollRef,
              )
            }
            badgeValue={el.blogSecondCategoryList.reduce(
              (sum, el) => sum + el.blogCount,
              0,
            )}
          >
            {el.name}
          </Button>
        ),
      )}
      {authStore.role == 'ROLE_ADMIN' && (
        <ModalButton
          modal={<BlogFirstCategoryModal />}
          modalOverlayVisible={true}
          modalW={'30rem'}
          h={'2.75rem'}
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
export default BlogFirstCategoryContainer

const Skeleton = styled.div`
  min-width: 8rem;
  height: 2.75rem;
  margin: 0.5rem 0rem;
  outline: solid black 1px;
  outline-offset: -1px;
  flex-shrink: 0;
  border-radius: 0.5rem;
  animation: ${Animations.skeletonColors} 1s infinite;
`;