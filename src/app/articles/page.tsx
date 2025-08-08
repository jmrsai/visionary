import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText } from 'lucide-react';

const articles = [
  {
    title: "Understanding Digital Eye Strain",
    content: "Digital eye strain, also known as computer vision syndrome, is a group of eye and vision-related problems that result from prolonged computer, tablet, e-reader and cell phone use. Many individuals experience eye discomfort and vision problems when viewing digital screens for extended periods. The level of discomfort appears to increase with the amount of digital screen use.",
  },
  {
    title: "The Importance of Regular Eye Exams",
    content: "Regular eye exams are crucial for maintaining good eye health and clear vision. They can detect eye problems at their earliest stage — when they're most treatable. An eye exam can also uncover other health problems, such as high blood pressure or diabetes. It's recommended to have a comprehensive eye exam every one to two years, depending on your age, risk factors, and whether you currently wear corrective lenses.",
  },
  {
    title: "Choosing the Right Glasses for Your Face Shape",
    content: "Selecting the right eyeglasses for your face shape can enhance your appearance. The key is to find frames that complement the natural lines of your face. For example, angular frames can sharpen a round face, while rounder frames can soften an angular face. Consider frame size, color, and material to find the perfect pair that reflects your personal style.",
  },
  {
    title: "Tips for Healthy Eating for Your Eyes",
    content: "A healthy diet is essential for eye health. Nutrients like omega-3 fatty acids, lutein, zinc, and vitamins C and E might help ward off age-related vision problems like macular degeneration and cataracts. To get them, fill your plate with green leafy vegetables like spinach, kale, and collards; salmon, tuna, and other oily fish; eggs, nuts, beans, and other nonmeat protein sources; and oranges and other citrus fruits or juices.",
  },
];

export default function ArticlesPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex items-center gap-4">
        <FileText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Eye Care Articles</h1>
          <p className="text-muted-foreground">
            A library of information on general eye care practices and tips.
          </p>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {articles.map((article, index) => (
          <AccordionItem value={`item-${index}`} key={article.title}>
            <AccordionTrigger>{article.title}</AccordionTrigger>
            <AccordionContent>{article.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
