'use client';
import { getCategory } from '@/actions/category.action';
import { createMeal } from '@/actions/meal.action';
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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';

const mealSchema = z.object({
  meal_name: z.string().min(5, 'menu name is required'),
  image_url: z.string().min(5, 'menu image is required'),
  description: z.string().min(10, 'menu description is required'),
  price: z.number().nonnegative().min(1, 'menu price is required'),
  category_id: z.string().min(10, 'category id is required'),
});

export default function PostMenu() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const response = await getCategory();
      if (response.error) {
        console.log(response.error.message);
      }
      if (response.data) {
        setCategories(response?.data?.category);
      }
    }
    loadCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      meal_name: '',
      image_url: '',
      description: '',
      price: 0,
      category_id: '',
    },
    validators: {
      onSubmit: mealSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        let image_url = value.image_url;
        if (selectedImage) {
          toast.loading('Uploading Image');
          image_url = await uploadToCloudinary(selectedImage);
          toast.dismiss();
        }
        const data = {
          meal_name: value.meal_name,
          image_url: image_url,
          description: value.description,
          price: value.price,
          category_id: value.category_id,
        };

        const res = await createMeal(data);
        if (res.error) {
          toast.error(res.error.message);
        }

        form.reset();
        setSelectedImage(null);
        setPreview(null);

        toast.success('Meal Created Successfully');
      } catch (error) {
        toast.error('Something Went Wrong');
      }
    },
  });

  return (
    <div className="max-w-2xl w-full mt-24">
      <form
        id="menu-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="max-w-2xl">
          <form.Field
            name="meal_name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Menu Name</FieldLabel>
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
            name="description"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Description</FieldLabel>
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
            name="price"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    type="number"
                    name={field.name}
                    value={field.state.value === 0 ? '' : field.state.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.handleChange(value === '' ? 0 : Number(value));
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          {preview && (
            <div className="relative h-48 w-48 overflow-hidden rounded-lg border">
              <Image
                src={preview} // Use the preview URL string, not the File object
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}
          <form.Field
            name="image_url"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Menu Image</FieldLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    name={field.name}
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
          <form.Field
            name="category_id"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                field.state.meta.errors.length > 0;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel>Category</FieldLabel>

                  <select
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled>
                      select a category
                    </option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
      <Button form="menu-form" type="submit" className="mt-5 w-full">
        Create Menu
      </Button>
    </div>
  );
}
