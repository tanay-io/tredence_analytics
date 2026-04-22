import { Handle, Position, NodeProps } from "@xyflow/react";
import { TaskData } from "../../types/workflow";
import { useWorkflowStore } from "../../store/workflowStore";

export default function TaskNode({ id, data, selected }: NodeProps) {
  const d = data as TaskData;
  const deleteNode = useWorkflowStore((s) => s.deleteNode);

  return (
    <div
      className={`relative px-4 py-3 rounded-lg border-2 min-w-[160px] bg-blue-50 border-blue-500 ${selected ? "ring-2 ring-blue-400" : ""}`}
    >
      <Handle type="target" position={Position.Top} />
      <div className="text-blue-800 font-bold text-sm mb-1">
        Task: {d.title || "Task"}
      </div>
      {d.assignee && (
        <div className="text-blue-600 text-xs">Assignee: {d.assignee}</div>
      )}
      {d.dueDate && (
        <div className="text-blue-600 text-xs">Due: {d.dueDate}</div>
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
