import Link from "next/link"
import { ArrowRight, Compass, Map as MapIcon, Sparkles } from "lucide-react"
import { GlobeHero } from "@/components/globe-hero"
import { QuickChallenge } from "@/components/quick-challenge"
import { YouAreHere } from "@/components/you-are-here"
import { TerritoryCard } from "@/components/territory-card"
import { territories } from "@/lib/data"

const steps = [
  { n: "01", title: "Escolha", text: "Escolha o seu ano escolar e comece a jornada." },
  { n: "02", title: "Explore", text: "Descubra conteúdos através de mapas e experiências." },
  { n: "03", title: "Desafie-se", text: "Resolva atividades e missões que fazem você pensar." },
  { n: "04", title: "Conquiste", text: "Ganhe XP e desbloqueie medalhas de explorador." },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="size-4" aria-hidden="true" /> Geografia do 6º ao 9º ano
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-foreground text-balance sm:text-5xl">
              Explore o mundo. <span className="text-primary">Descubra a Geografia.</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
              Aprenda Geografia de um jeito diferente: explore mapas, descubra lugares, resolva desafios e
              transforme conhecimento em aventura.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/anos"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <Compass className="size-5" aria-hidden="true" /> Começar a explorar
              </Link>
              <Link
                href="/conteudos"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-semibold text-foreground transition-colors hover:border-primary"
              >
                <MapIcon className="size-5" aria-hidden="true" /> Ver conteúdos
              </Link>
            </div>
          </div>
          <GlobeHero />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">Como funciona?</h2>
          <p className="mt-2 text-muted-foreground">Quatro passos para virar um explorador do planeta.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="font-display text-3xl font-extrabold text-primary/30">{s.n}</span>
              <h3 className="mt-2 font-display text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DESAFIO RÁPIDO */}
      <section className="mx-auto max-w-3xl px-4 py-8">
        <QuickChallenge />
      </section>

      {/* EXPLORAR PREVIEW */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Territórios de conhecimento</h2>
            <p className="mt-2 text-muted-foreground">Cada território é uma área do saber para você conquistar.</p>
          </div>
          <Link href="/explorar" className="inline-flex items-center gap-1 font-semibold text-primary hover:gap-2 transition-all">
            Ver todos <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {territories.slice(0, 6).map((t) => (
            <TerritoryCard key={t.id} territory={t} />
          ))}
        </div>
      </section>

      {/* VOCÊ ESTÁ AQUI */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">🌍 Você está aqui</h2>
          <p className="mt-2 text-muted-foreground text-pretty">
            Geografia não é só decorar mapas. Ela está no seu dia a dia. Toque para descobrir.
          </p>
        </div>
        <YouAreHere />
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="overflow-hidden rounded-3xl bg-primary-dark px-6 py-12 text-center text-primary-foreground sm:px-12">
          <h2 className="font-display text-3xl font-bold text-balance">Pronto para explorar o planeta?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80 text-pretty">
            Sem cadastro, sem login. É só escolher seu ano e começar a aventura. Seu progresso fica salvo neste
            navegador.
          </p>
          <Link
            href="/anos"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            <Compass className="size-5" aria-hidden="true" /> Começar a explorar
          </Link>
        </div>
      </section>
    </>
  )
}
