import { TaskLabel, TaskPriority, TaskStatus } from "@prisma/client"
import * as z from "zod"

export const updateTaskLabelSchema = z.object({
  id: z.string(),
  label: z.enum([TaskLabel.bug, TaskLabel.documentation, TaskLabel.enhancement, TaskLabel.feature]),
})

export const updateTaskStatusSchema = z.object({
  id: z.string(),
  status: z.enum([TaskStatus.canceled, TaskStatus.done, TaskStatus.in_progress, TaskStatus.todo]),
})

export const updateTaskPrioritySchema = z.object({
  id: z.string(),
  priority: z.enum([TaskPriority.high, TaskPriority.low, TaskPriority.medium]),
})
