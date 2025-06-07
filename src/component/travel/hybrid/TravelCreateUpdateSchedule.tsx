import Button from "@component/common/button/hybrid/Button";
import Input from "@component/common/input/Input";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import Pagination from "@component/common/pagination/Pagination";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import useLoading from "@hooks/useLoading";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaPlane } from "react-icons/fa6";
import { travelContentTypeId } from "./TravelCreateUpdateContainer";
interface ITravelCreateUpdateSchedule {
  addTravelLocation: (data: IKeywordTravel) => void;
}
const TravelCreateUpdateSchedule = (props: ITravelCreateUpdateSchedule) => {
  const [data, setData] = useState<IKeywordTravel[]>([]);
  const [keyword, setKeyword] = useState("");
  const keywordRef = useRef<HTMLInputElement>(null);
  const { loading, startLoading, stopLoading } = useLoading();
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  
  const fetchTouristInfo = async (page?: number) => {
    startLoading();
    try {
      const response = await fetch(
        `/api/publicAPI/B551011/KorService1/searchKeyword1?keyword=${keyword}&page=${page || 1}`,
      );
      if (!response.ok) {
        stopLoading();
        throw new Error("API 요청 실패: ");
      }
      const data = await response.json();
      const items = data.response.body.items.item;
      setTotalElements(data.response.body.totalCount);
      setData(items);
      stopLoading();
    } catch (error) {
      stopLoading();
      console.error("API 요청 오류:", error);
    }
  };

  const pageHandler = (page: number) => {
    setPage(page);
    fetchTouristInfo(page);
  };

  return (
    <section
      className={
        "flex h-full w-full flex-col primary-border-radius pt-2 px-2"
      }
    >
      <LoadingSpinner loading={loading} />
      <div className={"flex w-full gap-x-2 min-h-[3.5rem]"}>
        <Input
          ref={keywordRef}
          onChange={(e) => setKeyword(e.target.value)}
          className="h-full w-full primary-border-radius"
          placeholder="키워드를 입력해주세요"
          onKeyPressAction={() => fetchTouristInfo()}
        />
        <button
          onClick={() => fetchTouristInfo()}
          className="h-full min-w-12 px-2 py-2 primary-border-radius default-flex"
        >
          버튼
        </button>
      </div>

      {data?.length > 0 ? (
        <ul
          className={
            "flex-grow-1 grid h-full min-h-[25rem] w-full grid-cols-2 gap-2 overflow-y-scroll py-2 rounded-2xl"
          }
        >
          {data?.map((i, index) => (
            <li
              key={i.contentid}
              className="relative h-[20rem] w-full overflow-hidden rounded-2xl shadow-md primary-border-radius"
            >
              <Button
                className="h-full w-full p-2 primary-border-radius"
                onClick={() => {
                  props.addTravelLocation(i);
                }}
              >
                <h2 className="mb-4 text-xl font-bold">{i?.title}</h2>
                <div className="relative aspect-square w-[10rem] mx-auto">
                  {
                    i.firstimage ?
                      <Image
                        alt=""
                        src={i.firstimage}
                        fill
                      />
                      :
                      <FaPlane size="48"/>
                  }
                </div>
                <div className="pt-1"> 주소 : {i.addr1}</div>
                <div> 분류 : {travelContentTypeId[+i.contenttypeid]}</div>
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className=" h-full w-full default-flex">
          <LottieNotFound text={"데이터가 없습니다."} />
        </div>
      )}
      <div className="w-full mt-auto border-t-2 border-primary-60">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalElements / 10)}
          pageHandler={pageHandler}
        />
      </div>
    </section>
  );
};
export default TravelCreateUpdateSchedule;
