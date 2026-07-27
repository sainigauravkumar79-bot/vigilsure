'use client';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';

export default function UploadZone({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': [], 'image/*': [] },
    onDrop: accepted => setFile(accepted[0])
  });

  const handleUpload = async () => {
    if (!file) return toast.error('Select a file');
    const formData = new FormData();
    formData.append('file', file);
    toast.error('Vendor selection not implemented in this demo. Please implement vendor dropdown.');
  };

  return (
    <div className="card p-6">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition cursor-pointer">
        <input {...getInputProps()} />
        <FiUpload className="text-4xl text-primary mx-auto mb-3" />
        <p className="text-gray-600">Drag & drop COI here, or click to browse</p>
        <p className="text-sm text-gray-400 mt-1">PDF, JPG, PNG, TIFF</p>
      </div>
      {file && <p className="mt-2 text-sm">Selected: {file.name}</p>}
      <button onClick={handleUpload} className="mt-4 btn-primary w-full">Upload & Parse</button>
    </div>
  );
      }
