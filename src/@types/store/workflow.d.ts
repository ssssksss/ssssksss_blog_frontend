declare interface WorkflowNode {
  id: string;
  position: [number, number, number];
  color: string; // green | orange | red
};

declare interface WorkflowEdge {
  from: string;
  to: string;
  color?: string;
};
