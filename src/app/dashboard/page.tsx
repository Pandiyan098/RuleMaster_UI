'use client';

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Rule } from "@/lib/definitions";
import { RuleTable } from "@/components/dashboard/rule-table";
import { Loader2 } from "lucide-react";


// The API response structure from your prompt
type ApiRule = {
    rule_id: number;
    rule_name: string;
    rule: {
        field: string;
        value: any;
        entity: string;
        condition: string;
    };
    rule_description: string;
    created_on: string;
    updated_on: string;
    tenant_id: string;
    status: string;
};

export default function DashboardPage() {
  const { toast } = useToast();
  const [rules, setRules] = useState<Rule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    // Use an environment variable for the API URL for better configuration.
    const apiUrl = `http://localhost:4000/api/rules`;
    try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data: ApiRule[] = await response.json();
      console.log("Fetched rules:", data);

      // Transform the API data to match the `Rule` type expected by components
      const transformedRules = data.map(apiRule => ({
        id: String(apiRule.rule_id),
        name: apiRule.rule_name,
        description: apiRule.rule_description,
        status: apiRule.status as 'active' | 'inactive',
        createdAt: apiRule.created_on,
      }));

      setRules(transformedRules);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'API Connection Failed',
        description: 'Could not connect to the rules API. Displaying mock data as a fallback.',
        duration: 5000,
      });

      const mockRules: Rule[] = [
        { id: 'MOCK1', name: 'Mock: VIP Customer Discount', description: 'Customer receives a 15% discount on all purchases.', status: 'active', createdAt: '2023-10-26T10:00:00.000Z' },
        { id: 'MOCK2', name: 'Mock: Free Shipping', description: 'Orders over $50 qualify for free shipping.', status: 'inactive', createdAt: '2023-10-25T12:30:00.000Z' },
        { id: 'MOCK3', name: 'Mock: High-Value Order Alert', description: 'Alerts staff when an order over $1000 is placed.', status: 'active', createdAt: '2023-10-24T15:45:00.000Z' },
        { id: 'MOCK4', name: 'Mock: Content Moderation', description: 'Flags content containing forbidden keywords.', status: 'active', createdAt: '2023-10-23T09:20:00.000Z' },
      ];
      setRules(mockRules);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggleStatus = (ruleId: string) => {
    setRules(prevRules =>
      prevRules.map(rule =>
        rule.id === ruleId
          ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
          : rule
      )
    );
    toast({ title: "Success", description: "Rule status updated." });
  };

  const handleDelete = (ruleId: string) => {
    setRules(prevRules => prevRules.filter(rule => rule.id !== ruleId));
    toast({ title: "Success", description: "Rule deleted." });
  };

  const handleEdit = (ruleId: string) => {
    toast({ title: "Edit Action", description: `Proceeding to edit rule ${ruleId}`});
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-8">
      <RuleTable
        title="All Rules"
        description="A comprehensive list of all rules in the system."
        rules={rules}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
