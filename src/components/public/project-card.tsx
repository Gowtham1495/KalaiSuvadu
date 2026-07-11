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
    <article className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_80px_-42px_rgba(28,25,23,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-35px_rgba(28,25,23,0.38)]">
      <Link href={`/portfolio/${project.slug}`} className="block">
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
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
            <span>{project.category}</span>
            <span className="text-stone-300">•</span>
            <span>{project.workType}</span>
          </div>
          <h3 className="mt-3 text-xl font-semibold text-stone-950">{project.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">{project.location ?? "Featured project"}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-stone-600">
            {project.teamMembers.map((member) => (
              <span key={member.teamMember.id} className="rounded-full bg-stone-100 px-3 py-1">
                {member.teamMember.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}