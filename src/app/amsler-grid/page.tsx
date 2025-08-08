import { AmslerGrid } from "@/components/amsler-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid3x3 } from "lucide-react";

export default function AmslerGridPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex items-center gap-4">
         <Grid3x3 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Amsler Grid Test</h1>
          <p className="text-muted-foreground">
            A tool for monitoring changes in your central vision.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>How to Use the Amsler Grid</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <ol className="list-decimal space-y-2 pl-5">
              <li>If you wear glasses for reading, put them on.</li>
              <li>Sit about 14-16 inches away from the screen in a well-lit room.</li>
              <li>Cover one eye with your hand.</li>
              <li>Look directly at the central dot with your uncovered eye.</li>
              <li>While looking at the dot, notice if any of the lines in the grid appear wavy, blurry, or distorted. Are there any missing areas or dark spots?</li>
              <li>Repeat the test with your other eye.</li>
            </ol>
            <p className="font-semibold text-foreground">
              If you notice any changes, contact your eye doctor immediately.
            </p>
          </CardContent>
        </Card>
        
        <Card className="flex items-center justify-center p-4">
          <AmslerGrid />
        </Card>
      </div>
    </div>
  );
}
