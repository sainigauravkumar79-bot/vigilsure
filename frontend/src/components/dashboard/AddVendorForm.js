'use client';
import { useState } from 'react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

export default function AddVendorForm({ onAdded }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error('Name and email are required');
    try {
      setSaving(true);
      await axios.post('/vendors', form);
      toast.success('Vendor added');
      setForm({ name: '', email: '', company: '', phone: '' });
      setOpen(false);
      onAdded?.();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add vendor');
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-outline flex items-center gap-2 text-sm">
        <FiPlus /> Add Vendor
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 space-y-3">
      <input className="input-primary" placeholder="Vendor name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
      <input className="input-primary" type="email" placeholder="Vendor email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input className="input-primary" placeholder="Company (optional)" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
      <input className="input-primary" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="btn-primary flex-1">{saving ? 'Saving...' : 'Save Vendor'}</button>
        <button type="button" onClick={() => setOpen(false)} className="btn-outline">Cancel</button>
      </div>
    </form>
  );
    }
