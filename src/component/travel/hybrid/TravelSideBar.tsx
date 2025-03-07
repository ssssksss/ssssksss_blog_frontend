"use client";

import SubSideBar from "../../common/layout/hybrid/SubSideBar";

interface ITravelSideBar {}

const LeftNavItems = [
  {
    iconPath: "/images/icons/ic-home.svg",
    labelTitle: "홈",
    href: "/travel",
    options: {isRequiredAuth: false},
  },
  {
    iconPath: "/images/icons/ic-map-pin-plus.svg",
    labelTitle: "일정 만들기",
    href: "/travel/schedule/create",
    options: {isRequiredAuth: true},
  },
];

const TravelSideBar = (props: ITravelSideBar) => {

  return (
    <SubSideBar
      LeftNavItems={LeftNavItems}
    />
  );
};
export default TravelSideBar;
