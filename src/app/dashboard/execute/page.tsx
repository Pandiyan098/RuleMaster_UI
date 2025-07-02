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
import { useToast } from '@/hooks/use-toast';
import { Lightbulb } from 'lucide-react';

export default function ExecutePage() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');

  const TENANT_ID = "02caae70-9c87-4f0f-a393-5b0f92283a42";

  const handleApplyRule = async () => {
    let cleanedPrompt = prompt.trim().replace(/^apply rule\s*/i, '');

    if (!cleanedPrompt) {
      toast({
        variant: 'destructive',
        title: 'Prompt Required',
        description: 'Please enter a scenario to apply the rule.',
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/rules/apply?tenant_id=${TENANT_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: cleanedPrompt }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Rule Applied',
          description: data.result || 'Rule applied successfully.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.message || 'Failed to apply rule.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Network Error',
        description: 'Could not connect to the API.',
      });
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
            <Input
              placeholder='Describe your scenario (e.g., "sales reached 15%")'
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
            <Button onClick={handleApplyRule}>Apply Rule</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
