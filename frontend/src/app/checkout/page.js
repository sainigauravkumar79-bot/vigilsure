'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const PLAN_NAMES = { pro: 'Pro', enterprise: 'Enterprise' };
const PRICES = { pro: { monthly: 29, yearly: 199 }, enterprise: { monthly: 99, yearly: 699 } };

function CheckoutForm() {
  const [plan, setPlan] = useState('');
  const [period, setPeriod] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push('/auth/signin'); return; }

    const planParam = searchParams.get('plan');
    const periodParam = searchParams.get('period') || 'monthly';
    if (planParam) { setPlan(planParam); setPeriod(periodParam); }
    else {
      const savedPlan = sessionStorage.getItem('selectedPlan');
      const savedPeriod = sessionStorage.getItem('billingPeriod') || 'monthly';
      if (savedPlan) { setPlan(savedPlan); setPeriod(savedPeriod); }
    }

    if (searchParams.get('success') === 'true') { toast.success('Payment successful!'); router.push('/dashboard'); }
    if (searchParams.get('canceled') === 'true') { toast.error('Payment cancelled.'); router.push('/pricing'); }
  }, [user, authLoading, router, searchParams]);

  const createOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/payment/create-order', { plan, period });
      return response.data.orderId;
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create order');
      setLoading(false);
      throw err;
    }
  };

  const onApprove = async (data) => {
    try {
      setProcessing(true);
      await axios.post('/payment/capture-order', { orderId: data.orderID, plan, period });
      toast.success('🎉 Payment successful! Your plan is now active.');
      router.push('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Payment capture failed');
      setProcessing(false);
    }
  };

  if (authLoading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const amount = PRICES[plan]?.[period] || 0;
  const planName = PLAN_NAMES[plan] || plan;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 pt-20">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="text-gray-500 text-sm mt-1">Complete your subscription</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">Plan: <strong>{planName} ({period})</strong></p>
          <p className="text-sm text-gray-600">Price: <strong>${amount}</strong></p>
          <p className="text-sm text-gray-600">Email: <strong>{user.email}</strong></p>
        </div>
        {loading || processing ? (
          <div className="text-center py-4">{processing ? 'Processing...' : 'Creating order...'}</div>
        ) : plan && amount > 0 ? (
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} onCancel={() => { toast.error('Cancelled'); router.push('/pricing'); }} onError={() => toast.error('PayPal error')} style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }} />
        ) : (
          <div className="text-center py-4 text-red-500">No plan selected. <Link href="/pricing" className="text-primary hover:underline">Go back</Link></div>
        )}
        <p className="text-xs text-gray-400 text-center mt-4">Cancel anytime. Secure payment via PayPal.</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutForm />
    </Suspense>
  );
          }
