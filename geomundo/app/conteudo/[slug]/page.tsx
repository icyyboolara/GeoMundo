import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContentExperience } from "@/components/content-experience"
import { contents, getContent } from "@/lib/data"
import { ArrowLeft } from "lucide-react"

export function generateStaticParams() {
  return contents.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = getContent(slug)
  return {
    title: c ? `${c.title} | GeoMundo` : "Conteúdo | GeoMundo",
    description: c?.short,
  }
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = getContent(slug)
  if (!c) notFound()

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
          <Link
            href="/explorar"
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar a explorar
          </Link>
          <ContentExperience slug={slug} />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
