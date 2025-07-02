'use server';

import { clarifyAmbiguousRule } from '@/ai/flows/clarify-ambiguous-rules';
import { ruleSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

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

    const apiUrl = 'http://192.168.99.132:4000/api/rules';
    const tenantId = '02caae70-9c87-4f0f-a393-5b0f92283a42';

    try {
        const body: {
            rule_name: string;
            rule_description?: string;
            prompt: string;
            tenant_id: string;
        } = {
            rule_name: parsed.data.name,
            prompt: parsed.data.ruleDefinition,
            tenant_id: tenantId,
        };
        if (parsed.data.description) {
            body.rule_description = parsed.data.description;
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            let errorMessage = `API request failed with status: ${response.status}`;
            try {
                const errorData = await response.json();
                if (errorData.message) {
                    errorMessage = errorData.message;
                }
            } catch (e) {
                // Ignore if response is not JSON
            }
             return {
                message: "Failed to create rule.",
                issues: [errorMessage],
                fields: data as Record<string, string>,
            }
        }
        
        const responseData = await response.json();
        console.log("Rule created successfully via API:", responseData);

        revalidatePath('/dashboard');
        
        return { message: "Rule created successfully!" };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown network error occurred.";
        return {
            message: "Failed to create rule.",
            issues: [errorMessage],
            fields: data as Record<string, string>,
        }
    }
}
