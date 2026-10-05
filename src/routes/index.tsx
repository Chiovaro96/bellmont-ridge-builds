import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import kitchenImg from "@/assets/project-kitchen.jpg";
import bathroomImg from "@/assets/project-bathroom.jpg";
import exteriorImg from "@/assets/project-exterior.jpg";
import kitchenBeforeImg from "@/assets/project-kitchen-before.jpg";
import bathroomBeforeImg from "@/assets/project-bathroom-before.jpg";
import exteriorBeforeImg from "@/assets/project-exterior-before.jpg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitProjectInquiry } from "@/lib/inquiries.functions";

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
    beforeImage: kitchenBeforeImg,
    beforeAlt: "Dated kitchen before renovation with honey-oak cabinets, laminate counters, and white appliances",
    afterImage: kitchenImg,
    afterAlt: "Open-concept kitchen after renovation with a quartz waterfall island, matte black cabinetry, and white oak accents",
    summary: "Open-concept kitchen with quartz islands and matte black cabinetry.",
    meta: "14 weeks · $68,000",
  },
  {
    label: "Bathroom Remodel",
    location: "The Woodlands, TX",
    beforeImage: bathroomBeforeImg,
    beforeAlt: "Dated primary bathroom before renovation with an enclosed shower, oak vanity, and beige tile",
    afterImage: bathroomImg,
    afterAlt: "Primary bathroom after renovation with a walk-in glass shower, floating wood vanity, and freestanding tub",
    summary: "Primary bath with a walk-in glass shower and floating vanity.",
    meta: "9 weeks · $42,000",
  },
  {
    label: "Exterior Remodel",
    location: "Katy, TX",
    beforeImage: exteriorBeforeImg,
    beforeAlt: "Aging home exterior before renovation with faded siding, weathered trim, and sparse landscaping",
    afterImage: exteriorImg,
    afterAlt: "Home exterior after renovation with new siding, a new front door, and landscape lighting at dusk",
    summary: "Full facade refresh with new siding and a covered patio.",
    meta: "11 weeks · $95,000",
  },
];

const projectTypes = [
  "Kitchen remodel",
  "Bathroom remodel",
  "Exterior remodel",
  "Whole-home renovation",
  "Other",
] as const;

const timelines = [
  "As soon as possible",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
] as const;

