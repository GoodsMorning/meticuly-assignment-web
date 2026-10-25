import { getResources } from "#/services/resource"
import { useQuery } from "@tanstack/react-query"

export const resourceKeys = {
  all: ['resources'] as const,
}

export const useResources = () =>
  useQuery({
    queryKey: resourceKeys.all,
    queryFn: getResources,
    initialData: [],
  })