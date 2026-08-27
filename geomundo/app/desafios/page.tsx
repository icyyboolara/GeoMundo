import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ChallengeHub } from "@/components/challenge-hub"

export const metadata: Metadata = {
  title: "Desafios | GeoMundo",
  description: "Coloque seus conhecimentos à prova com desafios de raciocínio geográfico e ganhe XP.",
}

export default function DesafiosPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
          <header className="mb-8 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-foreground">Coloque à prova</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">Desafios</h1>
            <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
              Aqui não é sobre decorar — é sobre pensar. Escolha um tema, resolva situações-problema, interprete mapas e
              associe ideias. Cada acerto rende XP para sua jornada.
            </p>
          </header>
          <ChallengeHub />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
