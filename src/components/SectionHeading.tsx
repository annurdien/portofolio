export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center text-primary-50">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-200/80">{eyebrow}</p>
      <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
      <p className="text-base text-primary-200/75 md:text-lg">{description}</p>
    </div>
  );
}
