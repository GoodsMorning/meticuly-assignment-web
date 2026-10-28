import { coreAxios } from '#/lib/axios'
import type { TApiBase } from '#/types/api'
import type { TStock } from '#/types/stock'

export const getStock = async (): Promise<TStock> => {
  const { data } = await coreAxios.get<TApiBase<TStock>>('stock')
  return data.data
}