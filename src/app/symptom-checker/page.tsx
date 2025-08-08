"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { handleSymptomCheck } from "./actions";
import { Loader2, Sparkles, AlertTriangle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
         <Sparkles className="mr-2 h-4 w-4" />
          Check Symptoms
        </>
      )}
    </Button>
  );
}

export default function SymptomCheckerPage() {
  const [state, formAction] = useFormState(handleSymptomCheck, null);

  return (
    <div className="p-4 md:p-8">
       <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Symptom Checker</h1>
        <p className="text-muted-foreground">
          Describe your eye symptoms, and our AI will provide potential causes and guidance.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <form action={formAction}>
            <Card>
              <CardHeader>
                <CardTitle>Describe Your Symptoms</CardTitle>
                <CardDescription>
                  Please be as detailed as possible for the best results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-2">
                  <Label htmlFor="symptoms" className="sr-only">
                    Symptoms
                  </Label>
                  <Textarea
                    id="symptoms"
                    name="symptoms"
                    placeholder="e.g., 'My right eye has been red and itchy for two days, with some blurry vision in the morning.'"
                    rows={6}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </Card>
          </form>
        </div>

        <div className="lg:col-span-2">
          {state?.result && (
             <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  AI Analysis Results
                </CardTitle>
                <CardDescription>
                  Based on the symptoms provided, here are some potential insights. This is not medical advice.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Potential Causes</h3>
                  <p className="text-sm text-muted-foreground">{state.result.potentialCauses}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Guidance & Recommendations</h3>
                  <p className="text-sm text-muted-foreground">{state.result.guidance}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Resources</h3>
                  <p className="text-sm text-muted-foreground">{state.result.resources}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {state?.error && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                   <AlertTriangle />
                  An Error Occurred
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-destructive">{state.error}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
