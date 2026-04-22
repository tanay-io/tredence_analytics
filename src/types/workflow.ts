export type WorkflowNodeType =
  | "start"
  | "task"
  | "approval"
  | "automated"
  | "end";

export interface KeyValue {
  key: string;
  value: string;
}

export interface StartData extends Record<string, unknown> {
  type: "start";
  title: string;
  metadata: KeyValue[];
}

export interface TaskData extends Record<string, unknown> {
  type: "task";
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: KeyValue[];
}

export interface ApprovalData extends Record<string, unknown> {
  type: "approval";
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedData extends Record<string, unknown> {
  type: "automated";
  title: string;
  actionId: string;
  params: Record<string, string>;
}

export interface EndData extends Record<string, unknown> {
  type: "end";
  endMessage: string;
  summaryFlag: boolean;
}

export type WorkflowNodeData =
  | StartData
  | TaskData
  | ApprovalData
  | AutomatedData
  | EndData;

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimulatePayload {
  nodes: any[];
  edges: any[];
}

export interface SimulateStep {
  nodeId: string;
  label: string;
  status: "success" | "skipped" | "error";
  message: string;
}
