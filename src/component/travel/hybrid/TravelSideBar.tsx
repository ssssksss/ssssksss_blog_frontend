"use client";

import { FaHome } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import SubSideBar from "../../common/layout/hybrid/SubSideBar";
interface ITravelSideBar {}

const LeftNavItems = [
  {
    icon: <FaHome size={32} />,
    labelTitle: "홈",
    href: "/travel",
    options: {isRequiredAuth: false},
  },
  {
    icon: <FaMapLocationDot size={32} />,
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
