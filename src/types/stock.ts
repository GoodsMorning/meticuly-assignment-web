import type { TMaterialStock } from "./material"
import type { TResourceItem } from "./resource"

export type TStock = {
  materials: TMaterialStock[]
  resources: TResourceItem[]
}
