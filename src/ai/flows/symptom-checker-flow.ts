'use server';
/**
 * @fileOverview A symptom checker AI agent.
 *
 * - checkSymptoms - A function that handles the symptom checking process.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import type {SymptomCheckerInput, SymptomCheckerOutput} from './symptom-checker-schemas';
import {
  SymptomCheckerInputSchema,
  SymptomCheckerOutputSchema,
} from './symptom-checker-schemas';

const symptomCheckerTool = googleAI.model('gemini-1.5-flash-latest', {
  tools: [googleAI.googleSearch],
});

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

export async function checkSymptoms(
  input: SymptomCheckerInput
): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}
