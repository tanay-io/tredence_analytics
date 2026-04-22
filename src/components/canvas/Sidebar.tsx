"use client";

const NODE_TYPES = [
  {
    type: "start",
    label: "Start",
    desc: "Entry point",
    color: "border-green-500 bg-green-50 text-green-700",
  },
  {
    type: "task",
    label: "Task",
    desc: "Human action step",
    color: "border-blue-500 bg-blue-50 text-blue-700",
  },
  {
    type: "approval",
    label: "Approval",
    desc: "Manager sign-off",
    color: "border-orange-500 bg-orange-50 text-orange-700",
  },
  {
    type: "automated",
    label: "Automated Step",
    desc: "System action",
    color: "border-purple-500 bg-purple-50 text-purple-700",
  },
  {
    type: "end",
    label: "End",
    desc: "Workflow completion",
    color: "border-red-500 bg-red-50 text-red-700",
  },
];

export default function Sidebar() {
  function onDragStart(e: React.DragEvent, nodeType: string) {
    e.dataTransfer.setData("nodeType", nodeType);
    e.dataTransfer.effectAllowed = "move";
  }

  return (
    <div className="w-52 border-r bg-white p-4 flex flex-col gap-3 shrink-0">
      <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-1">
        Node Types
      </h2>
      {NODE_TYPES.map((n) => (
        <div
          key={n.type}
          draggable
          onDragStart={(e) => onDragStart(e, n.type)}
          className={`border-2 rounded-lg px-3 py-2 cursor-grab active:cursor-grabbing ${n.color}`}
        >
          <div className="font-semibold text-sm">{n.label}</div>
          <div className="text-xs opacity-70">{n.desc}</div>
        </div>
      ))}
      <p className="text-xs text-gray-400 mt-auto">
        Drag nodes onto the canvas
      </p>
    </div>
  );
}
    