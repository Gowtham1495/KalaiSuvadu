import Link from "next/link";

const navItems = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-stone-950 text-sm font-semibold text-white shadow-lg shadow-stone-950/15 transition-transform duration-200 group-hover:-translate-y-0.5">
            HB
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
              HueBees
            </span>
            <span className="block text-sm text-stone-600">Murals and paintings</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-stone-200 bg-stone-50 p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-white hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-stone-950/10 transition hover:-translate-y-0.5 hover:bg-stone-800"
        >
          Start a project
        </Link>
      </div>
    </header>
  );
}