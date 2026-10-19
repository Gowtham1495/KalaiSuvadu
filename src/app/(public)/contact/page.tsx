import type { Metadata } from "next";
import { getBrand } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send KalaiSuvadu an inquiry for a mural, painting, or collaborative project.",
};

export default async function ContactPage() {
  const brand = await getBrand();

  const emailUrl = brand?.email ? `mailto:${brand.email}?subject=KalaiSuvadu Inquiry` : null;
  const whatsappUrl = brand?.whatsappUrl || null;
  const instagramUrl = brand?.instagramUrl || null;

  return (
    <div className="mx-auto max-w-4xl bg-[#f6f2ea] px-6 py-12 text-[#2b241b] lg:px-8 lg:py-16">
      <section className="relative border border-[#ddd4c2] bg-[#fbf8f1] p-8 text-center lg:p-12">
        <div className="absolute inset-0 bg-kolam opacity-30" />
        <div className="relative">
          <h1 className="font-display text-4xl font-light text-[#2b241b]">Want this for your space?</h1>
          <p className="mt-3 text-sm text-[#5b5043]">Talk to us - we&apos;re fast to respond</p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-w-[150px] flex-col items-center gap-2 rounded-sm border border-[#c9a84c] bg-[#c9a84c]/5 px-6 py-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-[#c9a84c]" aria-hidden="true">
                  <path d="M12.02 2C6.49 2 2 6.4 2 11.82c0 1.9.56 3.74 1.62 5.32L2 22l5.03-1.57a10.17 10.17 0 004.99 1.3h.01c5.53 0 10.02-4.4 10.02-9.82C22.05 6.4 17.55 2 12.02 2zm5.82 13.88c-.24.66-1.4 1.25-1.93 1.33-.5.07-1.14.1-1.84-.12-.42-.13-.96-.31-1.65-.6-2.9-1.21-4.78-4.04-4.92-4.23-.14-.2-1.18-1.55-1.18-2.95 0-1.4.74-2.09 1-2.37.26-.28.57-.35.76-.35.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.14.07.14.12.3.02.49-.1.2-.15.32-.3.49-.14.17-.3.38-.43.5-.14.13-.29.28-.13.56.17.28.73 1.18 1.56 1.92 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.6-.07.16-.2.68-.78.86-1.05.18-.27.37-.22.62-.13.25.08 1.58.74 1.85.88.28.14.46.2.53.31.07.11.07.67-.17 1.33z" />
                </svg>
                <span className="text-[10px] tracking-widest text-[#c9a84c]">WHATSAPP</span>
                <span className="text-[9px] text-[#8a7d6b]">Quickest reply</span>
              </a>
            )}

            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-w-[150px] flex-col items-center gap-2 rounded-sm border border-[#ddd4c2] px-6 py-4 transition hover:border-[#cfc3ad]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-[#9a9488]" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.8A3.95 3.95 0 003.8 7.75v8.5a3.95 3.95 0 003.95 3.95h8.5a3.95 3.95 0 003.95-3.95v-8.5a3.95 3.95 0 00-3.95-3.95h-8.5zM17.6 6.4a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4z" />
                </svg>
                <span className="text-[10px] tracking-widest text-[#5b5043]">INSTAGRAM</span>
                <span className="text-[9px] text-[#8a7d6b]">@kalaisuvadu</span>
              </a>
            )}

            {emailUrl && (
              <a
                href={emailUrl}
                className="flex min-w-[150px] flex-col items-center gap-2 rounded-sm border border-[#ddd4c2] px-6 py-4 transition hover:border-[#cfc3ad]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-[#9a9488]" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 16.5v-9m19.5 0a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 002.25 7.5m19.5 0l-8.69 5.794a1.5 1.5 0 01-1.66 0L2.25 7.5" />
                </svg>
                <span className="text-[10px] tracking-widest text-[#5b5043]">EMAIL</span>
                <span className="text-[9px] text-[#8a7d6b]">For detailed briefs</span>
              </a>
            )}
          </div>

          <p className="mt-8 text-xs text-[#8a7d6b]">We work across Chennai · Homes &amp; Commercial</p>
        </div>
      </section>
    </div>
  );
}