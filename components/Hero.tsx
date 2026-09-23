import Image from "next/image";
import heroPortrait from "@/public/hero-portrait.png";

export function Hero() {
  return (
    <section id="home" className="hero section-shell" aria-label="Zakariya Jabbar hero">
      <div className="contour-accent" aria-hidden="true" />
      <div className="hero__content">
        <h1 className="hero__title" aria-label="Zakariya Jabbar">
          <span aria-hidden="true">Zakariya</span>
          <span aria-hidden="true">Jabbar</span>
        </h1>
        <p className="hero__subtitle">
          Website developer focused on building web applications and systems, combining clean
          design, reliable functionality, and AI-powered workflows to improve speed and quality.
        </p>
        <div className="hero__actions">
          <a href="#projects" className="button button--primary">
            View Work ↓
          </a>
          <a
            href="https://www.instagram.com/zakariyarjabbar"
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            INSTAGRAM
          </a>
        </div>
      </div>

      <div className="hero__portrait" aria-label="Black-and-white portrait">
        <Image
          src={heroPortrait}
          alt="Black-and-white portrait of Zakariya Jabbar"
          priority
          sizes="(max-width: 820px) min(94vw, 480px), (max-width: 980px) 44vw, (max-width: 1100px) 46vw, clamp(490px, 48vw, 680px)"
          draggable={false}
          className="hero__portrait-image select-none"
        />
      </div>
    </section>
  );
}
