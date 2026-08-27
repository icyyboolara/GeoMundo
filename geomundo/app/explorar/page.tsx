import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TerritoryCard } from "@/components/territory-card"
import { GlobeHero } from "@/components/globe-hero"
import { territories } from "@/lib/data"

export const metadata: Metadata = {
  title: "Explorar territórios | GeoMundo",
  description: "Explore os territórios de conhecimento da Geografia: cartografia, relevo, clima, biomas e muito mais.",
}

export default function ExplorarPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/5 to-background">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Mapa do conhecimento</p>
              <h1 className="font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                Escolha um território para explorar
              </h1>
              <p className="mt-4 max-w-md text-pretty text-muted-foreground leading-relaxed">
                Cada território é uma parte do planeta esperando para ser descoberta. Mergulhe nos mapas, no clima, nos
                biomas e nas cidades — e veja seu progresso crescer.
              </p>
            </div>
            <div className="flex justify-center">
              <GlobeHero />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {territories.map((t) => (
              <TerritoryCard key={t.id} territory={t} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
