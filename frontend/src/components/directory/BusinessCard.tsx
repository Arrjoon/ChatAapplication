import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  name: string;
  category: string;
  location: string;
};

export default function BusinessCard({ name, category, location }: Props) {
  return (
    <Card>
      <CardHeader>{name}</CardHeader>
      <CardContent>
        <p>{category}</p>
        <p>{location}</p>
      </CardContent>
    </Card>
  );
}
