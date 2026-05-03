import type { ComponentType, SVGProps } from "react";
import { Code2, Globe2, MessageCircle } from "lucide-react";

export type SkillGroup = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tags: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Websites",
    description: "Modern, fast, and responsive websites that look great and perform even better.",
    icon: Globe2,
    tags: [
      "Responsive Websites",
      "Landing Pages",
      "Portfolio Sites",
      "Performance",
      "Web Apps",
      "UX/UI Development"
    ],
  },
  {
    title: "Discord Systems",
    description: "Powerful Discord solutions to automate, manage, and grow communities.",
    icon: MessageCircle,
    tags: [
      "Custom Bots",
      "Server Automation",
      "Moderation Tools",
      "Role Systems",
    ],
  },
  {
    title: "Custom Software",
    description: "Tailored software to solve real problems and streamline operations.",
    icon: Code2,
    tags: [
      "Admin Dashboards",
      "Authentication",
      "Databases",
      "Internal Tools",
    ],
  },
];
