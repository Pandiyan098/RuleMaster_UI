'use client';

import { DashboardHeader } from "@/components/dashboard/header";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { keycloak, initialized } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      router.push('/login');
    }
  }, [initialized, keycloak, router]);

  if (!initialized || !keycloak.authenticated) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Authenticating...</p>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
