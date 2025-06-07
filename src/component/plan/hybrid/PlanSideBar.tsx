"use client";

import SubSideBar from "@component/common/layout/hybrid/SubSideBar";
import { CalendarFold } from "lucide-react";
import { CiMemoPad } from "react-icons/ci";
import { FaHome } from "react-icons/fa";

interface IPlanSideBar {}

const LeftNavItems = [
  {
    icon: <FaHome size={32} />,
    labelTitle: "홈",
    href: "/plan",
    options: {isRequiredAuth: false},
  },
  {
    icon: <CalendarFold size={32} />,
    labelTitle: "일정",
    href: "/plan/schedule",
    options: {isRequiredAuth: true},
  },
  {
    icon: <CiMemoPad size={32} />,
    labelTitle: "메모",
    href: "/plan/memo",
    options: {isRequiredAuth: true},
  },
];

const PlanSideBar = (props: IPlanSideBar) => {

  return (
    <SubSideBar LeftNavItems={LeftNavItems} />
  );
};
export default PlanSideBar;
