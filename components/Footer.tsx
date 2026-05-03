import { socials } from "@/data/socials";
import { SocialLink } from "./SocialLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner section-shell">
        <p>© 2026 Zakariya Jabbar. All rights reserved.</p>
        <div className="site-footer__right">
          <a href="#home" className="site-footer__top-link">
            Back to top ↑
          </a>
          <div className="site-footer__socials" aria-label="Footer social links">
            {socials.map((social) => (
              <SocialLink key={social.label} social={social} showLabel={false} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
