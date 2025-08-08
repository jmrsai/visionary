import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HeartPulse } from 'lucide-react';

const conditions = [
  {
    title: "Cataracts",
    content: "A cataract is a clouding of the normally clear lens of the eye. For people who have cataracts, seeing through cloudy lenses is a bit like looking through a frosty or fogged-up window. Most cataracts develop slowly and don't disturb your eyesight early on. But with time, cataracts will eventually interfere with your vision. Prevention includes wearing sunglasses and not smoking.",
  },
  {
    title: "Glaucoma",
    content: "Glaucoma is a group of eye conditions that damage the optic nerve, the health of which is vital for good vision. This damage is often caused by an abnormally high pressure in your eye. It is one of the leading causes of blindness for people over the age of 60. Early detection and treatment can often protect you against serious vision loss.",
  },
  {
    title: "Age-Related Macular Degeneration (AMD)",
    content: "AMD is an eye disease that can blur your central vision. It happens when aging causes damage to the macula — the part of the eye that controls sharp, straight-ahead vision. The macula is part of the retina (the light-sensitive tissue at the back of the eye). AMD doesn't cause complete blindness, but losing your central vision can make it harder to see faces, read, drive, or do close-up work like cooking or fixing things around the house.",
  },
  {
    title: "Diabetic Retinopathy",
    content: "Diabetic retinopathy is an eye condition that can cause vision loss and blindness in people who have diabetes. It affects blood vessels in the retina. If you have diabetes, it's important to get a comprehensive dilated eye exam at least once a year. Managing your blood sugar, blood pressure, and cholesterol can also help prevent or slow the progression of diabetic retinopathy.",
  },
];

export default function ConditionsPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex items-center gap-4">
        <HeartPulse className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Common Eye Conditions</h1>
          <p className="text-muted-foreground">
            Learn about symptoms, causes, and prevention strategies.
          </p>
        </div>
      </div>
       <Accordion type="single" collapsible className="w-full">
        {conditions.map((condition, index) => (
          <AccordionItem value={`item-${index}`} key={condition.title}>
            <AccordionTrigger>{condition.title}</AccordionTrigger>
            <AccordionContent>{condition.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