function Index() {
  const submitInquiry = useServerFn(submitProjectInquiry);
  const [projectType, setProjectType] = useState<(typeof projectTypes)[number]>(
    "Kitchen remodel",
  );
  const [preferredTimeline, setPreferredTimeline] = useState<(typeof timelines)[number]>(
    "1–3 months",
  );
  const [consultationRequested, setConsultationRequested] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);
  const startedAtRef = useRef(Date.now());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    const form = event.currentTarget;
    const fields = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitInquiry({
        data: {
          name: String(fields.get("name") ?? ""),
          email: String(fields.get("email") ?? ""),
          phone: String(fields.get("phone") ?? ""),
          projectType,
          projectDescription: String(fields.get("projectDescription") ?? ""),
          preferredTimeline,
          consultationRequested,
          website: String(fields.get("website") ?? ""),
          startedAt: startedAtRef.current,
        },
      });
      form.reset();
      setProjectType("Kitchen remodel");
      setPreferredTimeline("1–3 months");
      setConsultationRequested(true);
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We couldn't send your request. Please call us instead.",
      );
      setStatus("error");
    }
  };

  return (
    <div className="bg-scene min-h-screen w-full font-sans text-foreground antialiased">
      <div className="mx-auto max-w-md px-5 pb-10 pt-6 md:max-w-5xl">
        {/* Header */}
        <header className="glass flex items-center justify-between rounded-2xl px-4 py-3">
          <img
            src="/bellmont-ridge-logo.png"
            alt="Bellmont Ridge Construction — Home Renovations"
            width={1254}
            height={1254}
            className="size-20 rounded-xl object-cover shadow-lg shadow-foreground/15 sm:size-24"
          />
          <span className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
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
              className="glass-soft flex h-12 items-center justify-center rounded-xl px-4 text-[14px] font-semibold text-foreground transition-colors hover:bg-background/70"
            >
              View our work
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

          <div className="mt-4 grid gap-5">
            {projects.map((project) => (
              <article
                key={project.label}
                className="glass overflow-hidden rounded-3xl md:grid md:grid-cols-[minmax(0,1.65fr)_minmax(15rem,0.7fr)]"
              >
                <div className="grid grid-cols-2 gap-px bg-border" aria-label={`${project.label} before and after comparison`}>
                  <figure className="relative overflow-hidden bg-muted">
                    <img
                      src={project.beforeImage}
                      alt={project.beforeAlt}
                      width={1536}
                      height={960}
                      loading="lazy"
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                    <figcaption className="absolute left-3 top-3 rounded-full border border-background/30 bg-foreground/80 px-3 py-1 text-[10px] font-bold uppercase text-primary-foreground backdrop-blur-sm">
                      Before
                    </figcaption>
                  </figure>
                  <figure className="relative overflow-hidden bg-muted">
                    <img
                      src={project.afterImage}
                      alt={project.afterAlt}
                      width={1536}
                      height={960}
                      loading="lazy"
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                    <figcaption className="absolute left-3 top-3 rounded-full border border-background/30 bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase text-primary-foreground backdrop-blur-sm">
                      After
                    </figcaption>
                  </figure>
                </div>
                <div className="flex flex-col justify-center p-5 md:p-6">
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

        {/* Estimate request */}
        <section id="contact" className="glass mt-10 scroll-mt-6 rounded-3xl p-5 md:p-8">
          <div className="md:flex md:items-end md:justify-between md:gap-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                Free project estimate
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
                Tell us what you’re planning.
              </h2>
              <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
                Share a few details and we’ll reach out to discuss your Houston-area renovation.
              </p>
            </div>
            <a
              href="tel:+12816065386"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground md:mt-0"
            >
              <Phone className="size-4" aria-hidden="true" />
              (281) 606-5386
            </a>
          </div>

          {status === "success" ? (
            <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-primary/30 bg-background/55 px-6 text-center" role="status">
              <CheckCircle2 className="size-10 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-bold">Your request is in.</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Thanks for reaching out. Bellmont Ridge Construction will contact you about your project.
              </p>
              <Button type="button" variant="outline" className="mt-5" onClick={() => setStatus("idle")}>
                Send another request
              </Button>
            </div>
          ) : (
            <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" autoComplete="name" minLength={2} maxLength={100} required className="h-11 bg-background/55" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" autoComplete="tel" minLength={7} maxLength={30} required className="h-11 bg-background/55" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" autoComplete="email" maxLength={255} required className="h-11 bg-background/55" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-type">Project type</Label>
                  <Select value={projectType} onValueChange={(value) => setProjectType(value as (typeof projectTypes)[number])}>
                    <SelectTrigger id="project-type" className="h-11 bg-background/55">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="project-description">Tell us about your renovation</Label>
                <Textarea
                  id="project-description"
                  name="projectDescription"
                  placeholder="What would you like to change, and what matters most for the finished space?"
                  minLength={20}
                  maxLength={2000}
                  required
                  className="min-h-32 resize-y bg-background/55"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="timeline">Preferred timeline</Label>
                <Select value={preferredTimeline} onValueChange={(value) => setPreferredTimeline(value as (typeof timelines)[number])}>
                  <SelectTrigger id="timeline" className="h-11 bg-background/55">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="hidden" aria-hidden="true">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-background/45 p-4">
                <Checkbox
                  id="consultation"
                  checked={consultationRequested}
                  onCheckedChange={(checked) => setConsultationRequested(checked === true)}
                />
                <Label htmlFor="consultation" className="cursor-pointer text-sm leading-relaxed">
                  I’d like Bellmont Ridge Construction to contact me about a consultation.
                </Label>
              </div>

              {status === "error" && (
                <p className="text-sm font-medium text-destructive" role="alert">
                  {errorMessage}
                </p>
              )}

              <Button type="submit" size="lg" disabled={status === "submitting"} className="h-12 w-full rounded-xl text-[14px] shadow-lg shadow-primary/20">
                {status === "submitting" ? (
                  <><Loader2 className="animate-spin" aria-hidden="true" /> Sending request…</>
                ) : (
                  "Request my free estimate"
                )}
              </Button>
            </form>
          )}
        </section>

        <p className="mt-6 text-center text-[11px] text-muted-foreground/70">
          © 2026 Bellmont Ridge Construction · Houston, TX
        </p>
      </div>
    </div>
  );
}
