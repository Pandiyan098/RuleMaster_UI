"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Rule } from "@/lib/definitions";
import { RuleTable } from "@/components/dashboard/rule-table";
import { Loader2 } from "lucide-react";

// Mock API response based on the user's provided structure.
// In a real application, this would be fetched from an API endpoint.
const apiResponse = [
    {
        "rule_id": 18,
        "rule_name": "Competitor Pricing Analysis",
        "rule": { "field": "sales_target_achievement_percentage", "value": 85, "entity": "daily_sales", "condition": "<" },
        "rule_description": "If daily sales target is missed by more than 15%, then analyze competitor pricing immediately",
        "created_on": "2025-07-01T07:28:54.251Z",
        "updated_on": "2025-07-01T07:28:54.251Z",
        "tenant_id": "02caae70-9c87-4f0f-a393-5b0f92283a42",
        "status": "active"
    },
    {
        "rule_id": 19,
        "rule_name": "High-Value Order Alert",
        "rule": { "field": "order_value", "value": 1000, "entity": "orders", "condition": ">" },
        "rule_description": "Send a notification for any order over $1000.",
        "created_on": "2023-06-19T10:00:00.000Z",
        "updated_on": "2023-06-19T10:00:00.000Z",
        "tenant_id": "02caae70-9c87-4f0f-a393-5b0f92283a42",
        "status": "active"
    },
    {
        "rule_id": 20,
        "rule_name": "Free Shipping",
        "rule": { "field": "order_total", "value": 50, "entity": "orders", "condition": ">" },
        "rule_description": "Apply free shipping for all orders over $50.",
        "created_on": "2023-06-21T12:00:00.000Z",
        "updated_on": "2023-06-21T12:00:00.000Z",
        "tenant_id": "02caae70-9c87-4f0f-a393-5b0f92283a42",
        "status": "inactive"
    },
    {
        "rule_id": 21,
        "rule_name": "VIP Customer Discount",
        "rule": { "field": "customer_status", "value": "gold", "entity": "customers", "condition": "==" },
        "rule_description": "Give a 15% discount to all customers with 'gold' loyalty status.",
        "created_on": "2023-06-20T14:30:00.000Z",
        "updated_on": "2023-06-20T14:30:00.000Z",
        "tenant_id": "02caae70-9c87-4f0f-a393-5b0f92283a42",
        "status": "active"
    }
];

export default function DashboardPage() {
  const { toast } = useToast();
  const [rules, setRules] = useState<Rule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchData = async () => {
      setIsLoading(true);
      // In a real app, you would fetch from your API endpoint:
      // const response = await fetch('/api/rules');
      // const data = await response.json();
      
      // For this prototype, we use the mock data.
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const data = apiResponse;

      // Transform the API data to match the `Rule` type expected by components
      const transformedRules = data.map(apiRule => ({
        id: String(apiRule.rule_id),
        name: apiRule.rule_name,
        description: apiRule.rule_description,
        status: apiRule.status as 'active' | 'inactive',
        createdAt: apiRule.created_on,
      }));

      setRules(transformedRules);
      setIsLoading(false);
    };

    fetchData();
  }, []);

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