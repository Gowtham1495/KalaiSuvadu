import Link from "next/link";
import type { TeamMemberWithProjects } from "@/lib/site-data";

type TeamCardProps = {
  member: TeamMemberWithProjects;
};

export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className="team-card overflow-hidden rounded-sm border border-[#ddd4c2] bg-[#ffffff] transition duration-300 hover:border-[#cfc3ad]">
      <div className="grid gap-0 lg:grid-cols-[170px_1fr]">
        <div className="avatar-frame aspect-square border-2 border-[#c9a84c] bg-[#ebe3d5] lg:aspect-auto">
          {member.profileImageUrl ? (
            <img src={member.profileImageUrl} alt={member.name} className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">Artist</p>
          <h3 className="font-display mt-3 text-2xl font-light text-[#2b241b]">{member.name}</h3>
          <p className="mt-2 text-sm font-medium text-[#5b5043]">{member.specialization}</p>
          <p className="mt-4 text-sm leading-6 text-[#5b5043]">{member.bio}</p>

          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7d6b]">Projects <span className="text-[#c9a84c]">({member.projectMembers.length})</span></p>
            <div className="mt-3 flex flex-wrap gap-2">
              {member.projectMembers.map((relation) => (
                <Link
                  key={relation.project.id}
                  href={`/portfolio/${relation.project.slug}`}
                  className="rounded-full border border-[#ddd4c2] bg-[#f8f4ec] px-3 py-1 text-sm text-[#5b5043] transition hover:border-[#cfc3ad] hover:text-[#2b241b]"
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