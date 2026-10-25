import type { TOrderStatus } from "#/types/order"
import { useState } from "react"
import { formatQuantity } from '#/helpers/quantity'
import { getCurrentOperation, getOrderStatus } from "#/helpers/order"
import { useOrders } from "#/hooks/useOrder"

const badgeStyles: Record<TOrderStatus, string> = {
  queued: 'bg-slate-100 text-slate-700',
  'in-progress': 'bg-blue-50 text-blue-700',
  blocked: 'bg-amber-50 text-amber-700',
  finished: 'bg-emerald-50 text-emerald-700',
}

type TFilter = 'all' | TOrderStatus

const filters: TFilter[] = [
  'all',
  'in-progress',
  'queued',
  'blocked',
  'finished',
]

export const statusLabels: Record<TOrderStatus, string> = {
  queued: 'Queued',
  'in-progress': 'In Progress',
  blocked: 'Blocked',
  finished: 'Finished',
}


export const OrdersTab = () => {
  const [filter, setFilter] = useState<TFilter>('all')

  const { data: orders } = useOrders()
  
  const rows = orders
    .map((order) => ({
      order,
      status: getOrderStatus(order),
      current: getCurrentOperation(order),
      finishedCount: order.operations.filter(
        (operation) => operation.status === 'finished',
      ).length,
    }))
    .filter((row) => filter === 'all' || row.status === filter)

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 border-b px-5 py-3">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === item
                ? 'bg-blue-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {item === 'all' ? 'All' : statusLabels[item]}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Order ID</th>
              <th className="px-5 py-3 font-medium">Current Step</th>
              <th className="px-5 py-3 font-medium">Progress</th>
              <th className="px-5 py-3 font-medium">Materials</th>
              <th className="px-5 py-3 font-medium">Resources</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.map(({ order, status, current, finishedCount }) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-5 py-4 font-medium">
                  {order.id}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                  {current.step}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${(finishedCount / order.operations.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs tabular-nums text-slate-500">
                      {finishedCount}/{order.operations.length}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {current.materials.map((material) => (
                      <span
                        key={material.name}
                        className="whitespace-nowrap rounded bg-slate-100 px-2 py-1 text-xs text-slate-600"
                      >
                        {material.name} · {formatQuantity(material.quantity)}{' '}
                        {material.unit}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {current.resources.map((resource) => (
                      <span
                        key={resource}
                        className="whitespace-nowrap rounded bg-slate-100 px-2 py-1 text-xs text-slate-600"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeStyles[status]}`}
                  >
                    {statusLabels[status]}
                  </span>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-slate-400"
                >
                  No orders with this status
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}