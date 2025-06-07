import LottieNotFound from "@component/common/lottie/LottieNotFound";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faGhost } from "@fortawesome/free-solid-svg-icons/faGhost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetchCSR from "@hooks/useFetchCSR";
import useLoading from "@hooks/useLoading";
import useBlog2Store from "@store/blog2Store";
import useUserStore from "@store/userStore";
import { AWSS3Prefix } from "@utils/variables/s3url";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface IBlog2ItemListContainer {}

const Blog2ItemListContainer = (props: IBlog2ItemListContainer) => {
  const loadingState = useLoading();
  const blog2Store = useBlog2Store();
  const fetchCSR = useFetchCSR();
  const userStore = useUserStore();

  const fetchBlogList = async () => {
    const url = new URL(window.location.href);
    const result = await fetchCSR.requestWithHandler({
      url: `/api/blog2/list${url.search}`,
    });
    return result == undefined ? [] : result;
  };

  useEffect(() => {
    const loadBlogList = async () => {
      loadingState.startLoading();
      const list = blog2Store.activeBlog2SecondCategoryId ? await fetchBlogList() : [];
      
      blog2Store.setBlogItem({
        id: Number(blog2Store.activeBlog2SecondCategoryId) || 0,
        list,
        isDataFetched: true,
      });
      loadingState.stopLoading();
    };

    loadBlogList();
  }, [blog2Store.activeBlog2SecondCategoryId, userStore.id]);

  return (
    <div className="mt-[.5rem] flex w-full flex-col pb-[.5rem]">
      <ul className="flex max-w-full flex-col gap-y-2">
        <LoadingSpinner loading={loadingState.loading} />
        {blog2Store.isDataFetched &&
          !loadingState.loading &&
          blog2Store.blogItem.list.map((i, index) => (
            <Link
              href={`/blog2/${i.id}`}
              key={i.id}
              className="block w-full"
              prefetch={false} // 굳이 모든 내용을 불러올 필요는 없다고 판단
              onClick={() => loadingState.startLoading()}
            >
              <li
                className={
                  "grid h-[6rem] w-full max-w-full animate-fadeIn grid-cols-[4rem_calc(100%-10rem)_6rem] gap-x-1 p-2 primary-border-radius hover:animate-fill hover:animate--duration-1 hover:fillAnimation"
                }
              >
                <div className="relative default-flex">
                  <Image
                    src={`${AWSS3Prefix}${i.thumbnailImageUrl}`}
                    alt="thumbnail"
                    layout="fill"
                  />
                </div>
                <div className="flex w-full flex-col justify-between py-1">
                  <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold">
                    {i.title}
                  </p>
                  <p className="w-full overflow-hidden truncate overflow-ellipsis whitespace-nowrap text-sm">
                    {i.description}
                  </p>
                  <p className="w-full text-sm font-bold">
                    {i.createdAt.toString().substring(0, 10)}
                  </p>
                </div>
                <div className="w-[5.5rem] rounded-[1rem] font-bold">
                  {i.blog2Status === "DEVELOP" && (
                    <div className="gap-x-1 rounded-[.75rem] bg-yellow-300 default-flex">
                      <FontAwesomeIcon icon={faBolt} />
                      <span>개발중</span>
                    </div>
                  )}
                  {i.blog2Status === "HIDE" && (
                    <div className="gap-x-1 rounded-[.75rem] bg-gray-300 default-flex">
                      <FontAwesomeIcon icon={faGhost} />
                      <span>숨김</span>
                    </div>
                  )}
                </div>
              </li>
            </Link>
          ))}
        {blog2Store.isDataFetched &&
          !loadingState.loading &&
          blog2Store.blogItem.list.length == 0 && (
          <div className={"w-full default-flex"}>
            <LottieNotFound text={"블로그 글이 없습니다."} />
          </div>
        )}
      </ul>
    </div>
  );
};

export default Blog2ItemListContainer;
