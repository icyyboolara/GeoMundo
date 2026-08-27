import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { years, contentsByYear } from "@/lib/data"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Escolha seu ano | GeoMundo",
  description: "Escolha o ano escolar e comece a explorar a Geografia no GeoMundo.",
}

const colorMap: Record<string, { ring: string; badge: string; btn: string }> = {
  green: {
    ring: "hover:border-primary/60",
    badge: "bg-primary/10 text-primary",
    btn: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  blue: {
    ring: "hover:border-secondary/60",
    badge: "bg-secondary/10 text-secondary",
    btn: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  },
  sky: {
    ring: "hover:border-sky/60",
    badge: "bg-sky/15 text-sky-foreground",
    btn: "bg-sky text-sky-foreground hover:bg-sky/90",
  },
  yellow: {
    ring: "hover:border-accent/60",
    badge: "bg-accent/20 text-accent-foreground",
    btn: "bg-accent text-accent-foreground hover:bg-accent/90",
  },
}

export default function ComecarPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-16">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar ao início
          </Link>

          <header className="mb-10 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">Sua jornada começa aqui</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Qual território você quer explorar?
            </h1>
            <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
              Escolha seu ano escolar. Você pode navegar livremente entre todos os conteúdos depois — nada fica
              trancado.
            </p>
          </header>

          <div className="grid gap-5 sm:grid-cols-2">
            {years.map((y) => {
              const c = colorMap[y.color]
              const count = contentsByYear(y.year).length
              return (
                <article
                  key={y.year}
                  className={`group flex flex-col rounded-2xl border-2 border-border bg-card p-6 shadow-sm transition-all hover:shadow-md ${c.ring}`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-4xl" aria-hidden="true">
                      {y.emoji}
                    </span>
                    <div>
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.badge}`}>
                        {y.year}º ano
                      </span>
                      <h2 className="font-display text-xl font-bold">{y.title}</h2>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{y.subtitle}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {y.topics.map((t) => (
                      <li
                        key={t}
                        className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs font-medium text-muted-foreground">
                      {count} {count === 1 ? "conteúdo" : "conteúdos"} disponível{count === 1 ? "" : "s"}
                    </span>
                    <Link
                      href={`/ano/${y.year}`}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${c.btn}`}
                    >
                      Explorar {y.year}º ano
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
