type PageHeaderProps = {
  title: string;
  intro?: string;
};

// Title band at the top of inner pages
export function PageHeader({ title, intro }: PageHeaderProps) {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
      </div>
    </section>
  );
}
