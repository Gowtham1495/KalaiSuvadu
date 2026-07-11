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
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <section className="rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-[0_30px_120px_-55px_rgba(28,25,23,0.35)] lg:p-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">{project.category}</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl">{project.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600">{project.description}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Type:</span>
            <span className="text-sm font-medium text-stone-950">{project.workType}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Location:</span>
            <span className="text-sm font-medium text-stone-950">{project.location ?? "Not listed"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Team:</span>
            <div className="flex flex-wrap gap-2">
              {project.teamMembers.map((relation) => (
                <span key={relation.teamMember.id} className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
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
              <h2 className="text-3xl font-bold tracking-tight text-stone-950">Project Gallery</h2>
              <p className="mt-2 text-stone-600">Visuals, timelapses, and completed shots.</p>
            </div>
            
            <div className="flex flex-col gap-12">
              {project.media.map((item, idx) => (
                <div key={`${item.url}-${idx}`} className="overflow-hidden rounded-[2rem] bg-stone-100 ring-1 ring-stone-200">
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