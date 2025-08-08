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
  HeartPulse,
  BotMessageSquare,
  Activity,
  Eye,
  Bell,
  Search,
} from 'lucide-react';

const features = [
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
    icon: <Bell className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Eye Exercises',
    description: 'Relieve eye strain with guided exercises.',
    href: '/exercises',
    icon: <Eye className="h-8 w-8 text-primary" />,
  },
    {
    title: 'Symptom Checker',
    description: 'Get guided search results from trusted sources.',
    href: '/symptom-checker',
    icon: <Search className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Health Articles',
    description: 'Explore articles on eye care and conditions.',
    href: '/articles',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Common Eye Conditions',
    description: 'Learn about various eye conditions.',
    href: '/conditions',
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
  }
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Visionary</h1>
        <p className="text-muted-foreground">Your personal guide to eye health and care.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1">
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
              <Button asChild variant="secondary" className="w-full justify-start group">
                <Link href={feature.href}>
                  Go to {feature.title}
                  <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
