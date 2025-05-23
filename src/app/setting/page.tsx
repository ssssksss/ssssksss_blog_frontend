import ThemeSettingView from "@component/setting/view/ThemeSettingView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "에이지의 블로그",
  description: "설정",
};
interface IPage {}

const Page = async (props: IPage) => {
  return (
    <div className={"w-full min-h-full p-2 bg-default-1"}>
      <ThemeSettingView />
    </div>
  );
};
export default Page;
