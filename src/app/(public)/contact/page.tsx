import type { Metadata } from "next";
import Link from "next/link";
import { getBrand } from "@/lib/site-data";
import { SectionHeading } from "@/components/public/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send HueBees an inquiry for a mural, painting, or collaborative project.",
};

export default async function ContactPage() {
  const brand = await getBrand();

  const emailUrl = brand?.email ? `mailto:${brand.email}?subject=HueBees Inquiry` : null;
  const whatsappUrl = brand?.whatsappUrl || null;
  const instagramUrl = brand?.instagramUrl || null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-[0_30px_120px_-55px_rgba(28,25,23,0.35)] lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Contact</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl">Start a new project.</h1>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            Tell us about the space, your timeline, and the look you want. We'll respond with the next steps.
          </p>

          <div className="mt-8">
            <Link href="/portfolio" className="text-sm font-semibold text-stone-950 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-500">
              Review portfolio before sending
            </Link>
          </div>
        </section>

        <section className="flex flex-col justify-center gap-6">
          <SectionHeading
            eyebrow="Direct lines"
            title="Get in touch instantly"
            description="We prefer direct communication to keep things fast and personal. Choose your preferred method below."
          />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-start gap-2 rounded-[2rem] border border-stone-200 bg-white p-6 transition hover:border-stone-400 hover:bg-stone-50"
              >
                <span className="text-xl font-bold text-stone-950">WhatsApp</span>
                <span className="text-sm text-stone-600">Quickest way to get a response.</span>
                <span className="mt-2 text-sm font-semibold text-amber-700 group-hover:text-amber-800">Message us &rarr;</span>
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-start gap-2 rounded-[2rem] border border-stone-200 bg-white p-6 transition hover:border-stone-400 hover:bg-stone-50"
              >
                <span className="text-xl font-bold text-stone-950">Instagram</span>
                <span className="text-sm text-stone-600">DM us and follow our latest work.</span>
                <span className="mt-2 text-sm font-semibold text-amber-700 group-hover:text-amber-800">Follow studio &rarr;</span>
              </a>
            )}
            {emailUrl && (
              <a
                href={emailUrl}
                className="group flex flex-col items-start gap-2 rounded-[2rem] border border-stone-200 bg-white p-6 transition hover:border-stone-400 hover:bg-stone-50 sm:col-span-2"
              >
                <span className="text-xl font-bold text-stone-950">Email</span>
                <span className="text-sm text-stone-600">Prefer email? Send us your brief and reference images.</span>
                <span className="mt-2 text-sm font-semibold text-amber-700 group-hover:text-amber-800">{brand?.email} &rarr;</span>
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}