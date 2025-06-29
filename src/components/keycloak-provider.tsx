'use client';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '@/keycloak';

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          typeof window !== 'undefined'
            ? `${window.location.origin}/silent-check-sso.html`
            : undefined,
      }}
    >
      {children}
    </ReactKeycloakProvider>
  );
}
