"use client";

import SubSideBar from "@component/common/layout/hybrid/SubSideBar";

interface IPlanSideBar {}

const LeftNavItems = [
  {
    iconPath: "/images/icons/ic-home.svg",
    labelTitle: "홈",
    href: "/plan",
    options: {isRequiredAuth: false},
  },
  {
    iconPath: "/images/icons/ic-calendar.svg",
    labelTitle: "일정",
    href: "/plan/schedule",
    options: {isRequiredAuth: true},
  },
];

const PlanSideBar = (props: IPlanSideBar) => {

  return <SubSideBar LeftNavItems={LeftNavItems} />;
};
export default PlanSideBar;
