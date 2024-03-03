"use client"

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types"
import { User, UserRole } from "@prisma/client"
import { type ColumnDef } from "@tanstack/react-table"

import { enumToKeyValueArray } from "@/lib/helper"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import UserTableRowActions from "./users-table-row-actions"
import { CircleIcon, ShieldCheckIcon, UserIcon } from "lucide-react"

export function fetchUsersTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<User, unknown>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
          }}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div className="w-auto">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => <div className="w-auto">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const role = enumToKeyValueArray(UserRole).find(
          (role) => role.value === row.original.role
        )

        if (!role) return null

        return (
          <div className="flex items-center">
            {role.value === "USER" ? (
              <UserIcon
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : role.value === "ADMIN" ? (
              <ShieldCheckIcon
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            ) : (
              <CircleIcon
                className="mr-2 size-4 text-muted-foreground"
                aria-hidden="true"
              />
            )}
            <span className="capitalize">{role.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value instanceof Array && value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <UserTableRowActions row={row} startTransition={startTransition} />
        )
      },
    },
  ]
}

export const filterableColumns: DataTableFilterableColumn<User>[] = [
  {
    id: "role",
    title: "Role",
    options: enumToKeyValueArray(UserRole).map((data) => ({
      label: data.label[0]?.toUpperCase() + data.label.slice(1),
      value: data.value,
    })),
  },
]

export const searchableColumns: DataTableSearchableColumn<User>[] = [
  {
    id: "email",
    title: "Email",
  },
]
