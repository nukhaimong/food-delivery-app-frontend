'use client';

import { useState } from 'react';
import Image from 'next/image';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';
import { toast } from 'sonner';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export default function ProfileUploadForm() {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!name || !imageFile) {
      alert('Name and image are required');
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await uploadToCloudinary(imageFile);

      const res = await fetch(`${APP_URL}/users/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(name && { name }),
          ...(imageUrl && { image: imageUrl }),
        }),
        credentials: 'include',
      });
      console.log(res);
      if (!res.ok) {
        throw new Error('Failed to save profile');
      }
      toast.success('Profile saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md space-y-6 rounded-2xl border mb-10 p-10">
      <h2 className="text-lg font-semibold ">Create / Update Profile</h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border px-4 py-2"
      />

      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {/* Preview */}
      {preview && (
        <div className="relative h-32 w-32 overflow-hidden rounded-full border">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-lg bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Save Profile'}
      </button>
    </div>
  );
}
