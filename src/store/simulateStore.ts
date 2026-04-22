import { create } from "zustand";
import { SimulateStep } from "../types/workflow";
import { simulateWorkflow } from "../lib/mockApi";
import { useWorkflowStore } from "./workflowStore";

function validateGraph(nodes: any[], edges: any[]): string[] {
  const errors: string[] = [];

  const startNodes = nodes.filter((n) => n.data.type === "start");
  const endNodes = nodes.filter((n) => n.data.type === "end");

  if (startNodes.length === 0) errors.push("Workflow must have a Start node.");
  if (startNodes.length > 1)
    errors.push("Workflow can only have one Start node.");
  if (endNodes.length === 0) errors.push("Workflow must have an End node.");

  nodes.forEach((n) => {
    const connected = edges.some((e) => e.source === n.id || e.target === n.id);
    if (!connected)
      errors.push(`Node "${n.data.title || n.data.type}" is not connected.`);
  });

  if (startNodes.length > 0) {
    const startHasIncoming = edges.some((e) => e.target === startNodes[0].id);
    if (startHasIncoming)
      errors.push("Start node cannot have incoming connections.");
  }

  const adjMap: Record<string, string[]> = {};
  nodes.forEach((n) => {
    adjMap[n.id] = [];
  });
  edges.forEach((e) => {
    adjMap[e.source]?.push(e.target);
  });

  const visited = new Set<string>();
  const recStack = new Set<string>();

  function hasCycle(nodeId: string): boolean {
    visited.add(nodeId);
    recStack.add(nodeId);
    for (const neighbor of adjMap[nodeId] || []) {
      if (!visited.has(neighbor) && hasCycle(neighbor)) return true;
      if (recStack.has(neighbor)) return true;
    }
    recStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id) && hasCycle(node.id)) {
      errors.push("Workflow contains a cycle. Loops are not allowed.");
      break;
    }
  }

  return errors;
}

interface SimulateState {
  isSimulating: boolean;
  steps: SimulateStep[];
  validationErrors: string[];

  runSimulation: () => Promise<void>;
  clearResults: () => void;
}

export const useSimulateStore = create<SimulateState>((set) => ({
  isSimulating: false,
  steps: [],
  validationErrors: [],

  runSimulation: async () => {
    const { nodes, edges } = useWorkflowStore.getState();

    const errors = validateGraph(nodes, edges);
    if (errors.length > 0) {
      set({ validationErrors: errors, steps: [] });
      return;
    }

    set({ isSimulating: true, validationErrors: [], steps: [] });
    const steps = await simulateWorkflow({ nodes, edges });
    set({ steps, isSimulating: false });
  },

  clearResults: () =>
    set({ steps: [], validationErrors: [], isSimulating: false }),
}));
