import Link from "next/link";

const navItems = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <>
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
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-stone-950/10 transition hover:-translate-y-0.5 hover:bg-stone-800"
          >
            Start a project
          </Link>
        </div>
      </header>

      {/* Bottom Nav Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200/80 bg-white/90 pb-safe backdrop-blur-xl md:hidden">
        <div className="grid h-16 grid-cols-5 items-center justify-items-center">
          <Link href="/" className="flex flex-col items-center gap-1 text-[10px] font-medium text-stone-500 transition active:text-stone-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span>Home</span>
          </Link>
          <Link href="/portfolio" className="flex flex-col items-center gap-1 text-[10px] font-medium text-stone-500 transition active:text-stone-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18M2.25 13.5l1.631-4.487A2.25 2.25 0 015.997 7.5h12.006a2.25 2.25 0 012.116 1.513L21.75 13.5m-18 0v4.875c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V13.5m-12-4.5V3c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v6" />
            </svg>
            <span>Portfolio</span>
          </Link>
          <Link href="/services" className="flex flex-col items-center gap-1 text-[10px] font-medium text-stone-500 transition active:text-stone-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.37-9.37a2.121 2.121 0 113 3l-9.37 9.37a2.121 2.121 0 01-3 0l-3-3a2.121 2.121 0 010-3l3-3a2.121 2.121 0 013 0l3 3zm0 0l2.25 2.25M8.5 10.5h.008v.008H8.5V10.5zm3.75 0h.008v.008h-.008V10.5z" />
            </svg>
            <span>Services</span>
          </Link>
          <Link href="/team" className="flex flex-col items-center gap-1 text-[10px] font-medium text-stone-500 transition active:text-stone-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>Team</span>
          </Link>
          <Link href="/contact" className="flex flex-col items-center gap-1 text-[10px] font-medium text-stone-500 transition active:text-stone-950">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.084.29.128.597.128.916v5.713a2.25 2.25 0 01-2.248 2.25H5.877L2.25 21V9.427c0-.32.044-.626.128-.916m17.872 0A2.248 2.248 0 0018 6.25H6A2.248 2.248 0 003.75 8.511m16.5 0z" />
            </svg>
            <span>Contact</span>
          </Link>
        </div>
      </nav>
    </>
  );
}