import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import useLoading from "@hooks/useLoading";
import useMemoStore from "@store/memoStore";
import useToastifyStore from "@store/toastifyStore";
import {ArrowDownLeft, DiamondPlus} from "lucide-react";
import {useEffect, useState} from "react";
import PlanMemoTextarea from "./PlanMemoTextarea";

interface IPlanHomeMemmo {
  isActive: boolean;
}

const PlanHomeMemo = (props: IPlanHomeMemmo) => {
  const memoStore = useMemoStore();
  const toastifyStore = useToastifyStore();
  const [isHideAddMemo, setIsHideAddMemo] = useState(true);
  const [content, setContent] = useState(""); // State for the textarea content
  const {loading, startLoading, stopLoading} = useLoading(false);

  const crateMemoHandler = async () => {
    startLoading();
    const res = await fetch("/api/plan/memo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({content}),
    });
    if (!res.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "에러",
      });
      stopLoading();
      return;
    }
    const result: IReqCreateMemo = await res.json();
    setContent(""); // Clear the content state after adding a memo
    memoStore.setMemoList([result.data, ...memoStore.memoList]);
    toastifyStore.setToastify({
      type: "success",
      message: "메모 추가",
    });
    stopLoading();
    setIsHideAddMemo(true);
  };

  useEffect(() => {
    const temp = async () => {
      const res = await fetch("/api/plan/memo");
      if (!res.ok) {
        toastifyStore.setToastify({
          type: "error",
          message: "에러",
        });
        stopLoading();
        return;
      }
      const result: IReqReadMemoList = await res.json();
      memoStore.setMemoList(result.data);
      stopLoading();
    };
    temp();
  }, []);

  if (loading) {
    return <LoadingSpinner loading={loading} />;
  }

  return (
    <div className="h-[calc(100%-3rem)] w-full overflow-y-scroll rounded-[1rem]">
      <div
        className={`z-50 ${isHideAddMemo ? "hidden h-0 w-0" : "fixed h-[calc(100%-3.5rem)] w-[calc(100%-0.5rem)]"}`}>
        <div
          className={`${isHideAddMemo ? "h-0 w-0" : "sticky h-full w-full bg-white-100 p-2 shadow-2xl default-outline-nocolor"}`}>
          <textarea
            placeholder="새로운 메모작성"
            value={content} // Bind value to content state
            onChange={(e) => setContent(e.target.value)} // Update content state on change
            className="h-[calc(100%-2.5rem)] w-full resize-none rounded-[.5rem] p-1"
          />
          <div className="flex h-[2rem] w-full justify-between pr-2">
            <button
              onClick={() => setIsHideAddMemo(true)}
              className="h-8 w-8 rounded-[1rem] outline outline-2 default-flex glassmorphism">
              <ArrowDownLeft />
            </button>
            <button
              onClick={() => crateMemoHandler()}
              className="h-8 w-8 rounded-[1rem] outline outline-2 default-flex glassmorphism">
              <DiamondPlus />
            </button>
          </div>
        </div>
      </div>
      <ul
        className={`relative grid h-auto w-full max-w-full grid-cols-2 gap-2 ${isHideAddMemo ? "overflow-y-scroll" : "max-h-full overflow-hidden"} rounded-[1rem] px-2 pb-16 pt-2 text-sm glassmorphism`}>
        {memoStore.memoList.map((i) => (
          <li
            key={i.id}
            style={{height: props.isActive ? "max(12rem, 25vh)" : "12rem"}}
            className="min-w-[calc(50%-0.25rem)] overflow-y-scroll p-2 shadow-lg default-outline-nocolor">
            <PlanMemoTextarea data={i} />
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsHideAddMemo((prev) => !prev)}
        className="fixed left-[calc(100%-3rem)] top-[calc(100%-3rem)] h-10 w-10 rounded-[1.5rem] bg-blue-60 p-1 outline outline-2">
        <DiamondPlus size={"full"} className="text-white-40" />
      </button>
    </div>
  );
};

export default PlanHomeMemo;
