import { Skeleton } from "@/components/ui/skeleton"

export default function ModuleLoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between">
        {/* Page Title */}
        <Skeleton className="h-8 w-24" />
        {/* Search Fields */}
        <Skeleton className="h-8 w-52" />
      </div>
      <div className="flex justify-between">
        {/* Table Filter */}
        <Skeleton className="h-8 w-52" />
        {/* Table Column Selector */}
        <Skeleton className="h-8 w-24" />
      </div>
      {/* Table */}
      <div className="grid grid-cols-10 gap-4">
        {Array.from(Array(10).keys()).map((value, index) => {
          return Array.from(Array(10).keys()).map((v, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))
        })}
      </div>
    </div>
  )
}
