"use client"

import { useEffect, useState } from "react"
import { CircleCheck, CircleX, RefreshCw, Sparkles, Zap } from "lucide-react"
import { quickChallenges } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { cn } from "@/lib/utils"

export function QuickChallenge() {
  const { answerQuestion } = useProgress()
  const [mounted, setMounted] = useState(false)
  const [i, setI] = useState(0)
  const [choice, setChoice] = useState<number | boolean | null>(null)
  const [checked, setChecked] = useState(false)
  const [gained, setGained] = useState(0)

  useEffect(() => {
    setMounted(true)
    setI(Math.floor(Math.random() * quickChallenges.length))
  }, [])

  const q = quickChallenges[i]

  function next() {
    setChecked(false)
    setChoice(null)
    setGained(0)
    setI((prev) => (prev + 1) % quickChallenges.length)
  }

  function check() {
    let isRight = false
    if (q.type === "multiple") isRight = choice === q.correct
    else if (q.type === "truefalse") isRight = choice === q.correct
    setChecked(true)
    if (isRight) {
      const awarded = answerQuestion(q.id, true, q.xp)
      if (awarded) setGained(q.xp)
    }
  }

  const isRight =
    checked &&
    ((q.type === "multiple" && choice === q.correct) || (q.type === "truefalse" && choice === q.correct))

  return (
    <div className="rounded-2xl border border-accent/50 bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-accent-foreground">
        <span className="grid size-8 place-items-center rounded-lg bg-accent">
          <Zap className="size-4 text-accent-foreground" aria-hidden="true" />
        </span>
        Desafio rápido
      </div>

      {!mounted ? (
        <div className="mt-4 h-32 animate-pulse rounded-xl bg-muted/60" aria-hidden="true" />
      ) : (
        <>
          <h3 className="mt-4 font-display text-lg font-bold text-foreground text-balance">{q.prompt}</h3>

          {q.type === "multiple" && (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, idx) => {
                const sel = choice === idx
                const showRight = checked && idx === q.correct
                const showWrong = checked && sel && idx !== q.correct
                return (
                  <li key={idx}>
                    <button
                      type="button"
                      disabled={checked}
                      onClick={() => setChoice(idx)}
                      className={cn(
                        "w-full rounded-xl border p-3 text-left text-sm font-medium transition-colors",
                        showRight && "border-primary bg-primary/10 text-primary",
                        showWrong && "border-destructive bg-destructive/10 text-destructive",
                        !checked && sel && "border-secondary bg-secondary/10",
                        !checked && !sel && "border-border hover:bg-muted",
                        checked && !showRight && !showWrong && "opacity-60",
                      )}
                    >
                      {opt}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {q.type === "truefalse" && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[true, false].map((val) => {
                const sel = choice === val
                const showRight = checked && val === q.correct
                const showWrong = checked && sel && val !== q.correct
                return (
                  <button
                    key={String(val)}
                    type="button"
                    disabled={checked}
                    onClick={() => setChoice(val)}
                    className={cn(
                      "rounded-xl border p-3 font-semibold transition-colors",
                      showRight && "border-primary bg-primary/10 text-primary",
                      showWrong && "border-destructive bg-destructive/10 text-destructive",
                      !checked && sel && "border-secondary bg-secondary/10",
                      !checked && !sel && "border-border hover:bg-muted",
                      checked && !showRight && !showWrong && "opacity-60",
                    )}
                  >
                    {val ? "Verdadeiro" : "Falso"}
                  </button>
                )
              })}
            </div>
          )}

          {checked && (
            <div
              role="status"
              className={cn(
                "mt-4 flex gap-3 rounded-xl border p-4 animate-fade-up",
                isRight ? "border-primary/40 bg-primary/5" : "border-accent bg-accent/10",
              )}
            >
              {isRight ? (
                <CircleCheck className="size-5 shrink-0 text-primary" aria-hidden="true" />
              ) : (
                <CircleX className="size-5 shrink-0 text-accent-foreground" aria-hidden="true" />
              )}
              <div>
                <p className="font-display font-bold">{isRight ? "🎉 Muito bem!" : "Quase! Vamos entender."}</p>
                <p className="mt-1 text-sm text-foreground/80">{q.explanation}</p>
                {gained > 0 && (
                  <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    <Sparkles className="size-4" aria-hidden="true" /> +{gained} XP
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            {!checked ? (
              <button
                type="button"
                onClick={check}
                disabled={choice === null}
                className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Responder
              </button>
            ) : null}
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 font-semibold text-foreground hover:bg-muted"
            >
              <RefreshCw className="size-4" aria-hidden="true" /> Outro desafio
            </button>
          </div>
        </>
      )}
    </div>
  )
}
