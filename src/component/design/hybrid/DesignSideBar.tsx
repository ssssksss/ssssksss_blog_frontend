"use client";

import SubSideBar from "@component/common/layout/hybrid/SubSideBar";

interface IDesignSideBar {}

const LeftNavItems = [
  {
    iconPath: "/images/icons/ic-home.svg",
    labelTitle: "홈",
    href: "/Design",
    options: {isRequiredAuth: false},
  },
  {
    iconPath: "/images/icons/ic-calendar.svg",
    labelTitle: "대비",
    href: "/Design/",
    options: {isRequiredAuth: true},
  },
];

const DesignSideBar = (props: IDesignSideBar) => {
  return <SubSideBar LeftNavItems={LeftNavItems} />;
};
export default DesignSideBar;
