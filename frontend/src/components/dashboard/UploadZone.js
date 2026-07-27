'use client';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';

export default function UploadZone({ vendors = [], onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [vendorId, setVendorId] = useState('');
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': [], 'image/*': [] },
    maxFiles: 1,
    onDrop: accepted => setFile(accepted[0])
  });

  const handleUpload = async () => {
    if (!vendorId) return toast.error('Select a vendor first');
    if (!file) return toast.error('Select a file');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('vendorId', vendorId);

    try {
      setUploading(true);
      await axios.post('/insurance/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Certificate uploaded and parsed!');
      setFile(null);
      onUploadSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card p-6">
      <label className="block text-sm font-medium mb-2">Vendor</label>
      <select className="input-primary mb-4" value={vendorId} onChange={e => setVendorId(e.target.value)}>
        <option value="">Select a vendor…</option>
        {vendors.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
      </select>

      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition cursor-pointer">
        <input {...getInputProps()} />
        <FiUpload className="text-4xl text-primary mx-auto mb-3" />
        <p className="text-gray-600">Drag & drop COI here, or click to browse</p>
        <p className="text-sm text-gray-400 mt-1">PDF, JPG, PNG, TIFF</p>
      </div>
      {file && <p className="mt-2 text-sm">Selected: {file.name}</p>}
      {vendors.length === 0 && <p className="mt-2 text-xs text-amber-600">Add a vendor first before uploading a certificate.</p>}
      <button onClick={handleUpload} disabled={uploading} className="mt-4 btn-primary w-full">
        {uploading ? 'Uploading…' : 'Upload & Parse'}
      </button>
    </div>
  );
      }
