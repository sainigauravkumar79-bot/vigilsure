'use client';
import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

const plans = {
  free: {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    vendors: '5',
    features: ['5 Vendors', 'Email Alerts', 'Basic Dashboard'],
    cta: 'Get Started'
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 29, yearly: 199 },
    vendors: '50',
    features: ['50 Vendors', 'Smart Alerts (30/15/7 days)', 'Advanced Dashboard', 'Vendor Portal', 'Email Support'],
    popular: true,
    cta: 'Subscribe Now'
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 99, yearly: 699 },
    vendors: 'Unlimited',
    features: ['Unlimited Vendors', 'Smart Alerts', 'API Access', 'Dedicated Support', 'On-premise Option', 'Audit Logs'],
    cta: 'Contact Sales'
  }
};

export default function Pricing() {
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const handleSubscribe = (planId) => {
    if (planId === 'free') {
      window.location.href = user ? '/dashboard' : '/auth/signup';
      return;
    }
    sessionStorage.setItem('selectedPlan', planId);
    sessionStorage.setItem('billingPeriod', billingPeriod);
    window.location.href = `/checkout?plan=${planId}&period=${billingPeriod}`;
  };

  const getPrice = (plan) => {
    return billingPeriod === 'yearly' ? `$${plan.price.yearly}` : `$${plan.price.monthly}`;
  };

  const getPeriodLabel = () => billingPeriod === 'yearly' ? '/year' : '/month';

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Simple <span className="gradient-text">Pricing</span></h2>
        <p className="mt-4 text-gray-600">Choose the plan that fits your needs.</p>
        <div className="mt-6 inline-flex bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setBillingPeriod('monthly')} className={`px-4 py-2 rounded-md text-sm font-medium transition ${billingPeriod === 'monthly' ? 'bg-white shadow-md text-primary' : 'text-gray-600'}`}>Monthly</button>
          <button onClick={() => setBillingPeriod('yearly')} className={`px-4 py-2 rounded-md text-sm font-medium transition ${billingPeriod === 'yearly' ? 'bg-white shadow-md text-primary' : 'text-gray-600'}`}>Yearly <span className="text-xs text-green-500">Save 43%</span></button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {Object.values(plans).map((plan) => (
          <div key={plan.id} className={`card-hover p-6 ${plan.popular ? 'border-2 border-primary shadow-xl' : ''}`}>
            {plan.popular && <span className="text-xs bg-primary text-white px-3 py-1 rounded-full">Most Popular</span>}
            <h3 className="text-xl font-bold mt-2">{plan.name}</h3>
            <div className="text-3xl font-bold text-primary my-2">
              {getPrice(plan)}
              <span className="text-sm font-normal text-gray-500">{getPeriodLabel()}</span>
            </div>
            <p className="text-sm text-gray-500">{plan.vendors} vendors</p>
            <ul className="mt-4 space-y-2 text-left">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm"><FiCheck className="text-green-500" /> {f}</li>
              ))}
            </ul>
            <button onClick={() => handleSubscribe(plan.id)} className={`mt-6 w-full text-center py-3 rounded-lg font-semibold transition-all duration-200 ${plan.popular ? 'btn-primary' : plan.id === 'free' ? 'border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary' : 'btn-outline'}`}>{plan.cta}</button>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-400 mt-8">Free plan included • No credit card required • Cancel anytime</p>
    </section>
  );
                                  }
