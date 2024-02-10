'use client';

// import { tasks, type Task } from "@/db/schema"
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from '@/types';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { catchError } from '@/lib/catch-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';

import { deleteTask, updateTaskLabel } from '../_lib/actions';
import { Task, TaskLabel, TaskPriority, TaskStatus } from '@prisma/client';
import { enumToKeyValueArray } from '@/lib/helper';

export function fetchTasksTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<Task, unknown>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label='Select all'
          className='translate-y-[2px]'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label='Select row'
          className='translate-y-[2px]'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Task' />
      ),
      cell: ({ row }) => <div className='w-[80px]'>{row.getValue('code')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Title' />
      ),
      cell: ({ row }) => {
        const label = enumToKeyValueArray(TaskLabel).find(
          (label) => label.value === row.original.label
        );

        return (
          <div className='flex space-x-2'>
            {label && <Badge variant='outline'>{label.label}</Badge>}
            <span className='max-w-[500px] truncate font-medium'>
              {row.getValue('title')}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ row }) => {
        const status = enumToKeyValueArray(TaskStatus).find(
          (status) => status.value === row.original.status
        );

        if (!status) return null;

        return (
          <div className='flex w-[100px] items-center'>
            {status.value === 'canceled' ? (
              <CrossCircledIcon
                className='mr-2 size-4 text-muted-foreground'
                aria-hidden='true'
              />
            ) : status.value === 'done' ? (
              <CheckCircledIcon
                className='mr-2 size-4 text-muted-foreground'
                aria-hidden='true'
              />
            ) : status.value === 'in-progress' ? (
              <StopwatchIcon
                className='mr-2 size-4 text-muted-foreground'
                aria-hidden='true'
              />
            ) : status.value === 'todo' ? (
              <QuestionMarkCircledIcon
                className='mr-2 size-4 text-muted-foreground'
                aria-hidden='true'
              />
            ) : (
              <CircleIcon
                className='mr-2 size-4 text-muted-foreground'
                aria-hidden='true'
              />
            )}
            <span className='capitalize'>{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value instanceof Array && value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Priority' />
      ),
      cell: ({ row }) => {
        const priority = enumToKeyValueArray(TaskPriority).find(
          (priority) => priority.value === row.original.priority
        );

        if (!priority) {
          return null;
        }

        return (
          <div className='flex items-center'>
            {priority.value === 'low' ? (
              <ArrowDownIcon
                className='mr-2 size-4 text-muted-foreground'
                aria-hidden='true'
              />
            ) : priority.value === 'medium' ? (
              <ArrowRightIcon
                className='mr-2 size-4 text-muted-foreground'
                aria-hidden='true'
              />
            ) : priority.value === 'high' ? (
              <ArrowUpIcon
                className='mr-2 size-4 text-muted-foreground'
                aria-hidden='true'
              />
            ) : (
              <CircleIcon
                className='mr-2 size-4 text-muted-foreground'
                aria-hidden='true'
              />
            )}
            <span className='capitalize'>{priority.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value instanceof Array && value.includes(row.getValue(id));
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label='Open menu'
              variant='ghost'
              className='flex size-8 p-0 data-[state=open]:bg-muted'
            >
              <DotsHorizontalIcon className='size-4' aria-hidden='true' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-[160px]'>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={row.original.label}
                  onValueChange={(value) => {
                    startTransition(async () => {
                      await updateTaskLabel({
                        id: row.original.id,
                        label: value as Task['label'],
                      });
                    });
                  }}
                >
                  {enumToKeyValueArray(TaskLabel).map((label) => (
                    <DropdownMenuRadioItem
                      key={label.value}
                      value={label.value}
                      className='capitalize'
                      disabled={isPending}
                    >
                      {label.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => {
                  row.toggleSelected(false);

                  toast.promise(
                    deleteTask({
                      id: row.original.id,
                    }),
                    {
                      loading: 'Deleting...',
                      success: () => 'Task deleted successfully.',
                      error: (err: unknown) => catchError(err),
                    }
                  );
                });
              }}
            >
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<Task>[] = [
  {
    id: 'status',
    title: 'Status',
    options: enumToKeyValueArray(TaskStatus).map((status) => ({
      label: status.label[0]?.toUpperCase() + status.label.slice(1),
      value: status.value,
    })),
  },
  {
    id: 'priority',
    title: 'Priority',
    options: enumToKeyValueArray(TaskPriority).map((priority) => ({
      label: priority.label[0]?.toUpperCase() + priority.label.slice(1),
      value: priority.value,
    })),
  },
];

export const searchableColumns: DataTableSearchableColumn<Task>[] = [
  {
    id: 'title',
    title: 'titles',
  },
];
