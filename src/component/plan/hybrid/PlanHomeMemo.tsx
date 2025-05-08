import ModalButton from "@component/common/modal/hybrid/ModalButton";
import useFetchCSR from "@hooks/useFetchCSR";
import useModalState from "@hooks/useModalState";
import useMemoStore from "@store/memoStore";
import { DiamondPlus } from "lucide-react";
import { useEffect } from "react";
import PlanMemoCreateModal from "./PlanMemoCreateModal";
import PlanMemoTextarea from "./PlanMemoTextarea";

interface IPlanHomeMemmo {
  isActive: boolean;
}

const PlanHomeMemo = (props: IPlanHomeMemmo) => {
  const modalState = useModalState();
  const fetchCSR = useFetchCSR();
  const memoStore = useMemoStore();

  useEffect(() => {
    const temp = async () => {
      const result: IMemo[] = await fetchCSR.requestWithHandler({
        url: "/api/plan/memo",
      });
      if (result == undefined) return;
      memoStore.setMemoList(result);
    };
    temp();
  }, []);

  return (
    <div className="h-full w-full rounded-[1rem]">
      <ul
        className={`relative grid h-full w-full max-w-full grid-cols-1 min-[960px]:grid-cols-2 gap-2 ${modalState.isOpen ? "overflow-scroll" : "overflow-hidden"} rounded-[1rem] p-2 text-sm glassmorphism`}>
        {memoStore.memoList.map((i,index) => (
          <li
            key={i.id}
            className="p-2 shadow-lg default-primary-outline-nocolor">
            <PlanMemoTextarea data={i} />
          </li>
        ))}
      </ul>
      <ModalButton
        onClick={() => modalState.openModal()}
        modal={<PlanMemoCreateModal />}
        buttonClassName="fixed left-[calc(100%-3rem)] top-[calc(100%-3rem)] h-10 w-10 rounded-[1.5rem] bg-blue-60 p-1 outline outline-2">
        <DiamondPlus size={"full"} className="text-white-40" />
      </ModalButton>
    </div>
  );
};

export default PlanHomeMemo;
