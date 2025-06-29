import { Chatbot } from "@/components/dashboard/chatbot";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';

export default function ExecutePage() {
  return (
    <div className="relative">
      <Card>
        <CardHeader>
          <CardTitle>Execute Rules</CardTitle>
          <CardDescription>
            Use the AI assistant to test and execute your business rules in a simulated environment.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-start gap-4 rounded-lg border p-4 bg-muted/20">
              <Lightbulb className="h-6 w-6 text-accent mt-1" />
              <div>
                  <h3 className="font-semibold">How it works</h3>
                  <p className="text-sm text-muted-foreground">
                    Open the AI assistant using the chat bubble in the bottom-right corner.
                    You can describe a scenario in natural language (e.g., "A customer named Alex with gold status buys an item for $120").
                    The AI will determine which rules apply and show you the outcome.
                  </p>
              </div>
           </div>
        </CardContent>
      </Card>
      <Chatbot />
    </div>
  );
}
