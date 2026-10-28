export type TResourceStatus = "busy" | "idle" | "blocked";

export type TResourceItem = {
  id: string;
  name: string;
  status: TResourceStatus;
  utilization: number;
  orders: string[];
  note: string;
};