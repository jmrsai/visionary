"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Eye, PlayCircle, PauseCircle, RefreshCcw } from 'lucide-react';
import Image from 'next/image';

type ExerciseType = '20-20-20' | 'focus-change' | 'eye-rolling' | 'palming';

const exerciseDetails = {
  '20-20-20': {
    title: "The 20-20-20 Rule",
    content: "To reduce eye strain, take regular breaks using the '20-20-20' rule. Every 20 minutes, look at something 20 feet away for at least 20 seconds. This simple exercise can help relax your eye muscles and reduce fatigue from focusing on screens up close.",
    image: { src: "https://placehold.co/600x400.png", hint: "distant view" },
    duration: 20 * 60, // 20 minutes
    breakDuration: 20, // 20 seconds
  },
  'focus-change': {
    title: "Focus Change",
    content: "Hold one finger a few inches away from one eye. Focus on your finger. Slowly move it away from your face, holding your focus. Look away for a moment, into the distance. Then, focus on your outstretched finger and slowly bring it back toward your eye. Look away and focus on something in the distance. Repeat three times.",
    image: { src: "https://placehold.co/600x400.png", hint: "person pointing" },
    duration: 60, // 1 minute
  },
  'eye-rolling': {
    title: "Eye Rolling",
    content: "Start by looking up, then slowly circle your eyes in a clockwise direction. Do this a few times, then reverse the direction and circle them counter-clockwise. This can help to relieve tension in the eye muscles. Make sure to do this slowly and gently.",
    image: { src: "https://placehold.co/600x400.png", hint: "clock face" },
    duration: 30, // 30 seconds
  },
  'palming': {
    title: "Palming",
    content: "Rub your hands together to warm them up. Then, close your eyes and place your palms gently over your eyelids. The warmth and darkness can be very relaxing for tired eyes. Hold for about 30 seconds to a minute, breathing deeply.",
    image: { src: "https://placehold.co/600x400.png", hint: "relaxed hands" },
    duration: 45, // 45 seconds
  },
};

function ExerciseTimer({ type }: { type: ExerciseType }) {
  const { duration, breakDuration } = exerciseDetails[type];
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            if (type === '20-20-20' && !isBreak && breakDuration) {
              setIsBreak(true);
              return breakDuration;
            } else {
              resetTimer();
              return 0;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isBreak, type, breakDuration, resetTimer]);
  
  const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  const progress = isBreak && breakDuration ? ((breakDuration - timeLeft) / breakDuration) * 100 : ((duration - timeLeft) / duration) * 100;

  const getInstruction = () => {
    if (type === '20-20-20') {
      return isBreak ? "Look at an object 20 feet away." : "Focus on your work. The break is in:";
    }
     if (type === 'focus-change') {
      if (timeLeft > 45) return "Focus on your finger a few inches away.";
      if (timeLeft > 30) return "Slowly move your finger away.";
      if (timeLeft > 15) return "Look into the distance.";
      return "Slowly bring your finger back.";
    }
    if (type === 'eye-rolling') {
      return timeLeft > 15 ? "Slowly roll your eyes clockwise." : "Now, roll them counter-clockwise.";
    }
    if (type === 'palming') {
      return "Cover your closed eyes with your warm palms and breathe deeply.";
    }
    return "";
  }

  return (
    <Card className="mt-4 bg-secondary/50">
      <CardContent className="pt-6 text-center">
        <p className="font-semibold text-lg mb-2">{getInstruction()}</p>
        <p className="text-5xl font-bold tracking-tighter mb-4">{formatTime(timeLeft)}</p>
        <Progress value={progress} className="mb-4" />
        <div className="flex justify-center gap-4">
          <Button onClick={() => setIsActive(!isActive)} size="lg">
            {isActive ? <PauseCircle className="mr-2" /> : <PlayCircle className="mr-2" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} size="lg" variant="outline">
            <RefreshCcw className="mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


export default function ExercisesPage() {
  const [activeExercise, setActiveExercise] = useState<ExerciseType | null>(null);

  const toggleExercise = (type: ExerciseType) => {
    setActiveExercise(prev => (prev === type ? null : type));
  };
  
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
        {Object.entries(exerciseDetails).map(([key, exercise]) => {
            const type = key as ExerciseType;
            return (
              <AccordionItem value={key} key={key}>
                <AccordionTrigger>{exercise.title}</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p>{exercise.content}</p>
                  <div className="overflow-hidden rounded-lg mb-4">
                    <Image
                      src={exercise.image.src}
                      alt={exercise.title}
                      width={600}
                      height={400}
                      data-ai-hint={exercise.image.hint}
                      className="w-full h-auto object-cover transition-transform hover:scale-105"
                    />
                  </div>
                   <Button onClick={() => toggleExercise(type)} className="w-full">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    {activeExercise === type ? 'Hide Exercise' : 'Start Exercise'}
                  </Button>
                  {activeExercise === type && <ExerciseTimer type={type} />}
                </AccordionContent>
              </AccordionItem>
            )
        })}
      </Accordion>
    </div>
  );
}
