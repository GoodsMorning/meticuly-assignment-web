import { getStock } from "#/services/stock"
import { useQuery } from "@tanstack/react-query"

export const resourceKeys = {
  all: ['resources'] as const,
}

export const useStock = () =>
  useQuery({
    queryKey: resourceKeys.all,
    queryFn: getStock,
    initialData: {
      materials: [],
      resources: [],
    },
  })