"use client";

import { useEffect, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { PROJECT_IMAGE_SIZES } from "@/lib/project-image";

export function SelectedProjects({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImage, setLoadedImage] = useState<string>();
  const warmedImages = useRef(new Set<string>());
  const project = projects[activeIndex];
  const hasMultipleProjects = projects.length > 1;

  useEffect(() => {
    if (!hasMultipleProjects || loadedImage !== project?.image) return;

    const warmNearbyImages = () => {
      const connection = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }).connection;
      if (document.visibilityState !== "visible" || connection?.saveData ||
          ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "")) return;

      for (const direction of [1, -1]) {
        const adjacent = projects[(activeIndex + direction + projects.length) % projects.length];
        if (adjacent.image === project.image || warmedImages.current.has(adjacent.image)) continue;
        warmedImages.current.add(adjacent.image);
        const { props } = getImageProps({
          src: adjacent.image, alt: "", fill: true, sizes: PROJECT_IMAGE_SIZES,
        });
        const image = new window.Image();
        image.fetchPriority = "low";
        image.decoding = "async";
        image.onerror = () => warmedImages.current.delete(adjacent.image);
        // Set sizes/srcset before src to avoid downloading an unnecessary resolution.
        image.sizes = props.sizes ?? "";
        image.srcset = props.srcSet ?? "";
        image.src = props.src;
      }
    };

    if ("requestIdleCallback" in window) {
      const idle = window.requestIdleCallback(warmNearbyImages, { timeout: 2000 });
      return () => window.cancelIdleCallback(idle);
    }
    const timer = setTimeout(warmNearbyImages, 1000);
    return () => clearTimeout(timer);
  }, [activeIndex, hasMultipleProjects, loadedImage, project?.image, projects]);

  function changeProject(direction: number) {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  }

  return (
    <section
      id="projects"
      className="projects section-shell section-spacing"
      aria-labelledby="projects-title"
    >
      <div className="section-heading section-heading--center projects__heading">
        <h2 id="projects-title">My Projects</h2>
        <p>A small collection of digital products, websites, and systems I&apos;ve worked on.</p>
      </div>

      {!project ? (
        <p className="project-showcase__empty">New projects will appear here soon.</p>
      ) : (
        <div className="project-showcase" role="region" aria-roledescription="carousel" aria-label="Projects">
          <div className="project-showcase__stage">
            {([-1, 1] as const).map((direction) => {
              const adjacent = projects[(activeIndex + direction + projects.length) % projects.length];
              const previous = direction === -1;
              const Arrow = previous ? ArrowLeft : ArrowRight;

              return (
                <button
                  key={direction}
                  type="button"
                  className={`project-showcase__nav project-showcase__nav--${previous ? "prev" : "next"}`}
                  disabled={!hasMultipleProjects}
                  aria-label={hasMultipleProjects ? `${previous ? "Previous" : "Next"} project: ${adjacent.title}` : `${previous ? "Previous" : "Next"} project`}
                  aria-controls="project-details"
                  onClick={() => changeProject(direction)}
                >
                  <span className="project-showcase__nav-label">{previous ? "PREV" : "NEXT"}</span>
                  <span className="project-showcase__nav-title">{hasMultipleProjects ? adjacent.title : "More projects soon"}</span>
                  <span className="project-showcase__nav-description">
                    {hasMultipleProjects ? adjacent.description : "New work will appear here as I ship more projects."}
                  </span>
                  <Arrow className="project-showcase__arrow" size={22} aria-hidden="true" />
                </button>
              );
            })}

            <a
              className="project-showcase__screen"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} website (opens in a new tab)`}
            >
              <Image
                key={project.image}
                src={project.image}
                alt={project.imageAlt || `${project.title} project screenshot`}
                fill
                sizes={PROJECT_IMAGE_SIZES}
                onLoad={() => setLoadedImage(project.image)}
                draggable={false}
                className="project-showcase__image select-none"
              />
              <span className="project-showcase__image-link" aria-hidden="true">
                Visit website <ArrowUpRight size={18} />
              </span>
            </a>
          </div>

          <div id="project-details" className="project-showcase__details" aria-live="polite" aria-atomic="true">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tag-list" aria-label="Project technologies">
              {project.tags.map((tag, index) => <span key={`${tag}-${index}`}>{tag}</span>)}
            </div>
            <a href={project.url} className="button button--primary" target="_blank" rel="noreferrer">
              Visit Website <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>

          {hasMultipleProjects && (
            <div className="project-showcase__indicators" role="group" aria-label="Choose a project">
              {projects.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  className={index === activeIndex ? "is-active" : undefined}
                  aria-label={`Show project ${index + 1}: ${item.title}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  aria-controls="project-details"
                  onClick={() => setActiveIndex(index)}
                ><span aria-hidden="true" /></button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
