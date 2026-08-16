import Link from "next/link";
import { getBrand } from "@/lib/site-data";
import { SiteNavDesktopLinks, SiteNavMobileLinks } from "@/components/layout/site-nav-links";

export async function SiteHeader() {
  const brand = await getBrand();
  const whatsappUrl = brand?.whatsappUrl ?? "#";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#ddd4c2] bg-[#fbf8f1]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#c9a84c] text-base text-[#5b5043]">
              ச
            </span>
            <span className="leading-tight">
              <span className="font-display block text-[15px] font-light tracking-wide text-[#2b241b]">
                Kalai Suvadu
              </span>
              <span className="block text-[10px] text-[#8a7d6b]">கலைச் சுவடு</span>
            </span>
          </Link>

          <SiteNavDesktopLinks />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center rounded-full border border-[#c9a84c]/60 px-4 py-2 text-xs text-[#a07c2e] transition hover:border-[#c9a84c] hover:text-[#2b241b] sm:inline-flex"
          >
            WhatsApp us
          </a>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#ddd4c2] bg-[#fbf8f1]/95 pb-safe backdrop-blur md:hidden">
        <SiteNavMobileLinks />
      </nav>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 right-6 z-50 hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-xs font-semibold text-black shadow-lg md:bottom-8 md:right-8 md:flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden="true">
          <path d="M12.02 2C6.49 2 2 6.4 2 11.82c0 1.9.56 3.74 1.62 5.32L2 22l5.03-1.57a10.17 10.17 0 004.99 1.3h.01c5.53 0 10.02-4.4 10.02-9.82C22.05 6.4 17.55 2 12.02 2zm5.82 13.88c-.24.66-1.4 1.25-1.93 1.33-.5.07-1.14.1-1.84-.12-.42-.13-.96-.31-1.65-.6-2.9-1.21-4.78-4.04-4.92-4.23-.14-.2-1.18-1.55-1.18-2.95 0-1.4.74-2.09 1-2.37.26-.28.57-.35.76-.35.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.14.07.14.12.3.02.49-.1.2-.15.32-.3.49-.14.17-.3.38-.43.5-.14.13-.29.28-.13.56.17.28.73 1.18 1.56 1.92 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.6-.07.16-.2.68-.78.86-1.05.18-.27.37-.22.62-.13.25.08 1.58.74 1.85.88.28.14.46.2.53.31.07.11.07.67-.17 1.33z" />
        </svg>
        Chat with us
      </a>
    </>
  );
}