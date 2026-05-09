import Image from "next/image";
import { projects } from "@/data/projects";

const FUTURE_SLOT_COUNT = 5;

export function SelectedProjects() {
  const [project] = projects;
  const hasMultipleProjects = projects.length > 1;

  if (!project) {
    return null;
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

      <div className="project-showcase" aria-label={`${project.title} project showcase`}>
        <div className="project-showcase__stage">
          <aside className="project-showcase__nav project-showcase__nav--prev" aria-disabled="true">
            <span className="project-showcase__nav-label">PREV</span>
            <h3>More projects soon</h3>
            <p>New work will appear here as I ship more projects.</p>
            <span className="project-showcase__arrow" aria-hidden="true">
              &larr;
            </span>
          </aside>

          <div className="project-showcase__screen">
            <Image
              src={project.image}
              alt={`${project.title} screenshot showing the project's command center interface`}
              fill
              sizes="(max-width: 820px) 100vw, (max-width: 1200px) 70vw, 720px"
              draggable={false}
              className="project-showcase__image select-none"
            />
          </div>

          <aside className="project-showcase__nav project-showcase__nav--next" aria-disabled="true">
            <span className="project-showcase__nav-label">NEXT</span>
            <h3>More projects soon</h3>
            <p>New work will appear here as I ship more projects.</p>
            <span className="project-showcase__arrow" aria-hidden="true">
              &rarr;
            </span>
          </aside>
        </div>

        <div className="project-showcase__details">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tag-list" aria-label="Project technologies">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <a href={project.url} className="button button--primary" target="_blank" rel="noreferrer">
            Visit Website &rarr;
          </a>

          <div className="project-showcase__indicators" aria-label="Project carousel position">
            {Array.from({ length: FUTURE_SLOT_COUNT }).map((_, index) => (
              <span
                key={index}
                className={index === 0 ? "is-active" : undefined}
                aria-label={index === 0 ? `Current project: ${project.title}` : "Future project slot"}
                aria-current={index === 0 ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        {!hasMultipleProjects ? (
          <p className="project-showcase__mobile-note">More projects soon.</p>
        ) : null}
      </div>
    </section>
  );
}
