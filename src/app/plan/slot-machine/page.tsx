import WordSlotMachine from "@component/slot-machine/hybrid/WordSlotMachine";

export async function generateMetadata() {
  return {
    title: "에이지의 아이디어",
    description: "에이지의 아이디어",
  };
}

interface IPage {}
const Page = (props: IPage) => {
  return (
    <div className={"flex w-full flex-col pt-8"}>
      <WordSlotMachine />
    </div>
  );
};
export default Page;
