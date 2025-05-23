import DesignHome from "@component/design/hybrid/DesignHome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "가출한토토로의 블로그",
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
