'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import StatsCards from '@/components/dashboard/StatsCards';
import VendorTable from '@/components/dashboard/VendorTable';
import UploadZone from '@/components/dashboard/UploadZone';
import AddVendorForm from '@/components/dashboard/AddVendorForm';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ totalVendors: 0, activeInsurances: 0, expiredInsurances: 0, expiringSoon: 0 });
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push('/auth/signin'); return; }
    fetchData();
  }, [user, authLoading]);

  const fetchData = async () => {
    try {
      const statsRes = await axios.get('/dashboard/stats');
      setStats(statsRes.data);
      const vendorsRes = await axios.get('/vendors');
      setVendors(vendorsRes.data);
    } catch (err) {
      toast.error('Failed to load data');
    }
  };

  if (authLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="pt-24 pb-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <StatsCards stats={stats} />
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload COI</h2>
          <UploadZone vendors={vendors} onUploadSuccess={fetchData} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Vendors</h2>
            <AddVendorForm onAdded={fetchData} />
          </div>
          <VendorTable vendors={vendors} />
        </div>
      </div>
    </div>
  );
    }
