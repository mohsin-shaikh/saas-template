'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { createUserSchema, deleteUserSchema } from '@/schemas/user';
import { currentUser } from '@/lib/auth';

export const createUser = async (values: z.infer<typeof createUserSchema>) => {
  const validatedFields = createUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(
  //   verificationToken.email,
  //   verificationToken.token,
  // );

  return { success: 'User Create Successfully!' };
};

export const deleteUser = async (values: z.infer<typeof deleteUserSchema>) => {
  const validatedFields = deleteUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { id } = validatedFields.data;

  // Validation
  const user = await currentUser();
  if (id == user?.id) {
    return { error: 'Unable to remove your own user!' };
  }

  await db.user.delete({
    where: {
      id,
    },
  });

  return { success: 'User Deleted Successfully!' };
};
