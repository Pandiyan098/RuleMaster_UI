'use client';

import { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { keycloak, initialized } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (initialized) {
      if (keycloak.authenticated) {
        // If user is already authenticated, send them to the dashboard.
        router.push('/dashboard');
      } else {
        // If user is not authenticated, trigger the Keycloak login flow immediately.
        keycloak.login();
      }
    }
  }, [initialized, keycloak, router]);

  // This page will show a brief message while the Keycloak checks are in progress
  // before redirecting the user.
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <p>Redirecting to login service...</p>
    </div>
  );
}
