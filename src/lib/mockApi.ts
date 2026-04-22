import {
  AutomationAction,
  SimulatePayload,
  SimulateStep,
} from "../types/workflow";

const AUTOMATIONS: AutomationAction[] = [
  { id: "send_email", label: "Send Email", params: ["to", "subject"] },
  {
    id: "generate_doc",
    label: "Generate Document",
    params: ["template", "recipient"],
  },
  { id: "notify_slack", label: "Notify Slack", params: ["channel", "message"] },
  {
    id: "create_ticket",
    label: "Create Ticket",
    params: ["title", "priority"],
  },
];

export async function getAutomations(): Promise<AutomationAction[]> {
  await new Promise((r) => setTimeout(r, 300));
  return AUTOMATIONS;
}

export async function simulateWorkflow(
  payload: SimulatePayload,
): Promise<SimulateStep[]> {
  await new Promise((r) => setTimeout(r, 1000));

  const { nodes, edges } = payload;

  const adjMap: Record<string, string> = {};
  edges.forEach((e: any) => {
    adjMap[e.source] = e.target;
  });

  const startNode = nodes.find((n: any) => n.data.type === "start");
  if (!startNode) return [];

  const ordered: any[] = [];
  let current = startNode;
  const visited = new Set<string>();

  while (current && !visited.has(current.id)) {
    ordered.push(current);
    visited.add(current.id);
    const nextId = adjMap[current.id];
    current = nodes.find((n: any) => n.id === nextId);
  }

  return ordered.map((node: any): SimulateStep => {
    const d = node.data;
    switch (d.type) {
      case "start":
        return {
          nodeId: node.id,
          label: d.title || "Start",
          status: "success",
          message: "Workflow initialized successfully.",
        };
      case "task":
        return {
          nodeId: node.id,
          label: d.title || "Task",
          status: "success",
          message: `Task assigned to ${d.assignee || "Unassigned"}. Due: ${d.dueDate || "No date"}.`,
        };
      case "approval":
        return {
          nodeId: node.id,
          label: d.title || "Approval",
          status: "success",
          message: `Awaiting ${d.approverRole || "approver"} sign-off. Threshold: ${d.autoApproveThreshold ?? 0} days.`,
        };
      case "automated":
        return {
          nodeId: node.id,
          label: d.title || "Automated",
          status: "success",
          message: `Action "${d.actionId || "none"}" executed with params: ${JSON.stringify(d.params || {})}.`,
        };
      case "end":
        return {
          nodeId: node.id,
          label: "End",
          status: "success",
          message: d.endMessage || "Workflow complete.",
        };
      default:
        return {
          nodeId: node.id,
          label: "Unknown",
          status: "error",
          message: "Unknown node type.",
        };
    }
  });
}
