'use client';

import { createProviderProfile } from '@/actions/provider.action';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';
import { useForm } from '@tanstack/react-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

const providerSchema = z.object({
  restaurantName: z.string().min(1, 'Restaurant name is required'),
  restaurantImageUrl: z.string().min(1, 'image is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

export default function CreateProviderProfile() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      restaurantName: '',
      restaurantImageUrl: '',
      address: '',
      phone: '',
    },
    validators: {
      onSubmit: providerSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = 'update-provider-profile';
      try {
        let restaurantImageUrl = value.restaurantImageUrl;
        if (selectedImage) {
          toast.loading('Uploding Image', { id: toastId });
          restaurantImageUrl = await uploadToCloudinary(selectedImage);
        }
        toast.loading('Saving Profile...', { id: toastId });
        const res = await createProviderProfile(
          restaurantImageUrl,
          value.address,
          value.restaurantName,
          value.phone,
        );
        if (res.error) {
          toast.error('profile creation failed', { id: toastId });
          return;
        }
        toast.success('Profile Created Successfully', { id: toastId });
        form.reset();
        setPreview(null);
        setSelectedImage(null);
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });
  return (
    <div className="max-w-xl">
      <p className="font-bold text-2xl my-5">
        Create or update Your Restaurant Profile
      </p>
      <form
        id="create-profile"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="restaurantName"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Restaurant Name</FieldLabel>
                  <Input
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="address"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Restaurant Address</FieldLabel>
                  <Input
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="phone"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Phone Number</FieldLabel>
                  <Input
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="restaurantImageUrl"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Choose Your Image</FieldLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setSelectedImage(file);
                      setPreview(URL.createObjectURL(file));

                      field.handleChange(file.name);
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          {preview && (
            <div className="mt-5 flex justify-start">
              <div className="relative h-30 w-30 overflow-hidden  border-2 border-muted shadow-md transition hover:shadow-lg">
                <Image
                  src={preview}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>
          )}
        </FieldGroup>
      </form>
      <Button form="create-profile" type="submit" className="my-5">
        Create Profile
      </Button>
    </div>
  );
}
