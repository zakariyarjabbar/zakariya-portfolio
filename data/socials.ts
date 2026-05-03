export type SocialIconName = "email" | "linkedin" | "github" | "instagram" | "x";

export type Social = {
  label: string;
  href: string;
  icon: SocialIconName;
};

export const socials: Social[] = [
  {
    label: "Email",
    href: "mailto:zakariya.r.jabbar@gmail.com",
    icon: "email",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zakariya-jabbar-6b7880407",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/zakariyarjabbar",
    icon: "github",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/zakariyarjabbar",
    icon: "instagram",
  },
  {
    label: "X",
    href: "https://x.com/zakariyarjabbar",
    icon: "x",
  },
];
