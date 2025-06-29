'use client';

import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '@/keycloak';

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      {children}
    </ReactKeycloakProvider>
  );
}
