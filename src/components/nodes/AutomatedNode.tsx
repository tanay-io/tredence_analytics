import { Handle, Position, NodeProps } from "@xyflow/react";
import { AutomatedData } from "../../types/workflow";
import { useWorkflowStore } from "../../store/workflowStore";

export default function AutomatedNode({ id, data, selected }: NodeProps) {
  const d = data as AutomatedData;
  const deleteNode = useWorkflowStore((s) => s.deleteNode);

  return (
    <div
      className={`relative px-4 py-3 rounded-lg border-2 min-w-[160px] bg-purple-50 border-purple-500 ${selected ? "ring-2 ring-purple-400" : ""}`}
    >
      <Handle type="target" position={Position.Top} />
      <div className="text-purple-800 font-bold text-sm mb-1">
        Automated: {d.title || "Automated"}
      </div>
      {d.actionId && (
        <div className="text-purple-600 text-xs">Action: {d.actionId}</div>
      )}
      <Handle type="source" position={Position.Bottom} />
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
