'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccountContent from '@/components/account/AccountContent';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="section-padding">
        <div className="container-custom">
          <AccountContent />
          <div className="mt-6 text-center text-sm">
            <a href="/forgot-password" className="text-orange-600 hover:text-orange-700">Forgot password?</a>
            <span className="mx-2 text-gray-300">|</span>
            <a href="/verify-email" className="text-orange-600 hover:text-orange-700">Verify email</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}