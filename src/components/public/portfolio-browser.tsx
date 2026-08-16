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
      <div className="flex flex-col gap-6 rounded-sm border border-[#ddd4c2] bg-[#fbf8f1] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  category === item
                    ? "border-[#c9a84c] bg-[rgba(201,168,76,0.10)] text-[#2b241b]"
                    : "border-[#ddd4c2] bg-transparent text-[#8a7d6b] hover:border-[#cfc3ad] hover:text-[#5b5043]"
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
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  status === item.value
                    ? "border-[#c9a84c] bg-[rgba(201,168,76,0.10)] text-[#2b241b]"
                    : "border-[#ddd4c2] bg-transparent text-[#8a7d6b] hover:border-[#cfc3ad] hover:text-[#5b5043]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-[#5b5043]">
          Team member
          <select
            value={member}
            onChange={(event) => setMember(event.target.value)}
            className="rounded-sm border border-[#ddd4c2] bg-[#ffffff] px-4 py-2 text-[#5b5043] outline-none"
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
              className="group relative overflow-hidden rounded-sm border border-[#ddd4c2] bg-[#ffffff] transition duration-300 hover:border-[#cfc3ad]"
            >
              {project.status && project.status !== "completed" && (
                <span className="absolute right-4 top-4 z-10 rounded-full border border-[#c9a84c]/60 bg-[#fff9ee] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#a07c2e]">
                  {project.status === "in-progress" ? "In Progress" : "Upcoming"}
                </span>
              )}
              <div className="aspect-[4/3] overflow-hidden bg-[#ebe3d5]">
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
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">
                  <span>{project.category}</span>
                  <span className="text-[#9a9488]">•</span>
                  <span>{project.workType}</span>
                </div>
                <h3 className="font-display mt-3 text-xl font-light text-[#2b241b]">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5b5043]">{project.location ?? "Featured project"}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}