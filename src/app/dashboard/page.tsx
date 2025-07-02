'use client';

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Rule } from "@/lib/definitions";
import { RuleTable } from "@/components/dashboard/rule-table";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";


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
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // Use an environment variable for the API URL for better configuration.
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/rules`;
    try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data: ApiRule[] = await response.json();

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
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      console.error("Failed to fetch rules:", e);
      // Provide a more detailed error message to help with debugging.
      setError(`Could not fetch rules from "${apiUrl}". Please ensure the API server is running and that it allows requests from this application (CORS). Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  if (error) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Fetching Data</AlertTitle>
            <AlertDescription>
              <div className="flex flex-col gap-4 mt-2">
                <span>{error}</span>
                <Button variant="secondary" className="self-start" onClick={fetchData}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                </Button>
              </div>
            </AlertDescription>
        </Alert>
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
