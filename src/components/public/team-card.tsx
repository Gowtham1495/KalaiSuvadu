import Link from "next/link";
import type { TeamMemberWithProjects } from "@/lib/site-data";

type TeamCardProps = {
  member: TeamMemberWithProjects;
};

export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_80px_-42px_rgba(28,25,23,0.28)]">
      <div className="grid gap-0 lg:grid-cols-[170px_1fr]">
        <div className="aspect-square bg-stone-100 lg:aspect-auto">
          {member.profileImageUrl ? (
            <img src={member.profileImageUrl} alt={member.name} className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Artist</p>
          <h3 className="mt-3 text-2xl font-semibold text-stone-950">{member.name}</h3>
          <p className="mt-2 text-sm font-medium text-stone-500">{member.specialization}</p>
          <p className="mt-4 text-sm leading-6 text-stone-600">{member.bio}</p>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Projects</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {member.projectMembers.map((relation) => (
                <Link
                  key={relation.project.id}
                  href={`/portfolio/${relation.project.slug}`}
                  className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700 transition hover:bg-stone-200"
                >
                  {relation.project.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}