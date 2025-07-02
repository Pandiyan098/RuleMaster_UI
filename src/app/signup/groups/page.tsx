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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import styles from './page.module.css';

export default function CreateGroupPage() {
    const [realm, setRealm] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');

    return (
        <div className={styles.pageWrapper}>
            <main className="container mx-auto py-12 px-4 md:px-6">
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Group Management</h1>

                <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto mt-10">
                    {/* Left Column: Group Details Form */}
                    <div className="lg:col-span-3">
                        <Link href="/signup" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Signup Options
                        </Link>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Group Details</h2>
                        <Card>
                            <CardContent className="p-6">
                                <form className="space-y-6">
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
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="group-name">Group Name <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="group-name"
                                            placeholder="Enter group name"
                                            value={groupName}
                                            onChange={(e) => setGroupName(e.target.value)}
                                        />
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="group-description">Group Description</Label>
                                        <Textarea
                                          id="group-description"
                                          placeholder="Provide a brief description of the group's purpose"
                                          className="min-h-[120px] resize-none"
                                          value={groupDescription}
                                          onChange={(e) => setGroupDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <Button variant="outline">Cancel</Button>
                                        <Button>Save</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Group Configuration */}
                    <div className="lg:col-span-2">
                        <Card className="h-full bg-white">
                            <CardHeader>
                                <CardTitle>Group Creation Guidelines</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center text-center space-y-4">
                                <Image
                                    src="https://placehold.co/200x150.png"
                                    alt="Group Configuration"
                                    width={200}
                                    height={150}
                                    data-ai-hint="group icon"
                                    className="rounded-lg mb-4"
                                />
                                <p className="text-muted-foreground text-sm">
                                    Create new user groups to streamline permissions and access management.
                                </p>
                                <ol className="text-left space-y-4 text-sm text-muted-foreground w-full pl-4 pt-2">
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                                        <span>Select the realm this group will belong to.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                                        <span>Provide a clear and unique name for the group.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">3</div>
                                        <span>Write a short description of the group's purpose.</span>
                                    </li>
                                     <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">4</div>
                                        <span>Click 'Save' to create the new group.</span>
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
