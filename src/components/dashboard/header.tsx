"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  PlusCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProfileSheet } from "./profile-sheet";
import { useToast } from "@/hooks/use-toast";

export function DashboardHeader() {
  const router = useRouter();
  const { toast } = useToast();
  const [isProfileSheetOpen, setProfileSheetOpen] = useState(false);
  // Add state for recent prompts
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);

  const handleLogout = () => {
    toast({
      title: "Logout Successful",
      description: "You have been successfully logged out.",
    });
    router.push('/login');
  };

  // Handler for Recent Prompts click
  const handleRecentPromptsClick = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/rules");
      if (response.ok) {
        const data = await response.json();
        // Extract only rule_description for prompts
        const prompts = Array.isArray(data)
          ? data.map((rule) => rule.rule_description)
          : [];
        setRecentPrompts(prompts);
        // Navigate to recent prompts page, pass prompts as state if needed
        router.push("/dashboard/recent-prompts");
      } else {
        setRecentPrompts([]);
        router.push("/dashboard/recent-prompts");
      }
    } catch (e) {
      setRecentPrompts([]);
      router.push("/dashboard/recent-prompts");
    }
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-8 md:text-sm lg:gap-10">
        <Link
          href="/dashboard"
          className="text-4xl font-extrabold bg-gradient-to-r from-[#6C38FF] via-[#3B1C7A] to-[#1A237E] text-transparent bg-clip-text transition-all duration-200 hover:animate-blink"
          style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          RuleMaster
        </Link>
        <Link
          href="/dashboard"
          className="text-foreground transition-colors hover:text-foreground/80"
        >
          Rules
        </Link>
        <Link
          href="/dashboard/execute"
          className="text-muted-foreground transition-colors hover:text-foreground/80"
        >
          Execute
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground/80"
        >
          Recent Rules
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground/80"
          onClick={handleRecentPromptsClick}
        >
          Recent Prompts
        </Link>
        <Link
          href="/dashboard/analytics"
          className="text-muted-foreground transition-colors hover:text-foreground/80"
        >
          Analytics
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="text-4xl font-extrabold bg-gradient-to-r from-[#6C38FF] via-[#3B1C7A] to-[#1A237E] text-transparent bg-clip-text transition-all duration-200 hover:animate-blink"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              RuleMaster
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              Rules
            </Link>
            <Link
              href="/dashboard/execute"
              className="text-muted-foreground hover:text-foreground"
            >
              Execute
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Recently Added Rules
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRecentPromptsClick}
            >
              Last 10 Prompts
            </Link>
            <Link
              href="/dashboard/analytics"
              className="text-muted-foreground hover:text-foreground"
            >
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex items-center gap-2">
          {/* <Button variant="outline">
            <Bot className="mr-2 h-4 w-4" />
            AI
          </Button> */}
          <Button asChild>
            <Link href="/dashboard/rules/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Rule
            </Link>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="/triangle-logo.png" alt="Triangle Logo" data-ai-hint="triangle logo"/>
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setProfileSheetOpen(true)}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ProfileSheet open={isProfileSheetOpen} onOpenChange={setProfileSheetOpen} />
    </header>
  );
}
