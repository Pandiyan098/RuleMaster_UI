"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RulePrompt {
  rule_description: string;
  created_on: string;
}

export default function RecentPromptsPage() {
  const [addRulePrompts, setAddRulePrompts] = useState<RulePrompt[]>([]);
  // For now, keep apply rule prompts empty
  const [applyRulePrompts] = useState<RulePrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrompts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:4000/api/rules");
        if (response.ok) {
          const data = await response.json();
          const prompts = Array.isArray(data)
            ? data.map((rule: any) => ({
                rule_description: rule.rule_description,
                created_on: rule.created_on,
              }))
            : [];
          setAddRulePrompts(prompts);
        } else {
          setAddRulePrompts([]);
          setError("Failed to fetch prompts.");
        }
      } catch (e) {
        setAddRulePrompts([]);
        setError("Failed to fetch prompts.");
      } finally {
        setLoading(false);
      }
    }
    fetchPrompts();
  }, []);

  return (
    <div className="container py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Prompts for Add Rule</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : addRulePrompts.length === 0 ? (
            <div>No prompts found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addRulePrompts.map((prompt, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{prompt.rule_description}</TableCell>
                    <TableCell>
                      {new Date(prompt.created_on).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Prompts for Apply Rule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} className="text-center text-muted-foreground">
                  No prompts found.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
