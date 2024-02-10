"use client"

import { Table } from "@tanstack/react-table"
import { LucideIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "@/components/data-table-old/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table-old/data-table-view-options"

type TFacedFilters = {
  column?: string
  title?: string
  options: {
    label: string
    value: string
    icon?: LucideIcon
  }[]
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filter?: string
  facedFilters?: TFacedFilters[]
}

export function DataTableToolbar<TData>({
  table,
  filter,
  facedFilters,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length

  return (
    <div className="flex items-center justify-between">
      <div
        className={cn(
          // "flex flex-1 flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-2",
          "flex flex-1 flex-wrap items-start space-x-2 space-y-2"
        )}
      >
        {filter && (
          <Input
            placeholder={`Filter ${filter}...`}
            value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filter)?.setFilterValue(event.target.value)
            }
            className="mt-2 h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {facedFilters &&
          facedFilters.map(
            (item, index) =>
              table.getColumn(item.column ?? "") && (
                <DataTableFacetedFilter
                  key={index}
                  column={table.getColumn(item.column ?? "")}
                  title={item.title}
                  options={item.options}
                />
              )
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
