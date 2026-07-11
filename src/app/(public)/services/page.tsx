import type { Metadata } from "next";
import Link from "next/link";
import { getBrand, getServices } from "@/lib/site-data";
import { SectionHeading } from "@/components/public/section-heading";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the mural, painting, commercial, and custom collaboration services at HueBees.",
};

export default async function ServicesPage() {
  const [brand, services] = await Promise.all([getBrand(), getServices()]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <section className="rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-[0_30px_120px_-55px_rgba(28,25,23,0.35)] lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Services</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl">
          Art services shaped around the space and the story.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
          {brand?.brandName ?? "HueBees"} helps turn plain walls into visual anchors for homes,
          hospitality spaces, and brands.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
            Request a quote
          </Link>
          <Link href="/portfolio" className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition hover:border-stone-400">
            Browse projects
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Catalog"
          title="Studio offerings"
          description="Each service can be booked on its own or combined into a custom art plan."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_80px_-42px_rgba(28,25,23,0.28)]">
              <div className="aspect-[16/9] bg-stone-100">
                {service.imageUrl ? <img src={service.imageUrl} alt={service.name} className="h-full w-full object-cover" /> : null}
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-stone-950">{service.name}</h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">{service.fullDescription}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}