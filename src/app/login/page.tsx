'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Bot } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [tenantName, setTenantName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful login for prototype
    console.log('Logging in with:', { tenantName, username, password });
    toast({
      title: 'Login Successful',
      description: 'Welcome back! Redirecting to dashboard...',
    });
    router.push('/dashboard');
  };
  
  const handleGoogleLogin = () => {
    toast({
        title: "Coming Soon!",
        description: "Google login is not yet implemented."
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
      <div className="absolute top-8 left-8 flex items-center gap-2 text-white">
          <Bot className="h-6 w-6" />
          <span className="text-xl font-semibold">RuleMaster AI</span>
      </div>
      <Card className="w-full max-w-sm mx-4 bg-white/10 backdrop-blur-lg border-gray-400/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="text-gray-300">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tenant-name">Tenant Name</Label>
              <Input
                id="tenant-name"
                type="text"
                placeholder="Your company name"
                required
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                className="bg-transparent border-gray-400/50 placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your_username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent border-gray-400/50 placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline hover:text-gray-200">
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-gray-400/50 placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold">
              Login
            </Button>
             <Button type="button" variant="outline" className="w-full bg-transparent hover:bg-white/10 border-gray-400/50" onClick={handleGoogleLogin}>
                Login with Google
             </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
