import { Routes } from '@/types/routes.type';

export const userRoutes: Routes[] = [
  {
    title: 'See your Order',
    items: [
      {
        title: 'Back to home',
        url: '/',
      },
      {
        title: 'Track Your Order',
        url: '/user-dashboard/my-orders',
      },
    ],
  },
];

export const providerRoutes: Routes[] = [
  {
    title: 'Manage Your Meals and order',
    items: [
      {
        title: 'Back to home',
        url: '/',
      },
      {
        title: 'Post Meal',
        url: '/provider-dashboard/post-meal',
      },
      {
        title: 'See Orders',
        url: '/provider-dashboard/my-orders',
      },
    ],
  },
];

export const adminRoutes: Routes[] = [
  {
    title: 'Manage Users and Providers',
    items: [
      {
        title: 'Back to home',
        url: '/',
      },

      {
        title: 'Create Cuisine Category',
        url: '/admin-dashboard/create-category',
      },
    ],
  },
];
