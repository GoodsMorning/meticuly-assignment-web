
import { coreAxios } from '#/lib/axios'
import type { TApiBase } from '#/types/api'
import type { TOrderStatusCount, TProductionOrder } from '#/types/order'

export const getOrderSummary = async (): Promise<TOrderStatusCount[]> => {
  const { data } =
    await coreAxios.get<TApiBase<TOrderStatusCount[]>>('order/summary')

  return data.data
}

export const getOrder = async (): Promise<TProductionOrder[]> => {
  const response = await coreAxios.get<TApiBase<TProductionOrder[]>>('order')
  return response.data.data
}
