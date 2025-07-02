'use server';

/**
 * @fileOverview This file defines a Genkit flow for executing a business rule using an AI model.
 *
 * - executeRule - A function that takes a rule name and input data and returns the AI-determined outcome.
 * - ExecuteRuleInput - The input type for the executeRule function.
 * - ExecuteRuleOutput - The output type for the executeRule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExecuteRuleInputSchema = z.object({
  ruleName: z.string().describe('The name of the business rule to apply.'),
  inputData: z
    .string()
    .describe('The input data for the rule, as a JSON string.'),
});
export type ExecuteRuleInput = z.infer<typeof ExecuteRuleInputSchema>;

const ExecuteRuleOutputSchema = z.object({
  outcome: z.string().describe('The direct result of applying the rule (e.g., "Approved", "Rejected", "15% Discount Applied").'),
  reasoning: z
    .string()
    .describe('A brief, user-friendly explanation of why the outcome was reached.'),
});
export type ExecuteRuleOutput = z.infer<typeof ExecuteRuleOutputSchema>;

export async function executeRule(
  input: ExecuteRuleInput
): Promise<ExecuteRuleOutput> {
  return executeRuleFlow(input);
}

const executeRulePrompt = ai.definePrompt({
  name: 'executeRulePrompt',
  input: {schema: ExecuteRuleInputSchema},
  output: {schema: ExecuteRuleOutputSchema},
  prompt: `You are an expert rule execution engine. A user wants to apply a business rule to some data.
  Evaluate the data against the rule and provide the outcome and a brief explanation.

  Rule to apply: "{{ruleName}}"

  Input Data (JSON):
  \`\`\`json
  {{{inputData}}}
  \`\`\`

  Based on the rule and the data, determine the result. Be concise in your reasoning.
  For example, if the rule is "Free Shipping" for orders over $50 and the input is { "orderTotal": 60 }, the outcome should be "Free Shipping Applied" and the reasoning "The order total of $60 exceeds the $50 threshold for free shipping."
  `,
});

const executeRuleFlow = ai.defineFlow(
  {
    name: 'executeRuleFlow',
    inputSchema: ExecuteRuleInputSchema,
    outputSchema: ExecuteRuleOutputSchema,
  },
  async input => {
    // A real implementation might fetch rule logic from a database here.
    // For this prototype, we rely on the LLM's understanding of the rule name.
    const {output} = await executeRulePrompt(input);
    return output!;
  }
);
