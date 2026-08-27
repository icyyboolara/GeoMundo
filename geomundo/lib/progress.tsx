"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  badges,
  contents,
  contentsByTerritory,
  getContent,
  type Badge,
} from "@/lib/data"

const STORAGE_KEY = "geomundo:v1"

type ProgressState = {
  xp: number
  completedContents: string[]
  answeredCorrect: string[]
  mapCorrect: string[]
  unlockedBadges: string[]
}

const initialState: ProgressState = {
  xp: 0,
  completedContents: [],
  answeredCorrect: [],
  mapCorrect: [],
  unlockedBadges: [],
}

type ProgressContextValue = ProgressState & {
  ready: boolean
  addXp: (amount: number) => void
  answerQuestion: (id: string, correct: boolean, xp: number) => boolean
  completeContent: (slug: string) => void
  recordMapAnswer: (id: string, correct: boolean, xp: number) => boolean
  resetProgress: () => void
  justUnlocked: Badge | null
  clearJustUnlocked: () => void
  territoryProgress: (territoryId: string) => number
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

function computeBadges(state: ProgressState): string[] {
  const unlocked = new Set(state.unlockedBadges)
  const done = new Set(state.completedContents)

  // Cartografia: todos os conteúdos do território
  const carto = contentsByTerritory("cartografia")
  if (carto.length > 0 && carto.every((c) => done.has(c.slug))) unlocked.add("cartografia")

  // Biomas
  if (done.has("biomas-brasileiros")) unlocked.add("biomas")

  // Clima e hidrografia (todos)
  const clima = contentsByTerritory("clima-hidrografia")
  if (clima.length > 0 && clima.every((c) => done.has(c.slug))) unlocked.add("clima")

  // Brasil: qualquer conteúdo do 7º ano
  const anyBrasil = contents.some((c) => c.years.includes(7) && done.has(c.slug))
  if (anyBrasil) unlocked.add("brasil")

  // Mapas: 3 atividades corretas
  if (state.mapCorrect.length >= 3) unlocked.add("mapas")

  // Meio ambiente
  if (done.has("mudancas-climaticas")) unlocked.add("planeta")

  // Geógrafo Júnior: 450 xp
  if (state.xp >= 450) unlocked.add("geografo")

  return Array.from(unlocked)
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(initialState)
  const [ready, setReady] = useState(false)
  const [justUnlocked, setJustUnlocked] = useState<Badge | null>(null)
  const queue = useRef<string[]>([])

  // carregar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ProgressState>
        setState({ ...initialState, ...parsed })
      }
    } catch {
      // ignora
    }
    setReady(true)
  }, [])

  // salvar
  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignora
    }
  }, [state, ready])

  const applyBadges = useCallback((next: ProgressState): ProgressState => {
    const before = new Set(next.unlockedBadges)
    const after = computeBadges(next)
    const fresh = after.filter((id) => !before.has(id))
    if (fresh.length > 0) {
      queue.current.push(...fresh)
    }
    return { ...next, unlockedBadges: after }
  }, [])

  // mostra conquistas recém desbloqueadas, uma por vez
  useEffect(() => {
    if (justUnlocked) return
    const id = queue.current.shift()
    if (id) {
      const badge = badges.find((b) => b.id === id) ?? null
      setJustUnlocked(badge)
    }
  }, [justUnlocked, state])

  const addXp = useCallback(
    (amount: number) => {
      setState((prev) => applyBadges({ ...prev, xp: prev.xp + amount }))
    },
    [applyBadges],
  )

  const answerQuestion = useCallback(
    (id: string, correct: boolean, xp: number) => {
      if (!correct) return false
      let awarded = false
      setState((prev) => {
        if (prev.answeredCorrect.includes(id)) return prev
        awarded = true
        return applyBadges({
          ...prev,
          xp: prev.xp + xp,
          answeredCorrect: [...prev.answeredCorrect, id],
        })
      })
      return awarded
    },
    [applyBadges],
  )

  const recordMapAnswer = useCallback(
    (id: string, correct: boolean, xp: number) => {
      if (!correct) return false
      let awarded = false
      setState((prev) => {
        if (prev.mapCorrect.includes(id)) return prev
        awarded = true
        return applyBadges({
          ...prev,
          xp: prev.xp + xp,
          mapCorrect: [...prev.mapCorrect, id],
        })
      })
      return awarded
    },
    [applyBadges],
  )

  const completeContent = useCallback(
    (slug: string) => {
      setState((prev) => {
        if (prev.completedContents.includes(slug)) return prev
        const bonus = getContent(slug) ? 25 : 0
        return applyBadges({
          ...prev,
          xp: prev.xp + bonus,
          completedContents: [...prev.completedContents, slug],
        })
      })
    },
    [applyBadges],
  )

  const resetProgress = useCallback(() => {
    queue.current = []
    setJustUnlocked(null)
    setState(initialState)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignora
    }
  }, [])

  const clearJustUnlocked = useCallback(() => setJustUnlocked(null), [])

  const territoryProgress = useCallback(
    (territoryId: string) => {
      const list = contentsByTerritory(territoryId)
      if (list.length === 0) return 0
      const done = list.filter((c) => state.completedContents.includes(c.slug)).length
      return Math.round((done / list.length) * 100)
    },
    [state.completedContents],
  )

  const value = useMemo<ProgressContextValue>(
    () => ({
      ...state,
      ready,
      addXp,
      answerQuestion,
      completeContent,
      recordMapAnswer,
      resetProgress,
      justUnlocked,
      clearJustUnlocked,
      territoryProgress,
    }),
    [
      state,
      ready,
      addXp,
      answerQuestion,
      completeContent,
      recordMapAnswer,
      resetProgress,
      justUnlocked,
      clearJustUnlocked,
      territoryProgress,
    ],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress deve ser usado dentro de ProgressProvider")
  return ctx
}
