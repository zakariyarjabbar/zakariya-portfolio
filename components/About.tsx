import Image from "next/image";
import { MapPin } from "lucide-react";
import aboutPhoto from "@/public/about-photo.png";
import { skillGroups } from "@/data/skills";
import { SectionLabel } from "./SectionLabel";

const nonDraggableSvgProps = { draggable: "false" } as const;

export function About() {
  return (
    <section id="about" className="about section-shell section-spacing" aria-labelledby="about-title">
      <div className="about__intro-grid">
        <div className="about__copy">
          <SectionLabel>WHO I AM</SectionLabel>
          <h2 id="about-title">A Little About Me</h2>
          <div className="about__intro-text">
            <p>
              My name is Zakariya Razzaq Jabbar, and I’m a 20-year-old website developer from
              Iraq. I focus on building modern web applications and digital systems with clear
              structure, clean design, and reliable functionality.
            </p>
            <p>
              I enjoy taking ideas from the early planning stage and turning them into products that
              feel organized, practical, and ready for real users.
            </p>
          </div>
          <blockquote className="about__mission">
            <span aria-hidden="true">“</span>
            <p>
              I use AI to move faster, but the goal stays the same: build useful systems that
              actually work.
            </p>
          </blockquote>
          <div className="about__meta" aria-label="Location and availability">
            <span className="about__meta-location">
              <MapPin aria-hidden="true" {...nonDraggableSvgProps} className="select-none" />
              Based in Iraq
            </span>
            <span className="about__meta-separator" aria-hidden="true" />
            <span>Available for projects</span>
          </div>
        </div>

        <figure className="about__photo-card">
          <Image
            src={aboutPhoto}
            alt="Zakariya Jabbar portrait"
            loading="lazy"
            sizes="(max-width: 620px) 290px, (max-width: 820px) 302px, 328px"
            draggable={false}
            className="about__photo select-none"
          />
          <figcaption>Portrait of Zakariya Jabbar</figcaption>
        </figure>
      </div>

      <div className="skill-rows" aria-label="Skill groups">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <article className="skill-row" key={group.title}>
              <div className="skill-row__marker" aria-hidden="true">
                <span className="skill-row__icon">
                  <Icon {...nonDraggableSvgProps} className="select-none" />
                </span>
              </div>
              <div className="skill-row__copy">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <div className="skill-row__tags">
                {group.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
