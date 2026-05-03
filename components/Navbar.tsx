"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { socials } from "@/data/socials";
import { LogoMark } from "./LogoMark";
import { SocialLink } from "./SocialLink";

const navItems = [
  { label: "Home", href: "#home", section: "home" },
  { label: "Projects", href: "#projects", section: "projects" },
  { label: "About", href: "#about", section: "about" },
  { label: "Contact", href: "#contact", section: "contact" },
];

export function Navbar() {
  const [isCompact, setIsCompact] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.section))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-24% 0px -58% 0px",
        threshold: [0.12, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`site-nav ${isCompact ? "site-nav--compact" : ""}`}>
        <nav className="site-nav__inner" aria-label="Primary navigation">
          <a href="#home" aria-label="Back to home" className="site-nav__logo">
            <LogoMark />
          </a>

          <div className="site-nav__links" aria-label="Section links">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`site-nav__link ${activeSection === item.section ? "is-active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a href="#contact" className="site-nav__cta">
            Get in Touch
          </a>

          <button
            className="site-nav__menu-button"
            type="button"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu aria-hidden="true" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu__top">
              <a href="#home" aria-label="Back to home" onClick={closeMenu}>
                <LogoMark />
              </a>
              <button
                type="button"
                aria-label="Close menu"
                className="mobile-menu__close"
                onClick={closeMenu}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="mobile-menu__links">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mobile-menu__socials" aria-label="Social links">
              {socials.map((social) => (
                <SocialLink key={social.label} social={social} showLabel={false} />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
