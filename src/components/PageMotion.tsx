import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

let hasEnteredPage = false;
const useClientLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Adds route title entrances and scroll reveals to pages outside the custom home layout. */
export function PageMotion({
  children,
  initialLoader = false,
}: {
  children: ReactNode;
  initialLoader?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useClientLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const firstPage = !hasEnteredPage;
    if (firstPage) {
      window.setTimeout(() => {
        hasEnteredPage = true;
      }, 0);
    }

    // The home route already has bespoke reveals and preloader timing.
    if (root.querySelector(".home-page")) return;

    const primaryTitles = root.querySelectorAll<HTMLElement>("h1");
    primaryTitles.forEach((title) => {
      title.classList.add("page-motion-primary-title");
      title.style.animationDelay = firstPage && initialLoader ? "1.85s" : "45ms";
    });

    const sectionTitles = root.querySelectorAll<HTMLElement>("h2");
    sectionTitles.forEach((title) => title.classList.add("page-motion-section-title"));

    const revealTargets = root.querySelectorAll<HTMLElement>(
      "section, article, form, .card-luxe, .gold-border",
    );
    const siblingIndexes = new Map<Element, number>();
    revealTargets.forEach((target) => {
      target.classList.add("page-motion-reveal");
      const parent = target.parentElement;
      const siblingIndex = parent ? (siblingIndexes.get(parent) ?? 0) : 0;
      if (parent) siblingIndexes.set(parent, siblingIndex + 1);
      target.style.transitionDelay = `${Math.min(siblingIndex, 5) * 65}ms`;
    });

    if (typeof IntersectionObserver === "undefined") {
      sectionTitles.forEach((title) => title.classList.add("page-motion-visible"));
      revealTargets.forEach((target) => target.classList.add("page-motion-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("page-motion-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    sectionTitles.forEach((title) => observer.observe(title));
    revealTargets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [initialLoader]);

  return (
    <div ref={rootRef} className="page-motion-root">
      {children}
    </div>
  );
}
