import Animations from "@components/common/animations/Animations";
import styled from "@emotion/styled";
import { RootState } from "@redux/store/reducers";
import Link from "next/link";
import { useSelector } from "react-redux";
import BlogItem from "./BlogItem";
/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file BlogListContainer.tsx
 * @version 0.0.1 "2024-06-02 22:38:54"
 * @description 설명 
 */
const BlogListContainer = () => {
  const blogStore = useSelector((state: RootState) => state.blogStore);
    return (
      <>
        {blogStore.blogList[blogStore.activeSecondCategoryId]?.length > 0 ? (
          blogStore.blogList[blogStore.activeSecondCategoryId]?.map((i) => (
            <Link
              href={`/blog/${i.id}`}
              key={`${i.id}`}
              prefetch={false}
              className="w-full"
            >
              <BlogItem
                element={i}
                viewMode={true}
                defaultImageUrl={
                  (
                    blogStore.activeSecondCategoryList.filter(
                      (j: { id: number }) =>
                        j.id == blogStore.activeSecondCategoryId,
                    )[0] as { thumbnailImageUrl: null | string }
                  )?.thumbnailImageUrl
                }
              ></BlogItem>
            </Link>
          ))
        ) : blogStore.activeSecondCategoryId ? (
          <div
            className={
              'w-full h-[10rem] bg-gray-100 rounded-lg flex justify-center items-center text-[2rem]'
            }
          >
            결과가 없습니다.
          </div>
        ) : (
        <div className={'flex flex-col gap-[.5rem] w-full'}>
            {Array.from({ length: 16 }, (index) => index).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        )}
      </>
    );
};
export default BlogListContainer

const Skeleton = styled.div`
  width: 100%;
  height: 5rem;
  outline: solid black 1px;
  outline-offset: -1px;
  flex-shrink: 0;
  border-radius: 1rem;
  animation: ${Animations.skeletonColors} 1s infinite;
  padding: 0.5rem;
`;