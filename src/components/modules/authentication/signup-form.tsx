'use client';
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
  FieldLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(4, 'Minimum Length is 4 Characters'),
  email: z.email('Invalid Email'),
  password: z.string().min(8, 'Minimum Length is 8 Characters'),
  user_role: z.enum(['USER', 'PROVIDER']),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      user_role: 'USER',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Singin Up...');
      try {
        const { data, error } = await authClient.signUp.email({
          ...value,
          callbackURL: 'http://localhost:3000',
        });

        if (error) {
          toast.error(error.message || 'something went wrong', { id: toastId });
          return;
        }
        toast.success('Sign Up successfully', { id: toastId });
        router.push('/');
      } catch (error: any) {
        toast.error(error.message || 'something went wrong', { id: toastId });
      }
    },
  });
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
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
                  <Field data-invalid={isInvalid}>
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
            <form.Field name="user_role">
              {(field) => (
                <Field>
                  <FieldLegend>Sign up as</FieldLegend>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {/* USER */}
                    <button
                      type="button"
                      onClick={() => field.handleChange('USER')}
                      onBlur={field.handleBlur}
                      className={`rounded-lg border p-4 text-center ${field.state.value === 'USER' ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary'}`}
                    >
                      <div className="font-semibold">User</div>
                      <div className="text-sm text-muted-foreground">
                        Looking for services
                      </div>
                    </button>

                    {/* PROVIDER */}
                    <button
                      type="button"
                      onClick={() => field.handleChange('PROVIDER')}
                      onBlur={field.handleBlur}
                      className={`rounded-lg border p-4 text-center transition${field.state.value === 'PROVIDER' ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary'}`}
                    >
                      <div className="font-semibold">Provider</div>
                      <div className="text-sm text-muted-foreground">
                        Offering services
                      </div>
                    </button>
                  </div>

                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>

        <Button form="signup-form" className="w-full mt-5">
          Sign Up
        </Button>
      </CardContent>
    </Card>
  );
}
