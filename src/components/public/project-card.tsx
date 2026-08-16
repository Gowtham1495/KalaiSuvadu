import Link from "next/link";

type ProjectCardProps = {
  project: {
    title: string;
    slug: string;
    category: string;
    workType: string;
    location: string | null;
    coverMediaUrl: string | null;
    media: Array<{ mediaType: string; url: string; altText: string | null }>;
    teamMembers: Array<{ teamMember: { id: string; name: string; slug: string } }>;
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  const cover = project.coverMediaUrl ?? project.media[0]?.url;

  return (
    <article className="group overflow-hidden rounded-sm border border-[#ddd4c2] bg-[#ffffff] transition duration-300 hover:border-[#cfc3ad]">
      <Link href={`/portfolio/${project.slug}`} className="block">
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
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">
            <span>{project.category}</span>
            <span className="text-[#9a9488]">•</span>
            <span>{project.workType}</span>
          </div>
          <h3 className="font-display mt-3 text-xl font-light text-[#2b241b]">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5b5043]">{project.location ?? "Featured project"}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#8a7d6b]">
            {project.teamMembers.map((member) => (
              <span key={member.teamMember.id} className="rounded-full border border-[#ddd4c2] bg-[#f8f4ec] px-3 py-1">
                {member.teamMember.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}