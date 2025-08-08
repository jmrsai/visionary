
"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, ExternalLink } from "lucide-react";
import Link from 'next/link';

type SearchProvider = {
  name: string;
  url: string;
};

export default function SymptomCheckerPage() {
  const [symptoms, setSymptoms] = useState("");
  const [searchLinks, setSearchLinks] = useState<SearchProvider[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!symptoms.trim()) return;

    const encodedSymptoms = encodeURIComponent(symptoms.trim());

    const providers: SearchProvider[] = [
      {
        name: 'Google',
        url: `https://www.google.com/search?q=eye+symptoms+${encodedSymptoms}`,
      },
      {
        name: 'PubMed',
        url: `https://pubmed.ncbi.nlm.nih.gov/?term=eye+${encodedSymptoms}`,
      },
      {
        name: 'CDC',
        url: `https://www.cdc.gov/search/?query=${encodedSymptoms}`,
      },
      {
        name: 'WHO',
        url: `https://www.who.int/search?query=${encodedSymptoms}`,
      },
    ];

    setSearchLinks(providers);
    setSubmitted(true);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex items-center gap-4">
        <Search className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Symptom Checker</h1>
          <p className="text-muted-foreground">
            Describe your symptoms to get guided search results from trusted health sources.
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Describe Your Symptoms</CardTitle>
          <CardDescription>
            Enter your eye-related symptoms below. This tool will not provide a diagnosis, but will help you find information from reliable sources. This is not a substitute for professional medical advice.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full gap-2">
              <Label htmlFor="symptoms">Symptoms</Label>
              <Textarea
                id="symptoms"
                placeholder="e.g., 'blurry vision in right eye, seeing floaters'"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={!symptoms.trim()}>
              <Search className="mr-2 h-4 w-4" />
              Generate Search Links
            </Button>
          </CardFooter>
        </form>
      </Card>

      {submitted && (
        <div className="mt-8">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Search Links</h2>
            <p className="text-muted-foreground mb-6">Click the links below to search for your symptoms on reputable websites. For your safety, always consult a healthcare professional for a diagnosis.</p>
            <div className="grid gap-4 md:grid-cols-2">
                {searchLinks.map((provider) => (
                    <Card key={provider.name}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                                    <Search className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <span>{provider.name}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Search for "{symptoms.length > 30 ? symptoms.slice(0, 30) + '...' : symptoms}" on {provider.name}.
                            </p>
                        </CardContent>
                        <CardFooter>
                             <Button asChild className="w-full">
                                <Link href={provider.url} target="_blank" rel="noopener noreferrer">
                                    Open {provider.name} <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
