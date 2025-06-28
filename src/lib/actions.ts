'use server';

import { clarifyAmbiguousRule } from '@/ai/flows/clarify-ambiguous-rules';
import { ruleSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function clarifyRule(
  prevState: { clarifiedRule: string; error: string | null },
  formData: FormData
): Promise<{ clarifiedRule: string; error: string | null }> {
  const ruleDefinition = formData.get('ruleDefinition') as string;
  if (!ruleDefinition || ruleDefinition.trim().length < 10) {
    return { clarifiedRule: '', error: 'Please provide a more detailed rule definition (at least 10 characters).' };
  }
  try {
    const result = await clarifyAmbiguousRule({ ruleDefinition });
    return { clarifiedRule: result.clarifiedRule, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { clarifiedRule: '', error: `Failed to clarify rule: ${errorMessage}` };
  }
}

export type CreateRuleFormState = {
  message: string;
  issues?: string[];
  fields?: Record<string, string>;
}

export async function createRuleAction(
  prevState: CreateRuleFormState,
  formData: FormData
): Promise<CreateRuleFormState> {
    const data = Object.fromEntries(formData);
    const parsed = ruleSchema.safeParse(data);

    if (!parsed.success) {
        return {
            message: "Failed to create rule.",
            issues: parsed.error.issues.map((issue) => issue.message),
            fields: data as Record<string, string>,
        }
    }

    // In a real app, you would save `parsed.data` to a database here.
    console.log("Rule created successfully:", parsed.data);

    revalidatePath('/dashboard');
    // We are not redirecting to show a success message on the form page itself.
    // In a real app, you might redirect: redirect('/dashboard');
    
    return { message: "Rule created successfully!" };
}
