declare interface IKeywordTravel {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  firstimage: string;
  firstimage2: string;
  cpyrhtDivCd: string;
  mapx: number;
  mapy: number;
  mlevel: string;
  modifiedtime: string;
  sigungucode: string;
  tel: string;
  title: string;
}

// 공통 응답 타입
interface CommonResponse<T> {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: T[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

// 기본 항목
interface BaseTourPlace {
  contentid: string;
  contenttypeid: string;
  title: string;
  addr1?: string;
  addr2?: string;
  mapx?: string;
  mapy?: string;
  tel?: string;
}

// 12
declare interface TourAttraction extends BaseTourPlace {
  accomcount?: string;
  chkbabycarriage?: string;
  chkcreditcard?: string;
  chkpet?: string;
  expagerange?: string;
  expguide?: string;
  heritage1?: string;
  heritage2?: string;
  heritage3?: string;
  infocenter?: string;
  opendate?: string;
  parking?: string;
  restdate?: string;
  useseason?: string;
  usetime?: string;
}

// 14
declare interface CultureFacility extends BaseTourPlace {
  accomcountculture?: string;
  chkbabycarriageculture?: string;
  chkcreditcardculture?: string;
  chkpetculture?: string;
  discountinfo?: string;
  infocenterculture?: string;
  parkingculture?: string;
  parkingfee?: string;
  restdateculture?: string;
  usefee?: string;
  usetimeculture?: string;
  scale?: string;
  spendtime?: string;
}

// 15
declare interface Festival extends BaseTourPlace {
  agelimit?: string;
  bookingplace?: string;
  discountinfofestival?: string;
  eventenddate?: string;
  eventhomepage?: string;
  eventplace?: string;
  eventstartdate?: string;
  festivalgrade?: string;
  placeinfo?: string;
  playtime?: string;
  program?: string;
  spendtimefestival?: string;
  sponsor1?: string;
  sponsor1tel?: string;
  sponsor2?: string;
  sponsor2tel?: string;
  subevent?: string;
  usetimefestival?: string;
}

// 28
declare interface Leports extends BaseTourPlace {
  accomcountleports?: string;
  chkbabycarriageleports?: string;
  chkcreditcardleports?: string;
  chkpetleports?: string;
  expagerangeleports?: string;
  infocenterleports?: string;
  openperiod?: string;
  parkingfeeleports?: string;
  parkingleports?: string;
  reservation?: string;
  restdateleports?: string;
  scaleleports?: string;
  usefeeleports?: string;
  usetimeleports?: string;
}

// 32
declare interface Lodging extends BaseTourPlace {
  accomcountlodging?: string;
  benikia?: string;
  checkintime?: string;
  checkouttime?: string;
  chkcooking?: string;
  foodplace?: string;
  goodstay?: string;
  hanok?: string;
  infocenterlodging?: string;
  parkinglodging?: string;
  pickup?: string;
  roomcount?: string;
  reservationlodging?: string;
  reservationurl?: string;
  roomtype?: string;
  scalelodging?: string;
  subfacility?: string;
  barbecue?: string;
  fitness?: string;
  sauna?: string;
  sports?: string;
  refundregulation?: string;
}

// 39
declare interface Restaurant extends BaseTourPlace {
  chkcreditcardfood?: string;
  discountinfofood?: string;
  firstmenu?: string;
  infocenterfood?: string;
  kidsfacility?: string;
  opendatefood?: string;
  opentimefood?: string;
  packing?: string;
  parkingfood?: string;
  reservationfood?: string;
  restdatefood?: string;
  scalefood?: string;
  seat?: string;
  smoking?: string;
  treatmenu?: string;
  lcnsno?: string;
}

declare type TourPlace =
  | TourAttraction
  | CultureFacility
  | Festival
  | Leports
  | Lodging
  | Restaurant;

declare type TourPlaceType<T extends number> = T extends 12
  ? TourAttraction
  : T extends 14
    ? CultureFacility
    : T extends 15
      ? Festival
      : T extends 28
        ? Leports
        : T extends 32
          ? Lodging
          : T extends 39
            ? Restaurant
            : BaseTourPlace;
