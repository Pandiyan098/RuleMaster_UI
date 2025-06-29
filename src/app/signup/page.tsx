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

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful signup for prototype
    console.log('Signing up with:', { email, password });
    toast({
      title: 'Account Created',
      description: 'You can now log in with your new account.',
    });
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
        <div className="absolute top-8 left-8 flex items-center gap-2 text-white">
          <Bot className="h-6 w-6" />
          <span className="text-xl font-semibold">RuleMaster AI</span>
        </div>
        <Card className="w-full max-w-sm mx-4 bg-white/10 backdrop-blur-lg border-gray-400/20 text-white">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription className="text-gray-300">
                Enter your details to get started.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent border-gray-400/50 placeholder:text-gray-400"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
                Create Account
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link href="/login" className="underline hover:text-gray-200">
                Login
                </Link>
            </div>
            </CardContent>
        </Card>
    </div>
  );
}
