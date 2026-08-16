type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c9a84c]">{eyebrow}</p>
      <h2 className="font-display mt-2 text-2xl font-light text-[#2b241b] sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#5b5043]">{description}</p>
    </div>
  );
}