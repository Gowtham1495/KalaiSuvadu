import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(217,119,6,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(120,113,108,0.14),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.82),_rgba(255,251,235,0.98))]" />
      <SiteHeader />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <SiteFooter />
    </div>
  );
}
