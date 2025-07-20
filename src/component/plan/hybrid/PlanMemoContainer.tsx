"use client";

import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { useInitialThenStoreWithSync } from "@hooks/useInitialThenStoreWithSync";
import useMemoStore from "@store/memoStore";
import { DiamondPlus } from "lucide-react";
import PlanMemoCreateModal from "./PlanMemoCreateModal";
import PlanMemoTextarea from "./PlanMemoTextarea";

interface IPlanMemoContainer {
  data: IMemo[];
}
const PlanMemoContainer = (props: IPlanMemoContainer) => {
  const memoList = useInitialThenStoreWithSync({
    initialData: props.data,
    store: useMemoStore,
    selector: (state) => state.memoList,
    setSelector: (state) => state.setMemoList,
  });

  return (
    <div
      className={
        "grid h-full w-full gap-2 p-2 text-black-80 transition-transform duration-300"
      }
    >
      <article
        className={"h-full rounded-[1rem] bg-blue-20 shadow-md scrollbar-hide"}
      >
        <h2 className="h-[3rem] py-2 text-center font-gmarketSansBold text-lg">
          메모장
        </h2>
        <div className="h-full w-full rounded-[1rem]">
          <ul
            className={"relative grid h-full w-full max-w-full grid-cols-1 gap-2 min-[960px]:grid-cols-2 rounded-[1rem] p-2 text-sm glassmorphism"}
          >
            {memoList.map((i, index) => (
              <li
                key={i.id}
                className="default-primary-outline-nocolor px-2 shadow-lg"
              >
                <PlanMemoTextarea data={i} />
              </li>
            ))}
          </ul>
          <ModalButton
            modal={<PlanMemoCreateModal />}
            buttonClassName="fixed left-[calc(100%-3rem)] top-[calc(100%-3rem)] h-10 w-10 rounded-[1.5rem] bg-blue-60 p-1 outline outline-2"
          >
            <DiamondPlus size={"full"} className="text-white-40" />
          </ModalButton>
        </div>
      </article>
    </div>
  );
};
export default PlanMemoContainer;
