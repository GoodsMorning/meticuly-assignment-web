import { coreAxios } from '#/lib/axios'
import type { TApiBase } from '#/types/api'
import type { TResourceItem } from '#/types/resource'

export const getResources = async (): Promise<TResourceItem[]> => {
  const { data } = await coreAxios.get<TApiBase<TResourceItem[]>>('resource')
  return data.data
}