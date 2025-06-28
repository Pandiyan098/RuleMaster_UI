"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (username?: string, password?: string) => void;
  title: string;
  description: string;
}

export function AuthDialog({ open, onOpenChange, onConfirm, title, description }: AuthDialogProps) {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    // In a real app, this would be a proper authentication call.
    // For this prototype, we'll use a simple hardcoded check.
    if (username === "admin" && password === "password") {
      onConfirm(username, password);
      onOpenChange(false);
      setUsername("");
      setPassword("");
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Invalid username or password.",
      });
    }
  };
  
  const handleCancel = () => {
    onOpenChange(false);
    setUsername("");
    setPassword("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username-auth" className="text-right">
              Username
            </Label>
            <Input
              id="username-auth"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
              defaultValue="admin"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password-auth" className="text-right">
              Password
            </Label>
            <Input
              id="password-auth"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button type="button" onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
