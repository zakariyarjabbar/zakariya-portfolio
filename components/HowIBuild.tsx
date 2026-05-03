import { processSteps } from "@/data/process";
import { SectionLabel } from "./SectionLabel";

export function HowIBuild() {
  return (
    <section id="process" className="process section-shell section-spacing" aria-labelledby="process-title">
      <div className="process-panel">
        <div className="process-panel__header">
          <SectionLabel>PROCESS</SectionLabel>
          <h2 id="process-title">How I Build</h2>
          <p className="process-panel__subtitle">My process for taking ideas from zero to launch.</p>
        </div>

        <div className="process-panel__timeline" aria-hidden="true">
          {processSteps.map((step, index) => (
            <span
              key={step.title}
              className={`process-panel__marker process-panel__marker--${index + 1}`}
            />
          ))}
        </div>

        <div className="process-panel__steps">
          {processSteps.map((step, index) => (
            <article className="process-step" key={step.title}>
              <span className="process-step__number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
