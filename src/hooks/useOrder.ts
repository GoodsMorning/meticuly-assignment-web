import { getOrder, getOrderSummary } from '#/services/order'
import { useQuery } from '@tanstack/react-query'


export const orderKeys = {
  all: ['orders'] as const,
  summary: ['orders', 'summary'] as const,
}

export const useOrders = () =>
  useQuery({
    queryKey: orderKeys.all,
    queryFn: getOrder,
    initialData: [],
  })

export const useOrderSummary = () =>
  useQuery({
    queryKey: orderKeys.summary,
    queryFn: getOrderSummary,
    initialData: [],
  })