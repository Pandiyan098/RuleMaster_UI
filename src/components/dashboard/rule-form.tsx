"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useRef } from 'react';

import { ruleSchema } from "@/lib/schemas";
import { clarifyRule, createRuleAction } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, ThumbsUp, PartyPopper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type RuleFormValues = z.infer<typeof ruleSchema>;

function ClarifyButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? "Clarifying..." : "Clarify with AI"}</Button>;
}

export function RuleForm() {
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<RuleFormValues>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      name: "",
      description: "",
      ruleDefinition: "",
      clarifiedRule: "",
    },
    mode: "onChange",
  });

  const [clarifyState, clarifyFormAction] = useFormState(clarifyRule, {
    clarifiedRule: "",
    error: null,
  });

  const [createState, createFormAction] = useFormState(createRuleAction, {
    message: "",
  });

  useEffect(() => {
    if (clarifyState.clarifiedRule) {
      form.setValue("clarifiedRule", clarifyState.clarifiedRule);
    }
    if(clarifyState.error) {
      toast({
        variant: 'destructive',
        title: 'AI Clarification Failed',
        description: clarifyState.error,
      });
    }
  }, [clarifyState, form, toast]);

  useEffect(() => {
    if (createState?.message) {
      if(createState.issues) {
         toast({
          variant: 'destructive',
          title: 'Error Creating Rule',
          description: createState.issues.join(', '),
        });
      } else {
        setShowSuccess(true);
        form.reset();
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  }, [createState, form, toast]);

  const handleAcceptClarification = () => {
    form.setValue("ruleDefinition", clarifyState.clarifiedRule);
    form.setValue("clarifiedRule", "");
  };
  
  const handleSaveClick = () => {
    form.trigger().then((isValid) => {
        if (isValid) {
            formRef.current?.requestSubmit();
        } else {
             toast({
                variant: 'destructive',
                title: 'Invalid Form',
                description: "Please correct the errors before saving.",
             });
        }
    });
  }

  if (showSuccess) {
    return (
        <Alert className="border-green-500 bg-green-50 text-green-800">
            <PartyPopper className="h-4 w-4 !text-green-600" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
                Your new rule has been created successfully.
            </AlertDescription>
        </Alert>
    );
  }

  return (
    <>
      <Form {...form}>
        <form ref={formRef} action={createFormAction} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rule Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Commission Bonus" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="A short description of what this rule does" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ruleDefinition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rule Definition</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='e.g., "If sales by John are greater than 10 units, then give him a 5% bonus"'
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="clarifiedRule"
              render={({ field }) => <input type="hidden" {...field} />}
          />
          
          {clarifyState.clarifiedRule && (
            <Alert>
              <Bot className="h-4 w-4" />
              <AlertTitle>AI Clarification</AlertTitle>
              <AlertDescription>
                <p className="mb-4">{clarifyState.clarifiedRule}</p>
                <Button type="button" size="sm" onClick={handleAcceptClarification}>
                  <ThumbsUp className="mr-2 h-4 w-4" /> Accept Suggestion
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center">
              <form action={clarifyFormAction}>
                  <input type="hidden" name="ruleDefinition" value={form.watch('ruleDefinition')} />
                  <ClarifyButton />
              </form>
              <Button type="button" onClick={handleSaveClick}>Save Rule</Button>
          </div>

        </form>
      </Form>
    </>
  );
}
