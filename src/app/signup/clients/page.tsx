'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import styles from './page.module.css';
import { useToast } from '@/hooks/use-toast';

type Errors = {
    realm?: string;
    clientType?: string;
    clientName?: string;
};

export default function CreateClientPage() {
    const { toast } = useToast();
    const [realm, setRealm] = useState('');
    const [clientType, setClientType] = useState('');
    const [clientName, setClientName] = useState('');
    const [errors, setErrors] = useState<Errors>({});

    const validate = () => {
        const newErrors: Errors = {};
        if (!realm) newErrors.realm = 'Realm is required.';
        if (!clientType) newErrors.clientType = 'Client type is required.';
        if (!clientName) newErrors.clientName = 'Client name is required.';
        return newErrors;
    };

    const handleReset = () => {
        setRealm('');
        setClientType('');
        setClientName('');
        setErrors({});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        console.log('Form submitted:', { realm, clientType, clientName });

        toast({
            title: 'Success!',
            description: 'Client has been created successfully.',
        });

        handleReset();
    };


    return (
        <div className={styles.pageWrapper}>
            <main className="container mx-auto py-12 px-4 md:px-6">
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Client Management</h1>

                <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto mt-10">
                    {/* Left Column: Client Details Form */}
                    <div className="lg:col-span-3">
                        <Link href="/signup" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Signup Options
                        </Link>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Client Details</h2>
                        <Card>
                            <CardContent className="p-6">
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="space-y-2">
                                        <Label htmlFor="realm">Select Realm <span className="text-red-500">*</span></Label>
                                        <Select value={realm} onValueChange={setRealm}>
                                            <SelectTrigger id="realm">
                                                <SelectValue placeholder="Select a Realm" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="realm1">Cateina</SelectItem>
                                                <SelectItem value="realm2">RuleMaster</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.realm && <p className="text-sm text-red-600 mt-1">{errors.realm}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="client-type">Select Client Type <span className="text-red-500">*</span></Label>
                                        <Select value={clientType} onValueChange={setClientType}>
                                            <SelectTrigger id="client-type">
                                                <SelectValue placeholder="Select Client Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="public">Public</SelectItem>
                                                <SelectItem value="confidential">Confidential</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.clientType && <p className="text-sm text-red-600 mt-1">{errors.clientType}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="client-name">Client Name <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="client-name"
                                            placeholder="Enter client name"
                                            value={clientName}
                                            onChange={(e) => setClientName(e.target.value)}
                                        />
                                        {errors.clientName && <p className="text-sm text-red-600 mt-1">{errors.clientName}</p>}
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <Button variant="outline" type="button" onClick={handleReset}>Cancel</Button>
                                        <Button type="submit">Save</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Client Configuration */}
                    <div className="lg:col-span-2">
                        <Card className="h-full bg-white">
                            <CardHeader>
                                <CardTitle>Client Configuration</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center text-center space-y-4">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="50" width="100" height="100" rx="15" fill="#E0BBE4" stroke="#957DAD" strokeWidth="2"/>
              <path d="M70 70H130V80H70V70Z" fill="#957DAD"/>
              <circle cx="70" cy="100" r="10" fill="#957DAD"/>
              <circle cx="130" cy="100" r="10" fill="#957DAD"/>
              <path d="M70 120H130V130H70V120Z" fill="#957DAD"/>
              <path d="M60 90C60 90 55 95 60 100" stroke="#FFF" strokeWidth="1" strokeLinecap="round"/>
              <path d="M140 90C140 90 145 95 140 100" stroke="#FFF" strokeWidth="1" strokeLinecap="round"/>
              <path d="M100 50L100 40M90 50L90 40M110 50L110 40" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
              <text x="100" y="110" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">CLIENT</text>
            </svg>
                                <p className="text-muted-foreground text-sm">
                                    Set up new clients and define their access parameters. Fields will change based on client type.
                                </p>
                                <ol className="text-left space-y-4 text-sm text-muted-foreground w-full pl-4 pt-2">
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                                        <span>Select the specific realm the client belongs to.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                                        <span>Choose whether the client is 'Public' or 'Confidential'.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">3</div>
                                        <span>Enter a descriptive name for the client.</span>
                                    </li>
                                     <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">4</div>
                                        <span>Click 'Save' to finalize client creation.</span>
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
