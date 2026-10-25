import { Timeline } from '#/components/Timeline'
import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import {
  Plus,
} from 'lucide-react'
import { Table } from '#/components/Table'
import { StatusCard } from '#/components/StatusCard'
import { getOrderSummary } from '#/services/order'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const orderSummary = getOrderSummary()
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Production Management</p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Meticuly Assignment
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor production, orders, and resource consumption.
            </p>
          </div>
          <Button className='w-full md:w-fit  bg-blue-700 hover:bg-blue-800'>
            <Plus className="size-4" />
            Add Order
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {orderSummary.map(({ status, value }) => (
            <StatusCard key={status} status={status} value={value} />
          ))}
        </div>
        <div className='h-120'>
          <Timeline />
        </div>
        <Table />
      </div>
      <footer className="py-4 text-center text-xs text-slate-400">
        Meticuly Production Dashboard · Demo data
      </footer>
    </main>
  )
}
