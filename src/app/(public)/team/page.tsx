import type { Metadata } from "next";
import { getAllTeamMembers } from "@/lib/site-data";
import { SectionHeading } from "@/components/public/section-heading";
import { TeamCard } from "@/components/public/team-card";

export const metadata: Metadata = {
  title: "About us",
  description: "Meet the artists who create the KalaiSuvadu murals and paintings.",
};

export default async function TeamPage() {
  const teamMembers = await getAllTeamMembers();

  return (
    <div className="mx-auto max-w-7xl bg-[#f6f2ea] px-6 py-12 text-[#2b241b] lg:px-8 lg:py-16">
      <SectionHeading
        eyebrow="About us"
        title="Artists and collaborators"
        description="Every artist has a distinct style, and each project shows how those styles can work alone or together."
      />
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}