type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-neutral-600">{description}</p>
      ) : null}
    </div>
  );
}
