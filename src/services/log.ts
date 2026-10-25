import { coreAxios } from '#/lib/axios'
import type { TApiBase } from '#/types/api'
import type { TLog } from '#/types/log'

export const getLogs = async (): Promise<TLog[]> => {
  const { data } = await coreAxios.get<TApiBase<TLog[]>>('log')
  return data.data
}
