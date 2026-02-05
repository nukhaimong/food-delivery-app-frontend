'use client';

import { createProviderProfile } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';
import { useForm } from '@tanstack/react-form';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CreateProviderProfile() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      restaurantName: '',
      restaurantImageUrl: '',
      address: '',
      phone: '',
    },
    onSubmit: async ({ value }) => {
      try {
        let restaurantImageUrl = value.restaurantImageUrl;
        if (selectedImage) {
          toast.loading('Uploding Image');
          restaurantImageUrl = await uploadToCloudinary(selectedImage);
          toast.dismiss();
        }
        const res = await createProviderProfile(
          restaurantImageUrl,
          value.address,
          value.restaurantName,
          value.phone,
        );
        if (res.error) {
          toast.error('profile creation failed');
          return;
        }
        toast.success('Profile Created Successfully');
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
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
              return (
                <Field>
                  <FieldLabel>Restaurant Name</FieldLabel>
                  <Input
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              );
            }}
          />
          <form.Field
            name="address"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>Restaurant Address</FieldLabel>
                  <Input
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              );
            }}
          />
          <form.Field
            name="phone"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>Phone Number</FieldLabel>
                  <Input
                    type="text"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              );
            }}
          />
          <FieldLabel>Choose Your Image</FieldLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setSelectedImage(file);
              setPreview(URL.createObjectURL(file));
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
