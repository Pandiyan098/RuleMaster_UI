'use client';

import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function ExecutePage() {
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
