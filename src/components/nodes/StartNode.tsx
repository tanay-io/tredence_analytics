import { Handle, Position, NodeProps } from "@xyflow/react";
import { StartData } from "../../types/workflow";
import { useWorkflowStore } from "../../store/workflowStore";

export default function StartNode({ id, data, selected }: NodeProps) {
  const d = data as StartData;
  const deleteNode = useWorkflowStore((s) => s.deleteNode);

  return (
    <div
      className={`relative px-4 py-3 rounded-full border-2 min-w-[120px] text-center bg-green-50 border-green-500 ${selected ? "ring-2 ring-green-400" : ""}`}
    >
      <Handle type="source" position={Position.Bottom} />
      <div className="text-green-700 font-bold text-sm">
        Start: {d.title || "Start"}
      </div>
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
