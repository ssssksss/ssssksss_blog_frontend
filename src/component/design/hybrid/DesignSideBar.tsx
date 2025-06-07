"use client";

import SubSideBar from "@component/common/layout/hybrid/SubSideBar";
import { CalendarFold } from "lucide-react";
import { FaHome } from "react-icons/fa";
interface IDesignSideBar {}

const LeftNavItems = [
  {
    icon: <FaHome size={32} />,
    labelTitle: "홈",
    href: "/design",
    options: {isRequiredAuth: false},
  },
  {
    icon: <CalendarFold size={32} />,
    labelTitle: "대비",
    href: "/design/color-contrast",
    options: {isRequiredAuth: false},
  },
];

const DesignSideBar = (props: IDesignSideBar) => {
  return <SubSideBar LeftNavItems={LeftNavItems} />;
};
export default DesignSideBar;
