"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./LogoMark";

const STORAGE_KEY = "loaderShown";
const DURATION_MS = 1500;
const REDUCED_MOTION_DURATION_MS = 180;

function markLoaderShown() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // If sessionStorage is unavailable, fail open and avoid trapping the page.
  }
}

export function Loader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const shouldShow = root.classList.contains("loader-first-visit");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!shouldShow) {
      return;
    }

    markLoaderShown();
    setIsReducedMotion(prefersReducedMotion);
    setIsVisible(true);
    root.classList.remove("loader-first-visit");

    const done = window.setTimeout(() => {
      setIsVisible(false);
    }, prefersReducedMotion ? REDUCED_MOTION_DURATION_MS : DURATION_MS);

    return () => window.clearTimeout(done);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`loader-overlay${isReducedMotion ? " loader-overlay--reduced" : ""}`}
      aria-hidden="true"
    >
      <div className="loader-overlay__aperture" />
      <div className="loader-overlay__blink" />
      <div className="loader-overlay__logo">
        <LogoMark />
      </div>
    </div>
  );
}
