'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import styles from './page.module.css';

export default function CreateUserPage() {
    const [userType, setUserType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [realm, setRealm] = useState('');

    return (
        <div className={styles.pageWrapper}>
            <main className="container mx-auto py-12 px-4 md:px-6">
                <div className="max-w-2xl mx-auto">
                     <Link href="/signup" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Signup Options
                    </Link>
                    <h1 className="text-2xl font-semibold mb-6 text-gray-800">Create Users</h1>

                    <Card>
                        <CardContent className="p-6">
                             <form className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="user-type">User type <span className="text-red-500">*</span></Label>
                                    <Select value={userType} onValueChange={setUserType}>
                                        <SelectTrigger id="user-type">
                                            <SelectValue placeholder="Select User Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="standard">Standard</SelectItem>
                                            <SelectItem value="guest">Guest</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                 <div className="space-y-2">
                                    <Label htmlFor="first-name">First name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="first-name"
                                        placeholder="Enter first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="last-name"
                                        placeholder="Enter last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="username"
                                        placeholder="Choose a unique username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="realm">Select realm</Label>
                                    <Select value={realm} onValueChange={setRealm}>
                                        <SelectTrigger id="realm">
                                            <SelectValue placeholder="Select a realm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="realm1">Cateina</SelectItem>
                                            <SelectItem value="realm2">RuleMaster</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Save</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
