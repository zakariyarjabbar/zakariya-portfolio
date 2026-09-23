import projectData from "./projects.json";
import { versionPublicAsset } from "@/lib/versioned-assets";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt?: string;
  url: string;
};

export function getProjects(): Project[] {
  return projectData.map((project) => ({
    ...project,
    image: versionPublicAsset(project.image),
  }));
}
