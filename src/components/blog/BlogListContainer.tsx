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
      {blogStore.activeSecondCategory &&
        blogStore.blogList[blogStore.activeSecondCategory]?.map((i) => (
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
                          (j: { id: string }) =>
                            j.id == blogStore.activeSecondCategory,
                        )[0] as { thumbnailImageUrl: null | string }
                    )?.thumbnailImageUrl
                }
                ></BlogItem>
          </Link>
        ))}
        </>
  );
};
export default BlogListContainer
