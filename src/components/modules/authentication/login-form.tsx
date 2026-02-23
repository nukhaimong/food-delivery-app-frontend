'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { useForm } from '@tanstack/react-form';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useCartStore } from '@/store/useCartStore';

const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Minimum length is 8 characters'),
});

export function LoginForm({ ...props }: React.ComponentProps<'div'>) {
  const testCookie = async () => {
    try {
      const response = await fetch(
        'https://food-delivery-app-backend-58qb.onrender.com/api/debug-cookies',
        {
          credentials: 'include',
        },
      );
      const data = await response.json();
      console.log('Cookie debug:', data);
    } catch (error) {
      console.error('Debug error:', error);
    }
  };

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      const toastId = toast.loading('Loggin In....');
      try {
        const { data, error } = await authClient.signIn.email({
          ...value,
          callbackURL: 'https://food-delivery-app-frontend-umber.vercel.app/',
          fetchOptions: {
            onSuccess: () => {
              console.log('Login success, checking cookies...');
              testCookie(); // Check if cookies are set
              useCartStore.persist.clearStorage();
            },
          },
        });
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success('User Logged In successfully', { id: toastId });
      } catch (error) {
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  return (
    <div className={cn('flex flex-col gap-6')} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
          <Button form="login-form" type="submit" className="w-full mt-5">
            Log In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
