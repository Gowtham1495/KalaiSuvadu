import Link from "next/link";

const footerLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200/80 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">HueBees</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-stone-600">
            Wall murals and paintings for homes and businesses that want art with presence,
            warmth, and a handcrafted feel.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-stone-600">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-stone-950">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Admin</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-stone-600">
            <Link href="/admin/login" className="transition hover:text-stone-950">
              Login
            </Link>
            <span>Studio content is managed privately by the team.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}