export type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalContentProps = {
  updated: string;
  sections: LegalSection[];
  // Values for {placeholders} in the texts, e.g. { phone, email }
  values: Record<string, string>;
};

// Renders a legal page body (legal notice, privacy policy, terms)
export function LegalContent({ updated, sections, values }: LegalContentProps) {
  const fill = (text: string) =>
    text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <p className="text-sm text-muted">{updated}</p>
      {sections.map((section) => (
        <section key={section.title} className="mt-10">
          <h2 className="text-2xl font-bold">{section.title}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-3 leading-relaxed">
              {fill(paragraph)}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
