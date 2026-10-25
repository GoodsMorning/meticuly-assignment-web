import { useState  } from 'react'
import type { ReactElement } from 'react';
import { Boxes, Layers3, ScrollText } from 'lucide-react'
import { LogTab } from './tab/Log'
import { ResourcesTab } from './tab/Resource'
import { OrdersTab } from './tab/Order'

type TTabId = 'orders' | 'resources' | 'logs'

const tabs: {
  id: TTabId
  label: string
  icon: typeof Layers3
}[] = [
  {
    id: 'orders',
    label: 'Orders',
    icon: Layers3,
  },
  {
    id: 'resources',
    label: 'Resource Utilization',
    icon: Boxes,
  },
  {
    id: 'logs',
    label: 'Activity Log',
    icon: ScrollText,
  },
]

const RenderTab: Record<TTabId, ReactElement> =  {
  'orders' :  <OrdersTab />,
  'resources': <ResourcesTab />,
  'logs': <LogTab />,
}

export const Table = () => {
  const [activeTab, setActiveTab] = useState<TTabId>('orders')

  return (
    <div className="overflow-hidden rounded-xl  bg-white">
      <div className="flex gap-6 overflow-x-auto border-b px-5">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex shrink-0 items-center gap-2 border-b-2 py-4 text-sm font-medium ${
              activeTab === id
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>
      {RenderTab[activeTab]}
    </div>
  )
}
