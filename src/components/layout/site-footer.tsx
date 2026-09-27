import Link from "next/link";

const footerLinks = [
  { href: "/portfolio", label: "Our work" },
  { href: "/team", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#ddd4c2] bg-[#f6f2ea]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-[15px] font-light text-[#5b5043]">Kalai Suvadu</p>
          <p className="mt-1 text-[10px] text-[#8a7d6b]">கலைச் சுவடு</p>
          <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-[#8a7d6b]">Coimbatore</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a7d6b]">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-[10px] text-[#5b5043]">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#a07c2e]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-xl italic text-[#8a7d6b]">The art of leaving a mark.</p>
        </div>
      </div>
    </footer>
  );
}