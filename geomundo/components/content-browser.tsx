"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { territories, contentsByTerritory } from "@/lib/data"
import { TerritoryIcon } from "@/components/icon"
import { ContentList } from "@/components/content-list"

export function ContentBrowser() {
  const params = useSearchParams()
  const initial = params.get("territorio")
  const [active, setActive] = useState<string>(
    initial && territories.some((t) => t.id === initial) ? initial : territories[0].id,
  )

  const list = useMemo(() => contentsByTerritory(active).map((c) => c.slug), [active])
  const activeTerritory = territories.find((t) => t.id === active)

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Menu de territórios */}
      <nav aria-label="Territórios" className="lg:sticky lg:top-24 lg:self-start">
        <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {territories.map((t) => {
            const selected = t.id === active
            return (
              <li key={t.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(t.id)}
                  aria-current={selected ? "true" : undefined}
                  className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    selected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <TerritoryIcon name={t.icon} className="size-4 shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap lg:whitespace-normal">{t.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Conteúdos do território */}
      <div>
        {activeTerritory && (
          <header className="mb-5">
            <h2 className="font-display text-2xl font-bold">{activeTerritory.name}</h2>
            <p className="mt-1 text-muted-foreground">{activeTerritory.description}</p>
          </header>
        )}
        <ContentList slugs={list} />
      </div>
    </div>
  )
}
