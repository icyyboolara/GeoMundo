"use client"

import { useMemo, useState } from "react"
import { contents, territories, type Question } from "@/lib/data"
import { TerritoryIcon } from "@/components/icon"
import { Quiz } from "@/components/quiz"
import { useProgress } from "@/lib/progress"
import { Check } from "lucide-react"

type Deck = {
  id: string
  name: string
  icon: (typeof territories)[number]["icon"]
  questions: Question[]
}

export function ChallengeHub() {
  const { answeredCorrect } = useProgress()

  const decks: Deck[] = useMemo(() => {
    return territories
      .map((t) => {
        const qs = contents.filter((c) => c.territoryId === t.id).flatMap((c) => c.quiz)
        return { id: t.id, name: t.name, icon: t.icon, questions: qs }
      })
      .filter((d) => d.questions.length > 0)
  }, [])

  const [activeId, setActiveId] = useState<string>(decks[0]?.id ?? "")
  const active = decks.find((d) => d.id === activeId)

  return (
    <div>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((d) => {
          const answered = d.questions.filter((q) => answeredCorrect.includes(q.id)).length
          const total = d.questions.length
          const complete = answered === total
          const selected = d.id === activeId
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveId(d.id)}
              aria-current={selected ? "true" : undefined}
              className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
              }`}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <TerritoryIcon name={d.icon} className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-sm font-bold">{d.name}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  {complete && <Check className="size-3.5 text-primary" aria-hidden="true" />}
                  {answered}/{total} questões acertadas
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {active && (
        <div className="rounded-2xl border-2 border-border bg-card/50 p-5 md:p-6">
          <h2 className="mb-4 font-display text-xl font-bold">Desafio: {active.name}</h2>
          {/* key força remontar o quiz ao trocar de deck */}
          <Quiz key={active.id} questions={active.questions} />
        </div>
      )}
    </div>
  )
}
