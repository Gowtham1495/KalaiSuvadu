import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/site-data";
import { MediaEmbed } from "@/components/public/media-embed";

type ProjectPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || !project.isPublished) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl bg-[#f6f2ea] px-6 py-12 text-[#2b241b] lg:px-8 lg:py-16">
      <section className="border border-[#ddd4c2] bg-[#fbf8f1] p-8 lg:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c9a84c]">{project.category}</p>
          <h1 className="font-display mt-4 text-5xl font-light tracking-tight text-[#2b241b] sm:text-6xl">{project.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#5b5043]">{project.description}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7d6b]">Type:</span>
            <span className="text-sm font-medium text-[#2b241b]">{project.workType}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7d6b]">Location:</span>
            <span className="text-sm font-medium text-[#2b241b]">{project.location ?? "Not listed"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a7d6b]">Team:</span>
            <div className="flex flex-wrap gap-2">
              {project.teamMembers.map((relation) => (
                <span key={relation.teamMember.id} className="rounded-full border border-[#ddd4c2] bg-[#ffffff] px-3 py-1 text-xs font-medium text-[#5b5043]">
                  {relation.teamMember.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {project.media.length > 0 && (
        <section className="mt-16">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="text-center">
              <h2 className="font-display text-3xl font-light tracking-tight text-[#2b241b]">Project Gallery</h2>
              <p className="mt-2 text-[#5b5043]">Visuals, timelapses, and completed shots.</p>
            </div>
            
            <div className="flex flex-col gap-12">
              {project.media.map((item, idx) => (
                <div key={`${item.url}-${idx}`} className="overflow-hidden rounded-sm border border-[#ddd4c2] bg-[#ffffff]">
                  <MediaEmbed type={item.mediaType} url={item.url} altText={item.altText} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}