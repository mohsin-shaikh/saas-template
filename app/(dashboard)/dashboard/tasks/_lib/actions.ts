"use server"

import { revalidatePath } from "next/cache"
import { faker } from "@faker-js/faker"
import { Task, TaskLabel, TaskPriority, TaskStatus } from "@prisma/client"
import type { z } from "zod"

import { db } from "@/lib/db"
import { enumToArray } from "@/lib/helper"

import type {
  updateTaskLabelSchema,
  updateTaskPrioritySchema,
  updateTaskStatusSchema,
} from "./validations"

export async function seedTasks({
  count = 100,
  reset = false,
}: {
  count?: number
  reset?: boolean
}) {
  const allTasks = []

  for (let i = 0; i < count; i++) {
    allTasks.push({
      // id: createId(),
      code: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
      title: faker.hacker
        .phrase()
        .replace(/^./, (letter) => letter.toUpperCase()),
      status:
        // @ts-expect-error
        faker.helpers.shuffle<Task["status"]>(enumToArray(TaskStatus))[0] ??
        "todo",
      label:
        // @ts-expect-error
        faker.helpers.shuffle<Task["label"]>(enumToArray(TaskLabel))[0] ??
        "bug",
      priority:
        // @ts-expect-error
        faker.helpers.shuffle<Task["priority"]>(enumToArray(TaskPriority))[0] ??
        "low",
    })
  }

  reset && (await db.$executeRaw`TRUNCATE TABLE "Task" CASCADE`)

  console.log("📝 Inserting tasks", allTasks.length)

  await db.task.createMany({
    data: allTasks,
  })
}

export async function updateTaskLabel({
  id,
  label,
}: z.infer<typeof updateTaskLabelSchema>) {
  await db.task.update({
    where: {
      id: id,
    },
    data: {
      label: label,
    },
  })

  revalidatePath("/")
}

export async function updateTaskStatus({
  id,
  status,
}: z.infer<typeof updateTaskStatusSchema>) {
  console.log("updateTaskStatusAction", id, status)

  await db.task.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  })

  revalidatePath("/")
}

export async function updateTaskPriority({
  id,
  priority,
}: z.infer<typeof updateTaskPrioritySchema>) {
  console.log("updatePriorityAction", id, priority)

  await db.task.update({
    where: {
      id: id,
    },
    data: {
      priority: priority,
    },
  })

  revalidatePath("/")
}

export async function deleteTask(input: { id: string }) {
  await db.task.delete({
    where: {
      id: input.id,
    },
  })

  // Create a new task for the deleted one
  // await seedTasks({ count: 1 });

  revalidatePath("/")
}
