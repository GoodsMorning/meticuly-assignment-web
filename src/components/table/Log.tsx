import { useLogs } from '#/hooks/useLog'
import type { TLogLevel } from '#/types/log'

const logDotStyles: Record<TLogLevel, string> = {
  info: 'bg-blue-500',
  warning: 'bg-amber-500',
  success: 'bg-emerald-600',
}

export const LogTab = () => {
  const { data:logs } = useLogs()
  return (
    <>
      <div className="divide-y divide-slate-100">
        {logs.map((log) => (
          <div
            key={`${log.time}-${log.orderId}`}
            className="flex flex-wrap items-center gap-3 px-5 py-4 text-sm"
          >
            <span
              className={`size-2 shrink-0 rounded-full ${logDotStyles[log.level]}`}
            />
            <span className="font-mono text-xs text-slate-400">
              {log.time}
            </span>
            <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium">
              {log.orderId}
            </span>
            <span className="text-slate-600">{log.message}</span>
          </div>
        ))}
      </div>
    </>
  )
}
