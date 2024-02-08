'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createUserSchema } from '@/schemas/user';
import { useRouter } from 'next/navigation';

type UserFormValues = z.infer<typeof createUserSchema>;

// This can come from your database or API.
const defaultValues: Partial<UserFormValues> = {};

type FormType = {
  setIsOpen: (isOpen: boolean) => void;
};

export function CreateForm({ setIsOpen }: FormType) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: UserFormValues) {
    setLoading(true);
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your post was not created. Please try again.',
        variant: 'destructive',
      });
    }

    const user = await response.json();

    toast({
      title: 'Success',
      description: 'Your message has been sent.',
    });
    // This forces a cache invalidation.
    router.refresh();

    setLoading(false);
    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Mohsin Shaikh' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='mohsin@npnits.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='MANAGER'>MANAGER</SelectItem>
                    <SelectItem value='ADMIN'>ADMIN</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={loading ? true : false}>
          {loading ? <Loader2 className='w-4 h-4 mr-1 animate-spin' /> : null}
          Create
        </Button>
      </form>
    </Form>
  );
}
