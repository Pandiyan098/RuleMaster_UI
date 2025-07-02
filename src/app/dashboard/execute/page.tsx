'use client';

import { useState } from 'react';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, PlayCircle, Loader2, Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { executeRule } from '@/ai/flows/execute-rule-flow';
import type { ExecuteRuleOutput } from '@/ai/flows/execute-rule-flow';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


// Mock data for rules - in a real app, this would be fetched.
const rules = [
  { id: 's3', name: 'VIP Customer Discount' },
  { id: 's2', name: 'Free Shipping' },
  { id: 'b1', name: 'High-Value Order Alert' },
  { id: 'e1', name: 'Overtime Pay' },
  { id: 's1', name: 'Commission Bonus' },
  { id: 'b2', name: 'Content Moderation' },
  { id: 'e2', name: 'Vacation Accrual' },
  { id: 'g2', name: 'System Maintenance Alert' },
  { id: 'g1', name: 'Document Archival' },
];

export default function ExecutePage() {
  const { toast } = useToast();
  const [selectedRule, setSelectedRule] = useState('');
  const [inputData, setInputData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<ExecuteRuleOutput | null>(null);


  const handleApplyRule = async () => {
    const selectedRuleName = rules.find((r) => r.id === selectedRule)?.name;

    if (!selectedRuleName) {
      toast({
        variant: 'destructive',
        title: 'No rule selected',
        description: 'Please select a rule to apply.',
      });
      return;
    }

    try {
      if (inputData.trim()) {
        JSON.parse(inputData);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Invalid Input Data',
        description: 'The input data must be a valid JSON object.',
      });
      return;
    }

    setIsLoading(true);
    setAiResult(null);

    try {
      const result = await executeRule({
        ruleName: selectedRuleName,
        inputData: inputData.trim() || '{}',
      });
      setAiResult(result);
      toast({
        title: 'AI Analysis Complete',
        description: 'The AI has evaluated the rule against the data.',
      });
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        variant: 'destructive',
        title: 'AI Execution Failed',
        description: `There was an error executing the AI flow: ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Execute Rules with AI</CardTitle>
          <CardDescription>
            Select a rule, provide input data, and let the AI determine the outcome.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="rule-select">Rule</Label>
            <Select value={selectedRule} onValueChange={setSelectedRule} disabled={isLoading}>
              <SelectTrigger id="rule-select">
                <SelectValue placeholder="Select a rule to apply..." />
              </SelectTrigger>
              <SelectContent>
                {rules.map((rule) => (
                  <SelectItem key={rule.id} value={rule.id}>
                    {rule.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="input-data">Input Data (JSON)</Label>
            <Textarea
              id="input-data"
              placeholder='{ "customerStatus": "gold", "orderTotal": 120 }'
              className="min-h-[150px] font-mono text-sm"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {aiResult && (
             <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>AI Outcome: {aiResult.outcome}</AlertTitle>
                <AlertDescription>
                  {aiResult.reasoning}
                </AlertDescription>
              </Alert>
          )}

          <Separator />
          
          <div className="flex items-start gap-4 rounded-lg border bg-muted/20 p-4">
            <Lightbulb className="mt-1 h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Need more help? Use the AI Assistant</h3>
              <p className="text-sm text-muted-foreground">
                For more complex scenarios or if you're unsure which rule applies, open the AI assistant using the chat bubble in the bottom-right corner. Describe the situation in natural language, and the assistant will help you.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleApplyRule} disabled={isLoading}>
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <PlayCircle className="mr-2 h-4 w-4" />
            )}
            Apply Rule with AI
          </Button>
        </CardFooter>
      </Card>

      <CopilotKit>
        <div className="hidden p-8">
          <h1>AI Assistant</h1>
          <p>Ask a question using the assistant on the side.</p>
        </div>

        <CopilotSidebar />
      </CopilotKit>
    </div>
  );
}
