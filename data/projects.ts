import projectData from "./projects.json";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt?: string;
  url: string;
};

export const projects: Project[] = projectData;
