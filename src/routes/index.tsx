import { createFileRoute } from "@tanstack/react-router";
import kitchenImg from "@/assets/project-kitchen.jpg";
import bathroomImg from "@/assets/project-bathroom.jpg";
import exteriorImg from "@/assets/project-exterior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Bellmont Ridge Construction | Home Remodeling in Houston, TX",
      },
      {
        name: "description",
        content:
          "Bellmont Ridge Construction — kitchen, bathroom, and exterior remodeling for the greater Houston area. Request a free estimate today.",
      },
      {
        property: "og:title",
        content: "Bellmont Ridge Construction | Home Remodeling in Houston, TX",
      },
      {
        property: "og:description",
        content:
          "Kitchen, bathroom, and exterior remodeling for the greater Houston area. Request a free estimate today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const projects = [
  {
    label: "Kitchen Remodel",
    location: "Cypress, TX",
    image: kitchenImg,
    alt: "Open-concept kitchen remodel with a quartz waterfall island, matte black cabinetry, and white oak accents",
    summary: "Open-concept kitchen with quartz islands and matte black cabinetry.",
    meta: "14 weeks · $68,000",
  },
  {
    label: "Bathroom Remodel",
    location: "The Woodlands, TX",
    image: bathroomImg,
    alt: "Primary bathroom remodel with a walk-in glass shower, floating wood vanity, and freestanding tub",
    summary: "Primary bath with a walk-in glass shower and floating vanity.",
    meta: "9 weeks · $42,000",
  },
  {
    label: "Exterior Remodel",
    location: "Katy, TX",
    image: exteriorImg,
    alt: "Home exterior remodel with new siding, a new front door, and landscape lighting at dusk",
    summary: "Full facade refresh with new siding and a covered patio.",
    meta: "11 weeks · $95,000",
  },
];

function Index() {
  return (
    <div className="bg-scene min-h-screen w-full font-sans text-foreground antialiased">
      <div className="mx-auto max-w-md px-5 pb-10 pt-6 md:max-w-5xl">
        {/* Header */}
        <header className="glass flex items-center justify-between rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-teal font-display text-sm font-bold text-white shadow-lg shadow-brand/30">
              BR
            </div>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-bold tracking-tight">
                Bellmont Ridge
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Construction
              </p>
            </div>
          </div>
          <span className="rounded-full border border-white/60 bg-white/50 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
            Houston, TX
          </span>
        </header>

        {/* Hero */}
        <section className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Home Renovations &amp; Remodeling
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            We rebuild the way you live.
          </h1>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">
            Kitchens, baths, and everything in between. — designed and built
            for the greater Houston area.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="flex h-12 flex-1 items-center justify-center rounded-xl bg-foreground text-[14px] font-semibold text-primary-foreground shadow-lg shadow-foreground/20 transition-opacity hover:opacity-90"
            >
              Get a free estimate
            </a>
            <a
              href="#work"
              className="glass-soft flex h-12 items-center justify-center rounded-xl px-4 text-[14px] font-semibold text-foreground transition-colors hover:bg-white/60"
            >
              View work
            </a>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid grid-cols-3 gap-3">
          <div className="glass rounded-2xl px-3 py-4 text-center">
            <p className="font-display text-[22px] font-bold text-primary">80+</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Projects
            </p>
          </div>
          <div className="glass rounded-2xl px-3 py-4 text-center">
            <p className="font-display text-[22px] font-bold text-teal">6yr</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Experience
            </p>
          </div>
          <div className="glass rounded-2xl px-3 py-4 text-center">
            <p className="font-display text-[22px] font-bold text-foreground">4.9</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Rating
            </p>
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="mt-10 scroll-mt-6">
          <h2 className="font-display text-[22px] font-bold tracking-tight">
            Recent projects
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.label} className="glass overflow-hidden rounded-3xl">
                <img
                  src={project.image}
                  alt={project.alt}
                  width={1536}
                  height={960}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                      {project.label}
                    </span>
                    <span className="text-[11px] font-semibold whitespace-nowrap text-muted-foreground">
                      {project.location}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] font-semibold leading-snug">
                    {project.summary}
                  </p>
                  <p className="mt-2 text-[12px] text-muted-foreground">{project.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="glass mt-10 scroll-mt-6 rounded-3xl p-5">
          <h2 className="font-display text-[20px] font-bold tracking-tight">
            Ready to start your project?
          </h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Serving the greater Houston area. Licensed, bonded &amp; insured.
          </p>
          <a
            href="tel:+12816065386"
            className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-brand to-teal text-[14px] font-semibold text-white shadow-lg shadow-brand/30 transition-opacity hover:opacity-90"
          >
            Call (281) 606-5386
          </a>
        </section>

        <p className="mt-6 text-center text-[11px] text-muted-foreground/70">
          © 2026 Bellmont Ridge Construction · Houston, TX
        </p>
      </div>
    </div>
  );
}
