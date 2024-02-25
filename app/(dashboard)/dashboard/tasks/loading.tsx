import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"

export default function Loading() {
  return <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
}
