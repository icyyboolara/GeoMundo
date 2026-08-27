import type { Metadata } from "next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContentBrowser } from "@/components/content-browser"

export const metadata: Metadata = {
  title: "Conteúdos | GeoMundo",
  description: "Todos os conteúdos de Geografia organizados por território de conhecimento.",
}

export default function ConteudosPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
          <header className="mb-8 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Biblioteca</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Conteúdos de Geografia
            </h1>
            <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
              Navegue por tema. Cada conteúdo é uma pequena jornada: descubra, observe, entenda e teste seus
              conhecimentos.
            </p>
          </header>
          <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-muted" />}>
            <ContentBrowser />
          </Suspense>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
