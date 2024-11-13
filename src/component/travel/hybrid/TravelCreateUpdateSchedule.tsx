import Button from "@component/common/button/hybrid/Button";
import Input from "@component/common/input/Input";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import useLoading from "@hooks/useLoading";
import Image from "next/image";
import {useRef, useState} from "react";
import {travelContentTypeId} from "./TravelCreateUpdateContainer";

interface ITravelCreateUpdateSchedule extends IModalComponent {
  data: IKeywordTravel[];
  addTravelLocation: (data: IKeywordTravel) => void;
}
const TravelCreateUpdateSchedule = (props: ITravelCreateUpdateSchedule) => {
  const [data, setData] = useState<IKeywordTravel[]>([]);
  const [keyword, setKeyword] = useState("");
  const keywordRef = useRef<HTMLInputElement>(null);
  const {loading, startLoading, stopLoading} = useLoading();
  const fetchTouristInfo = async () => {
    startLoading();
    try {
      const response = await fetch(
        `/api/publicAPI/B551011/KorService1/searchKeyword1?keyword=${keyword}`,
      );
      if (!response.ok) {
        stopLoading();
        throw new Error("API 요청 실패: ");
      }
      const data = await response.json();
      const items = data.response.body.items.item;
      setData(items);
      stopLoading();
    } catch (error) {
      stopLoading();
      console.error("API 요청 오류:", error);
    }
  };

  return (
    <ModalTemplate
      className={
        "flex h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] flex-col gap-y-2"
      }
    >
      <LoadingSpinner loading={loading} />
      {props.closeButtonComponent}
      <div className={"flex w-full gap-x-2"}>
        <Input
          ref={keywordRef}
          onChange={(e) => setKeyword(e.target.value)}
          className="max-h-[3rem] w-full default-outline"
          placeholder="키워드를 입력해주세요"
          onKeyPressAction={() => fetchTouristInfo()}
        />
        <button
          onClick={() => fetchTouristInfo()}
          className="h-8 min-w-12 px-2 py-2 default-outline default-flex"
        >
          버튼
        </button>
      </div>

      {data?.length > 0 ? (
        <ul
          className={
            "flex-grow-1 mb-2 grid h-full min-h-[25rem] w-full grid-cols-2 gap-2 overflow-y-scroll p-2 default-outline"
          }
        >
          {data?.map((i, index) => (
            <li
              key={i.contentid}
              className="relative h-[20rem] w-full overflow-hidden rounded-2xl shadow-md"
            >
              <Button
                className="h-full w-full p-2 default-outline"
                onClick={() => {
                  props.addTravelLocation(i);
                  props.closeModal!();
                }}
              >
                <h2 className="mb-4 text-xl font-bold">{i?.title}</h2>
                <div className="relative aspect-square w-[10rem]">
                  <Image
                    alt=""
                    src={i.firstimage || "/images/icons/ic-plane.svg"}
                    fill
                  />
                </div>
                <div className="pt-1"> 주소 : {i.addr1}</div>
                <div> 분류 : {travelContentTypeId[+i.contenttypeid]}</div>
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <LottieNotFound text={"데이터가 없습니다."} />
      )}
    </ModalTemplate>
  );
};
export default TravelCreateUpdateSchedule;
