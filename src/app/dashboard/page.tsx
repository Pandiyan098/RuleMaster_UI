"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Rule } from "@/lib/definitions";
import { AuthDialog } from "@/components/dashboard/auth-dialog";
import { useToast } from "@/hooks/use-toast";

const initialRules: Rule[] = [
    { id: '1', name: 'Commission Bonus', description: 'Give a 5% bonus if sales are greater than 10 units.', status: 'active', createdAt: '2023-06-23' },
    { id: '2', name: 'Content Moderation', description: 'Flag content for review if it contains "spam" or "offensive".', status: 'active', createdAt: '2023-06-22' },
    { id: '3', name: 'Free Shipping', description: 'Apply free shipping for all orders over $50.', status: 'inactive', createdAt: '2023-06-21' },
    { id: '4', name: 'VIP Customer Discount', description: 'Give a 15% discount to all customers with "gold" loyalty status.', status: 'active', createdAt: '2023-06-20' },
    { id: '5', name: 'High-Value Order Alert', description: 'Send a notification for any order over $1000.', status: 'active', createdAt: '2023-06-19' },
];

export default function DashboardPage() {
  const { toast } = useToast();
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ action: () => void, title: string, description: string } | null>(null);

  const handleActionClick = (action: () => void, title: string, description: string) => {
    setPendingAction({ action, title, description });
    setIsAuthDialogOpen(true);
  };
  
  const handleConfirmAction = () => {
    if (pendingAction) {
      pendingAction.action();
      setPendingAction(null);
    }
  };

  const handleToggleStatus = (ruleId: string) => {
    const action = () => {
      setRules(prevRules =>
        prevRules.map(rule =>
          rule.id === ruleId
            ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
            : rule
        )
      );
      toast({ title: "Success", description: "Rule status updated." });
    };
    handleActionClick(action, "Confirm Action", "Please enter your credentials to change the rule status.");
  };

  const handleDelete = (ruleId: string) => {
    const action = () => {
      setRules(prevRules => prevRules.filter(rule => rule.id !== ruleId));
      toast({ title: "Success", description: "Rule deleted." });
    };
    handleActionClick(action, "Confirm Deletion", "Please enter your credentials to delete this rule.");
  };
  
  const handleEdit = (ruleId: string) => {
     const action = () => {
      // In a real app, this would navigate to an edit page.
      // For now, we'll just show a toast.
      toast({ title: "Edit Action", description: `Authenticated to edit rule ${ruleId}`});
    };
    handleActionClick(action, "Confirm Edit", "Please enter your credentials to edit this rule.");
  }

  return (
    <>
      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        onConfirm={handleConfirmAction}
        title={pendingAction?.title || "Confirm Action"}
        description={pendingAction?.description || "Please enter your credentials to proceed."}
      />
      <Card>
        <CardHeader>
          <CardTitle>Business Rules</CardTitle>
          <CardDescription>
            Manage and monitor all your custom business rules.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={rule.status === "active" ? "default" : "secondary"}
                      className={cn(
                        "border-transparent",
                        rule.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      )}
                    >
                      {rule.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(rule.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleEdit(rule.id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleToggleStatus(rule.id)}>
                          {rule.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onSelect={() => handleDelete(rule.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
