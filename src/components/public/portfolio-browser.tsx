"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type PortfolioBrowserProps = {
  projects: Array<{
    title: string;
    slug: string;
    category: string;
    workType: string;
    status: "upcoming" | "in-progress" | "completed";
    location: string | null;
    coverMediaUrl: string | null;
    media: Array<{ mediaType: string; url: string; altText: string | null }>;
    teamMembers: Array<{ teamMember: { id: string; name: string; slug: string } }>;
  }>;
  teamMembers: Array<{ id: string; name: string; slug: string }>;
};

export function PortfolioBrowser({ projects, teamMembers }: PortfolioBrowserProps) {
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [member, setMember] = useState("ALL");

  const categories = ["ALL", "MURAL", "INTERIOR", "COMMERCIAL", "CUSTOM"];
  const statuses = [
    { label: "All Statuses", value: "ALL" },
    { label: "Completed", value: "completed" },
    { label: "In Progress", value: "in-progress" },
    { label: "Upcoming", value: "upcoming" },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatches = category === "ALL" || project.category === category;
      const statusMatches = status === "ALL" || project.status === status;
      const memberMatches =
        member === "ALL" || project.teamMembers.some((relation) => relation.teamMember.id === member);

      return categoryMatches && statusMatches && memberMatches;
    });
  }, [category, status, member, projects]);

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_80px_-42px_rgba(28,25,23,0.28)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === item
                    ? "bg-stone-950 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {item === "ALL" ? "All categories" : item}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {statuses.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setStatus(item.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  status === item.value
                    ? "bg-amber-700 text-white"
                    : "bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-stone-700">
          Team member
          <select
            value={member}
            onChange={(event) => setMember(event.target.value)}
            className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 outline-none"
          >
            <option value="ALL">All members</option>
            {teamMembers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => {
          const cover = project.coverMediaUrl ?? project.media[0]?.url;

          return (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_80px_-42px_rgba(28,25,23,0.28)] transition duration-300 hover:-translate-y-1"
            >
              {project.status && project.status !== "completed" && (
                <span className="absolute top-4 right-4 z-10 rounded-full bg-amber-700/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                  {project.status === "in-progress" ? "In Progress" : "Upcoming"}
                </span>
              )}
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                {cover ? (
                  project.media[0]?.mediaType === "VIDEO" ? (
                    <video className="h-full w-full object-cover" muted playsInline preload="metadata" src={cover} />
                  ) : (
                    <img
                      src={cover}
                      alt={project.media[0]?.altText ?? project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )
                ) : null}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                  <span>{project.category}</span>
                  <span className="text-stone-300">•</span>
                  <span>{project.workType}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-stone-950">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{project.location ?? "Featured project"}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}