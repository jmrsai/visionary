/**
 * @fileOverview Schemas for the symptom checker AI agent.
 *
 * - SymptomCheckerInputSchema - The Zod schema for the symptom checker input.
 * - SymptomCheckerInput - The TypeScript type for the symptom checker input.
 * - SymptomCheckerOutputSchema - The Zod schema for the symptom checker output.
 * - SymptomCheckerOutput - The TypeScript type for the symptom checker output.
 */

import {z} from 'genkit';

export const SymptomCheckerInputSchema = z.object({
  symptoms: z.string().describe('A description of the symptoms.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

export const SymptomCheckerOutputSchema = z.object({
  possibleConditions: z
    .array(z.string())
    .describe('A list of possible conditions based on the symptoms.'),
  analysis: z
    .string()
    .describe('A detailed analysis of the symptoms and possible conditions.'),
  disclaimer: z
    .string()
    .describe('A disclaimer that this is not a medical diagnosis.'),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;
