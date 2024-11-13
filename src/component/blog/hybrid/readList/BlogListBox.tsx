import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faGhost } from "@fortawesome/free-solid-svg-icons/faGhost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLoading from "@hooks/useLoading";
import { AWSS3Prefix } from "@utils/variables/s3url";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IBlogListBox {}

const BlogListBox = (props: IBlogListBox) => {
  const searchParams = useSearchParams();
  const [blogList, setBlogList] = useState<responseBlog[] | []>([]);
  const loadingState = useLoading();

  useEffect(() => {
    if (searchParams.get("secondCategoryId")) {
      const fetchBlogList = async () => {
        loadingState.startLoading();
        try {
          const url = new URL(window.location.href);
          const response = await fetch(`/api/blog/list?secondCategoryId=${searchParams.get("secondCategoryId")}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch blog list");
          }
          const result: responseBlogList = await response.json();
          setBlogList(result.data);
        } catch {
          // Error handling
        } finally {
          setTimeout(() => {
            loadingState.stopLoading();
          }, 100);
        }
      };
      fetchBlogList();
    }
  }, [searchParams.get("secondCategoryId")]);

  if (loadingState.loading) {
    return (
      <div className={"w-full flex flex-col default-outline px-2 py-2 mt-[.5rem]"}>
        <ul className="flex flex-col gap-y-2">
          {
            [...Array(10)].map((_, i) =>
              <div key={i} className="animate-pulseSkeleton grid grid-cols-[6rem_auto_6rem] default-outline  h-[6rem] gap-x-1 p-2">
                {/* 이미지 스켈레톤 */}
                <div className="default-flex relative bg-gray-300 rounded-md h-full w-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  </div>
                </div>

                {/* 텍스트 스켈레톤 */}
                <div className="flex flex-col justify-between py-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>

                {/* 상태 스켈레톤 */}
                <div>
                  <div className="p-2 rounded-[1rem] bg-gray-300">
                    <div className="flex items-center justify-center">
                      <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </ul>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col mt-[.5rem]">
      <ul className="flex flex-col gap-y-2 max-w-full">
        {blogList?.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id} className="block w-full ">
            <li className="max-w-full w-full grid grid-cols-[4rem_calc(100%-10rem)_6rem] default-outline h-[6rem] gap-x-1 p-2 hover:bg-third-20">
              <div className="default-flex relative">
                <Image
                  src={`${AWSS3Prefix}${blog.blogSecondCategory.thumbnailImageUrl}`}
                  alt="thumbnail"
                  layout="fill"
                />
              </div>
              <div className="flex flex-col justify-between py-1 w-full">
                <p className="text-lg font-bold overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
                  {blog.title}
                </p>
                <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap truncate w-full">
                  {blog.description}
                </p>
                <p className="text-sm font-bold w-full">
                  {blog.baseTimeEntity.createdAt.toString().substring(0, 10)}
                </p>
              </div>
              <div className="min-w-[6rem]">
                <div className="rounded-[1rem] font-bold">
                  {blog.blogStatus === "DEVELOP" && (
                    <div className="bg-yellow-300 rounded-[.75rem] default-flex gap-x-1">
                      <FontAwesomeIcon icon={faBolt} />
                      <span>개발중</span>
                    </div>
                  )}
                  {blog.blogStatus === "HIDE" && (
                    <div className="bg-gray-300 rounded-[.75rem] default-flex gap-x-1">
                      <FontAwesomeIcon icon={faGhost} />
                      <span>숨김</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </Link>
        ))}

      </ul>
    </div>
  );
};

export default BlogListBox;
