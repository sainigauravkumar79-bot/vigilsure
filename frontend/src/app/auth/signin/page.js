'use client';
import { Suspense, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!');
      const plan = searchParams.get('plan');
      const period = searchParams.get('period') || 'monthly';
      if (plan && plan !== 'free') {
        sessionStorage.setItem('selectedPlan', plan);
        sessionStorage.setItem('billingPeriod', period);
        router.push(`/checkout?plan=${plan}&period=${period}`);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input-primary" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input-primary" required />
          <button type="submit" className="btn-primary w-full">Sign In</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">Don't have an account? <Link href="/auth/signup" className="text-primary hover:underline">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
