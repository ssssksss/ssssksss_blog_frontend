import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useLoading from "@hooks/useLoading";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ITravelItemInfonModal extends IModalComponent {
  data: IKeywordTravel;
}

const TravelItemInfonModal = (props: ITravelItemInfonModal) => {
  const [info, setInfo] = useState<TourPlaceType<number>[]>();
  const {loading, startLoading, stopLoading} = useLoading(true);

  const renderContentWithLineBreaks = (content: string) => {
    return content
      .split("<br>")
      .map((line, index) => <div key={index}>{line}</div>);
  };

  const renderLabelValue = (label: string, value: string) => (
    <div className="flex flex-col gap-y-1">
      <div className="font-semibold text-primary-80">{label} :</div>
      <div>{renderContentWithLineBreaks(value)}</div>
    </div>
  );

  useEffect(() => {
    const fetchTouristInfo = async () => {
      try {
        const response = await fetch(
          `/api/publicAPI/B551011/KorService1/detailIntro1?contentId=${props.data.contentid}&contentTypeId=${props.data.contenttypeid}`,
        );
        if (!response.ok) {
          throw new Error("API 요청 실패: ");
        }
        const data = await response.json();
        setInfo([data.response.body.items.item[0]]);
        stopLoading();
      } catch (error) {
        stopLoading();
        console.error("API 요청 오류:", error);
      }
    };
    fetchTouristInfo();
  }, []);

  return (
    <ModalTemplate className={"h-[calc(100vh-1rem)] max-h-[800px] w-[calc(100vw-1rem)] max-w-[600px] animate-fadeUp"}>
      {props.closeButtonComponent}
      <h2 className={"w-full py-2 text-2xl default-outline default-flex"}>
        {props.data.title}
      </h2>
      <div className="mt-2 w-full p-2 default-outline default-flex">
        <div className="relative aspect-square w-[14rem]">
          <Image
            alt=""
            src={props.data.firstimage || "/images/icons/ic-plane.svg"}
            fill
          />
        </div>
      </div>
      <div className="my-4 h-[0.0625rem] w-full border border-gray-60"> </div>
      {props.data.contenttypeid == "12" &&
        info?.map((i: TourPlaceType<12>) => (
          <div key={0} className="flex w-full flex-col gap-y-1">
            {i.restdate && renderLabelValue("휴무일", i.restdate)}
            {i.infocenter && renderLabelValue("전화번호", i.infocenter)}
            {i.chkpet && renderLabelValue("애완동물", i.chkpet)}
            {i.parking && renderLabelValue("주차시설", i.parking || "정보없음")}
          </div>
        ))}

      {/* CultureFacility */}
      {props.data.contenttypeid == "14" &&
        info?.map((i: CultureFacility) => (
          <div key={0} className="flex w-full flex-col gap-y-1">
            {i.restdateculture && renderLabelValue("휴무일", i.restdateculture)}
            {i.infocenterculture &&
              renderLabelValue("전화번호", i.infocenterculture)}
            {i.chkpetculture && renderLabelValue("애완동물", i.chkpetculture)}
            {i.parkingculture && renderLabelValue("주차시설", i.parkingculture)}
            {i.discountinfo && renderLabelValue("할인정보", i.discountinfo)}
            {i.usetimeculture && renderLabelValue("이용시간", i.usetimeculture)}
          </div>
        ))}

      {/* Festival */}
      {props.data.contenttypeid == "15" &&
        info?.map((i: Festival) => (
          <div key={0} className="flex w-full flex-col gap-y-1">
            {i.eventstartdate && renderLabelValue("시작일", i.eventstartdate)}
            {i.eventenddate && renderLabelValue("종료일", i.eventenddate)}
            {i.eventplace && renderLabelValue("행사장소", i.eventplace)}
            {i.sponsor1 && renderLabelValue("스폰서1", i.sponsor1)}
            {i.sponsor1tel &&
              renderLabelValue("스폰서1 전화번호", i.sponsor1tel)}
            {i.sponsor2 && renderLabelValue("스폰서2", i.sponsor2)}
            {i.sponsor2tel &&
              renderLabelValue("스폰서2 전화번호", i.sponsor2tel)}
            {i.subevent && renderLabelValue("세부 행사", i.subevent)}
          </div>
        ))}

      {/* Leports */}
      {props.data.contenttypeid == "28" &&
        info?.map((i: Leports) => (
          <div key={0} className="flex w-full flex-col gap-y-1">
            {i.restdateleports && renderLabelValue("휴무일", i.restdateleports)}
            {i.infocenterleports &&
              renderLabelValue("전화번호", i.infocenterleports)}
            {i.chkpetleports && renderLabelValue("애완동물", i.chkpetleports)}
            {i.parkingleports && renderLabelValue("주차시설", i.parkingleports)}
            {i.usefeeleports && renderLabelValue("이용요금", i.usefeeleports)}
          </div>
        ))}

      {/* Lodging */}
      {props.data.contenttypeid == "32" &&
        info?.map((i: Lodging) => (
          <div key={0} className="flex w-full flex-col gap-y-1">
            {i.checkintime && renderLabelValue("체크인 시간", i.checkintime)}
            {i.checkouttime &&
              renderLabelValue("체크아웃 시간", i.checkouttime)}
            {i.infocenterlodging &&
              renderLabelValue("전화번호", i.infocenterlodging)}
            {i.parkinglodging && renderLabelValue("주차시설", i.parkinglodging)}
            {i.roomcount && renderLabelValue("객실 수", i.roomcount)}
            {i.subfacility && renderLabelValue("부대시설", i.subfacility)}
          </div>
        ))}

      {/* Restaurant */}
      {props.data.contenttypeid == "39" &&
        info?.map((i: Restaurant) => (
          <div key={0} className="flex w-full flex-col gap-y-1">
            {i.opentimefood && renderLabelValue("영업시간", i.opentimefood)}
            {i.infocenterfood && renderLabelValue("전화번호", i.infocenterfood)}
            {i.parkingfood && renderLabelValue("주차시설", i.parkingfood)}
            {i.chkcreditcardfood &&
              renderLabelValue("신용카드", i.chkcreditcardfood)}
            {i.firstmenu && renderLabelValue("추천메뉴", i.firstmenu)}
          </div>
        ))}
    </ModalTemplate>
  );
};

export default TravelItemInfonModal;
