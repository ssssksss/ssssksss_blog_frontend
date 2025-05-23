import DesignColorHome from "@component/design/hybrid/DesignColorHome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "가출한토토로의 블로그",
  description: "디자인 색상 대비",
};
interface IPage {}

async function getData() {

}

const Page = async (props: IPage) => {
  return (
    <DesignColorHome />
  );
};
export default Page;
