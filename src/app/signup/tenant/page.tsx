'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import styles from './page.module.css';
import { useToast } from '@/hooks/use-toast';

export default function CreateTenantPage() {
  const { toast } = useToast();
  const [tenantName, setTenantName] = useState('');
  const [tenantDescription, setTenantDescription] = useState('');
  const [errors, setErrors] = useState<{ tenantName?: string }>({});

  const validate = () => {
    const newErrors: { tenantName?: string } = {};
    if (!tenantName) {
      newErrors.tenantName = 'Tenant name is required.';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Clear errors and submit form
    setErrors({});
    console.log('Form submitted:', { tenantName, tenantDescription });
    
    toast({
      title: 'Success!',
      description: 'Tenant has been created successfully.',
    });
    
    // Reset form
    setTenantName('');
    setTenantDescription('');
  };


  return (
    <div className={styles.pageWrapper}>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-3xl font-bold text-center mb-4">Tenant Management</h1>
        
        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto mt-10">
          
          {/* Left Column: Create Tenant Form */}
          <div className="lg:col-span-3">
            <Link href="/signup" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Signup Options
            </Link>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Tenant</h2>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="tenant-name">Tenant Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="tenant-name" 
                      placeholder="Enter tenant name" 
                      value={tenantName}
                      onChange={(e) => setTenantName(e.target.value)}
                    />
                    {errors.tenantName && <p className="text-sm text-red-600 mt-1">{errors.tenantName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tenant-description">Tenant Description</Label>
                    <Textarea 
                      id="tenant-description" 
                      placeholder="Provide a brief description of the tenant" 
                      className="min-h-[120px] resize-none"
                      value={tenantDescription}
                      onChange={(e) => setTenantDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={() => {
                        setTenantName('');
                        setTenantDescription('');
                        setErrors({});
                    }}>Cancel</Button>
                    <Button type="submit">Save</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Understanding Tenants */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-white">
              <CardHeader>
                <CardTitle>Understanding Tenants</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center space-y-4">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="25" y="40" width="150" height="120" rx="15" fill="#E0BBE4" stroke="#957DAD" strokeWidth="2"/>
              <rect x="40" y="80" width="40" height="80" fill="#957DAD"/>
              <rect x="120" y="80" width="40" height="80" fill="#957DAD"/>
              <circle cx="100" cy="65" r="15" fill="#FFF" stroke="#957DAD" strokeWidth="2"/>
              <path d="M100 80L100 120" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
              <path d="M70 120L100 90L130 120" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
              <text x="100" y="70" textAnchor="middle" fill="#957DAD" fontSize="12" fontWeight="bold">T</text>
              <text x="100" y="100" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">Tenant</text>
            </svg>
                <p className="text-muted-foreground text-sm">
                  Define key details for each tenant environment.
                </p>
                <ol className="text-left space-y-4 text-sm text-muted-foreground w-full pl-4 pt-2">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                    <span>Enter a unique name for the new tenant.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                    <span>Provide a detailed description outlining the tenant's purpose or scope.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">3</div>
                    <span>Click 'Save' to proceed with tenant creation.</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
