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
          <p className="about__intro-text">
            I’m Zakariya R. Jabbar, a 20-year-old developer from Iraq. I care about building things
            with purpose, not just adding features for the sake of it. My focus is on creating
            systems that are clear, practical, and easy to use. I use AI to support my workflow,
            speed up development, and explore better solutions while keeping the final product
            reliable, polished, and focused on real value.
          </p>
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
            draggable={false}
            className="about__photo select-none"
          />
          <figcaption>AI-generated portrait via Google Whisk</figcaption>
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
