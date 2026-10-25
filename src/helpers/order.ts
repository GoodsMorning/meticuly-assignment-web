import type { TOrderOperation, TOrderStatus, TProductionOrder } from "#/types/order"

export const getOrderStatus = (order: TProductionOrder): TOrderStatus => {
  const statuses = order.operations.map((operation) => operation.status)

  if (statuses.includes('blocked')) return 'blocked'
  if (statuses.every((status) => status === 'finished')) return 'finished'
  if (statuses.includes('in-progress')) return 'in-progress'
  if (statuses.some((status) => status === 'finished')) return 'in-progress'
  return 'queued'
}

export const getCurrentOperation = (order: TProductionOrder): TOrderOperation =>
  order.operations.find((operation) => operation.status !== 'finished') ??
  order.operations[order.operations.length - 1]