import type { TMaterial } from "./material"
import type { TStepName } from "./step"

export type TOrderStatus = 'queued' | 'in-progress' | 'blocked' | 'finished'

export type TOrderOperation = {
  step: TStepName
  start: number
  duration: number
  status: TOrderStatus
  resources: string[]
  materials: TMaterial[]
}

export type TProductionOrder = {
  id: string
  operations: TOrderOperation[]
}

