import { createOrder, getOrder, getOrderSummary } from '#/services/order'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { logKeys } from './useLog'
import { resourceKeys } from './useStock'

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

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrder,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: orderKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: orderKeys.summary,
        }),
        queryClient.invalidateQueries({
          queryKey: logKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: resourceKeys.all,
        }),
      ])
    },
  })
}