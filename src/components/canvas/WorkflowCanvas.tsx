"use client";

import { useCallback } from "react";
import  { ReactFlow,Background, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useWorkflowStore } from "../../store/workflowStore";
import { nodeTypes } from "../../components/nodes";
import { WorkflowNodeData, WorkflowNodeType } from "../../types/workflow";
import { Node } from "@xyflow/react";

const DEFAULT_DATA: Record<WorkflowNodeType, WorkflowNodeData> = {
  start: { type: "start", title: "Start", metadata: [] },
  task: {
    type: "task",
    title: "New Task",
    description: "",
    assignee: "",
    dueDate: "",
    customFields: [],
  },
  approval: {
    type: "approval",
    title: "Approval",
    approverRole: "Manager",
    autoApproveThreshold: 3,
  },
  automated: {
    type: "automated",
    title: "Automated",
    actionId: "",
    params: {},
  },
  end: { type: "end", endMessage: "Workflow complete.", summaryFlag: false },
};

export default function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    addNode,
  } = useWorkflowStore();

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const type = e.dataTransfer.getData("nodeType") as WorkflowNodeType;
      if (!type) return;

      const bounds = (e.target as HTMLElement)
        .closest(".react-flow")
        ?.getBoundingClientRect();
      if (!bounds) return;

      const position = {
        x: e.clientX - bounds.left - 80,
        y: e.clientY - bounds.top - 40,
      };

      const newNode: Node<WorkflowNodeData> = {
        id: crypto.randomUUID(),
        type,
        position,
        data: DEFAULT_DATA[type],
      };

      addNode(newNode);
    },
    [addNode],
  );

  return (
    <div className="flex-1 h-full" onDragOver={onDragOver} onDrop={onDrop}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node.id)}
        onPaneClick={() => setSelectedNode(null)}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
