'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb } from 'lucide-react';

export default function ExecutePage() {
  const { toast } = useToast();

  const handleApplyRule = () => {
    toast({
      title: 'Action Triggered',
      description:
        'The "Apply Rule" functionality can be connected to an AI flow.',
    });
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
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleApplyRule}>Apply Rule</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
