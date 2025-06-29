'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';


interface ProfileSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProfileSheet({ open, onOpenChange }: ProfileSheetProps) {
    const { theme, setTheme } = useTheme();

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full md:w-1/4" side="right">
            <SheetHeader className="text-left">
                <SheetTitle>Profile</SheetTitle>
                <SheetDescription>
                    Update your account and preference settings.
                </SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-6">
                <div className="grid gap-4">
                    <h3 className="font-semibold text-lg">Account</h3>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="RuleMaster" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="user@rulemaster.ai" />
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <h3 className="font-semibold text-lg">Preferences</h3>
                    <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                        <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    <div className="grid gap-2">
                    <Label>Theme</Label>
                    <RadioGroup
                        value={theme}
                        onValueChange={setTheme}
                        className="flex items-center gap-4"
                    >
                        <Label htmlFor="theme-light-sheet" className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem value="light" id="theme-light-sheet" />
                        Light
                        </Label>
                        <Label htmlFor="theme-dark-sheet" className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem value="dark" id="theme-dark-sheet" />
                        Dark
                        </Label>
                        <Label htmlFor="theme-system-sheet" className="flex items-center gap-2 cursor-pointer">
                            <RadioGroupItem value="system" id="theme-system-sheet" />
                            System
                        </Label>
                    </RadioGroup>
                    </div>
                </div>
            </div>
             <SheetFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Save changes</Button>
             </SheetFooter>
        </SheetContent>
        </Sheet>
    );
}
