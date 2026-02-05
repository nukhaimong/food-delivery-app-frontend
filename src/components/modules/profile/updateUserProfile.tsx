'use client';

import { updateUser } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';
import { useForm } from '@tanstack/react-form';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

const uploading = 'uploading...';

export default function UpdateUserProfile() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: '',
      imageUrl: '',
    },
    onSubmit: async ({ value }) => {
      try {
        let imageUrl = value.imageUrl;

        if (selectedImage) {
          toast.loading('uploading Image...');
          imageUrl = await uploadToCloudinary(selectedImage);
          toast.dismiss();
        }
        console.log(value.name, imageUrl);
        const res = await updateUser(imageUrl, value.name);
        console.log(res);

        if (res?.error) {
          toast.error('Profile Update Failed');
          return;
        }
        toast.success('Profile Updated Successfully');
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    },
  });
  return (
    <div className="max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>Name</FieldLabel>
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
          <Field>
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
                <div className="relative h-30 w-30 overflow-hidden rounded-full border-2 border-muted shadow-md transition hover:shadow-lg">
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
          </Field>
        </FieldGroup>
        <Button className="my-5" type="submit">
          Save Profile
        </Button>
      </form>
    </div>
  );
}
