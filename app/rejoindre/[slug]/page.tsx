import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PositionCard from "@/components/PositionCard";
import SubCta from "@/components/SubCta";
import { positions, getPosition } from "@/lib/positions";

export function generateStaticParams() {
  return positions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/rejoindre/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const position = getPosition(slug);
  if (!position) return {};
  return {
    title: `${position.title} — Mundiis`,
    description: position.summary,
  };
}

export default async function PositionPage({ params }: PageProps<"/rejoindre/[slug]">) {
  const { slug } = await params;
  const position = getPosition(slug);
  if (!position) notFound();

  return (
    <>
      <div className="bg-ivory pb-8 pt-32 sm:pt-40 md:pt-48">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <Link
            href="/rejoindre"
            className="cursor-hover inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-muted transition-colors hover:text-coral-text"
          >
            ← Rejoindre Mundiis
          </Link>
        </div>
      </div>

      <section className="bg-ivory pb-16 sm:pb-24 md:pb-28">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <PositionCard position={position} />
        </div>
      </section>

      <SubCta title="Un autre profil pourrait vous correspondre ?" />
    </>
  );
}
