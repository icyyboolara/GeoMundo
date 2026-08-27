"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { TerritoryIcon } from "@/components/icon"
import { contentsByTerritory, type Territory } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { cn } from "@/lib/utils"

const colorMap: Record<Territory["color"], string> = {
  green: "bg-primary/10 text-primary",
  blue: "bg-secondary/10 text-secondary",
  sky: "bg-sky/15 text-secondary",
  yellow: "bg-accent/25 text-accent-foreground",
}

export function TerritoryCard({ territory }: { territory: Territory }) {
  const { territoryProgress, ready } = useProgress()
  const pct = ready ? territoryProgress(territory.id) : 0
  const count = contentsByTerritory(territory.id).length

  return (
    <Link
      href={`/conteudos?territorio=${territory.id}`}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span className={cn("grid size-12 place-items-center rounded-xl", colorMap[territory.color])}>
          <TerritoryIcon name={territory.icon} className="size-6" aria-hidden="true" />
        </span>
        <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-base font-bold text-foreground">{territory.name}</h3>
      <p className="mt-1 flex-1 text-sm text-muted-foreground text-pretty">{territory.description}</p>
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            {count} {count === 1 ? "desafio" : "desafios"}
          </span>
          <span className="tabular-nums">{pct}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </Link>
  )
}
