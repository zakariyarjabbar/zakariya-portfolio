import type { ComponentType, SVGProps } from "react";
import { ClipboardList, Rocket, Target, Wrench } from "lucide-react";

export type ProcessStep = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Start with the idea",
    description: "Understand the goal, the user, and what the product needs to do.",
    icon: Target,
  },
  {
    title: "Shape the product",
    description: "Turn the idea into structure, screens, flows, and clear priorities.",
    icon: ClipboardList,
  },
  {
    title: "Build it",
    description:
      "Use code, modern tools, and AI to turn the plan into a working product.",
    icon: Wrench,
  },
  {
    title: "Test, refine, and ship",
    description:
      "Fix weak parts, polish the experience, and launch something usable.",
    icon: Rocket,
  },
];
