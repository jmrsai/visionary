import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eye } from 'lucide-react';
import Image from 'next/image';

const exercises = [
  {
    title: "The 20-20-20 Rule",
    content: "To reduce eye strain, take regular breaks using the '20-20-20' rule. Every 20 minutes, look at something 20 feet away for at least 20 seconds. This simple exercise can help relax your eye muscles and reduce fatigue from focusing on screens up close.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "distant view",
    },
  },
  {
    title: "Focus Change",
    content: "Hold one finger a few inches away from one eye. Focus on your finger. Slowly move it away from your face, holding your focus. Look away for a moment, into the distance. Then, focus on your outstretched finger and slowly bring it back toward your eye. Look away and focus on something in the distance. Repeat three times.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "person pointing",
    },
  },
  {
    title: "Eye Rolling",
    content: "Start by looking up, then slowly circle your eyes in a clockwise direction. Do this a few times, then reverse the direction and circle them counter-clockwise. This can help to relieve tension in the eye muscles. Make sure to do this slowly and gently.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "clock face",
    },
  },
  {
    title: "Palming",
    content: "Rub your hands together to warm them up. Then, close your eyes and place your palms gently over your eyelids. The warmth and darkness can be very relaxing for tired eyes. Hold for about 30 seconds to a minute, breathing deeply.",
    image: {
      src: "https://placehold.co/600x400.png",
      hint: "relaxed hands",
    },
  },
];

export default function ExercisesPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex items-center gap-4">
        <Eye className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Eye Strain Relief Exercises</h1>
          <p className="text-muted-foreground">
            Guided exercises to help reduce screen time fatigue and promote eye relaxation.
          </p>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {exercises.map((exercise, index) => (
          <AccordionItem value={`item-${index}`} key={exercise.title}>
            <AccordionTrigger>{exercise.title}</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>{exercise.content}</p>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={exercise.image.src}
                  alt={exercise.title}
                  width={600}
                  height={400}
                  data-ai-hint={exercise.image.hint}
                  className="w-full h-auto object-cover transition-transform hover:scale-105"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
