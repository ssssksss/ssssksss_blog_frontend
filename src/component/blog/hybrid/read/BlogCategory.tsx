import BlogFirstCategory from "@component/blog/hybrid/read/BlogFirstCategory";
import BlogSecondCategory from "@component/blog/hybrid/read/BlogSecondCategory";

interface IBlogCategory {
  categoryList: [];
}
const BlogCategory = ({ categoryList }: IBlogCategory) => {
  // 카테고리 목록을 받아오고,
  return (
    <div>
      <BlogFirstCategory categoryList={categoryList} />
      <BlogSecondCategory categoryList={categoryList} />
    </div>
  );
};
export default BlogCategory;