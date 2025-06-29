'use client';

import { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function LoginPage() {
  const { keycloak, initialized } = useKeycloak();
  const router = useRouter();

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      router.push('/dashboard');
    }
  }, [initialized, keycloak, router]);

  const handleLogin = () => {
    if (keycloak) {
      keycloak.login();
    }
  };
  
  const handleRegister = () => {
    if (keycloak) {
      keycloak.register();
    }
  }

  if (!initialized) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <p>Loading Keycloak...</p>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
           <div className="flex justify-center items-center gap-2 mb-4">
             <Bot className="h-8 w-8 text-accent" />
             <h1 className="text-2xl font-bold font-headline">RuleMaster AI</h1>
           </div>
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Please login or register to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
          <Button onClick={handleRegister} variant="outline" className="w-full">
            Sign Up
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
