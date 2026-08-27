"use client"

import { badges, getLevel } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { XpBar } from "@/components/xp-bar"
import { Lock, Check } from "lucide-react"

export function AchievementsBoard() {
  const { xp, unlockedBadges, ready } = useProgress()
  const level = getLevel(ready ? xp : 0)
  const unlockedCount = ready ? unlockedBadges.length : 0

  return (
    <div>
      <div className="mb-8 grid gap-4 rounded-2xl border-2 border-border bg-card p-6 shadow-sm sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Seu nível atual</p>
          <p className="font-display text-2xl font-bold">
            <span className="mr-2" aria-hidden="true">
              {level.emoji}
            </span>
            {level.name}
          </p>
          <div className="mt-4 max-w-md">
            <XpBar />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-accent/15 px-5 py-4 text-center">
          <div>
            <p className="font-display text-3xl font-bold text-accent-foreground tabular-nums">
              {unlockedCount}
              <span className="text-lg text-muted-foreground">/{badges.length}</span>
            </p>
            <p className="text-xs font-medium text-muted-foreground">medalhas</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((b) => {
          const unlocked = ready && unlockedBadges.includes(b.id)
          return (
            <article
              key={b.id}
              className={`relative flex flex-col rounded-2xl border-2 p-5 transition-all ${
                unlocked
                  ? "border-accent/60 bg-accent/5 shadow-sm"
                  : "border-dashed border-border bg-muted/30"
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`grid size-14 place-items-center rounded-2xl text-3xl ${
                    unlocked ? "bg-accent/20" : "bg-muted grayscale"
                  }`}
                  aria-hidden="true"
                >
                  {b.emoji}
                </span>
                {unlocked ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    <Check className="size-3.5" aria-hidden="true" />
                    Desbloqueada
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                    <Lock className="size-3.5" aria-hidden="true" />
                    Bloqueada
                  </span>
                )}
              </div>
              <h3 className={`mt-4 font-display text-lg font-bold ${unlocked ? "" : "text-muted-foreground"}`}>
                {b.name}
              </h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{b.description}</p>
              <p className="mt-3 rounded-lg bg-background/60 px-3 py-2 text-xs font-medium text-muted-foreground">
                <span className="font-semibold text-foreground">Como desbloquear: </span>
                {b.condition}
              </p>
            </article>
          )
        })}
      </div>
    </div>
  )
}
