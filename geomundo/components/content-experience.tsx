"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { getContent, getTerritory } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { Icon } from "@/components/icon"
import { Quiz } from "@/components/quiz"
import { Search, Eye, Brain, Lightbulb, Globe, ArrowRight, ArrowLeft, Check } from "lucide-react"

type StepDef = {
  key: string
  label: string
  icon: React.ReactNode
  tint: string
}

const stepDefs: StepDef[] = [
  { key: "descubra", label: "Descubra", icon: <Search className="size-5" />, tint: "bg-secondary/10 text-secondary" },
  { key: "observe", label: "Observe", icon: <Eye className="size-5" />, tint: "bg-sky/15 text-sky-foreground" },
  { key: "entenda", label: "Entenda", icon: <Brain className="size-5" />, tint: "bg-primary/10 text-primary" },
  { key: "voceSabia", label: "Você sabia?", icon: <Lightbulb className="size-5" />, tint: "bg-accent/20 text-accent-foreground" },
  { key: "naVidaReal", label: "Na vida real", icon: <Globe className="size-5" />, tint: "bg-primary/10 text-primary" },
]

export function ContentExperience({ slug }: { slug: string }) {
  const content = getContent(slug)
  const territory = content ? getTerritory(content.territoryId) : undefined
  const { completedContents, completeContent } = useProgress()
  const [step, setStep] = useState(0)

  const steps = useMemo(() => {
    if (!content) return []
    return stepDefs.map((d) => ({
      ...d,
      text: content.steps[d.key as keyof typeof content.steps],
    }))
  }, [content])

  if (!content) return null

  const totalSteps = steps.length + 1 // + quiz
  const isQuizStep = step === steps.length
  const done = completedContents.includes(slug)

  return (
    <div>
      {/* Cabeçalho do conteúdo */}
      <div className="mb-6 flex items-start gap-4">
        <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon name={content.icon} className="size-7" />
        </span>
        <div>
          {territory && (
            <Link
              href={`/territorio/${territory.id}`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {territory.name}
            </Link>
          )}
          <h1 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">{content.title}</h1>
          <p className="mt-1 text-pretty text-muted-foreground leading-relaxed">{content.short}</p>
        </div>
      </div>

      {/* Trilha de etapas */}
      <ol className="mb-8 flex flex-wrap items-center gap-2" aria-label="Etapas do conteúdo">
        {steps.map((s, i) => (
          <li key={s.key}>
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={step === i ? "step" : undefined}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                step === i
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {s.label}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => setStep(steps.length)}
            aria-current={isQuizStep ? "step" : undefined}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isQuizStep
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            Teste seus conhecimentos
          </button>
        </li>
      </ol>

      {/* Barra de progresso da trilha */}
      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-muted" role="presentation">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Conteúdo da etapa */}
      {!isQuizStep ? (
        <article className="rounded-2xl border-2 border-border bg-card p-6 shadow-sm md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <span className={`inline-flex size-11 items-center justify-center rounded-xl ${steps[step].tint}`}>
              {steps[step].icon}
            </span>
            <h2 className="font-display text-2xl font-bold">{steps[step].label}</h2>
          </div>
          <p className="text-pretty text-lg leading-relaxed text-foreground/90">{steps[step].text}</p>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {step === steps.length - 1 ? "Ir para o desafio" : "Próxima etapa"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </article>
      ) : (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground">
              <Brain className="size-5" />
            </span>
            <h2 className="font-display text-2xl font-bold">Teste seus conhecimentos</h2>
          </div>
          <Quiz questions={content.quiz} onFinished={() => completeContent(slug)} />
          {done && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Check className="size-4" aria-hidden="true" />
              Conteúdo concluído! Você já ganhou o XP deste tema.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
