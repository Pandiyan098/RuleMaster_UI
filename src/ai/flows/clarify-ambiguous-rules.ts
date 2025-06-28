'use server';

/**
 * @fileOverview This file defines a Genkit flow to clarify ambiguous rule definitions using an AI tool.
 *
 * - clarifyAmbiguousRule - A function that takes a rule definition and clarifies any ambiguities.
 * - ClarifyAmbiguousRuleInput - The input type for the clarifyAmbiguousRule function.
 * - ClarifyAmbiguousRuleOutput - The output type for the clarifyAmbiguousRule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClarifyAmbiguousRuleInputSchema = z.object({
  ruleDefinition: z
    .string()
    .describe('The rule definition in natural language.'),
});
export type ClarifyAmbiguousRuleInput = z.infer<
  typeof ClarifyAmbiguousRuleInputSchema
>;

const ClarifyAmbiguousRuleOutputSchema = z.object({
  clarifiedRule: z
    .string()
    .describe('The clarified rule definition.'),
});
export type ClarifyAmbiguousRuleOutput = z.infer<
  typeof ClarifyAmbiguousRuleOutputSchema
>;

export async function clarifyAmbiguousRule(
  input: ClarifyAmbiguousRuleInput
): Promise<ClarifyAmbiguousRuleOutput> {
  return clarifyAmbiguousRuleFlow(input);
}

const clarifyAmbiguousRulePrompt = ai.definePrompt({
  name: 'clarifyAmbiguousRulePrompt',
  input: {schema: ClarifyAmbiguousRuleInputSchema},
  output: {schema: ClarifyAmbiguousRuleOutputSchema},
  prompt: `You are an AI assistant that helps to clarify ambiguous rule definitions.

  The user will provide a rule definition in natural language. Your task is to identify any ambiguities in the rule definition and clarify them by rephrasing the rule in a more precise and unambiguous way.

  Rule Definition: {{{ruleDefinition}}}
  `,
});

const clarifyAmbiguousRuleFlow = ai.defineFlow(
  {
    name: 'clarifyAmbiguousRuleFlow',
    inputSchema: ClarifyAmbiguousRuleInputSchema,
    outputSchema: ClarifyAmbiguousRuleOutputSchema,
  },
  async input => {
    const {output} = await clarifyAmbiguousRulePrompt(input);
    return output!;
  }
);
