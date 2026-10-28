import type { TStepTemplate, TStepType } from "#/types/step";

export const DEFAULT_INIT_STEP: TStepType[] = ['Machining-1', 'Assembly', 'Quality Check', 'Packaging']

export const STEP_CATALOG: TStepTemplate[] = [
  {
    id: 'Machining-1',
    name: 'Machining-1',
    description: 'Machine and prepare raw components.',
    duration: 90,
    resources: ['Machine 01'],
    materials: [
      {
        name: 'Material A',
        unit: 'kg',
        numerator: 12,
        denominator: 100,
      },
    ],
  },
  {
    id: 'Machining-2',
    name: 'Machining-2',
    description: 'Machine and prepare raw components.',
    duration: 90,
    resources: ['Machine 02'],
    materials: [
      {
        name: 'Material B',
        unit: 'kg',
        numerator: 12,
        denominator: 100,
      },
    ],
  },
  {
    id: 'Assembly',
    name: 'Assembly',
    description: 'Assemble components into the finished product.',
    duration: 90,
    resources: ['Assembly Station 01'],
    materials: [
      {
        name: 'Material B',
        unit: 'pcs',
        numerator: 8,
        denominator: 100,
      },
      {
        name: 'Fasteners',
        unit: 'pcs',
        numerator: 40,
        denominator: 100,
      },
    ],
  },
  {
    id: 'Quality Check',
    name: 'Quality Check',
    description: 'Inspect product quality and specifications.',
    duration: 60,
    resources: ['QC Station 01', 'Inspection Kit'],
    materials: [
      {
        name: 'Calibration Fluid',
        unit: 'L',
        numerator: 5,
        denominator: 1000,
      },
    ],
  },
  {
    id: 'Packaging',
    name: 'Packaging',
    description: 'Pack finished products for delivery.',
    duration: 60,
    resources: ['Packaging Station 01'],
    materials: [
      {
        name: 'Material C',
        unit: 'boxes',
        numerator: 1,
        denominator: 1,
      },
      {
        name: 'Label Roll',
        unit: 'roll',
        numerator: 1,
        denominator: 100,
      },
    ],
  },
]