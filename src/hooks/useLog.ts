import { getLogs } from "#/services/log"
import { useQuery } from "@tanstack/react-query"

export const logKeys = {
  all: ['logs'] as const,
}

export const useLogs = () =>
  useQuery({
    queryKey: logKeys.all,
    queryFn: getLogs,
    initialData: [],
  })