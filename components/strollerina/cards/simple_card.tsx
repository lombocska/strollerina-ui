import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { ReactNode } from "react";

export default function SimpleCard({
  title,
  description,
  demo,
  large,
}: {
  title: string;
  description: string;
  demo: ReactNode;
  large?: boolean;
}) { 
  return (
    <Card className="py-4 bg-strollerina_green-200">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{title}</p>
        <small className="text-default-500">{description}</small>
        {/* <h4 className="font-bold text-large">Frontend Radio</h4> */}
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex h-60 items-center justify-center">
        {demo}
      </CardBody>
    </Card>
  );
}
