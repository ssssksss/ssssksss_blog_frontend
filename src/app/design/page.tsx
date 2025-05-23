import DesignHome from "@component/design/hybrid/DesignHome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "에이지의 블로그",
  description: "디자인",
};
interface IPage {}

async function getData() {

}

const Page = async (props: IPage) => {
  return (
    <DesignHome />
  );
};
export default Page;
