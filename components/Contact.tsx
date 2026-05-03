import { socials } from "@/data/socials";
import { SectionLabel } from "./SectionLabel";
import { SocialLink } from "./SocialLink";

export function Contact() {
  return (
    <section id="contact" className="contact section-shell section-spacing" aria-labelledby="contact-title">
      <div className="section-heading section-heading--center contact__heading">
        <SectionLabel>CONTACT</SectionLabel>
        <h2 id="contact-title">Let’s connect</h2>
        <p className="contact__subtitle">
          Have a question, idea, or just want to say hello? Send me a message.
        </p>
      </div>

      <div className="contact__links" aria-label="Contact and social links">
        {socials.map((social) => (
          <SocialLink key={social.label} social={social} />
        ))}
      </div>
    </section>
  );
}
