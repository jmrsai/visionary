'use server';

/**
 * @fileOverview A symptom checker AI agent that uses internet sources to provide results, guidance, and resources based on user-provided symptoms.
 *
 * - symptomChecker - A function that handles the symptom checking process.
 * - SymptomCheckerInput - The input type for the symptomChecker function.
 * - SymptomCheckerOutput - The return type for the symptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomCheckerInputSchema = z.object({
  symptoms: z
    .string()
    .describe("A description of the user's eye-related symptoms."),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  potentialCauses: z
    .string()
    .describe('Potential causes of the symptoms, based on internet sources.'),
  guidance: z
    .string()
    .describe('Guidance and recommendations based on the symptoms.'),
  resources: z
    .string()
    .describe('Useful resources and links related to the symptoms.'),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function symptomChecker(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {schema: SymptomCheckerInputSchema},
  output: {schema: SymptomCheckerOutputSchema},
  prompt: `You are an AI assistant designed to help users understand their eye-related symptoms.

  Based on the user's description of their symptoms, you will access internet sources to provide potential causes, guidance, and resources.
  The more detail provided, the more accurate and reliable the results will be.

  Symptoms: {{{symptoms}}}

  Provide the following information:
  - Potential causes of the symptoms.
  - Guidance and recommendations based on the symptoms.
  - Useful resources and links related to the symptoms.`,
});

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
