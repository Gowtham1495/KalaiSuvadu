import type { Metadata } from "next";
import Link from "next/link";
import { getBrand, getAllProjects, getServices, getAllTeamMembers } from "@/lib/site-data";
import { ServiceCard } from "@/components/public/service-card";
import { ProjectCard } from "@/components/public/project-card";
import { ProjectSlideshow } from "@/components/public/project-slideshow";
import { TeamCard } from "@/components/public/team-card";
import { MediaEmbed } from "@/components/public/media-embed";
import { GoldDivider } from "@/components/public/gold-divider";

export const metadata: Metadata = {
  title: "Home",
  description: "KalaiSuvadu creates murals and paintings for homes, cafes, offices, and collaborative spaces.",
};

export default async function HomePage() {
  const [brand, allProjects, services, teamMembers] = await Promise.all([
    getBrand(),
    getAllProjects(),
    getServices(),
    getAllTeamMembers(),
  ]);

  const recentProjects = allProjects.filter(p => p.isCoverProject).slice(0, 3);
  const slideshowProjects = allProjects
    .filter((project) => project.isPublished)
    .slice(0, 6)
    .map((project) => ({
      title: project.title,
      slug: project.slug,
      category: project.category,
      location: project.location,
      coverMediaUrl: project.coverMediaUrl,
    }));
  const upcomingProjects = allProjects.filter(p => p.status === "upcoming" || p.status === "in-progress");
  const whatsappUrl = brand?.whatsappUrl ?? "#";

  return (
    <div className="mx-auto max-w-7xl bg-[#f6f2ea] px-6 py-10 text-[#2b241b] lg:px-8 lg:py-14">
      <section className="grid overflow-hidden border border-[#ddd4c2] bg-[#fbf8f1] lg:grid-cols-2">
        <div className="relative bg-gradient-to-br from-[#fbf8f1] to-[#f1eadf] p-8 lg:p-12">
          <div className="absolute inset-0 bg-kolam opacity-40" />
          <div className="relative flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c9a84c]" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7d6b]">Coimbatore, India</p>
            </div>
            <p className="font-display mt-6 text-3xl text-[#c9a84c]">கலைச் சுவடு</p>
            <h1 className="font-display mt-3 max-w-xl text-5xl font-light tracking-tight text-[#2b241b] sm:text-6xl">
              {brand?.tagline ?? "Murals and paintings that turn walls into stories."}
            </h1>
            <p className="mt-3 text-xs tracking-widest italic text-[#8a7d6b]">The art of leaving a mark.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/portfolio" className="rounded-sm bg-[#c9a84c] px-5 py-3 text-xs tracking-widest text-[#2b241b]">
                See our projects
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-[#5b5043]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-current" aria-hidden="true">
                  <path d="M12.02 2C6.49 2 2 6.4 2 11.82c0 1.9.56 3.74 1.62 5.32L2 22l5.03-1.57a10.17 10.17 0 004.99 1.3h.01c5.53 0 10.02-4.4 10.02-9.82C22.05 6.4 17.55 2 12.02 2zm5.82 13.88c-.24.66-1.4 1.25-1.93 1.33-.5.07-1.14.1-1.84-.12-.42-.13-.96-.31-1.65-.6-2.9-1.21-4.78-4.04-4.92-4.23-.14-.2-1.18-1.55-1.18-2.95 0-1.4.74-2.09 1-2.37.26-.28.57-.35.76-.35.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.14.07.14.12.3.02.49-.1.2-.15.32-.3.49-.14.17-.3.38-.43.5-.14.13-.29.28-.13.56.17.28.73 1.18 1.56 1.92 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.6-.07.16-.2.68-.78.86-1.05.18-.27.37-.22.62-.13.25.08 1.58.74 1.85.88.28.14.46.2.53.31.07.11.07.67-.17 1.33z" />
                </svg>
                Talk to us
              </a>
            </div>
          </div>
        </div>
        <div className="border-l border-[#ddd4c2] bg-[#f0e8db]">
          <ProjectSlideshow projects={slideshowProjects} />
        </div>
      </section>

      <div className="grid grid-cols-2 border-y border-[#ddd4c2] bg-[#fbf8f1] sm:grid-cols-4">
        {[
          { value: `${allProjects.length}+`, label: "Walls transformed" },
          { value: "3", label: "Art styles" },
          { value: "Coimbatore", label: "Based in" },
          { value: "2hrs", label: "Reply time" },
        ].map((s) => (
          <div key={s.label} className="border-r border-[#ddd4c2] py-4 text-center last:border-r-0">
            <div className="font-display text-2xl text-[#c9a84c]">{s.value}</div>
            <div className="mt-1 text-[9px] uppercase tracking-widest text-[#8a7d6b]">{s.label}</div>
          </div>
        ))}
      </div>

      <GoldDivider />

      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#c9a84c]">Our work</p>
            <h2 className="font-display text-2xl font-light text-[#2b241b]">Recent Projects</h2>
          </div>
          <Link href="/portfolio" className="hidden text-xs tracking-[0.2em] text-[#8a7d6b] hover:text-[#c9a84c] lg:inline-flex">
            See all work
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <GoldDivider />

      <section className="mt-16">
        <div className="max-w-2xl">
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#c9a84c]">Services</p>
          <h2 className="font-display text-2xl font-light text-[#2b241b]">What studio offers</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>


      {upcomingProjects.length > 0 && (
        <>
          <GoldDivider />
          <section className="mt-16">
            <div className="max-w-2xl">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#c9a84c]">On horizon</p>
              <h2 className="font-display text-2xl font-light text-[#2b241b]">Upcoming and works in progress</h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {upcomingProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </>
      )}

      <GoldDivider />

      <section className="mt-16">
        <div className="max-w-2xl">
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#c9a84c]">About us</p>
          <h2 className="font-display text-2xl font-light text-[#2b241b]">Artists behind work</h2>
        </div>
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {brand?.commonGallery && brand.commonGallery.length > 0 && (
        <>
          <GoldDivider />
          <section className="mt-16">
            <div className="max-w-2xl">
              <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#c9a84c]">Gallery</p>
              <h2 className="font-display text-2xl font-light text-[#2b241b]">Studio feed and moments</h2>
            </div>
            <div className="mt-8 columns-1 gap-6 space-y-6 sm:columns-2 xl:columns-3">
              {brand.commonGallery.map((item, idx) => (
                <div key={`${item.url}-${idx}`} className="break-inside-avoid overflow-hidden border border-[#ddd4c2] bg-[#ffffff]">
                  <MediaEmbed type={item.mediaType} url={item.url} altText={item.altText} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="relative mt-16 border-t border-[#ddd4c2] bg-[#fbf8f1] py-12 text-center">
        <div className="absolute inset-0 bg-kolam opacity-30" />
        <p className="ks-label relative mb-3 text-[10px] uppercase tracking-[0.2em] text-[#c9a84c]">Get in touch</p>
        <h2 className="font-display relative mb-2 text-3xl font-light text-[#2b241b]">
          Ready to transform your space?
        </h2>
        <p className="relative mb-8 text-xs tracking-wide text-[#8a7d6b]">
          We work across Coimbatore - homes and commercial spaces
        </p>
        <div className="relative flex flex-wrap justify-center gap-4">
          <a
            href={brand?.whatsappUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="flex min-w-[100px] flex-col items-center gap-2 rounded-sm border border-[#c9a84c] bg-[rgba(201,168,76,0.08)] px-6 py-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-[#c9a84c]" aria-hidden="true">
              <path d="M12.02 2C6.49 2 2 6.4 2 11.82c0 1.9.56 3.74 1.62 5.32L2 22l5.03-1.57a10.17 10.17 0 004.99 1.3h.01c5.53 0 10.02-4.4 10.02-9.82C22.05 6.4 17.55 2 12.02 2zm5.82 13.88c-.24.66-1.4 1.25-1.93 1.33-.5.07-1.14.1-1.84-.12-.42-.13-.96-.31-1.65-.6-2.9-1.21-4.78-4.04-4.92-4.23-.14-.2-1.18-1.55-1.18-2.95 0-1.4.74-2.09 1-2.37.26-.28.57-.35.76-.35.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.14.07.14.12.3.02.49-.1.2-.15.32-.3.49-.14.17-.3.38-.43.5-.14.13-.29.28-.13.56.17.28.73 1.18 1.56 1.92 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.6-.07.16-.2.68-.78.86-1.05.18-.27.37-.22.62-.13.25.08 1.58.74 1.85.88.28.14.46.2.53.31.07.11.07.67-.17 1.33z" />
            </svg>
            <span className="text-[10px] tracking-widest text-[#c9a84c]">WHATSAPP</span>
            <span className="text-[9px] text-[#8a7d6b]">Quickest reply</span>
          </a>
          <a
            href={brand?.instagramUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="flex min-w-[100px] flex-col items-center gap-2 rounded-sm border border-[#ddd4c2] px-6 py-4 transition hover:border-[#cfc3ad]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-[#9a9488]" aria-hidden="true">
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.8A3.95 3.95 0 003.8 7.75v8.5a3.95 3.95 0 003.95 3.95h8.5a3.95 3.95 0 003.95-3.95v-8.5a3.95 3.95 0 00-3.95-3.95h-8.5zM17.6 6.4a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4z" />
            </svg>
            <span className="text-[10px] tracking-widest text-[#5b5043]">INSTAGRAM</span>
            <span className="text-[9px] text-[#8a7d6b]">@kalaisuvadu</span>
          </a>
          <a
            href={brand?.email ? `mailto:${brand.email}` : "#"}
            className="flex min-w-[100px] flex-col items-center gap-2 rounded-sm border border-[#ddd4c2] px-6 py-4 transition hover:border-[#cfc3ad]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-[#9a9488]" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 16.5v-9m19.5 0a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 002.25 7.5m19.5 0l-8.69 5.794a1.5 1.5 0 01-1.66 0L2.25 7.5" />
            </svg>
            <span className="text-[10px] tracking-widest text-[#5b5043]">EMAIL</span>
            <span className="text-[9px] text-[#8a7d6b]">For detailed briefs</span>
          </a>
        </div>
        <p className="relative mt-6 text-[10px] tracking-wide text-[#8a7d6b]">
          We reply within 2 hours - Mon-Sat - 9am-7pm
        </p>
      </section>
    </div>
  );
}
