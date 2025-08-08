"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Search, AlertTriangle } from 'lucide-react';
import { checkSymptoms } from '@/ai/flows/symptom-checker-flow';
import type { SymptomCheckerOutput } from '@/ai/flows/symptom-checker-schemas';

export default function SymptomCheckerPage() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomCheckerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await checkSymptoms({ symptoms });
      setResult(response);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex items-center gap-4">
        <Search className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Symptom Checker</h1>
          <p className="text-muted-foreground">
            Enter your symptoms for an AI-powered analysis.
          </p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Describe Your Symptoms</CardTitle>
            <CardDescription>
              Please provide as much detail as possible for a more accurate analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., 'I have a persistent headache, blurred vision, and sensitivity to light.'"
                required
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading || !symptoms.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Check Symptoms
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive" className="mt-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Possible Conditions</h3>
              {result.possibleConditions.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {result.possibleConditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              ) : (
                 <p className="text-muted-foreground">No specific conditions identified based on the provided symptoms.</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Detailed Analysis</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{result.analysis}</p>
            </div>
             <Alert variant="default" className="mt-4 border-amber-500/50 text-amber-900 dark:text-amber-300 [&>svg]:text-amber-500">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="font-bold">Disclaimer</AlertTitle>
              <AlertDescription>
                {result.disclaimer}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
