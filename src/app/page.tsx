import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BookOpen,
  Grid3x3,
  AlarmClock,
  Search,
} from 'lucide-react';

const features = [
  {
    title: 'Symptom Checker',
    description: 'Enter your symptoms to get an AI-powered analysis.',
    href: '/symptom-checker',
    icon: <Search className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Amsler Grid Test',
    description: 'Monitor your vision for signs of retinal diseases.',
    href: '/amsler-grid',
    icon: <Grid3x3 className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Medication Reminders',
    description: 'Set reminders for your eye drops and medications.',
    href: '/reminders',
    icon: <AlarmClock className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Care & Condition Guides',
    description: 'Explore articles, exercises, and condition information.',
    href: '/articles',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Visionary</h1>
        <p className="text-muted-foreground">Your personal guide to eye health and care.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col justify-between transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-start gap-4">
                {feature.icon}
                <div className="space-y-1">
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href={feature.href}>
                  Go to {feature.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
