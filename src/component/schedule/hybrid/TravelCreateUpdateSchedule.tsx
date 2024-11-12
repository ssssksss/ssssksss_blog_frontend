import Button from "@component/common/button/hybrid/Button";
import Input from "@component/common/input/Input";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
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
  const fetchTouristInfo = async () => {
    const apiKey =
      "vAwFM4z%2Fo%2BMQakACFL3w%2FfONa48lFzFlvX9aOPl%2BUamrPbv0AW%2BeyjBDWkJvadK843ukwBUc8JeT3Yr3wGU8MA%3D%3D"; // 자신의 API 키를 입력하세요.
    // const keyword = "서울"; // 검색 키워드
    const url = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${apiKey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppName&keyword=${encodeURIComponent(keyword)}&_type=json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("API 요청 실패: ");
      }
      const data = await response.json();
      const items = data.response.body.items.item;
      setData(items);
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  };

  return (
    <ModalTemplate
      className={
        "flex h-[calc(100vh-1rem)] w-[calc(50vw-1rem)] flex-col gap-y-2"
      }>
      {props.closeButtonComponent}
      <Input
        ref={keywordRef}
        onChange={(e) => setKeyword(e.target.value)}
        className="max-h-[3rem] w-full default-outline"
        placeholder="키워드를 입력해주세요"
        onKeyPressAction={() => fetchTouristInfo()}
      />

      {data?.length > 0 ? (
        <ul
          className={
            "flex-grow-1 mb-2 grid h-full min-h-[25rem] w-full grid-cols-2 overflow-y-scroll bg-secondary-20 default-outline"
          }>
          {data?.map((i, index) => (
            <li
              key={i.contentid}
              className="bg-white relative h-[20rem] w-full overflow-hidden rounded-lg shadow-md">
              <Button
                className="h-full w-full p-2 default-outline"
                onClick={() => {
                  props.addTravelLocation(i);
                  props.closeModal!();
                }}>
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
