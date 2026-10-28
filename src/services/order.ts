
import { coreAxios } from '#/lib/axios'
import type { TApiBase } from '#/types/api'
import type { TCreateOrderRequest, TOrderStatusCount, TProductionOrder } from '#/types/order'

export const getOrderSummary = async (): Promise<TOrderStatusCount[]> => {
  const { data } =
    await coreAxios.get<TApiBase<TOrderStatusCount[]>>('order/summary')

  return data.data
}

export const getOrder = async (): Promise<TProductionOrder[]> => {
  const response = await coreAxios.get<TApiBase<TProductionOrder[]>>('order')
  return response.data.data
}

export const createOrder = async (payload: TCreateOrderRequest): Promise<TProductionOrder> => {
  const response = await coreAxios.post<TApiBase<TProductionOrder>>('order', payload)
  return response.data.data
}