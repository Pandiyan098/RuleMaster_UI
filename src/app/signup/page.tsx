'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Registration is handled by Keycloak, so we redirect to the login page
    // which contains the registration link.
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <p>Redirecting to login...</p>
    </div>
  );
}
