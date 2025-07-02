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
import { Checkbox } from '@/components/ui/checkbox';
import styles from './page.module.css';
import { useToast } from '@/hooks/use-toast';

type Errors = {
    roleName?: string;
    department?: string;
};

export default function CreateRolePage() {
    const { toast } = useToast();
    const [roleName, setRoleName] = useState('');
    const [department, setDepartment] = useState('');
    const [permissions, setPermissions] = useState({
        create: false,
        edit: false,
        view: false,
        delete: false,
    });
    const [errors, setErrors] = useState<Errors>({});

    const handlePermissionChange = (permission: keyof typeof permissions) => {
        setPermissions(prev => ({ ...prev, [permission]: !prev[permission] }));
    };

    const validate = () => {
        const newErrors: Errors = {};
        if (!roleName) newErrors.roleName = 'Role name is required.';
        if (!department) newErrors.department = 'Department is required.';
        return newErrors;
    };

    const handleReset = () => {
        setRoleName('');
        setDepartment('');
        setPermissions({ create: false, edit: false, view: false, delete: false });
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
        console.log('Form submitted:', { roleName, department, permissions });

        toast({
            title: 'Success!',
            description: 'Role has been created successfully.',
        });

        handleReset();
    };

    return (
        <div className={styles.pageWrapper}>
            <main className="container mx-auto py-12 px-4 md:px-6">
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Role Management</h1>

                <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto mt-10">
                    {/* Left Column: Role Details Form */}
                    <div className="lg:col-span-3">
                        <Link href="/signup" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Signup Options
                        </Link>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Role Details & Permissions</h2>
                        <Card>
                            <CardContent className="p-6">
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="space-y-2">
                                        <Label htmlFor="role-name">Role Name <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="role-name"
                                            placeholder="e.g., Marketing Manager"
                                            value={roleName}
                                            onChange={(e) => setRoleName(e.target.value)}
                                        />
                                        {errors.roleName && <p className="text-sm text-red-600 mt-1">{errors.roleName}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Select Department <span className="text-red-500">*</span></Label>
                                        <Select value={department} onValueChange={setDepartment}>
                                            <SelectTrigger id="department">
                                                <SelectValue placeholder="Select Department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sales">Sales</SelectItem>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                <SelectItem value="engineering">Engineering</SelectItem>
                                                <SelectItem value="hr">Human Resources</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.department && <p className="text-sm text-red-600 mt-1">{errors.department}</p>}
                                    </div>
                                    <div className="space-y-4">
                                        <Label>Assign Access Permissions:</Label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-lg border p-4">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="perm-create" checked={permissions.create} onCheckedChange={() => handlePermissionChange('create')} />
                                                <Label htmlFor="perm-create" className="font-normal cursor-pointer">Create</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="perm-edit" checked={permissions.edit} onCheckedChange={() => handlePermissionChange('edit')} />
                                                <Label htmlFor="perm-edit" className="font-normal cursor-pointer">Edit</Label>
                                            </div>
                                             <div className="flex items-center space-x-2">
                                                <Checkbox id="perm-view" checked={permissions.view} onCheckedChange={() => handlePermissionChange('view')} />
                                                <Label htmlFor="perm-view" className="font-normal cursor-pointer">View</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="perm-delete" checked={permissions.delete} onCheckedChange={() => handlePermissionChange('delete')} />
                                                <Label htmlFor="perm-delete" className="font-normal cursor-pointer">Delete</Label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button variant="outline" type="button" onClick={handleReset}>Cancel</Button>
                                        <Button type="submit">Save Role</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Role Definition Guidelines */}
                    <div className="lg:col-span-2">
                         <Card className="h-full bg-white">
                            <CardHeader>
                                <CardTitle>Role Definition Guidelines</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center text-center space-y-4">
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="70" fill="#E0BBE4" stroke="#957DAD" strokeWidth="2"/>
              <path d="M100 60 L120 80 L100 140 L80 80 Z" fill="#FFF"/>
              <circle cx="80" cy="80" r="15" fill="#957DAD"/>
              <circle cx="120" cy="80" r="15" fill="#957DAD"/>
              <circle cx="100" cy="140" r="15" fill="#957DAD"/>
              <path d="M100 100 L125 125 L100 150 L75 125 Z" fill="#957DAD"/>
              <text x="100" y="105" textAnchor="middle" fill="#FFF" fontSize="18" fontWeight="bold">R</text>
              <text x="100" y="130" textAnchor="middle" fill="#FFF" fontSize="10">ROLE</text>
            </svg>
                                <p className="text-muted-foreground text-sm">
                                    Define specific roles and their associated access levels within the system.
                                </p>
                                <ol className="text-left space-y-4 text-sm text-muted-foreground w-full pl-4 pt-2">
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                                        <span>Enter a clear and descriptive name for the role.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                                        <span>Select the department to which this role primarily belongs.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">3</div>
                                        <span>Carefully assign 'Create', 'Edit', 'View', and 'Delete' permissions as required for the role.</span>
                                    </li>
                                     <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 bg-gray-200 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs mt-0.5">4</div>
                                        <span>Click 'Save Role' to finalize the role creation.</span>
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
