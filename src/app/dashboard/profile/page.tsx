"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your profile settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="RuleMaster" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="user@rulemaster.ai" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Manage your language and theme preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
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
                <Label htmlFor="theme-light" className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="light" id="theme-light" />
                  Light
                </Label>
                <Label htmlFor="theme-dark" className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  Dark
                </Label>
                <Label htmlFor="theme-system" className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="system" id="theme-system" />
                    System
                </Label>
              </RadioGroup>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
