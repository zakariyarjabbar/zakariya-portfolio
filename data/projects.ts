export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
};

export const projects: Project[] = [
  {
    title: "ZEKO_OS",
    description:
      "A full-stack web app built as a digital command center, featuring a custom terminal interface, authentication, admin tools, and real-time communication.",
    tags: ["Live", "Next.js", "TypeScript", "React", "Supabase", "Framer Motion"],
    image: "/zeko-os-main.png",
    url: "https://zeko-os.vercel.app/",
  },
];
