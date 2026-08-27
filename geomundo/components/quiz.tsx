"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  CircleX,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react"
import type { Question } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { cn } from "@/lib/utils"

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function Quiz({
  questions,
  variant = "content",
  onFinished,
}: {
  questions: Question[]
  variant?: "content" | "map"
  onFinished?: () => void
}) {
  const { answerQuestion, recordMapAnswer } = useProgress()
  const [mounted, setMounted] = useState(false)
  const [index, setIndex] = useState(0)
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [gainedXp, setGainedXp] = useState(0)
  const [finished, setFinished] = useState(false)

  // respostas de trabalho
  const [choice, setChoice] = useState<number | null>(null)
  const [tf, setTf] = useState<boolean | null>(null)
  const [assoc, setAssoc] = useState<Record<number, string>>({})
  const [order, setOrder] = useState<string[]>([])

  const q = questions[index]

  useEffect(() => setMounted(true), [])

  const shuffledRights = useMemo(
    () => (q.type === "association" ? shuffle(q.pairs.map((p) => p.right)) : []),
    [q],
  )

  // reinicia estado de trabalho a cada questão
  useEffect(() => {
    setChecked(false)
    setCorrect(false)
    setChoice(null)
    setTf(null)
    setAssoc({})
    if (q.type === "order") setOrder(shuffle(q.items))
    else setOrder([])
  }, [q])

  if (!mounted) {
    return <div className="h-64 animate-pulse rounded-2xl border border-border bg-muted/50" aria-hidden="true" />
  }

  const canCheck = (() => {
    if (checked) return false
    switch (q.type) {
      case "multiple":
        return choice !== null
      case "truefalse":
        return tf !== null
      case "association":
        return q.pairs.every((_, i) => assoc[i])
      case "order":
        return order.length === q.items.length
    }
  })()

  function evaluate(): boolean {
    switch (q.type) {
      case "multiple":
        return choice === q.correct
      case "truefalse":
        return tf === q.correct
      case "association":
        return q.pairs.every((p, i) => assoc[i] === p.right)
      case "order":
        return order.every((item, i) => item === q.items[i])
    }
  }

  function handleCheck() {
    const isRight = evaluate()
    setChecked(true)
    setCorrect(isRight)
    if (isRight) {
      setScore((s) => s + 1)
      const awarded =
        variant === "map" ? recordMapAnswer(q.id, true, q.xp) : answerQuestion(q.id, true, q.xp)
      if (awarded) setGainedXp((g) => g + q.xp)
    }
  }

  function handleNext() {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1)
    } else {
      setFinished(true)
      onFinished?.()
    }
  }

  function moveItem(from: number, to: number) {
    if (to < 0 || to >= order.length) return
    setOrder((prev) => {
      const a = [...prev]
      ;[a[from], a[to]] = [a[to], a[from]]
      return a
    })
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm animate-pop-in">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-3xl">
          <Trophy className="size-8 text-accent-foreground" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold">Atividade concluída!</h3>
        <p className="mt-1 text-muted-foreground">
          Você acertou {score} de {questions.length} ({pct}%).
        </p>
        {gainedXp > 0 && (
          <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            <Sparkles className="size-4" aria-hidden="true" /> +{gainedXp} XP conquistados
          </p>
        )}
        <div>
          <button
            type="button"
            onClick={() => {
              setIndex(0)
              setScore(0)
              setGainedXp(0)
              setFinished(false)
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <RotateCcw className="size-4" aria-hidden="true" /> Refazer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Questão {index + 1} de {questions.length}
        </span>
        <div className="flex gap-1" aria-hidden="true">
          {questions.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-6 rounded-full",
                i < index ? "bg-primary" : i === index ? "bg-primary/50" : "bg-muted",
              )}
            />
          ))}
        </div>
      </div>

      {q.type === "multiple" && "scenario" in q && q.scenario && (
        <p className="mb-3 rounded-xl border border-secondary/30 bg-secondary/5 p-3 text-sm text-foreground">
          {q.scenario}
        </p>
      )}

      <h3 className="font-display text-lg font-bold text-foreground text-balance">{q.prompt}</h3>

      {/* ---- múltipla escolha ---- */}
      {q.type === "multiple" && (
        <ul className="mt-4 grid gap-2">
          {q.options.map((opt, i) => {
            const isSel = choice === i
            const showRight = checked && i === q.correct
            const showWrong = checked && isSel && i !== q.correct
            return (
              <li key={i}>
                <button
                  type="button"
                  disabled={checked}
                  onClick={() => setChoice(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm font-medium transition-colors",
                    showRight && "border-primary bg-primary/10 text-primary",
                    showWrong && "border-destructive bg-destructive/10 text-destructive",
                    !checked && isSel && "border-secondary bg-secondary/10",
                    !checked && !isSel && "border-border hover:border-secondary/60 hover:bg-muted",
                    checked && !showRight && !showWrong && "border-border opacity-60",
                  )}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-md border border-current text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {/* ---- verdadeiro ou falso ---- */}
      {q.type === "truefalse" && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[true, false].map((val) => {
            const isSel = tf === val
            const showRight = checked && val === q.correct
            const showWrong = checked && isSel && val !== q.correct
            return (
              <button
                key={String(val)}
                type="button"
                disabled={checked}
                onClick={() => setTf(val)}
                className={cn(
                  "rounded-xl border p-4 text-center font-semibold transition-colors",
                  showRight && "border-primary bg-primary/10 text-primary",
                  showWrong && "border-destructive bg-destructive/10 text-destructive",
                  !checked && isSel && "border-secondary bg-secondary/10",
                  !checked && !isSel && "border-border hover:bg-muted",
                  checked && !showRight && !showWrong && "opacity-60",
                )}
              >
                {val ? "Verdadeiro" : "Falso"}
              </button>
            )
          })}
        </div>
      )}

      {/* ---- associação ---- */}
      {q.type === "association" && (
        <div className="mt-4 grid gap-3">
          <p className="text-sm text-muted-foreground">Relacione cada item à sua definição.</p>
          {q.pairs.map((pair, i) => {
            const value = assoc[i] ?? ""
            const isRight = checked && value === pair.right
            const isWrong = checked && value !== pair.right
            return (
              <div
                key={i}
                className={cn(
                  "flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between",
                  isRight && "border-primary bg-primary/5",
                  isWrong && "border-destructive bg-destructive/5",
                  !checked && "border-border",
                )}
              >
                <span className="font-semibold text-foreground">{pair.left}</span>
                <label className="sr-only" htmlFor={`assoc-${q.id}-${i}`}>
                  Definição para {pair.left}
                </label>
                <select
                  id={`assoc-${q.id}-${i}`}
                  disabled={checked}
                  value={value}
                  onChange={(e) => setAssoc((prev) => ({ ...prev, [i]: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm sm:w-64"
                >
                  <option value="">Escolha...</option>
                  {shuffledRights.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            )
          })}
        </div>
      )}

      {/* ---- ordenar ---- */}
      {q.type === "order" && (
        <div className="mt-4 grid gap-2">
          <p className="text-sm text-muted-foreground">Use as setas para colocar na ordem correta.</p>
          {order.map((item, i) => {
            const isRight = checked && item === q.items[i]
            const isWrong = checked && item !== q.items[i]
            return (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3 text-sm",
                  isRight && "border-primary bg-primary/5",
                  isWrong && "border-destructive bg-destructive/5",
                  !checked && "border-border",
                )}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-muted text-xs font-bold text-foreground">
                  {i + 1}
                </span>
                <span className="flex-1 font-medium text-foreground">{item}</span>
                {!checked && (
                  <span className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => moveItem(i, i - 1)}
                      disabled={i === 0}
                      aria-label="Mover para cima"
                      className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ChevronUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(i, i + 1)}
                      disabled={i === order.length - 1}
                      aria-label="Mover para baixo"
                      className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ChevronDown className="size-4" />
                    </button>
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ---- feedback ---- */}
      {checked && (
        <div
          role="status"
          className={cn(
            "mt-4 flex gap-3 rounded-xl border p-4 animate-fade-up",
            correct ? "border-primary/40 bg-primary/5" : "border-accent bg-accent/10",
          )}
        >
          {correct ? (
            <CircleCheck className="size-5 shrink-0 text-primary" aria-hidden="true" />
          ) : (
            <CircleX className="size-5 shrink-0 text-accent-foreground" aria-hidden="true" />
          )}
          <div>
            <p className="font-display font-bold text-foreground">
              {correct ? "🎉 Muito bem!" : "Quase! Vamos entender."}
            </p>
            <p className="mt-1 text-sm text-foreground/80">{q.explanation}</p>
            {correct && q.xp > 0 && (
              <p className="mt-1 text-sm font-semibold text-primary">+{q.xp} XP</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-5 flex justify-end">
        {!checked ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={!canCheck}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Verificar
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            {index < questions.length - 1 ? "Próxima" : "Concluir"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
