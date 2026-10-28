import { useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Workflow,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'

import { useStock } from '#/hooks/useStock'
import type { TStepTemplate } from '#/types/step'
import { DEFAULT_INIT_STEP, STEP_CATALOG } from '#/constants/consume'
import type { TCreateOrderRequest } from '#/types/order'
import { useCreateOrder } from '#/hooks/useOrder'
import { useIsMobile } from '#/hooks/useIsMobile'
import { cn } from 'cn'

type TCreateOrderSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type TProductionStep = TStepTemplate & {
  instanceId: string
}

function createInstance(template: TStepTemplate): TProductionStep {
  return {
    ...template,
    instanceId: crypto.randomUUID(),
    resources: [...template.resources],
    materials: template.materials.map((material) => ({ ...material })),
  }
}

function initialSteps(): TProductionStep[] {
  return DEFAULT_INIT_STEP.map((id) =>
    createInstance(STEP_CATALOG.find((step) => step.id === id)!),
  )
}

export function CreateOrderSheet({
  open,
  onOpenChange,
}: TCreateOrderSheetProps) {
  const [orderId, setOrderId] = useState('')
  const [steps, setSteps] = useState<TProductionStep[]>(initialSteps)
  const [stepToAdd, setStepToAdd] = useState('')
  const [error, setError] = useState('')
  const [expandedSteps, setExpandedSteps] = useState<string[]>(['machining'])

  const {
    data: { resources, materials },
  } = useStock()

  const totalDuration = steps.reduce((total, step) => total + step.duration, 0)

  const availableSteps = STEP_CATALOG.filter(
    (template) => !steps.some((step) => step.id === template.id),
  )

  function resetForm() {
    setOrderId('')
    setSteps(initialSteps())
    setStepToAdd('')
    setError('')
    setExpandedSteps(['machining'])
  }

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen)

    if (!nextOpen) {
      setError('')
    }
  }

  function addStep() {
    const template = STEP_CATALOG.find((step) => step.id === stepToAdd)

    if (!template || steps.some((step) => step.id === template.id)) return

    const newStep = createInstance(template)

    setSteps((current) => [...current, newStep])
    setExpandedSteps((current) => [...current, newStep.id])
    setStepToAdd('')
    setError('')
  }

  function moveStep(index: number, direction: -1 | 1) {
    const targetIndex = index + direction

    if (targetIndex < 0 || targetIndex >= steps.length) return

    setSteps((current) => {
      const next = [...current]
      ;[next[index], next[targetIndex]] = [next[targetIndex], next[index]]
      return next
    })
  }

  function removeStep(instanceId: string) {
    setSteps((current) =>
      current.filter((step) => step.instanceId !== instanceId),
    )
  }

  function toggleExpanded(id: string) {
    setExpandedSteps((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const createOrderMutation = useCreateOrder()

  async function handleCreate() {
    if (steps.length === 0) {
      setError('Select at least one production step.')
      return
    }

    const payload: TCreateOrderRequest = {
      id: orderId.trim(),
      operations: steps.map((step) => step.id),
    }

    try {
      await createOrderMutation.mutateAsync(payload)

      onOpenChange(false)
      resetForm()
    } catch {
      setError('Failed to create production order. Please try again.')
    }
  }

  const isMobile = useIsMobile()

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn(
          'flex flex-col gap-0 overflow-hidden p-0',
          isMobile
            ? 'h-[85dvh] max-h-[85dvh] w-full rounded-t-xl'
            : 'h-full w-full sm:max-w-xl lg:max-w-2xl',
        )}
      >
        {/* Header */}
        <SheetHeader className="shrink-0 border-b px-5 py-4 pr-12 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Workflow className="size-5 text-primary" />
            </div>

            <div>
              <SheetTitle className="text-lg">
                Create production order
              </SheetTitle>

              <SheetDescription className="mt-1">
                Configure the order and arrange production steps.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <div className="space-y-6 p-5 pb-8 sm:p-6">
            {/* Order information */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold">Order information</h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Configure your production order.
                </p>
              </div>

              <div>
                <Label htmlFor="order-id">Order ID</Label>

                <p className="mb-1 text-xs text-muted-foreground">
                  Leave empty for auto generation.
                </p>

                <Input
                  id="order-id"
                  placeholder="e.g. ORD-003"
                  value={orderId}
                  onChange={(event) => setOrderId(event.target.value)}
                />
              </div>
            </section>

            <Separator />

            {/* Production sequence */}
            <section className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold">Production sequence</h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Reorder or remove predefined steps.
                  </p>
                </div>

                <div className="shrink-0 rounded-lg border px-3 py-2 text-right">
                  <p className="text-xs text-muted-foreground">
                    Total duration
                  </p>

                  <p className="text-sm font-semibold">{totalDuration} min</p>
                </div>
              </div>

              {/* Add step */}
              <div className="space-y-2 rounded-lg border border-dashed p-3">
                <Label>Available steps</Label>

                <div className="flex gap-2">
                  <Select
                    value={stepToAdd}
                    onValueChange={(value) => setStepToAdd(value ?? '')}
                    disabled={availableSteps.length === 0}
                  >
                    <SelectTrigger className="min-w-0 flex-1">
                      <SelectValue
                        placeholder={
                          availableSteps.length === 0
                            ? 'All predefined steps selected'
                            : 'Select a predefined step'
                        }
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {availableSteps.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} · {template.duration} min
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    type="button"
                    size="icon"
                    aria-label="Add selected step"
                    disabled={!stepToAdd}
                    onClick={addStep}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Selected steps */}
              {steps.length === 0 ? (
                <div className="rounded-lg border px-4 py-8 text-center">
                  <Workflow className="mx-auto mb-2 size-7 text-muted-foreground" />

                  <p className="text-sm font-medium">No steps selected</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Select a step from the predefined catalog.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {steps.map((step, index) => {
                    const isExpanded = expandedSteps.includes(step.id)

                    const start = steps
                      .slice(0, index)
                      .reduce((total, previous) => total + previous.duration, 0)

                    return (
                      <Collapsible
                        key={step.instanceId}
                        open={isExpanded}
                        onOpenChange={() => toggleExpanded(step.id)}
                      >
                        <div className="overflow-hidden rounded-xl border bg-background">
                          {/* Step row */}
                          <div className="flex items-center gap-2 p-3">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                              {index + 1}
                            </div>

                            <CollapsibleTrigger className="min-w-0 flex-1 text-left">
                              <span className="block truncate text-sm font-semibold">
                                {step.name}
                              </span>

                              <span className="mt-0.5 block text-xs text-muted-foreground">
                                {step.duration} min · Starts at +{start} min
                              </span>
                            </CollapsibleTrigger>

                            <div className="flex shrink-0 items-center">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                title="Move up"
                                aria-label={`Move ${step.name} up`}
                                disabled={index === 0}
                                onClick={() => moveStep(index, -1)}
                              >
                                <ArrowUp className="size-4" />
                              </Button>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                title="Move down"
                                aria-label={`Move ${step.name} down`}
                                disabled={index === steps.length - 1}
                                onClick={() => moveStep(index, 1)}
                              >
                                <ArrowDown className="size-4" />
                              </Button>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                title="Remove step"
                                aria-label={`Remove ${step.name}`}
                                onClick={() => removeStep(step.instanceId)}
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>

                              <CollapsibleTrigger
                                type="button"
                                className="flex size-8 items-center justify-center"
                                aria-label={
                                  isExpanded
                                    ? 'Collapse step details'
                                    : 'Expand step details'
                                }
                              >
                                {isExpanded ? (
                                  <ChevronUp className="size-4" />
                                ) : (
                                  <ChevronDown className="size-4" />
                                )}
                              </CollapsibleTrigger>
                            </div>
                          </div>

                          {/* Step details */}
                          <CollapsibleContent>
                            <Separator />

                            <div className="space-y-4 bg-muted/20 p-3">
                              <p className="text-xs leading-relaxed text-muted-foreground">
                                {step.description}
                              </p>

                              {/* Resources */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-semibold">
                                    Assigned resources
                                  </h4>

                                  <span className="text-xs text-muted-foreground">
                                    {step.resources.length}
                                  </span>
                                </div>

                                {step.resources.map((resourceName) => {
                                  const resource = resources.find(
                                    (item) => item.name === resourceName,
                                  )

                                  return (
                                    <div
                                      key={resourceName}
                                      className="flex items-center gap-2 rounded-lg border bg-background p-2.5"
                                    >
                                      <Check className="size-4 shrink-0 text-muted-foreground" />

                                      <span className="min-w-0 flex-1 truncate text-xs font-medium">
                                        {resourceName}
                                      </span>

                                      <span className="shrink-0 text-xs text-muted-foreground">
                                        {resource ? resource.status : 'Fixed'}
                                      </span>
                                    </div>
                                  )
                                })}
                              </div>

                              {/* Materials */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-semibold">
                                    Material requirements
                                  </h4>

                                  <span className="text-xs text-muted-foreground">
                                    {step.materials.length}
                                  </span>
                                </div>

                                {step.materials.map((material) => {
                                  const stockMaterial = materials.find(
                                    (item) => item.name === material.name,
                                  )

                                  return (
                                    <div
                                      key={material.name}
                                      className="flex items-center gap-2 rounded-lg border bg-background p-2.5"
                                    >
                                      <div className="min-w-0 flex-1">
                                        <p className="truncate text-xs font-medium">
                                          {material.name}
                                        </p>

                                        <p className="mt-1 text-[11px] text-muted-foreground">
                                          Ratio {material.numerator}/
                                          {material.denominator} {material.unit}
                                        </p>

                                        {stockMaterial && (
                                          <p className="mt-1 text-[11px] text-muted-foreground">
                                            Available:{' '}
                                            {(
                                              stockMaterial.stock -
                                              stockMaterial.consumed -
                                              stockMaterial.reserved
                                            ).toLocaleString()}{' '}
                                            {material.unit}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    )
                  })}
                </div>
              )}
            </section>

            {/* Order summary */}
            <section className="rounded-xl border p-4">
              <h3 className="text-sm font-semibold">Order summary</h3>

              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Order ID</span>

                  <span className="max-w-[60%] truncate font-medium">
                    {orderId.trim() || 'Auto-generated'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Selected steps</span>

                  <span className="font-medium">{steps.length}</span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">
                    Total processing time
                  </span>

                  <span className="font-medium">{totalDuration} min</span>
                </div>
              </div>
            </section>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="shrink-0 border-t bg-background p-4 sm:flex-row sm:justify-between sm:px-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false)
              resetForm()
            }}
          >
            Cancel
          </Button>

          <Button type="button" onClick={handleCreate}>
            Create order
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
