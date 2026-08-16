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
    <article className="service-card group overflow-hidden rounded-sm border border-[#ddd4c2] bg-[#ffffff] transition duration-300 hover:border-[#cfc3ad]">
      <div className="aspect-[16/11] overflow-hidden bg-[#ebe3d5]">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="p-6">
        <div className="diamond-frame mb-4 flex h-8 w-8 rotate-45 items-center justify-center border border-[#c9a84c]">
          <span className="diamond-icon -rotate-45 text-xs text-[#c9a84c]">◆</span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">Service</p>
        <h3 className="font-display mt-3 text-xl font-light text-[#2b241b]">{service.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[#5b5043]">{service.shortDescription}</p>
        <Link href="/contact" className="mt-5 inline-flex text-sm text-[#c9a84c]">
          Request this service
        </Link>
      </div>
    </article>
  );
}