// src/app/reset-password/page.tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import ResetPasswordForm from '@/components/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password',
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return (
    <div className="site-container py-16 sm:py-24">
      <div className="card mx-auto max-w-md p-6 sm:p-8">
        <Suspense fallback={<p className="text-slate-600">Loading…</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
