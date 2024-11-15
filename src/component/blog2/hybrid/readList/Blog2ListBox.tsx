import LottieNotFound from "@component/common/lottie/LottieNotFound";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faGhost } from "@fortawesome/free-solid-svg-icons/faGhost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLoading from "@hooks/useLoading";
import useBlog2Store from "@store/blog2Store";
import { AWSS3Prefix } from "@utils/variables/s3url";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface IBlog2ListBox {}

const Blog2ListBox = (props: IBlog2ListBox) => {
  const searchParams = useSearchParams();
  const loadingState = useLoading();
  const blog2Store = useBlog2Store();

  useEffect(() => {
    if (searchParams.get("secondCategoryId")) {
      const fetchBlogList = async () => {
        loadingState.startLoading();
        try {
          const url = new URL(window.location.href);
          const response = await fetch(`/api/blog2/list${url.search}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch blog list");
          }
          const result: responseBlog2List = await response.json();
          const secondCategoryId = Number(searchParams.get("secondCategoryId"));
          if (!isNaN(secondCategoryId)) {
            blog2Store.setBlog2List({
              id: secondCategoryId,
              list: result.data,
            });
          }
        } catch {
          // Error handling
        } finally {
          setTimeout(() => {
            loadingState.stopLoading();
          }, 100);
        }
      };
      fetchBlogList();
    } else {
      blog2Store.setBlog2List({
        id: 0,
        list: [],
      });
    }
  }, [searchParams.get("secondCategoryId")]);

  useEffect(() => {
    return () => {
      loadingState.stopLoading();
    };
  }, []);

  return (
    <div className="mt-[.5rem] flex w-full flex-col">
      <ul className="flex max-w-full flex-col gap-y-2">
        <LoadingSpinner loading={loadingState.loading} />
        {blog2Store.blog2List.list.length == 0 && (
          <div className={"w-full default-flex"}>
            <LottieNotFound text={"블로그 글이 없습니다."} />
          </div>
        )}
        {blog2Store.blog2List.list.map((i, index) => (
          <Link href={`/blog2/${i.id}`} key={i.id} className="block w-full"
            onClick={()=>loadingState.startLoading()}
          >
            <li
              className={
                "grid h-[6rem] w-full max-w-full animate-fadeIn grid-cols-[4rem_calc(100%-10rem)_6rem] gap-x-1 p-2 default-outline hover:animate-fill hover:animate--duration-1 hover:fillAnimation"
              }>
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
      </ul>
    </div>
  );
};

export default Blog2ListBox;
