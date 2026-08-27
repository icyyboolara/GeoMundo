import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContentList } from "@/components/content-list"
import { years, contentsByYear } from "@/lib/data"
import { ArrowLeft } from "lucide-react"

export function generateStaticParams() {
  return years.map((y) => ({ year: String(y.year) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>
}): Promise<Metadata> {
  const { year } = await params
  const y = years.find((yr) => yr.year === Number(year))
  return {
    title: y ? `${y.year}º ano — ${y.title} | GeoMundo` : "Ano | GeoMundo",
    description: y?.subtitle,
  }
}

export default async function YearPage({
  params,
}: {
  params: Promise<{ year: string }>
}) {
  const { year } = await params
  const yearNum = Number(year)
  const y = years.find((yr) => yr.year === yearNum)
  if (!y) notFound()

  const list = contentsByYear(yearNum)

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
          <Link
            href="/comecar"
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Trocar de ano
          </Link>

          <header className="mb-8 flex items-start gap-4">
            <span className="text-5xl" aria-hidden="true">
              {y.emoji}
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">{y.year}º ano</p>
              <h1 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">{y.title}</h1>
              <p className="mt-2 max-w-2xl text-pretty text-muted-foreground leading-relaxed">{y.subtitle}</p>
            </div>
          </header>

          <ContentList slugs={list.map((c) => c.slug)} />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
