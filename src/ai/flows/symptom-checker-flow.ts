'use server';
/**
 * @fileOverview A symptom checker AI agent.
 *
 * - checkSymptoms - A function that handles the symptom checking process.
 * - SymptomCheckerInput - The input type for the checkSymptoms function.
 * - SymptomCheckerOutput - The return type for the checkSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

export const SymptomCheckerInputSchema = z.object({
  symptoms: z.string().describe('A description of the symptoms.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

export const SymptomCheckerOutputSchema = z.object({
  possibleConditions: z.array(z.string()).describe('A list of possible conditions based on the symptoms.'),
  analysis: z.string().describe('A detailed analysis of the symptoms and possible conditions.'),
  disclaimer: z.string().describe('A disclaimer that this is not a medical diagnosis.'),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

const symptomCheckerTool = googleAI.model('gemini-1.5-flash-latest', {tools: [googleAI.googleSearch]});

export async function checkSymptoms(input: SymptomCheckerInput): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {schema: SymptomCheckerInputSchema},
  output: {schema: SymptomCheckerOutputSchema},
  prompt: `You are an AI medical assistant. Your role is to provide a preliminary analysis of symptoms based on information available on the internet. You are not a doctor and must make that clear.

Analyze the following symptoms:
{{symptoms}}

Based on your search, provide a list of possible conditions, a detailed analysis, and a clear disclaimer that the user should consult a healthcare professional for a real diagnosis.`,
});

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async (input) => {
    const {output} = await ai.generate({
      model: symptomCheckerTool,
      prompt: (await prompt.render({input})).prompt,
      output: {
        schema: SymptomCheckerOutputSchema,
      },
    });
    return output!;
  }
);
