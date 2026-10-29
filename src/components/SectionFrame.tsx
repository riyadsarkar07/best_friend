import { Squiggle } from "@/components/Doodles";

type SectionFrameProps = {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  children: React.ReactNode;
};

export function SectionFrame({ id, kicker, title, intro, children }: SectionFrameProps) {
  return (
    <section id={id} className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-2xl">
          <p className="font-script text-2xl text-sage">{kicker}</p>
          <h2 className="mt-1 font-serif text-4xl text-ink sm:text-5xl">{title}</h2>
          <Squiggle className="mt-3 h-5 w-36 text-pink" />
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{intro}</p>
        </header>
        {children}
      </div>
    </section>
  );
}
