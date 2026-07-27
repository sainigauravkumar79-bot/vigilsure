'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import UseCases from '@/components/landing/UseCases';
import Integrations from '@/components/landing/Integrations';
import ROICalculator from '@/components/landing/ROICalculator';
import Security from '@/components/landing/Security';
import Testimonials from '@/components/landing/Testimonials';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import CTASection from '@/components/landing/CTASection';
import ThreeBackground from '@/components/ui/ThreeBackground';

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <Integrations />
        <ROICalculator />
        <Security />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
