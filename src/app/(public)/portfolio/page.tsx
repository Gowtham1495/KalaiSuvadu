import type { Metadata } from "next";
import { getAllProjects, getAllTeamMembers } from "@/lib/site-data";
import { SectionHeading } from "@/components/public/section-heading";
import { PortfolioBrowser } from "@/components/public/portfolio-browser";

export const metadata: Metadata = {
  title: "Our work",
  description: "Filter KalaiSuvadu projects by category and artist.",
};

export default async function PortfolioPage() {
  const [projects, teamMembers] = await Promise.all([getAllProjects(), getAllTeamMembers()]);

  return (
    <div className="mx-auto max-w-7xl bg-[#f6f2ea] px-6 py-12 text-[#2b241b] lg:px-8 lg:py-16">
      <SectionHeading
        eyebrow="Our work"
        title="Filterable project gallery"
        description="Browse by category or by artist to compare solo and collaborative work."
      />
      <div className="mt-8">
        <PortfolioBrowser
          projects={projects}
          teamMembers={teamMembers.map((member) => ({ id: member.id, name: member.name, slug: member.slug }))}
        />
      </div>
    </div>
  );
}