import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AchievementsBoard } from "@/components/achievements-board"

export const metadata: Metadata = {
  title: "Minhas conquistas | GeoMundo",
  description: "Veja suas medalhas, seu nível e o XP acumulado na sua jornada pela Geografia.",
}

export default function ConquistasPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
          <header className="mb-8 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-foreground">Suas vitórias</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Minhas conquistas
            </h1>
            <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
              Cada medalha representa um marco na sua exploração. Continue aprendendo para desbloquear todas!
            </p>
          </header>
          <AchievementsBoard />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
