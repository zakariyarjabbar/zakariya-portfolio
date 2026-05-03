import type { Social, SocialIconName } from "@/data/socials";
import { Mail } from "lucide-react";

type SocialLinkProps = {
  social: Social;
  showLabel?: boolean;
  className?: string;
};

const nonDraggableSvgProps = { draggable: "false" } as const;

function BrandIcon({ name }: { name: SocialIconName }) {
  if (name === "email") {
    return <Mail {...nonDraggableSvgProps} className="select-none" />;
  }

  const paths: Record<Exclude<SocialIconName, "email">, string> = {
    linkedin:
      "M5.4 8.7h3.2V19H5.4V8.7Zm1.6-5A1.9 1.9 0 1 1 7 7.5a1.9 1.9 0 0 1 0-3.8ZM10.7 8.7h3.1v1.4h.1c.4-.8 1.5-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8V19h-3.2v-5.1c0-1.2 0-2.8-1.7-2.8s-1.9 1.3-1.9 2.7V19h-3.2V8.7Z",
    github:
      "M12 3.6a8.6 8.6 0 0 0-2.7 16.8c.4.1.5-.2.5-.4v-1.5c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.3.9 1.3.9.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-3.8 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3-1.8 3.6-3.6 3.8.3.3.6.8.6 1.6V20c0 .2.1.5.6.4A8.6 8.6 0 0 0 12 3.6Z",
    instagram:
      "M8 4.7h8A3.3 3.3 0 0 1 19.3 8v8a3.3 3.3 0 0 1-3.3 3.3H8A3.3 3.3 0 0 1 4.7 16V8A3.3 3.3 0 0 1 8 4.7Zm0 1.8A1.5 1.5 0 0 0 6.5 8v8A1.5 1.5 0 0 0 8 17.5h8a1.5 1.5 0 0 0 1.5-1.5V8A1.5 1.5 0 0 0 16 6.5H8Zm4 2.2a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6Zm0 1.8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm4-2.1a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z",
    x: "M5.1 4.8h4.4l3.2 4.3 3.7-4.3h2.5l-5 5.8 5.5 8.6H15l-3.6-5.1-4.3 5.1H4.6l5.7-6.6-5.2-7.8Zm3.2 1.9 7.9 10.7h1L9.3 6.7h-1Z",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
      {...nonDraggableSvgProps}
      className="select-none"
    >
      <path d={paths[name]} fill="currentColor" />
    </svg>
  );
}

export function SocialLink({ social, showLabel = true, className = "" }: SocialLinkProps) {
  return (
    <a
      href={social.href}
      className={`social-link ${className}`}
      aria-label={social.label}
      target={social.href.startsWith("http") ? "_blank" : undefined}
      rel={social.href.startsWith("http") ? "noreferrer" : undefined}
    >
      <span className="social-link__icon" aria-hidden="true">
        <BrandIcon name={social.icon} />
      </span>
      {showLabel ? <span>{social.label}</span> : null}
    </a>
  );
}
