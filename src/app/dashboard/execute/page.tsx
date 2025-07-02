'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react'; // Add this for spinner
import { ArrowUp } from 'lucide-react'; // Add this import with your other icons

type RuleDetails = {
  field: string;
  value: string;
  entity: string;
  condition: string;
};

type AppliedRule = {
  rule_id: number;
  rule_name: string;
  rule: RuleDetails;
  rule_description: string;
  created_on: string;
  updated_on: string;
  tenant_id: string;
  status: string;
};

export default function ExecutePage() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [appliedRule, setAppliedRule] = useState<AppliedRule | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const TENANT_ID = "02caae70-9c87-4f0f-a393-5b0f92283a42";

  const handleApplyRule = async () => {
    setResult(null);
    setAppliedRule(null);
    setError(null);
    setLoading(true);

    let cleanedPrompt = prompt.trim().replace(/^apply rule\s*/i, '');

    if (!cleanedPrompt) {
      toast({
        variant: 'destructive',
        title: 'Prompt Required',
        description: 'Please enter a scenario to apply the rule.',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/rules/apply?tenant_id=${TENANT_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: cleanedPrompt }),
      });

      const data = await response.json();

      if (response.ok && data.finalResponse) {
        setAppliedRule(data.finalResponse.applied_rule || null);
        setResult(data.finalResponse.message || 'Rule applied successfully.');
        setError(null);
      } else {
        setResult(null);
        setAppliedRule(null);
        setError(data.message || 'Please add more in your prompt and retry.');
      }
    } catch (error) {
      setResult(null);
      setAppliedRule(null);
      setError('Please add more in your prompt and retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Execute Rules with the AI Assistant</CardTitle>
          <CardDescription>
            Use the chat interface to describe a scenario in natural language. The AI assistant will identify and apply the correct rule for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 rounded-lg border bg-muted/20 p-4">
            <Lightbulb className="mt-1 h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">How to use the AI Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Click the chat bubble in the bottom-right corner to open the assistant. Describe the situation you want to evaluate. For example: "A gold status customer just placed an order for $120. What happens next?" The AI will determine the outcome based on your defined rules.
              </p>
            </div>
          </div>
          
          
          <div className="mt-6 flex gap-2">
            <Textarea
              placeholder='Describe your scenario (e.g., "sales reached 15%")'
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              disabled={loading}
              rows={6}
              className="min-h-[120px]"
            />
            <Button
              onClick={handleApplyRule}
              disabled={loading}
              size="lg"
              className="h-fit px-8 py-4 text-lg font-bold bg-gradient-to-r from-[#6C38FF] via-[#3B1C7A] to-[#1A237E] text-white hover:brightness-110 hover:scale-105 transition-all duration-200 border-0"
            >
              {loading ? 'Applying...' : 'Apply Rule'}
            </Button>
          </div>
          {/* Loader spinner below prompt area */}
          {loading && (
            <div className="flex justify-center my-4">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
          )}

          {prompt.length === 0 && (
            <div className="flex flex-col items-center mb-2">
              <ArrowUp className="h-8 w-8 text-[#6C38FF] animate-bounce" />
              <span className="text-sm text-muted-foreground mt-1">
                Start by entering your prompt here and get your expected result!
              </span>
            </div>
          )}
          {/* Show result or error below the prompt area */}
          {(appliedRule || result) && !error && (
            <Alert className="mt-4 border-green-500 bg-green-50 text-green-800">
              <AlertTitle>Rule Applied</AlertTitle>
              <AlertDescription>
                {result && (
                  <div className="mb-2">
                    <div className="font-semibold">Message:</div>
                    <div>{result}</div>
                  </div>
                )}
                {appliedRule && (
                  <div>
                    <div className="font-semibold mt-2">Rule Name:</div>
                    <div>{appliedRule.rule_name}</div>
                    <div className="font-semibold mt-2">Rule Description:</div>
                    <div>{appliedRule.rule_description}</div>
                    {/* <div className="font-semibold mt-2">Rule Details:</div>
                    <div>
                      Field: <span className="font-mono">{appliedRule.rule.field}</span>
                      , Value: <span className="font-mono">{appliedRule.rule.value}</span>
                      , Entity: <span className="font-mono">{appliedRule.rule.entity}</span>
                      , Condition: <span className="font-mono">{appliedRule.rule.condition}</span>
                    </div> */}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert className="mt-4 border-red-500 bg-red-50 text-red-800">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
                <div className="mt-2">
                  <Button size="sm" variant="outline" onClick={handleApplyRule} disabled={loading}>
                    Retry
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
