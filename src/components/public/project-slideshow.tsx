"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ProjectSlideshowProps = {
  projects: Array<{
    title: string;
    slug: string;
    category?: string;
    location?: string | null;
    coverMediaUrl: string | null;
  }>;
};

export function ProjectSlideshow({ projects }: ProjectSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (projects.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % projects.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [projects.length]);

  if (projects.length === 0) {
    return (
      <div className="flex h-full min-h-[360px] items-center justify-center bg-[#e7dfd0] lg:min-h-[520px]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 text-[#9a9488]" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.25 5.25 2.25 2.25 0 013 3h18a2.25 2.25 0 01-2.25 2.25 2.31 2.31 0 01-1.577.925M6.827 6.175L7.5 20.25m9-14.075L15.75 20.25m-8.25 0h8.25M4.5 10.5h15" />
        </svg>
      </div>
    );
  }

  const activeProject = projects[activeIndex];

  return (
    <div className="relative h-full min-h-[360px] lg:min-h-[520px]">
      <Link href={`/portfolio/${activeProject.slug}`} className="group block h-full w-full">
        <div className="relative h-full w-full overflow-hidden bg-[#e7dfd0]">
          {activeProject.coverMediaUrl ? (
            <img src={activeProject.coverMediaUrl} alt={activeProject.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 text-[#9a9488]" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.25 5.25 2.25 2.25 0 013 3h18a2.25 2.25 0 01-2.25 2.25 2.31 2.31 0 01-1.577.925M6.827 6.175L7.5 20.25m9-14.075L15.75 20.25m-8.25 0h8.25M4.5 10.5h15" />
              </svg>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#2b241b]/70 via-[#2b241b]/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white md:p-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#f3d788]">
              {activeProject.category ?? "Featured project"}
            </p>
            <h3 className="font-display mt-2 text-2xl font-light text-white md:text-3xl">{activeProject.title}</h3>
            {activeProject.location && <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#e9dfc7]">{activeProject.location}</p>}
          </div>
        </div>
      </Link>

      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 px-4">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            aria-label={`View ${project.title}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? "w-8 bg-[#f3d788]" : "w-2.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
