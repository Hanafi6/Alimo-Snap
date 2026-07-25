import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideProps } from "lucide-react";

type PlaceholderProps = {
  title: string;
  description: string;
  icon: React.FC<LucideProps>;
};

export default function Placeholder({
  title,
  description,
  icon: Icon,
}: PlaceholderProps) {
  return (
    <Card className="max-w-137.5 w-full">
      <CardHeader>
        <div className="bg-destructive/10 w-fit mx-auto p-2 rounded-full">
          <Icon className="size-12 text-destructive" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <h2 className="text-2xl text-center">{title}</h2>
        <p className="text-center text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
