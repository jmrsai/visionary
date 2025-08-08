"use client";

import React, { useState } from "react";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlarmClock, PlusCircle, Trash2, BellRing } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Reminder = {
  id: string;
  name: string;
  dosage: string;
  time: string;
};

export default function RemindersPage() {
  const [reminders, setReminders] = useLocalStorage<Reminder[]>("reminders", []);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddReminder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newReminder: Reminder = {
      id: new Date().toISOString(),
      name: formData.get("name") as string,
      dosage: formData.get("dosage") as string,
      time: formData.get("time") as string,
    };
    setReminders([...reminders, newReminder]);
    setOpen(false);
    toast({
      title: "Reminder Added",
      description: `Reminder for ${newReminder.name} has been set.`,
    })
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
    toast({
      title: "Reminder Removed",
      description: "The reminder has been successfully deleted.",
      variant: "destructive"
    })
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AlarmClock className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Medication Reminders</h1>
            <p className="text-muted-foreground">
              Stay on track with your eye medication schedule.
            </p>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Reminder</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddReminder} className="space-y-4">
              <div>
                <Label htmlFor="name">Medication Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input id="dosage" name="dosage" placeholder="e.g., 1 drop" required />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" type="time" required />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                   <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Reminder</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {reminders.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
            <CardContent>
                <BellRing className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold">No Reminders Yet</h3>
                <p className="text-muted-foreground">Click "Add Reminder" to get started.</p>
            </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reminders.map((reminder) => (
            <Card key={reminder.id}>
              <CardHeader>
                <CardTitle>{reminder.name}</CardTitle>
                <CardDescription>{reminder.dosage}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{reminder.time}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="w-full"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
