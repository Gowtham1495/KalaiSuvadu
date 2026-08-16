import type { Metadata } from "next";
import Link from "next/link";
import { getBrand, getServices } from "@/lib/site-data";
import { SectionHeading } from "@/components/public/section-heading";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the mural, painting, commercial, and custom collaboration services at KalaiSuvadu.",
};

export default async function ServicesPage() {
  const [brand, services] = await Promise.all([getBrand(), getServices()]);

  return (
    <div className="mx-auto max-w-7xl bg-[#f6f2ea] px-6 py-12 text-[#2b241b] lg:px-8 lg:py-16">
      <section className="border border-[#ddd4c2] bg-[#fbf8f1] p-8 lg:p-12">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c9a84c]">Services</p>
        <h1 className="font-display mt-4 max-w-3xl text-5xl font-light tracking-tight text-[#2b241b] sm:text-6xl">
          Art services shaped around the space and the story.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5b5043]">
          {brand?.brandName ?? "KalaiSuvadu"} helps turn plain walls into visual anchors for homes,
          hospitality spaces, and brands.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-sm bg-[#c9a84c] px-6 py-3 text-xs tracking-widest text-[#2b241b] transition hover:opacity-90">
            Request a quote
          </Link>
          <Link href="/portfolio" className="rounded-sm border border-[#ddd4c2] px-6 py-3 text-xs tracking-widest text-[#8a7d6b] transition hover:border-[#cfc3ad] hover:text-[#a07c2e]">
            See our work
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
            <article key={service.id} className="overflow-hidden rounded-sm border border-[#ddd4c2] bg-[#ffffff] transition duration-300 hover:border-[#cfc3ad]">
              <div className="aspect-[16/9] bg-[#ebe3d5]">
                {service.imageUrl ? <img src={service.imageUrl} alt={service.name} className="h-full w-full object-cover" /> : null}
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl font-light text-[#2b241b]">{service.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[#5b5043]">{service.fullDescription}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}