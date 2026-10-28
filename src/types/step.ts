import type { TMaterialTemplate } from './material'

export type TStepType =
  'Machining-1' | 'Machining-2' | 'Assembly' | 'Quality Check' | 'Packaging'

export const STEPS: TStepType[] = [
  'Machining-1',
  'Machining-2',
  'Assembly',
  'Quality Check',
  'Packaging',
] as const

export type TStepTemplate = {
  id: TStepType
  name: string
  description: string
  duration: number
  resources: string[]
  materials: TMaterialTemplate[]
}
