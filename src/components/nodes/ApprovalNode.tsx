import { Handle, Position, NodeProps } from "@xyflow/react";
import { ApprovalData } from "../../types/workflow";
import { useWorkflowStore } from "../../store/workflowStore";

export default function ApprovalNode({ id, data, selected }: NodeProps) {
  const d = data as ApprovalData;
  const deleteNode = useWorkflowStore((s) => s.deleteNode);

  return (
    <div
      className={`relative px-4 py-3 rounded-lg border-2 min-w-[160px] bg-orange-50 border-orange-500 ${selected ? "ring-2 ring-orange-400" : ""}`}
    >
      <Handle type="target" position={Position.Top} />
      <div className="text-orange-800 font-bold text-sm mb-1">
        Approval: {d.title || "Approval"}
      </div>
      {d.approverRole && (
        <div className="text-orange-600 text-xs">
          Approver: {d.approverRole}
        </div>
      )}
      {d.autoApproveThreshold !== undefined && (
        <div className="text-orange-600 text-xs">
          Threshold: {d.autoApproveThreshold}d
        </div>
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
