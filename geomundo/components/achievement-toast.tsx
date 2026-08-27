"use client"

import { useEffect } from "react"
import { Sparkles } from "lucide-react"
import { useProgress } from "@/lib/progress"

export function AchievementToast() {
  const { justUnlocked, clearJustUnlocked } = useProgress()

  useEffect(() => {
    if (!justUnlocked) return
    const timer = setTimeout(clearJustUnlocked, 5000)
    return () => clearTimeout(timer)
  }, [justUnlocked, clearJustUnlocked])

  if (!justUnlocked) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm animate-pop-in sm:inset-x-auto sm:right-6"
    >
      <div className="flex items-center gap-4 rounded-2xl border border-accent bg-card p-4 shadow-xl shadow-foreground/10">
        <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-accent text-3xl">
          <span aria-hidden="true">{justUnlocked.emoji}</span>
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" /> Conquista desbloqueada!
          </p>
          <p className="truncate font-display font-bold text-foreground">{justUnlocked.name}</p>
          <p className="truncate text-sm text-muted-foreground">{justUnlocked.description}</p>
        </div>
        <button
          type="button"
          onClick={clearJustUnlocked}
          className="ml-auto shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-muted"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
