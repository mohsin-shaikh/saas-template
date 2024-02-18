'use client';

import { Icons } from '@/components/icons';

export const primaryLinks = [
  {
    title: 'Dashboard',
    route: '/dashboard',
    label: '2',
    icon: Icons.gauge,
  },
  {
    title: 'Tasks',
    route: '/dashboard/tasks',
    label: '',
    icon: Icons.listTodo,
  },
];

export const administrationLinks = [
  {
    title: 'User Management',
    route: '/dashboard/users',
    label: '',
    icon: Icons.user,
    isNotAllowed: ['USER'],
  },
  {
    title: 'Settings',
    route: '/dashboard/settings',
    label: '',
    icon: Icons.settings,
  },
];
