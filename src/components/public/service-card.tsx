import Link from "next/link";

type ServiceCardProps = {
  service: {
    name: string;
    slug: string;
    shortDescription: string;
    imageUrl: string | null;
  };
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_24px_80px_-42px_rgba(28,25,23,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-35px_rgba(28,25,23,0.35)]">
      <div className="aspect-[16/11] overflow-hidden bg-stone-100">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">Service</p>
        <h3 className="mt-3 text-xl font-semibold text-stone-950">{service.name}</h3>
        <p className="mt-3 text-sm leading-6 text-stone-600">{service.shortDescription}</p>
        <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-stone-950">
          Request this service
        </Link>
      </div>
    </article>
  );
}