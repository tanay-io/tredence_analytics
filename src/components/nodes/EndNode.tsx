import { Handle, Position, NodeProps } from "@xyflow/react";
import { EndData } from "../../types/workflow";
import { useWorkflowStore } from "..//../store/workflowStore";

export default function EndNode({ id, data, selected }: NodeProps) {
  const d = data as EndData;
  const deleteNode = useWorkflowStore((s) => s.deleteNode);

  return (
    <div
      className={`relative px-4 py-3 rounded-full border-2 min-w-[120px] text-center bg-red-50 border-red-500 ${selected ? "ring-2 ring-red-400" : ""}`}
    >
      <Handle type="target" position={Position.Top} />
      <div className="text-red-700 font-bold text-sm">End</div>
      {d.endMessage && (
        <div className="text-red-500 text-xs mt-1 truncate max-w-[100px] mx-auto">
          {d.endMessage}
        </div>
      )}
      {selected && (
        <button
          onClick={() => deleteNode(id)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
        >
          X
        </button>
      )}
    </div>
  );
}
