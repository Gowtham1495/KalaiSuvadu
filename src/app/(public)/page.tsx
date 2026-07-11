import type { Metadata } from "next";
import Link from "next/link";
import { getBrand, getAllProjects, getServices, getAllTeamMembers } from "@/lib/site-data";
import { SectionHeading } from "@/components/public/section-heading";
import { ServiceCard } from "@/components/public/service-card";
import { ProjectCard } from "@/components/public/project-card";
import { TeamCard } from "@/components/public/team-card";
import { MediaEmbed } from "@/components/public/media-embed";

export const metadata: Metadata = {
  title: "Home",
  description: "HueBees creates murals and paintings for homes, cafes, offices, and collaborative spaces.",
};

export default async function HomePage() {
  const [brand, allProjects, services, teamMembers] = await Promise.all([
    getBrand(),
    getAllProjects(),
    getServices(),
    getAllTeamMembers(),
  ]);

  const featuredProjects = allProjects.filter(p => p.isFeatured && p.status === "completed").slice(0, 3);
  const upcomingProjects = allProjects.filter(p => p.status === "upcoming" || p.status === "in-progress");

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
      <section className="grid gap-8 rounded-[2.5rem] border border-stone-200 bg-white/85 p-8 shadow-[0_30px_120px_-55px_rgba(28,25,23,0.35)] lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">{brand?.brandName ?? "HueBees"}</p>
          <h1 className="mt-4 max-w-xl text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl">
            {brand?.tagline ?? "Murals and paintings that turn walls into stories."}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            A small art studio creating custom wall murals, interiors, and collaborative pieces for
            brands and homes that want something memorable.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/portfolio" className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
              View portfolio
            </Link>
            <Link href="/contact" className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition hover:border-stone-400">
              Start a brief
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:row-span-2">
            {featuredProjects[0] ? (
              <Link
                href={`/portfolio/${featuredProjects[0].slug}`}
                className="group flex h-full flex-col justify-between rounded-[2rem] bg-stone-950 p-6 text-white transition hover:bg-stone-900"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Featured work</p>
                  <div className="mt-5 overflow-hidden rounded-[1.5rem] bg-stone-800">
                    {featuredProjects[0].coverMediaUrl ? (
                      <img
                        src={featuredProjects[0].coverMediaUrl}
                        alt={featuredProjects[0].title}
                        className="aspect-[4/5] w-full object-cover opacity-95 transition duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="mt-5">
                  <h2 className="text-2xl font-semibold group-hover:underline decoration-amber-300 underline-offset-4">{featuredProjects[0].title}</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-300 line-clamp-2">
                    {featuredProjects[0].description}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex h-full flex-col justify-between rounded-[2rem] bg-stone-950 p-6 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Featured work</p>
                  <div className="mt-5 overflow-hidden rounded-[1.5rem] bg-stone-800 aspect-[4/5]" />
                </div>
                <div className="mt-5">
                  <h2 className="text-2xl font-semibold">Featured project</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-300">Selected project spotlight</p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-stone-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Studio</p>
            <p className="mt-4 text-3xl font-semibold text-stone-950">{allProjects.length} public projects</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">Curated murals and paintings across multiple categories.</p>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-stone-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Team</p>
            <p className="mt-4 text-3xl font-semibold text-stone-950">{teamMembers.length} artists</p>
            <p className="mt-2 text-sm leading-6 text-stone-600">Solo pieces and collaborative installs.</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Services"
          title="What the studio offers"
          description="Services are tailored around the space, mood, and kind of art you want the wall to carry."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Portfolio"
            title="Recent featured work"
            description="A short preview of the visual range the studio can produce."
          />
          <Link href="/portfolio" className="hidden text-sm font-semibold text-stone-950 underline decoration-stone-300 underline-offset-4 lg:inline-flex">
            See all work
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {upcomingProjects.length > 0 && (
        <section className="mt-16">
          <SectionHeading
            eyebrow="On the horizon"
            title="Upcoming & works in progress"
            description="Sneak peeks at wall murals currently being painted or scheduled to start soon."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {upcomingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-16">
        <SectionHeading
          eyebrow="Team"
          title="Artists behind the work"
          description="Each artist brings a distinct visual language, and some projects are collaborative."
        />
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {brand?.commonGallery && brand.commonGallery.length > 0 && (
        <section className="mt-16">
          <SectionHeading
            eyebrow="Gallery"
            title="Studio feed & moments"
            description="Timelapses, Instagram reels, and in-progress shots from the studio."
          />
          <div className="mt-8 columns-1 gap-6 space-y-6 sm:columns-2 xl:columns-3">
            {brand.commonGallery.map((item, idx) => (
              <div key={`${item.url}-${idx}`} className="break-inside-avoid overflow-hidden rounded-[2rem] bg-stone-100 ring-1 ring-stone-200">
                <MediaEmbed type={item.mediaType} url={item.url} altText={item.altText} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
