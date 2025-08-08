"use server";

import { symptomChecker } from "@/ai/flows/symptom-checker";
import { z } from "zod";

const schema = z.object({
  symptoms: z.string().min(10, "Please provide a more detailed description of your symptoms."),
});

type SymptomState = {
  result?: {
    potentialCauses: string;
    guidance: string;
    resources: string;
  };
  error?: string;
} | null;

export async function handleSymptomCheck(
  prevState: SymptomState,
  formData: FormData
): Promise<SymptomState> {
  try {
    const validatedFields = schema.safeParse({
      symptoms: formData.get("symptoms"),
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors.symptoms?.[0] || 'Invalid input.',
      };
    }

    const result = await symptomChecker({
      symptoms: validatedFields.data.symptoms,
    });
    
    return { result };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
