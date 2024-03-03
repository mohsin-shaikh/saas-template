"use server"

import { revalidatePath } from "next/cache"
import { getUserByEmail } from "@/data/user"
import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from "@/schemas/user"
import bcrypt from "bcryptjs"
import * as z from "zod"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"

export const createUser = async (values: z.infer<typeof createUserSchema>) => {
  const validatedFields = createUserSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password, name, role } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  })

  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(
  //   verificationToken.email,
  //   verificationToken.token,
  // );

  return { success: "User Create Successfully!" }
}

export const updateUser = async (
  id: string,
  values: z.infer<typeof updateUserSchema>
) => {
  const validatedFields = updateUserSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, newPassword, name, role } = validatedFields.data

  const duplicateEmailCount = await db.user.count({
    where: {
      id: { not: id },
      email: email,
    },
  })

  if (duplicateEmailCount > 0) {
    return { error: "Email already in use!" }
  }

  await db.user.update({
    where: { id: id },
    data: {
      name,
      email,
      ...(newPassword && { password: await bcrypt.hash(newPassword, 10) }),
      role,
    },
  })

  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(
  //   verificationToken.email,
  //   verificationToken.token,
  // );

  return { success: "User Update Successfully!" }
}

export const deleteUser = async (values: z.infer<typeof deleteUserSchema>) => {
  const validatedFields = deleteUserSchema.safeParse(values)

  if (!validatedFields.success) {
    throw new Error("Invalid fields!")
    // return { error: 'Invalid fields!' };
  }

  const { id } = validatedFields.data

  // Validation
  const user = await currentUser()
  if (id == user?.id) {
    throw new Error("Unable to remove your own user!")
    // return { error: 'Unable to remove your own user!' };
  }

  await db.user.delete({
    where: {
      id,
    },
  })

  // return { success: 'User Deleted Successfully!' };

  revalidatePath("/")
}
