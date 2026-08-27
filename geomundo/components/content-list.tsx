"use client"

import Link from "next/link"
import { getContent } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { Icon } from "@/components/icon"
import { Check, ArrowRight } from "lucide-react"

export function ContentList({ slugs }: { slugs: string[] }) {
  const { completedContents } = useProgress()

  if (slugs.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-muted/50 p-6 text-center text-muted-foreground">
        Novos conteúdos deste tema chegam em breve. Explore os outros territórios enquanto isso!
      </p>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {slugs.map((slug) => {
        const c = getContent(slug)
        if (!c) return null
        const done = completedContents.includes(slug)
        return (
          <Link
            key={slug}
            href={`/conteudo/${slug}`}
            className="group relative flex flex-col rounded-2xl border-2 border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {done && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                <Check className="size-3.5" aria-hidden="true" />
                Concluído
              </span>
            )}
            <span className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name={c.icon} className="size-6" />
            </span>
            <h3 className="font-display text-lg font-bold leading-tight text-pretty">{c.title}</h3>
            <p className="mt-1.5 flex-1 text-sm text-muted-foreground leading-relaxed">{c.short}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              {done ? "Revisar" : "Começar"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        )
      })}
    </div>
  )
}
