"use client"

import { useProgress } from "@/lib/progress"
import { getLevel, getNextLevel, levels } from "@/lib/data"
import { cn } from "@/lib/utils"

export function XpBar({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { xp, ready } = useProgress()
  const safeXp = ready ? xp : 0
  const level = getLevel(safeXp)
  const next = getNextLevel(safeXp)

  const start = level.minXp
  const end = next ? next.minXp : level.minXp
  const pct = next ? Math.min(100, Math.round(((safeXp - start) / (end - start)) * 100)) : 100

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex items-end justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            {level.emoji}
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Nível {level.level}
            </p>
            <p className="font-display text-base font-bold leading-tight text-foreground">{level.name}</p>
          </div>
        </div>
        <p className="text-right text-sm font-semibold tabular-nums text-primary">
          {safeXp} XP
          {next && <span className="block text-xs font-normal text-muted-foreground">meta: {next.minXp}</span>}
        </p>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso para o próximo nível: ${pct}%`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {!compact && (
        <div className="mt-3 flex items-center justify-between">
          {levels.map((lv) => (
            <div
              key={lv.level}
              className={cn(
                "flex flex-col items-center gap-1 text-center",
                safeXp >= lv.minXp ? "opacity-100" : "opacity-40",
              )}
            >
              <span className="text-lg" aria-hidden="true">
                {lv.emoji}
              </span>
              <span className="hidden text-[10px] font-medium text-muted-foreground sm:block">{lv.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
