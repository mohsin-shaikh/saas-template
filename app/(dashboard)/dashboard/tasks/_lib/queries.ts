'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { db } from '@/lib/db';
import type { SearchParams } from '@/types';

import { filterColumn } from '@/lib/filter-column';
import { searchParamsSchema } from '@/schemas/params';
import { Task } from '@prisma/client';

export async function getTasks(searchParams: SearchParams) {
  noStore();
  try {
    const { page, per_page, sort, title, status, priority, operator } =
      searchParamsSchema.parse(searchParams);

    // Fallback page for invalid page numbers
    const pageAsNumber = Number(page);
    const fallbackPage =
      isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
    // Number of items per page
    const perPageAsNumber = Number(per_page);
    const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
    // Number of items to skip
    const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
    // Column and order to sort by
    // Splitting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split('.') as [
      keyof Task | undefined,
      'asc' | 'desc' | undefined
    ]) ?? ['title', 'desc'];

    const statuses = (status?.split('.') as Task['status'][]) ?? [];

    const priorities = (priority?.split('.') as Task['priority'][]) ?? [];

    const getAllTasks = db.task.findMany({
      take: limit,
      skip: offset,
      where:
        !operator || operator === 'and'
          ? {
              // Filter tasks by title
              title: title
                ? filterColumn({
                    value: title,
                  })
                : undefined,
              // Filter tasks by status
              status: statuses.length > 0 ? { in: statuses } : undefined,
              // Filter tasks by priority
              priority: priorities.length > 0 ? { in: priorities } : undefined,
            }
          : {
              OR: [
                {
                  // Filter tasks by title
                  title: title
                    ? filterColumn({
                        value: title,
                      })
                    : undefined,
                },
                {
                  // Filter tasks by status
                  status: statuses.length > 0 ? { in: statuses } : undefined,
                },
                {
                  // Filter tasks by priority
                  priority:
                    priorities.length > 0 ? { in: priorities } : undefined,
                },
              ],
            },
      orderBy: column
        ? order === 'asc'
          ? { [column]: 'asc' }
          : { [column]: 'desc' }
        : { id: 'desc' },
    });

    const getAllTasksCount = db.task.aggregate({
      _count: true,
      where:
        !operator || operator === 'and'
          ? {
              // Filter tasks by title
              title: title
                ? filterColumn({
                    value: title,
                  })
                : undefined,
              // Filter tasks by status
              status: statuses.length > 0 ? { in: statuses } : undefined,
              // Filter tasks by priority
              priority: priorities.length > 0 ? { in: priorities } : undefined,
            }
          : {
              OR: [
                {
                  // Filter tasks by title
                  title: title
                    ? filterColumn({
                        value: title,
                      })
                    : undefined,
                },
                {
                  // Filter tasks by status
                  status: statuses.length > 0 ? { in: statuses } : undefined,
                },
                {
                  // Filter tasks by priority
                  priority:
                    priorities.length > 0 ? { in: priorities } : undefined,
                },
              ],
            },
    });

    // Transaction is used to ensure both queries are executed in a single transaction
    const [data, count] = await db.$transaction([
      getAllTasks,
      getAllTasksCount,
    ]);

    // console.log({ c: count._count });
    const pageCount = Math.ceil(count._count / limit)
    
    return { data, pageCount };
  } catch (err) {
    console.log(err);
    return { data: [], pageCount: 0 };
  }
}
