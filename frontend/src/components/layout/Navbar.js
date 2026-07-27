'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">V</div>
            <span className="text-xl font-bold text-dark">VigilSure</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-600 hover:text-primary text-sm">Features</a>
            <a href="/#pricing" className="text-gray-600 hover:text-primary text-sm">Pricing</a>
            <a href="/#security" className="text-gray-600 hover:text-primary text-sm">Security</a>
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-primary text-sm">Dashboard</Link>
                <button onClick={logout} className="flex items-center space-x-1 text-red-500 hover:text-red-700 text-sm"><FiLogOut /> <span>Logout</span></button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin" className="btn-ghost text-sm">Sign In</Link>
                <Link href="/auth/signup" className="btn-primary py-2 px-4 text-sm">Get Started Free</Link>
              </div>
            )}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-dark"><FiMenu className="w-6 h-6" /></button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4 space-y-2">
          <a href="/#features" className="block text-gray-600 hover:text-primary">Features</a>
          <a href="/#pricing" className="block text-gray-600 hover:text-primary">Pricing</a>
          <a href="/#security" className="block text-gray-600 hover:text-primary">Security</a>
          {user ? <button onClick={logout} className="text-red-500">Logout</button> : (
            <>
              <Link href="/auth/signin" className="block text-gray-600 hover:text-primary">Sign In</Link>
              <Link href="/auth/signup" className="block btn-primary text-center">Get Started Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
              }
