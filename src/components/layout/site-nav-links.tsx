"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Our work" },
  { href: "/team", label: "About us" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNavDesktopLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`border-b pb-1 text-xs uppercase tracking-[0.2em] transition ${
              active
                ? "border-[#c9a84c] text-[#2b241b]"
                : "border-transparent text-[#8a7d6b] hover:text-[#2b241b]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteNavMobileLinks() {
  const pathname = usePathname();

  return (
    <div className="grid h-16 grid-cols-4 items-center justify-items-center">
      <Link href="/" className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${isActive(pathname, "/") ? "text-[#c9a84c]" : "text-[#8a7d6b]"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <span className="border-b border-transparent pb-0.5">Home</span>
      </Link>
      <Link href="/portfolio" className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${isActive(pathname, "/portfolio") ? "text-[#c9a84c]" : "text-[#8a7d6b]"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18M2.25 13.5l1.631-4.487A2.25 2.25 0 015.997 7.5h12.006a2.25 2.25 0 012.116 1.513L21.75 13.5m-18 0v4.875c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V13.5m-12-4.5V3c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v6" />
        </svg>
        <span>Our work</span>
      </Link>
      <Link href="/team" className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${isActive(pathname, "/team") ? "text-[#c9a84c]" : "text-[#8a7d6b]"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <span>About</span>
      </Link>
      <Link href="/contact" className={`flex flex-col items-center gap-1 text-[10px] font-medium transition ${isActive(pathname, "/contact") ? "text-[#c9a84c]" : "text-[#8a7d6b]"}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.084.29.128.597.128.916v5.713a2.25 2.25 0 01-2.248 2.25H5.877L2.25 21V9.427c0-.32.044-.626.128-.916m17.872 0A2.248 2.248 0 0018 6.25H6A2.248 2.248 0 003.75 8.511m16.5 0z" />
        </svg>
        <span>Contact</span>
      </Link>
    </div>
  );
}
