'use client';

import { createCategory } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';
import { useForm } from '@tanstack/react-form';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

const categorySchema = z.object({
  categoryName: z.string(),
  description: z.string(),
  categoryImage: z.string(),
});

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      categoryName: '',
      description: '',
      categoryImage: '',
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      try {
        let categoryImage = value.categoryImage;
        if (selectedImage) {
          toast.loading('Uploading Image');
          categoryImage = await uploadToCloudinary(selectedImage);
          toast.dismiss();
        }
        const res = await createCategory(
          value.categoryName,
          value.description,
          categoryImage,
        );
        if (res.error) {
          toast.error('Category creation failed');
          return;
        }
        toast.success('Category Creation Successfylly');
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    },
  });
  return (
    <div className="max-w-xl w-full mt-24">
      <form
        id="category"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="categoryName"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>Category Name</FieldLabel>
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
            name="description"
            children={(field) => {
              return (
                <Field>
                  <FieldLabel>Category Description</FieldLabel>
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
              <div className="relative h-30 w-30 overflow-hidden border-2 border-muted shadow-md transition hover:shadow-lg">
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
      <Button
        form="category"
        type="submit"
        className="w-full my-5 py-5 font-bold text-xl"
      >
        Create Category
      </Button>
    </div>
  );
}
