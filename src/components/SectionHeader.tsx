export function SectionHeader({
  eyebrow,
  title,
  titleClassName = "",
  animateTitleWords = false,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  titleClassName?: string;
  animateTitleWords?: boolean;
  description?: string;
  align?: "center" | "left";
}) {
  const titleWords = animateTitleWords ? title.split(/\s+/) : [];

  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <div
          className={`mb-5 flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase text-gold-light ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-gold-light/60" />
          {eyebrow}
          <span className="h-px w-8 bg-gold-light/60" />
        </div>
      )}
      <h2
        aria-label={animateTitleWords ? title : undefined}
        className={`font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl ${titleClassName} ${animateTitleWords ? "page-title-word-reveal" : ""}`}
      >
        {animateTitleWords
          ? titleWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                aria-hidden="true"
                className="about-name__word"
                style={{
                  animationDelay: `${145 + index * 125}ms`,
                  marginRight: index < titleWords.length - 1 ? "0.22em" : undefined,
                }}
              >
                {word}
              </span>
            ))
          : title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
