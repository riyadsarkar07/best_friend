import { LeafSprig, Squiggle, Underline } from "@/components/Doodles";

type SectionFrameProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
  align?: "left" | "center";
  tone?: "plain" | "sage" | "blush" | "lavender";
  aside?: React.ReactNode;
};

const toneMap: Record<NonNullable<SectionFrameProps["tone"]>, string> = {
  plain: "",
  sage: "bg-gradient-to-b from-sage-soft/45 via-ivory/0 to-transparent",
  blush: "bg-gradient-to-b from-blush-soft/45 via-ivory/0 to-transparent",
  lavender: "bg-gradient-to-b from-lavender-soft/45 via-ivory/0 to-transparent",
};

export function SectionFrame({
  id,
  eyebrow,
  title,
  intro,
  children,
  align = "left",
  tone = "plain",
  aside,
}: SectionFrameProps) {
  const centered = align === "center";

  return (
    <section
      id={id}
      className={`relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24 ${toneMap[tone]}`}
    >
      <div className="section-shell relative">
        <header
          className={`mb-10 sm:mb-14 ${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}`}
        >
          <div
            className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
          >
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
            <p className="eyebrow">{eyebrow}</p>
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
          </div>
          <h2 className="serif-display balance mt-4 text-[2.15rem] text-ink sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h2>
          <Underline
            className={`mt-1 h-3 w-32 text-blush-deep/60 ${centered ? "mx-auto" : ""}`}
          />
          <p className="pretty mt-5 text-[1.02rem] leading-relaxed text-ink-soft sm:text-lg">
            {intro}
          </p>
          {aside}
        </header>

        {children}
      </div>

      <LeafSprig
        className={`pointer-events-none absolute -left-3 bottom-10 hidden h-24 w-16 text-sage/25 lg:block ${
          centered ? "lg:-left-3" : ""
        }`}
      />
      <Squiggle
        className="pointer-events-none absolute right-10 top-10 hidden h-5 w-24 text-blush/30 lg:block"
        aria-hidden="true"
      />
    </section>
  );
}
