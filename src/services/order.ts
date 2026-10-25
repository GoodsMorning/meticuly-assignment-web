import type { TStatusCardProps } from "#/components/StatusCard"
import type { TMaterial } from "#/types/material"
import type { TProductionOrder } from "#/types/order"

const material = (name: string, quantity: number, unit: string): TMaterial => ({
  name,
  quantity,
  unit,
})

export const getOrderSummary = () : TStatusCardProps[] => {
  return [
    { status: 'queued', value: 12 },
    { status: 'in-progress', value: 8 },
    { status: 'blocked', value: 2 },
    { status: 'finished', value: 24 },
  ]
}

export const getOrder = () : TProductionOrder[] => {
  return [
  {
    id: 'ORD-001',
    operations: [
      {
        step: 'Machining-1',
        start: -270,
        duration: 90,
        status: 'finished',
        resources: ['Machine 01'],
        materials: [material('Material A', 12, 'kg')],
      },
      {
        step: 'Assembly',
        start: -180,
        duration: 90,
        status: 'finished',
        resources: ['Assembly Station 01'],
        materials: [
          material('Material B', 8, 'pcs'),
          material('Fasteners', 40, 'pcs'),
        ],
      },
      {
        step: 'Quality Check',
        start: -90,
        duration: 60,
        status: 'finished',
        resources: ['QC Station 01', 'Inspection Kit'],
        materials: [material('Calibration Fluid', 0.5, 'L')],
      },
      {
        step: 'Packaging',
        start: -30,
        duration: 60,
        status: 'in-progress',
        resources: ['Packaging Station 01'],
        materials: [
          material('Material C', 4, 'boxes'),
          material('Label Roll', 1, 'roll'),
        ],
      },
    ],
  },
  {
    id: 'ORD-002',
    operations: [
      {
        step: 'Machining-1',
        start: -150,
        duration: 90,
        status: 'finished',
        resources: ['Machine 01'],
        materials: [material('Material A', 10, 'kg')],
      },
      {
        step: 'Assembly',
        start: -60,
        duration: 120,
        status: 'in-progress',
        resources: ['Assembly Station 01'],
        materials: [
          material('Material B', 6, 'pcs'),
          material('Fasteners', 32, 'pcs'),
        ],
      },
      {
        step: 'Quality Check',
        start: 60,
        duration: 60,
        status: 'queued',
        resources: ['QC Station 01', 'Inspection Kit'],
        materials: [material('Calibration Fluid', 0.5, 'L')],
      },
      {
        step: 'Packaging',
        start: 120,
        duration: 60,
        status: 'queued',
        resources: ['Packaging Station 01'],
        materials: [
          material('Material C', 3, 'boxes'),
          material('Label Roll', 1, 'roll'),
        ],
      },
    ],
  },
  {
    id: 'ORD-003',
    operations: [
      {
        step: 'Machining-1',
        start: -120,
        duration: 90,
        status: 'finished',
        resources: ['Machine 02'],
        materials: [material('Material A', 15, 'kg')],
      },
      {
        step: 'Assembly',
        start: -30,
        duration: 75,
        status: 'blocked',
        resources: ['Assembly Station 02'],
        materials: [
          material('Material B', 10, 'pcs'),
          material('Fasteners', 50, 'pcs'),
        ],
      },
      {
        step: 'Quality Check',
        start: 45,
        duration: 60,
        status: 'queued',
        resources: ['QC Station 01', 'Inspection Kit'],
        materials: [material('Calibration Fluid', 0.5, 'L')],
      },
      {
        step: 'Packaging',
        start: 105,
        duration: 60,
        status: 'queued',
        resources: ['Packaging Station 02'],
        materials: [material('Material C', 5, 'boxes')],
      },
    ],
  },
  {
    id: 'ORD-004',
    operations: [
      {
        step: 'Machining-1',
        start: 10,
        duration: 150,
        status: 'queued',
        resources: ['Machine 01'],
        materials: [material('Material B', 20, 'kg')],
      },
      {
        step: 'Assembly',
        start: 160,
        duration: 90,
        status: 'queued',
        resources: ['Assembly Station 01'],
        materials: [
          material('Material B', 12, 'pcs'),
          material('Fasteners', 60, 'pcs'),
        ],
      },
      {
        step: 'Quality Check',
        start: 250,
        duration: 45,
        status: 'queued',
        resources: ['QC Station 01', 'Inspection Kit'],
        materials: [material('Calibration Fluid', 0.5, 'L')],
      },
      {
        step: 'Packaging',
        start: 295,
        duration: 60,
        status: 'queued',
        resources: ['Packaging Station 01'],
        materials: [
          material('Material C', 6, 'boxes'),
          material('Label Roll', 1, 'roll'),
        ],
      },
    ],
  },
  {
    id: 'ORD-005',
    operations: [
      {
        step: 'Machining-1',
        start: 90,
        duration: 90,
        status: 'queued',
        resources: ['Machine 02'],
        materials: [material('Material A', 14, 'kg')],
      },
      {
        step: 'Assembly',
        start: 180,
        duration: 90,
        status: 'queued',
        resources: ['Assembly Station 02'],
        materials: [
          material('Material B', 9, 'pcs'),
          material('Fasteners', 45, 'pcs'),
        ],
      },
      {
        step: 'Quality Check',
        start: 270,
        duration: 45,
        status: 'queued',
        resources: ['QC Station 01', 'Inspection Kit'],
        materials: [material('Calibration Fluid', 0.5, 'L')],
      },
      {
        step: 'Packaging',
        start: 315,
        duration: 45,
        status: 'queued',
        resources: ['Packaging Station 02'],
        materials: [material('Material C', 4, 'boxes')],
      },
    ],
  },
  {
    id: 'ORD-006',
    operations: [
      {
        step: 'Machining-1',
        start: -90,
        duration: 90,
        status: 'finished',
        resources: ['Machine 02'],
        materials: [material('Material A', 14, 'kg')],
      },
      {
        step: 'Machining-2',
        start: 0,
        duration: 90,
        status: 'queued',
        resources: ['Machine 02'],
        materials: [material('Material A', 14, 'kg')],
      },
      {
        step: 'Machining-1',
        start: 0,
        duration: 90,
        status: 'queued',
        resources: ['Machine 02'],
        materials: [material('Material A', 14, 'kg')],
      },
      {
        step: 'Assembly',
        start: 180,
        duration: 90,
        status: 'queued',
        resources: ['Assembly Station 02'],
        materials: [
          material('Material B', 9, 'pcs'),
          material('Fasteners', 45, 'pcs'),
        ],
      },
      {
        step: 'Quality Check',
        start: 270,
        duration: 45,
        status: 'queued',
        resources: ['QC Station 01', 'Inspection Kit'],
        materials: [material('Calibration Fluid', 0.5, 'L')],
      },
      {
        step: 'Packaging',
        start: 315,
        duration: 45,
        status: 'queued',
        resources: ['Packaging Station 02'],
        materials: [material('Material C', 4, 'boxes')],
      },
    ],
  },
]
  // [
  //   {
  //     id: 'ORD-001',
  //     operations: [
  //       {
  //         step: 'Machining',
  //         start: -270,
  //         duration: 90,
  //         status: 'finished',
  //         resources: ['Machine 01'],
  //         materials: [m('Material A', 12, 'kg')],
  //       },
  //       {
  //         step: 'Assembly',
  //         start: -180,
  //         duration: 90,
  //         status: 'finished',
  //         resources: ['Assembly Station 01'],
  //         materials: [m('Material B', 8, 'pcs'), m('Fasteners', 40, 'pcs')],
  //       },
  //       {
  //         step: 'Quality Check',
  //         start: -90,
  //         duration: 60,
  //         status: 'finished',
  //         resources: ['QC Station 01', 'Inspection Kit'],
  //         materials: [m('Calibration Fluid', 0.5, 'L')],
  //       },
  //       {
  //         step: 'Packaging',
  //         start: -30,
  //         duration: 60,
  //         status: 'in-progress',
  //         resources: ['Packaging Station 01'],
  //         materials: [m('Material C', 4, 'boxes'), m('Label Roll', 1, 'roll')],
  //       },
  //     ],
  //   },
  //   {
  //     id: 'ORD-002',
  //     operations: [
  //       {
  //         step: 'Machining',
  //         start: -150,
  //         duration: 90,
  //         status: 'finished',
  //         resources: ['Machine 01'],
  //         materials: [m('Material A', 10, 'kg')],
  //       },
  //       {
  //         step: 'Assembly',
  //         start: -60,
  //         duration: 120,
  //         status: 'in-progress',
  //         resources: ['Assembly Station 01'],
  //         materials: [m('Material B', 6, 'pcs'), m('Fasteners', 32, 'pcs')],
  //       },
  //       {
  //         step: 'Quality Check',
  //         start: 60,
  //         duration: 60,
  //         status: 'queued',
  //         resources: ['QC Station 01', 'Inspection Kit'],
  //         materials: [m('Calibration Fluid', 0.5, 'L')],
  //       },
  //       {
  //         step: 'Packaging',
  //         start: 120,
  //         duration: 60,
  //         status: 'queued',
  //         resources: ['Packaging Station 01'],
  //         materials: [m('Material C', 3, 'boxes'), m('Label Roll', 1, 'roll')],
  //       },
  //     ],
  //   },
  //   {
  //     id: 'ORD-003',
  //     operations: [
  //       {
  //         step: 'Machining',
  //         start: -120,
  //         duration: 90,
  //         status: 'finished',
  //         resources: ['Machine 02'],
  //         materials: [m('Material A', 15, 'kg')],
  //       },
  //       {
  //         step: 'Assembly',
  //         start: -30,
  //         duration: 75,
  //         status: 'blocked',
  //         resources: ['Assembly Station 02'],
  //         materials: [m('Material B', 10, 'pcs'), m('Fasteners', 50, 'pcs')],
  //       },
  //       {
  //         step: 'Quality Check',
  //         start: 45,
  //         duration: 60,
  //         status: 'queued',
  //         resources: ['QC Station 01', 'Inspection Kit'],
  //         materials: [m('Calibration Fluid', 0.5, 'L')],
  //       },
  //       {
  //         step: 'Packaging',
  //         start: 105,
  //         duration: 60,
  //         status: 'queued',
  //         resources: ['Packaging Station 02'],
  //         materials: [m('Material C', 5, 'boxes')],
  //       },
  //     ],
  //   },
  //   {
  //     id: 'ORD-004',
  //     operations: [
  //       {
  //         step: 'Machining',
  //         start: 10,
  //         duration: 150,
  //         status: 'queued',
  //         resources: ['Machine 01'],
  //         materials: [m('Material B', 20, 'kg')],
  //       },
  //       {
  //         step: 'Assembly',
  //         start: 160,
  //         duration: 90,
  //         status: 'queued',
  //         resources: ['Assembly Station 01'],
  //         materials: [m('Material B', 12, 'pcs'), m('Fasteners', 60, 'pcs')],
  //       },
  //       {
  //         step: 'Quality Check',
  //         start: 250,
  //         duration: 45,
  //         status: 'queued',
  //         resources: ['QC Station 01', 'Inspection Kit'],
  //         materials: [m('Calibration Fluid', 0.5, 'L')],
  //       },
  //       {
  //         step: 'Packaging',
  //         start: 295,
  //         duration: 60,
  //         status: 'queued',
  //         resources: ['Packaging Station 01'],
  //         materials: [m('Material C', 6, 'boxes'), m('Label Roll', 1, 'roll')],
  //       },
  //     ],
  //   },
  //   {
  //     id: 'ORD-005',
  //     operations: [
  //       {
  //         step: 'Machining',
  //         start: 90,
  //         duration: 90,
  //         status: 'queued',
  //         resources: ['Machine 02'],
  //         materials: [m('Material A', 14, 'kg')],
  //       },
  //       {
  //         step: 'Assembly',
  //         start: 180,
  //         duration: 90,
  //         status: 'queued',
  //         resources: ['Assembly Station 02'],
  //         materials: [m('Material B', 9, 'pcs'), m('Fasteners', 45, 'pcs')],
  //       },
  //       {
  //         step: 'Quality Check',
  //         start: 270,
  //         duration: 45,
  //         status: 'queued',
  //         resources: ['QC Station 01', 'Inspection Kit'],
  //         materials: [m('Calibration Fluid', 0.5, 'L')],
  //       },
  //       {
  //         step: 'Packaging',
  //         start: 315,
  //         duration: 45,
  //         status: 'queued',
  //         resources: ['Packaging Station 02'],
  //         materials: [m('Material C', 4, 'boxes')],
  //       },
  //     ],
  //   },
  // ]
}
