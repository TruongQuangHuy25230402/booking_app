import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

export type CardProps = {
  lable: string;
  icon: LucideIcon;
  amount: string;
  discription: string;
};

export default function Card(props: CardProps) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        <p className="text-sm">{props.lable}</p>
        <props.icon className="h-4 w-4 text-gray-400" />
      </section>

      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{props.amount}</h2>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    ></div>
  );
}
