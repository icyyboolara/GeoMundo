"use client"

import { useState } from "react"
import { territories, getLevel, getNextLevel, contents } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { TerritoryIcon } from "@/components/icon"
import { XpBar } from "@/components/xp-bar"
import { RotateCcw, TriangleAlert } from "lucide-react"

export function ProgressPanel() {
  const { xp, ready, territoryProgress, completedContents, answeredCorrect, unlockedBadges, resetProgress } =
    useProgress()
  const [confirming, setConfirming] = useState(false)

  const safeXp = ready ? xp : 0
  const level = getLevel(safeXp)
  const next = getNextLevel(safeXp)

  const stats = [
    { label: "XP total", value: safeXp },
    { label: "Conteúdos concluídos", value: ready ? completedContents.length : 0, max: contents.length },
    { label: "Questões acertadas", value: ready ? answeredCorrect.length : 0 },
    { label: "Medalhas", value: ready ? unlockedBadges.length : 0 },
  ]

  return (
    <div>
      {/* Resumo */}
      <div className="mb-8 rounded-2xl border-2 border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Nível atual</p>
            <p className="font-display text-2xl font-bold">
              <span className="mr-2" aria-hidden="true">
                {level.emoji}
              </span>
              {level.name}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {next ? (
              <>
                Faltam <span className="font-bold text-foreground tabular-nums">{next.minXp - safeXp} XP</span> para{" "}
                <span className="font-semibold">{next.name}</span>
              </>
            ) : (
              <span className="font-semibold text-primary">Nível máximo alcançado!</span>
            )}
          </p>
        </div>
        <div className="mt-4">
          <XpBar />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
            <p className="font-display text-3xl font-bold text-primary tabular-nums">
              {s.value}
              {s.max ? <span className="text-lg text-muted-foreground">/{s.max}</span> : null}
            </p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Progresso por território */}
      <h2 className="mb-4 font-display text-xl font-bold">Progresso por tema</h2>
      <ul className="mb-10 space-y-3">
        {territories.map((t) => {
          const pct = ready ? territoryProgress(t.id) : 0
          return (
            <li key={t.id} className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <TerritoryIcon name={t.icon} className="size-4" aria-hidden="true" />
                </span>
                <span className="flex-1 font-semibold">{t.name}</span>
                <span className="text-sm font-bold text-muted-foreground tabular-nums">{pct}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>

      {/* Reiniciar */}
      <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-6">
        <h3 className="font-display text-lg font-bold">Reiniciar progresso</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Isso apaga apenas os dados salvos no seu navegador (XP, conteúdos e medalhas). Nenhuma informação pessoal é
          guardada.
        </p>
        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-destructive/40 px-4 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reiniciar progresso
          </button>
        ) : (
          <div className="mt-4 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
            <p className="flex items-center gap-2 font-semibold text-destructive">
              <TriangleAlert className="size-5" aria-hidden="true" />
              Tem certeza? Essa ação não pode ser desfeita.
            </p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  resetProgress()
                  setConfirming(false)
                }}
                className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Sim, apagar tudo
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
