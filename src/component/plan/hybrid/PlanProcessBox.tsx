"use client";

import PlanProcessGrid from "./PlanProcessGrid";


interface IPlanProcessBox {

}

const nodes = [
  {id: "A", x: 100, y: 100, label: "Start"},
  {id: "B", x: 300, y: 100, label: "Process"},
  {id: "C", x: 300, y: 300, label: "End"},
];

const edges = [
  {from: "A", to: "B"},
  {from: "B", to: "C"},
];


const PlanProcessBox = (props: IPlanProcessBox) => {
  return (
    <div className={"flex w-full flex-col"}>
      <PlanProcessGrid nodes={nodes} edges={edges} />
    </div>
  );
};
export default PlanProcessBox;